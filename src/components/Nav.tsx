import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLenis } from '../lib/LenisProvider';
import { useActiveSection } from '../hooks/useActiveSection';
import { Mark } from './Mark';
import { NAV_ITEMS, profile } from '../data/content';
import { EASE } from '../lib/motion';

const IDS = NAV_ITEMS.map((i) => i.id);

/**
 * A masthead, not a floating capsule.
 *
 * The rounded, blurred, translucent pill hovering below the top edge is the
 * most recognisable navigation cliché on the web right now, so this is built
 * on the opposite premise: the header is part of the page's own matte ground,
 * not a pane of glass sitting above it. It spans the full width, sits flush
 * against the top edge, and is bounded by a single hairline rule rather than
 * a container.
 *
 * On scroll it doesn't grow a panel — it just becomes opaque and tightens by
 * 12px, the way a print masthead compresses into a running head.
 */
export function Nav() {
  const { scrollTo } = useLenis();
  const active = useActiveSection(IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the sheet's exit animation start before the scroll takes over.
    window.setTimeout(() => scrollTo(id), open ? 180 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${
          scrolled ? 'bg-void/[0.92] backdrop-blur-[2px]' : 'bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 transition-[height] duration-500 md:px-10 ${
            scrolled ? 'h-14' : 'h-[68px]'
          }`}
        >
          {/* Lockup: the mark stands on its own ground, no plate behind it.
              A letter inside a filled square is the container this design
              spent its whole material system getting rid of. */}
          <button
            onClick={() => go('hero')}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <Mark className="h-[19px] w-[19px] text-chrome-100 transition-colors duration-300 group-hover:text-white" />
            <span className="hidden font-display text-[13px] font-medium tracking-tight text-chrome-200 transition-colors group-hover:text-white sm:block">
              Aniruddha HD
            </span>
          </button>

          {/* Desktop links — the active marker is a rule that slides along the
              baseline, not a pill that slides behind the label. */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Sections">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`relative py-1.5 text-[12.5px] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-chrome-400 hover:text-chrome-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-px left-0 right-0 h-px bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="sheen-host hidden items-center gap-1.5 rounded-ctl bg-white px-4 py-[7px] text-[12.5px] font-medium text-black transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Résumé
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </a>

            {/* Two rules, not a hamburger glyph — quieter, and it animates
                into an X without swapping icons. */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative flex h-8 w-7 flex-col items-end justify-center gap-[6px] lg:hidden"
            >
              <motion.span
                className="block h-px w-6 bg-chrome-100"
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.span
                className="block h-px bg-chrome-100"
                animate={open ? { rotate: -45, y: -3.5, width: 24 } : { rotate: 0, y: 0, width: 16 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </button>
          </div>
        </div>

        {/* The masthead's only boundary. Fades in with the background so the
            header never looks like a detached bar at the top of the hero. */}
        <div
          className={`rule transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        />
      </motion.header>

      {/* Mobile sheet — solid matte, no blur. Blur over a solid ground buys
          nothing but the glass look this design is avoiding. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[65] bg-void lg:hidden"
          >
            <div className="grain absolute inset-0" />
            <div className="relative flex h-full flex-col justify-center px-7">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.55, ease: EASE }}
                  onClick={() => go(item.id)}
                  className="group flex items-baseline gap-5 border-b border-white/[0.07] py-4 text-left"
                >
                  <span className="font-mono text-[10px] text-chrome-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[26px] font-medium tracking-tight text-chrome-200 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55, ease: EASE }}
                href={profile.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-ctl bg-white px-6 py-3.5 text-sm font-medium text-black"
              >
                Download résumé
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Fixed section index down the right edge on large screens. */
export function SectionRail() {
  const { scrollTo } = useLenis();
  const active = useActiveSection(IDS);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-7 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-3.5 xl:flex"
    >
      {NAV_ITEMS.map((item, i) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group flex items-center justify-end gap-3"
            aria-label={item.label}
          >
            <span
              className={`font-mono text-[9.5px] uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? 'text-chrome-200 opacity-100'
                  : 'text-chrome-500 opacity-0 group-hover:opacity-100'
              }`}
            >
              {String(i + 1).padStart(2, '0')} {item.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                isActive
                  ? 'w-7 bg-white'
                  : 'w-3.5 bg-white/25 group-hover:w-5 group-hover:bg-white/60'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
