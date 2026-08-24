/**
 * The matte ground everything else sits on.
 *
 * Four fixed layers, cheapest-first, all GPU-composited and none of them
 * re-rendering on scroll:
 *   1. a wide, slow-breathing cold glow near the top (the off-screen light
 *      source the lacquer surfaces are pretending to reflect)
 *   2. a faint 88px grid, masked to fade out below the fold
 *   3. film grain, which is what stops large black areas from banding
 *   4. a vignette that pulls the eye to the centre column
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      {/* 1 — the light source */}
      <div
        className="absolute left-1/2 top-[-28vh] h-[80vh] w-[130vw] -translate-x-1/2 animate-breathe rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(159,182,255,0.13), rgba(120,140,220,0.05) 42%, transparent 70%)',
        }}
      />
      {/* a second, warmer bounce low on the page so the bottom third isn't dead */}
      <div
        className="absolute bottom-[-30vh] left-[-10vw] h-[70vh] w-[80vw] rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.05), transparent 68%)',
        }}
      />

      {/* 2 — structural grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse 90% 55% at 50% 0%, #000 20%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 55% at 50% 0%, #000 20%, transparent 78%)',
        }}
      />

      {/* 3 — grain */}
      <div className="grain absolute inset-0" />

      {/* 4 — vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 78% 62% at 50% 42%, transparent 40%, rgba(0,0,0,0.62) 100%)',
        }}
      />
    </div>
  );
}
