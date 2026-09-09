/**
 * Section navigation with designed motion — not a bare `scroll-behavior: smooth`.
 *
 * - easeInOutCubic rAF loop, duration scaled to travel distance (600–1100ms)
 * - fixed-navbar offset so the target never hides under the header
 * - cancels immediately on user wheel/touch (user always wins)
 * - moves keyboard focus to the target (preventScroll) for screen readers
 * - honors prefers-reduced-motion with an instant, correctly-offset jump
 * - keeps semantic hrefs working (no-JS / middle-click still navigate)
 */

let rafId = null;
let restoreBehavior = null;
// Monotonic run id: a newer navigation (or a user cancel) invalidates
// any in-flight async work from an older one.
let navGeneration = 0;

export function cancelSmoothScroll() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (restoreBehavior) {
    restoreBehavior();
    restoreBehavior = null;
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * The stylesheet sets `scroll-behavior: smooth` as a progressive
 * enhancement for native jumps. While OUR rAF loop drives the position
 * frame-by-frame, that rule must be parked — otherwise every
 * window.scrollTo() gets re-smoothed by the browser and the two
 * animations fight (lag, overshoot, extended duration).
 */
function lockScrollBehavior() {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  return () => {
    root.style.scrollBehavior = previous;
  };
}
function focusTarget(element) {
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }
  element.focus({ preventScroll: true });
}

export async function scrollToSection(id, { offset = 76 } = {}) {
  const element = document.getElementById(id);
  if (!element) return;
  cancelSmoothScroll();
  restoreBehavior = lockScrollBehavior();
  const generation = ++navGeneration;
  let userCancelled = false;

  const cancelOnInput = () => {
    userCancelled = true;
    navGeneration++;
    cancelSmoothScroll();
  };
  window.addEventListener('wheel', cancelOnInput, {
    once: true,
    passive: true,
  });
  window.addEventListener('touchmove', cancelOnInput, {
    once: true,
    passive: true,
  });

  // Measure AFTER webfonts resolve: a font swap mid-flight rewraps text
  // and moves every downstream section (the main late-layout-shift source).
  // Past initial load this is already resolved → zero added latency.
  try {
    await document.fonts.ready;
  } catch {
    // Font API unavailable — fall through and rely on settle correction.
  }
  if (userCancelled || generation !== navGeneration) return;

  const target = element.getBoundingClientRect().top + window.scrollY - offset;

  // Reduced motion: correct position, no animation.
  if (prefersReducedMotion()) {
    window.scrollTo(0, target);
    focusTarget(element);
    history.replaceState(null, '', `#${id}`);
    cancelSmoothScroll(); // releases the behavior lock
    return;
  }

  const start = window.scrollY;
  const distance = target - start;
  if (Math.abs(distance) < 4) {
    focusTarget(element);
    return;
  }

  // Longer travel → longer glide, clamped to a calm band.
  const duration = Math.min(1100, Math.max(600, Math.abs(distance) * 0.55));
  const startedAt = performance.now();
  let corrected = false;

  const finish = () => {
    // Layout can still settle under us (webfont swap, late image
    // dimensions). Re-measure once at arrival and correct a single
    // time — by now the document is stable, so this converges.
    const drift = element.getBoundingClientRect().top - offset;
    if (Math.abs(drift) > 2 && !corrected) {
      corrected = true;
      const from = window.scrollY;
      const correctionStart = performance.now();
      const correct = (now) => {
        const t = Math.min(1, (now - correctionStart) / 250);
        window.scrollTo(0, from + drift * easeInOutCubic(t));
        if (t < 1) {
          rafId = requestAnimationFrame(correct);
        } else {
          rafId = null;
          focusTarget(element);
          history.replaceState(null, '', `#${id}`);
          cancelSmoothScroll(); // releases the behavior lock
        }
      };
      rafId = requestAnimationFrame(correct);
      return;
    }
    rafId = null;
    focusTarget(element);
    history.replaceState(null, '', `#${id}`);
    cancelSmoothScroll(); // releases the behavior lock
  };

  const step = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      finish();
    }
  };
  rafId = requestAnimationFrame(step);
}
