import { useRef, type PointerEvent, type ReactNode } from 'react';

interface LacquerCardProps {
  children: ReactNode;
  className?: string;
  /** Adds a subtle 3D tilt toward the cursor. Off by default — it's a strong
   *  effect, so it's reserved for the project grid. */
  tilt?: boolean;
}

const MAX_TILT_DEG = 3.4;

/**
 * A polished-black slab whose specular highlight follows the cursor.
 *
 * The highlight is driven by two CSS custom properties written straight to
 * the node on pointermove — no state, no re-render, no work on the React side
 * of the frame. `.lacquer-surface::before` in index.css consumes them.
 */
export function LacquerCard({ children, className = '', tilt = false }: LacquerCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    // Tilt is mouse-only: on touch there is no hover to end, so a tilted card
    // would stay tilted after the finger lifts.
    if (tilt && e.pointerType === 'mouse') {
      const rx = (0.5 - py) * (MAX_TILT_DEG * 2);
      const ry = (px - 0.5) * (MAX_TILT_DEG * 2);
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el && tilt) el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`lacquer-surface rounded-slab ${tilt ? 'will-change-transform' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
