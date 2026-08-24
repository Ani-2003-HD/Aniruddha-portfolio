import type { Variants, Transition } from 'framer-motion';

/** The house easing curve — a strong expo-out. Everything decelerates the
 *  same way, which is most of what makes a set of animations feel like one
 *  designed system rather than a pile of effects. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

/** Parent that staggers its children into view. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
});

/** The default entrance: rise + fade + a touch of defocus. The blur is what
 *  keeps it from looking like a generic fade-up — content resolves rather
 *  than simply appearing. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

/** Wipes a line of text up from behind its own clipping mask. Requires the
 *  parent to have overflow:hidden. */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.95, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/** Shared viewport config so every section triggers at the same point in the
 *  scroll — inconsistent trigger thresholds are a subtle but real source of
 *  "cheap" feel. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
