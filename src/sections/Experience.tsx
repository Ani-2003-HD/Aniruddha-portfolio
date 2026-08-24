import { MapPin, ArrowRight } from 'lucide-react';
import { Section } from '../components/Section';
import { LacquerCard } from '../components/LacquerCard';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { experience } from '../data/content';

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Where the models met real users."
    >
      <Reveal>
        <LacquerCard className="overflow-hidden p-7 md:p-10">
          {/* Header row */}
          <div className="flex flex-col gap-5 border-b border-white/[0.07] pb-7 md:flex-row md:items-start md:justify-between">
            {/* No icon tile before the title. There is exactly one role here,
                so a marker distinguishes it from nothing — it was decoration
                standing where the eye should land first. */}
            <div>
              <h3 className="text-chrome font-display text-xl font-semibold tracking-tight md:text-2xl">
                {experience.title}
              </h3>
              <p className="mt-1.5 text-[14px] text-chrome-300">{experience.company}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-chrome-500">
                <MapPin className="h-3 w-3" strokeWidth={1.8} />
                {experience.location}
              </p>
            </div>

            <span className="shrink-0 self-start rounded-chip border-l border-white/30 bg-white/[0.04] py-2 pl-3.5 pr-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-chrome-200">
              {experience.duration}
            </span>
          </div>

          <Reveal delay={0.08}>
            <p className="mt-7 max-w-[62ch] text-[15px] leading-relaxed text-chrome-200">
              {experience.summary}
            </p>
          </Reveal>

          <RevealGroup delay={0.12} className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {experience.achievements.map((item) => (
              <RevealItem key={item}>
                <div className="flex items-start gap-3">
                  <ArrowRight
                    className="mt-[5px] h-3.5 w-3.5 shrink-0 text-chrome-500"
                    strokeWidth={2}
                  />
                  <span className="text-[14px] leading-relaxed text-chrome-300">{item}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-9 flex flex-wrap gap-2">
            {experience.stack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        </LacquerCard>
      </Reveal>
    </Section>
  );
}
