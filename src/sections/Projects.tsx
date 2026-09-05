import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Github, ArrowUpRight } from 'lucide-react';
import { Section } from '../components/Section';
import { LacquerCard } from '../components/LacquerCard';
import { RevealGroup, RevealItem, Reveal } from '../components/Reveal';
import { projects, profile, type Project } from '../data/content';
import { EASE } from '../lib/motion';

// Column spans for the 12-track grid. The two featured cards split the first
// row unevenly (7/5) rather than 6/6 — a deliberate asymmetry, because a
// perfectly halved row reads as a template while an off-balance one reads as
// a layout somebody made on purpose. Everything below sits on a calm 6/6.
const SPAN = ['lg:col-span-7', 'lg:col-span-5'];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const featured = Boolean(project.featured);

  return (
    <RevealItem className={featured ? SPAN[index] ?? 'lg:col-span-6' : 'lg:col-span-6'}>
      <LacquerCard tilt className="flex h-full flex-col p-6 md:p-8">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-500">
            {String(index + 1).padStart(2, '0')} / {project.category}
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-chrome-500">
            {project.year}
          </span>
        </div>

        <h3
          className={`text-chrome mt-5 font-display font-semibold leading-[1.12] tracking-tight ${
            featured ? 'text-[clamp(1.4rem,2.6vw,2rem)]' : 'text-[1.25rem]'
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-3 text-[14px] leading-relaxed text-chrome-300">{project.blurb}</p>

        {/* Expandable body.
            Animating height:auto is the correct approach here rather than a
            fixed max-height guess — Framer measures the content, so a long
            highlight list and a short one both settle exactly. */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pt-5">
                <div className="hairline mb-5" />
                <p className="text-[13.5px] leading-relaxed text-chrome-300">
                  {project.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/45" />
                      <span className="text-[13px] leading-relaxed text-chrome-300">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech + toggle */}
        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-1.5">
            {(open ? project.tech : project.tech.slice(0, featured ? 5 : 4)).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            {!open && project.tech.length > (featured ? 5 : 4) && (
              <span className="chip">+{project.tech.length - (featured ? 5 : 4)}</span>
            )}
          </div>

          {/* Code link sits ABOVE the expander, on its own rule: an engineer
              scanning for source shouldn't have to open a card to find out
              whether there is any. Rendered only when `repo` is set — see the
              note on that field in data/content.ts. */}
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="group/code mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5"
            >
              <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-chrome-200 transition-colors group-hover/code:text-white">
                <Github className="h-3.5 w-3.5" strokeWidth={1.7} />
                View code
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-chrome-400 transition-all duration-300 group-hover/code:-translate-y-0.5 group-hover/code:translate-x-0.5 group-hover/code:text-white"
                strokeWidth={2}
              />
            </a>
          ) : null}

          <button
            onClick={() => setOpen((v) => !v)}
            className={`group/btn flex w-full items-center justify-between border-t border-white/[0.07] pt-5 text-left ${
              project.repo ? 'mt-5' : 'mt-6'
            }`}
            aria-expanded={open}
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-chrome-300 transition-colors group-hover/btn:text-white">
              {open ? 'Close' : 'Read the detail'}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-ctl text-chrome-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover/btn:bg-white group-hover/btn:text-black">
              <motion.span
                animate={{ rotate: open ? 135 : 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              </motion.span>
            </span>
          </button>
        </div>
      </LacquerCard>
    </RevealItem>
  );
}

export function Projects() {
  return (
    <Section
      id="work"
      index="03"
      eyebrow="Selected work"
      title="What I've built end to end."
      lede="Benchmarks with findings, and systems that run end to end — not notebooks. Open any card for the architecture and the decisions behind it; where the code is public, the repo is one click from the card."
    >
      <RevealGroup className="grid gap-4 md:gap-5 lg:grid-cols-12" gap={0.09}>
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <div className="mt-12 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-ctl px-6 py-3.5 text-[13.5px] text-chrome-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:bg-white/[0.05] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.24)]"
          >
            <Github className="h-4 w-4" strokeWidth={1.7} />
            More on GitHub
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
