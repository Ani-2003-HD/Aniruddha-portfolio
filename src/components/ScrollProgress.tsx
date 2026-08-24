import { motion, useScroll, useSpring } from 'framer-motion';

/** A 2px chrome filament across the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left"
    >
      <div className="h-full w-full bg-gradient-to-r from-white/25 via-white/85 to-white/25" />
    </motion.div>
  );
}
