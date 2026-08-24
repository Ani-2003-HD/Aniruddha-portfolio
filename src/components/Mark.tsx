/**
 * The AHD monogram.
 *
 * A solid "A" cut rather than typeset, on a 32-unit grid:
 *
 *   · FLAT APEX — the point is chamfered off, the same cut edge the slabs and
 *     chips use. It's what keeps the mark from reading as a font's capital A.
 *     (A *gap* at the apex was tried first and looked like a rendering defect
 *     at 16px; a chamfer reads as intent at every size.)
 *   · OPEN WEDGE between the legs. Without it a solid A is just a triangle
 *     with a hole in it and reads as a delta symbol, not a letter.
 *   · WIDE STANCE, heavy strokes — enough mass to survive downsampling into a
 *     16px favicon, which is the size that kills most monograms.
 *
 * `fill-rule="evenodd"` punches the counter out of the same path, so this one
 * shape works on a dark plate (the favicon) and on transparent (here).
 * `currentColor` means it inherits text colour and needs no variants.
 *
 * The identical geometry generates public/favicon.*, the touch icon and the
 * PWA icons, so nothing can drift out of sync.
 */
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M13.2 2.5 L18.8 2.5 L30.0 29.5 L26.8 29.5 L16.0 23.0 L5.2 29.5 L2.0 29.5 Z M16.0 10.8 L20.7 19.0 L11.3 19.0 Z"
      />
    </svg>
  );
}
