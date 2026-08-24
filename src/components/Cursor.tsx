import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/LenisProvider';

/**
 * A two-part custom cursor: a hard 5px dot that tracks the pointer exactly,
 * and a soft ring that lags behind on a spring. The lag is the whole trick —
 * it gives the pointer physical mass without hiding the real hit target.
 *
 * Mounted only on devices with a real hover-capable pointer; touch devices
 * and reduced-motion users get the native cursor untouched.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);
    // Hide the native pointer only now that the replacement is confirmed —
    // see the note on .has-custom-cursor in index.css.
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest('a, button, [data-cursor="grow"]')));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-[5px] w-[5px] rounded-full bg-white md:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden rounded-full border border-white/30 md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: active ? 46 : 28,
          height: active ? 46 : 28,
          opacity: active ? 0.85 : 0.45,
          backgroundColor: active ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
