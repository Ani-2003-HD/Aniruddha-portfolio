import type { ReactNode } from 'react';
import { Reveal, MaskedText, DrawLine } from './Reveal';

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
  className?: string;
}

/**
 * The one layout every content section uses.
 *
 * A shared shell matters more than it looks: identical max-width, identical
 * vertical rhythm, identical heading treatment and identical reveal timing
 * are what make eight different sections read as one document.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-[1180px] scroll-mt-24 px-6 py-24 md:px-10 md:py-32 ${className}`}
    >
      <header className="mb-14 md:mb-20">
        <Reveal className="mb-5 flex items-baseline gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-chrome-500">{index}</span>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>

        <MaskedText
          as="h2"
          text={title}
          className="font-display text-[clamp(2.1rem,5.4vw,3.9rem)] font-semibold leading-[1.03] tracking-tightest balance"
        />

        {lede ? (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-chrome-300 md:text-base">
              {lede}
            </p>
          </Reveal>
        ) : null}

        <DrawLine className="mt-10" />
      </header>

      {children}
    </section>
  );
}
