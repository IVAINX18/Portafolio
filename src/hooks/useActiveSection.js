import { useEffect, useState } from 'react';

/**
 * Scrollspy — tracks which section owns the viewport midline.
 * Drives the navbar's active indicator ("you are navigating the system").
 *
 * IntersectionObserver-based: zero scroll-handler cost, no re-renders
 * per pixel. The -40%/-55% root margin creates a single active band
 * around the upper-middle viewport so short and tall sections behave.
 */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
    // sectionIds is a module-level constant at call sites.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
