import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { usePrefersReducedMotion } from '../lib/LenisProvider';

/**
 * Cycles through role descriptors, wiping each one up behind a mask.
 *
 * A typewriter would be the obvious choice and is exactly why this isn't one:
 * character-by-character typing on a hero line is the most common effect in
 * developer portfolios, and it leaves a half-spelled word on screen for any
 * screenshot. The masked vertical wipe reads as considered instead.
 *
 * Two details make it work, and both are easy to get wrong:
 *
 * · The outgoing and incoming words are both absolutely positioned to fill
 *   the clipping box, so a 100% translate clears it exactly. Lay them out in
 *   flow instead and 100% means 100% of the *word's* height, which is shorter
 *   than the container — leaving a sliver of the old role visible under the
 *   new one.
 * · They animate simultaneously rather than in sequence. `mode="wait"` would
 *   hold the exit before starting the enter, leaving the line visibly empty
 *   for the length of one transition on every cycle.
 *
 * An invisible sizer holds the width, since absolutely positioned children
 * can't do it themselves.
 */
export function Rotator({ items, interval = 2800 }: { items: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  const longest = useMemo(
    () => items.reduce((a, b) => (b.length > a.length ? b : a), ''),
    [items]
  );

  useEffect(() => {
    if (reduced || items.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => window.clearInterval(id);
  }, [items.length, interval, reduced]);

  return (
    <span className="relative inline-block h-[1.35em] overflow-hidden align-bottom">
      {/* Reserves the width of the longest role so the line never reflows. */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {longest}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={items[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="absolute inset-0 flex items-center whitespace-nowrap"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
