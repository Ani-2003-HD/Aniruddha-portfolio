import { Mail, Phone, Github, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LacquerCard } from '../components/LacquerCard';
import { Reveal, MaskedText, RevealGroup, RevealItem } from '../components/Reveal';
import { Magnetic } from '../components/Magnetic';
import { profile } from '../data/content';
import { EASE } from '../lib/motion';

const LINKS = [
  { label: 'GitHub', value: 'Ani-2003-HD', href: profile.github, Icon: Github },
  { label: 'LinkedIn', value: 'Aniruddha-HD', href: profile.linkedin, Icon: Linkedin },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: Phone },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). The mailto
      // link beside this button is the always-available path, so failing
      // quietly is the right behaviour — no error state to explain.
    }
  };

  return (
    <button
      onClick={copy}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-ctl text-chrome-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.11)] transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
      aria-label={copied ? 'Email copied' : 'Copy email address'}
    >
      <motion.span
        key={copied ? 'done' : 'idle'}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="flex"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.2} />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={1.8} />
        )}
      </motion.span>
    </button>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1180px] scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
    >
      <LacquerCard className="relative overflow-hidden px-7 py-16 md:px-16 md:py-24">
        {/* A single soft light source behind the CTA — the brightest point on
            the whole page, which is where the one action worth taking sits. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(159,182,255,0.18), transparent 68%)',
          }}
        />

        <div className="relative text-center">
          <Reveal>
            <span className="eyebrow">06 — Contact</span>
          </Reveal>

          <MaskedText
            as="h2"
            text="Let's build something that ships."
            className="mx-auto mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,6.5vw,4.6rem)] font-semibold leading-[0.98] tracking-tightest balance"
          />

          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-[52ch] text-[15px] leading-relaxed text-chrome-300 md:text-base">
              I'm currently open to AI/ML engineering roles and collaborations. The fastest way
              to reach me is email — I read everything.
            </p>
          </Reveal>

          {/* Primary action */}
          <Reveal delay={0.2}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="sheen-host inline-flex items-center gap-2.5 rounded-ctl bg-white px-8 py-4 text-[14px] font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  {profile.email}
                </a>
              </Magnetic>
              <CopyEmail />
            </div>
          </Reveal>

          {/* Secondary links */}
          <RevealGroup
            delay={0.3}
            className="mx-auto mt-14 grid max-w-2xl gap-px overflow-hidden rounded-slab sm:grid-cols-3"
            gap={0.07}
            style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
          >
            {LINKS.map(({ label, value, href, Icon }) => (
              <RevealItem key={label} className="h-full">
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="matte-surface group flex h-full items-center gap-3.5 px-5 py-5 text-left"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-chrome-400" strokeWidth={1.6} />
                    <span className="min-w-0">
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-chrome-500">
                        {label}
                      </span>
                      <span className="mt-1 block truncate text-[13px] text-chrome-100">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-chrome-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      strokeWidth={2}
                    />
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </LacquerCard>
    </section>
  );
}
