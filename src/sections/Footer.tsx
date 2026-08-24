import { ArrowUp } from 'lucide-react';
import { profile } from '../data/content';
import { useLenis } from '../lib/LenisProvider';

export function Footer() {
  const { scrollTo } = useLenis();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-auto w-full max-w-[1180px] px-6 pb-12 md:px-10">
      <div className="hairline mb-8" />
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-[13px] font-medium tracking-tight text-chrome-200">
            {profile.name}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome-500">
            © {year} — {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-chrome-400 transition-colors hover:text-white"
          >
            Résumé (PDF)
          </a>
          <button
            onClick={() => scrollTo('hero')}
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-ctl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.11)] transition-all duration-500 group-hover:bg-white group-hover:text-black">
              <ArrowUp className="h-3 w-3" strokeWidth={2.2} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
