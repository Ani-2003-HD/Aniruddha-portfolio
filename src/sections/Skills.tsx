import {
  Bot,
  Brain,
  Layers,
  Terminal,
  GitBranch,
  Database,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '../components/Section';
import { LacquerCard } from '../components/LacquerCard';
import { RevealGroup, RevealItem } from '../components/Reveal';
import { Marquee } from '../components/Marquee';
import { skills, skillCategoryMeta, techTicker } from '../data/content';

const ICONS: Record<string, LucideIcon> = { Bot, Brain, Layers, Terminal, GitBranch, Database };

export function Skills() {
  const categories = Object.keys(skills);

  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Toolkit"
      title="The stack I reach for."
      lede="Grouped by what they're for rather than by how impressive the list looks."
    >
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {categories.map((key) => {
          const meta = skillCategoryMeta[key];
          const Icon = ICONS[meta?.icon ?? 'Layers'] ?? Layers;
          return (
            <RevealItem key={key} className="h-full">
              <LacquerCard className="group flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-ctl bg-white/[0.05] text-chrome-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),inset_0_-1px_0_0_rgba(0,0,0,0.7)] transition-colors duration-500 group-hover:bg-white/[0.1]">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-[14.5px] font-medium tracking-tight text-chrome-100">
                    {meta?.label ?? key}
                  </h3>
                  <span className="ml-auto font-mono text-[10px] text-chrome-500">
                    {String(skills[key].length).padStart(2, '0')}
                  </span>
                </div>

                <div className="hairline my-5" />

                <div className="flex flex-wrap gap-1.5">
                  {skills[key].map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </LacquerCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Ticker: a moving element low in a long page is a cheap, effective way
          to signal the page is still alive as the reader scrolls. */}
      <div className="mt-14 overflow-hidden rounded-slab bg-white/[0.015] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]">
        <Marquee items={techTicker} />
      </div>
    </Section>
  );
}
