# Aniruddha HD — Portfolio

Personal portfolio for **Aniruddha HD** — AI/ML Engineer, Generative AI, Agentic Systems & MLOps.
React + TypeScript + Vite + Tailwind, deployed to GitHub Pages.

**Live:** https://ani-2003-hd.github.io/Aniruddha-portfolio/

---

## The design system: Obsidian

Everything on the page is one of two materials, and the contrast between them
is the entire visual identity.

| | **Matte** | **Lacquer** |
|---|---|---|
| Role | the page ground | every raised surface |
| Fill | flat `#050506`, film-grained | four-stop vertical ramp, `#15151b → #0d0d11 → #08080b → #101015` |
| Light | absorbs it | 1px top-edge highlight **only**, dark bottom edge, a fixed strip-light reflection, and a specular hotspot that tracks the cursor |
| Where | `<body>`, `Backdrop.tsx` | `.lacquer-surface` / `LacquerCard.tsx` |

The palette carries almost no hue on purpose. Colour appears in one place — a
cold `--ice` glow behind the hero and the contact CTA — and never as a fill.
Headings use a chrome gradient (`.text-chrome`): bright at the cap height,
falling to graphite at the baseline, the way a milled surface reads under a
soft box.

**Why it doesn't look like a glass card.** Three decisions do the work, and
undoing any one of them puts the glassmorphism back: no perimeter hairline
(light comes from above, so only the top edge catches it and the bottom edge
falls into shadow); a near-square 4px radius, because piano-black objects have
crisp edges; and a four-stop gradient whose slight lift at the very bottom
reads as light bouncing back off the surface underneath. Small radii are
tokenised as `rounded-slab` / `rounded-ctl` / `rounded-chip`.

**One rule that is load-bearing:** `background-clip: text` is cancelled by *any*
transform on a descendant — including `translateY(0%)`, which is what an
animation settles on. So the chrome gradient must sit on the element that
actually moves, never on an ancestor of it. Put it on a heading whose words
animate and every word renders `color: transparent`, i.e. invisible. This is
why `MaskedText` takes a `fill` class and applies it per word.

### Type

| Role | Face | Used for |
|---|---|---|
| Display | Sora | headings, name, figures |
| Body | Inter | paragraphs, UI |
| Accent | Instrument Serif *italic* | the one editorial line in the hero |
| Mono | JetBrains Mono | eyebrows, metadata, pills, counters |

### Motion

One easing curve everywhere — `cubic-bezier(0.22, 1, 0.36, 1)`, a strong
expo-out — exported as `EASE` from `src/lib/motion.ts`. A shared curve is most
of what makes a set of effects read as one designed system rather than a pile
of animations.

Lenis drives scroll easing; Framer Motion drives entrances. Every reveal
combines rise + fade + a short blur, so content *resolves* rather than simply
appearing. `prefers-reduced-motion` disables Lenis entirely, kills the
decorative loops, and short-circuits the count-up.

---

## Structure

```
src/
  App.tsx                   section order, fixed chrome
  main.tsx                  entry (LenisProvider → App)
  index.css                 design tokens, materials, utilities
  data/content.ts           ← single source of truth for ALL page content
  lib/
    LenisProvider.tsx       smooth scroll + scrollTo(id) + reduced-motion
    motion.ts               EASE, shared variants, viewport config
  hooks/
    useActiveSection.ts     IntersectionObserver scroll-spy
  components/
    Backdrop.tsx            matte ground: glow, grid, grain, vignette
    LacquerCard.tsx         glossy slab, cursor-tracked highlight, tilt
    Nav.tsx                 full-bleed masthead + mobile sheet + SectionRail
    Section.tsx             the shared section shell every section uses
    Reveal.tsx              Reveal / RevealGroup / RevealItem / MaskedText
    Magnetic.tsx            buttons that lean toward the cursor
    Cursor.tsx              dot + lagging ring (fine pointers only)
    ScrollProgress.tsx      chrome filament across the top
    Marquee.tsx             seamless tech ticker
    CountUp.tsx             rAF count-up, fires once on enter
    Rotator.tsx             masked role rotator
  sections/
    Hero · About · Experience · Projects · Skills · Credentials · Contact · Footer
```

### Editing content

`src/data/content.ts` is the only file to touch for a new project, a changed
title, an added skill or a new certification. No JSX edits required. The nav,
the section rail, the scroll-spy and the ticker all derive from it.

The hero stat strip deliberately carries no project count — the Work section
argues better than a tally does. The figures it does show are all stated
elsewhere on the page: the internship duration and accuracy gain come from
`experience`, and `3` specializations / `11` certified courses are the lengths
of the `certifications` array and its courses. Adding a certification means
bumping `stats` to match.

---

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run preview
npm run deploy     # gh-pages -d dist
```

`vite.config.ts` sets `base: '/Aniruddha-portfolio/'` to match the GitHub Pages
repo name. If the repo is ever renamed, this must change with it — a mismatched
base is the number one cause of a blank deployed page.

### One-time cleanup

Three groups of files are on disk but unused: the previous three.js "cosmic
canvas" layer, the original Create React App scaffolding, and the résumé build
artefacts (the résumé now lives in Google Drive). Nothing imports them, Vite
doesn't bundle them, and `tsconfig.json` excludes the TypeScript ones from
type-checking, so the build is green as-is.

```bash
bash scripts/cleanup.sh
npm run build                                    # confirm still green
git add -A && git commit -m "Remove unused files"
```

Then delete the `exclude` block from `tsconfig.json` and the script itself.

One of those files is worth calling out: `public/index.html` is the CRA page
template. Vite generates `dist/index.html` from the `index.html` at the repo
root and then copies `public/` over the top of it, so leaving that file in
place risks deploying the empty CRA shell instead of the real page.
