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

export function cancelSmoothScroll() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
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

function focusTarget(element) {
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }
  element.focus({ preventScroll: true });
}

export function scrollToSection(id, { offset = 76 } = {}) {
  const element = document.getElementById(id);
  if (!element) return;
  cancelSmoothScroll();

  const target = element.getBoundingClientRect().top + window.scrollY - offset;

  // Reduced motion: correct position, no animation.
  if (prefersReducedMotion()) {
    window.scrollTo(0, target);
    focusTarget(element);
    history.replaceState(null, '', `#${id}`);
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

  const cancelOnInput = () => cancelSmoothScroll();
  window.addEventListener('wheel', cancelOnInput, {
    once: true,
    passive: true,
  });
  window.addEventListener('touchmove', cancelOnInput, {
    once: true,
    passive: true,
  });

  const step = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
      focusTarget(element);
      history.replaceState(null, '', `#${id}`);
    }
  };
  rafId = requestAnimationFrame(step);
}
