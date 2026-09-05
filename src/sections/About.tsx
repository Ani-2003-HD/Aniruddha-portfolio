import { Bot, Brain, Cloud, type LucideIcon } from 'lucide-react';
import { Section } from '../components/Section';
import { LacquerCard } from '../components/LacquerCard';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { about, profile } from '../data/content';

const ICONS: Record<string, LucideIcon> = { Bot, Brain, Cloud };

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="Research-grade models, production-grade delivery."
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Narrative */}
        <div>
          <Reveal>
            {/* Drop-cap opening: an editorial device that signals "this is
                worth reading" before a single word is processed. */}
            <p className="text-[17px] leading-[1.75] text-chrome-200 md:text-[19px]">
              <span className="text-chrome float-left mr-3 mt-1 font-serif text-[3.6rem] leading-[0.78]">
                {about.paragraphs[0].charAt(0)}
              </span>
              {about.paragraphs[0].slice(1)}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[15px] leading-[1.75] text-chrome-300 md:text-base">
              {about.paragraphs[1]}
            </p>
          </Reveal>

          <RevealGroup delay={0.2} className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:max-w-md">
            {[
              { label: 'Based in', value: profile.location },
              { label: 'Focus', value: 'GenAI · Agents · MLOps' },
              { label: 'Degree', value: 'B.E. AI & ML, 2025' },
              { label: 'Status', value: profile.availability },
            ].map((row) => (
              <RevealItem key={row.label}>
                <div className="border-l border-white/10 pl-4">
                  <div className="eyebrow mb-1.5">{row.label}</div>
                  <div className="text-[13.5px] text-chrome-100">{row.value}</div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Capabilities.
            One slab divided by hairlines, not three stacked cards each with a
            rounded icon tile — that arrangement is the single most reproduced
            "features" block on the web. Three separate slabs also imply these
            are three separate things, when they're three faces of one
            practice; a single panel says that, and three cards don't. */}
        <Reveal delay={0.15}>
          <LacquerCard className="h-full">
            <RevealGroup className="flex h-full flex-col justify-center" gap={0.1}>
              {about.highlights.map((h, i) => {
                const Icon = ICONS[h.icon] ?? Brain;
                return (
                  <RevealItem key={h.title}>
                    <div
                      className={`group flex items-start gap-5 px-7 py-7 md:px-8 ${
                        i > 0 ? 'border-t border-white/[0.055]' : ''
                      }`}
                    >
                      <Icon
                        className="mt-0.5 h-[19px] w-[19px] shrink-0 text-chrome-400 transition-colors duration-500 group-hover:text-white"
                        strokeWidth={1.5}
                      />
                      <div>
                        <h3 className="font-display text-[15.5px] font-medium tracking-tight text-chrome-100">
                          {h.title}
                        </h3>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-chrome-300">
                          {h.description}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </LacquerCard>
        </Reveal>
      </div>
    </Section>
  );
}
