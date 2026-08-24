import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { profile, stats } from '../data/content';
import { EASE } from '../lib/motion';
import { Magnetic } from '../components/Magnetic';
import { CountUp } from '../components/CountUp';
import { Rotator } from '../components/Rotator';
import { useLenis } from '../lib/LenisProvider';

/**
 * One line of the name, wiped up from behind its own mask on page load
 * (not on scroll — the hero is already in view).
 *
 * `text-chrome` sits on the moving span, never on the <h1>: an ancestor's
 * `background-clip: text` is cancelled by any transform on a descendant, so a
 * gradient set on the heading would leave these lines transparent. See the
 * note on MaskedText in components/Reveal.tsx.
 */
function NameLine({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className="text-chrome block"
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { scrollTo } = useLenis();
  const ref = useRef<HTMLElement>(null);

  // Parallax: the hero content drifts up slightly slower than the page and
  // fades as it leaves, so the section below feels like it slides over the
  // top rather than simply following it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center px-6 pb-20 pt-28 md:px-10"
    >
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[1180px]">
        {/* Availability chip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mb-7 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-chip border-l border-white/25 bg-white/[0.035] py-1.5 pl-2.5 pr-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-300">
              {profile.availability}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-500">
            <MapPin className="h-3 w-3" strokeWidth={1.8} />
            {profile.location}
          </span>
        </motion.div>

        {/* Name */}
        {/* Sized to land the stat strip at the fold on a 900px-tall laptop —
            visible enough to register, cut off enough to invite the scroll. */}
        <h1 className="font-display text-[clamp(2.9rem,9.5vw,7.6rem)] font-semibold leading-[0.9] tracking-tightest">
          <NameLine delay={0.3}>Aniruddha</NameLine>
          <span className="flex flex-wrap items-baseline gap-x-[0.22em]">
            <NameLine delay={0.4}>HD</NameLine>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.75 }}
              className="text-chrome-dim font-serif text-[clamp(1.05rem,3.1vw,2.3rem)] font-normal italic leading-none tracking-normal"
            >
              — building intelligence that ships
            </motion.span>
          </span>
        </h1>

        {/* Role rotator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="mt-6 flex items-center gap-3 font-display text-[clamp(1rem,2.4vw,1.5rem)] font-light text-chrome-200"
        >
          <span className="h-px w-10 bg-white/25 md:w-16" />
          <Rotator items={[...profile.role]} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: 0.95 }}
          className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-chrome-300 md:text-[16.5px]"
        >
          {profile.tagline}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.08 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <button
              onClick={() => scrollTo('work')}
              className="sheen-host inline-flex items-center gap-2 rounded-ctl bg-white px-7 py-3.5 text-[13.5px] font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
            >
              View selected work
              <ArrowDown className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </Magnetic>

          <Magnetic>
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-ctl px-7 py-3.5 text-[13.5px] font-medium text-chrome-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-all duration-300 hover:bg-white/[0.05] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]"
            >
              Download résumé
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
          </Magnetic>

          <div className="ml-1 flex items-center gap-1.5">
            {[
              { href: profile.github, Icon: Github, label: 'GitHub' },
              { href: profile.linkedin, Icon: Linkedin, label: 'LinkedIn' },
            ].map(({ href, Icon, label }) => (
              <Magnetic key={label} strength={0.4}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-ctl text-chrome-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        {/* Stat strip */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.25 }}
          className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-slab sm:grid-cols-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          {stats.map((s) => (
            // flex-col-reverse keeps <dt> before <dd> in the DOM — which is
            // what a definition list requires and what assistive tech reads —
            // while showing the figure above its label.
            <div
              key={s.label}
              className="flex flex-col-reverse bg-void/85 px-5 py-6 backdrop-blur-sm"
            >
              <dt className="mt-2.5 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.18em] text-chrome-500">
                {s.label}
              </dt>
              <dd className="text-chrome font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold leading-none tracking-tight">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-chrome-500 transition-colors group-hover:text-chrome-300">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent to-white/85"
            animate={{ y: ['-100%', '260%'] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  );
}
