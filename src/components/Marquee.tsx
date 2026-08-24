/**
 * An infinite horizontal ticker.
 *
 * The list is rendered twice and the track translates exactly -50%, which
 * lands the second copy precisely where the first started — the loop point is
 * mathematically seamless rather than eyeballed. `aria-hidden` on the
 * duplicate keeps screen readers from reading the whole list twice.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div className="mask-fade-x relative w-full overflow-hidden py-5">
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-10 font-mono text-[11px] uppercase tracking-[0.24em] text-chrome-400"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-white/25" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
