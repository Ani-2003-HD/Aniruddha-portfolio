import { useEffect, useState } from 'react';

/**
 * Reports which section currently owns the viewport.
 *
 * Uses a single IntersectionObserver with a top-weighted rootMargin rather
 * than a scroll listener: the section that crosses the upper third of the
 * viewport is the one a reader is actually looking at, and the observer does
 * that comparison off the main thread.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = '';
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      {
        // Discount the bottom 45% of the viewport so a section entering from
        // below doesn't steal "active" from the one being read.
        rootMargin: '-72px 0px -45% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
