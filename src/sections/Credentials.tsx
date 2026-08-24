import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  BadgeCheck,
  ExternalLink,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '../components/Section';
import { LacquerCard } from '../components/LacquerCard';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { education, certifications } from '../data/content';
import { EASE } from '../lib/motion';

const ICONS: Record<string, LucideIcon> = { GraduationCap, BookOpen };

function CertificationRow({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  // The first specialization opens by default: an accordion where every row
  // is shut reads as empty, and the reader has to work to discover there is
  // anything inside at all.
  const [open, setOpen] = useState(index === 0);

  return (
    <RevealItem>
      <LacquerCard className="overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex w-full items-center gap-5 p-6 text-left md:p-7"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-ctl bg-white/[0.05] text-chrome-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),inset_0_-1px_0_0_rgba(0,0,0,0.7)]">
            <BadgeCheck className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-display text-[15.5px] font-medium tracking-tight text-chrome-100 md:text-[17px]">
              {cert.title}
            </span>
            <span className="mt-1 block text-[13px] text-chrome-400">{cert.issuer}</span>
          </span>

          <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome-500 sm:block">
            {cert.courses.length} courses
          </span>

          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-ctl text-chrome-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-colors duration-500 group-hover:text-white"
          >
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 md:px-7 md:pb-7">
                <div className="hairline mb-5" />
                <ol className="space-y-2.5">
                  {cert.courses.map((course, i) => (
                    <li key={course} className="flex items-start gap-3.5">
                      <span className="mt-[3px] font-mono text-[10px] text-chrome-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13.5px] leading-relaxed text-chrome-300">
                        {course}
                      </span>
                    </li>
                  ))}
                </ol>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-ctl px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.11)] transition-all duration-500 hover:bg-white hover:text-black"
                >
                  Verify credential
                  <ExternalLink className="h-3 w-3" strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LacquerCard>
    </RevealItem>
  );
}

export function Credentials() {
  return (
    <Section
      id="credentials"
      index="05"
      eyebrow="Education & Certifications"
      title="Where the fundamentals came from."
      lede="Three specializations covering the theory underneath the work — every credential below links to its public verification page."
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Education timeline */}
        <div>
          <Reveal>
            <h3 className="eyebrow mb-7">Education</h3>
          </Reveal>

          <RevealGroup className="relative" gap={0.1}>
            {/* The rail itself — a vertical hairline that the markers sit on. */}
            <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-white/18 via-white/10 to-transparent" />

            {education.map((item) => {
              const Icon = ICONS[item.icon] ?? GraduationCap;
              return (
                <RevealItem key={item.degree}>
                  <div className="relative flex gap-5 pb-9 last:pb-0">
                    <span className="relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-ctl bg-matte text-chrome-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_-1px_0_0_rgba(0,0,0,0.8)]">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </span>
                    <div className="pt-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-chrome-500">
                        {item.period}
                      </span>
                      <h4 className="mt-2 font-display text-[15px] font-medium leading-snug tracking-tight text-chrome-100">
                        {item.degree}
                      </h4>
                      <p className="mt-1.5 text-[13px] text-chrome-400">{item.school}</p>
                      {item.detail ? (
                        <span className="chip mt-3">{item.detail}</span>
                      ) : null}
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* Certifications accordion */}
        <div>
          <Reveal>
            <h3 className="eyebrow mb-7">Specializations</h3>
          </Reveal>
          <RevealGroup className="flex flex-col gap-3" gap={0.09}>
            {certifications.map((cert, i) => (
              <CertificationRow key={cert.title} cert={cert} index={i} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
