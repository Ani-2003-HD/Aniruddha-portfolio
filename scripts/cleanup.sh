#!/usr/bin/env bash
# One-time cleanup of files this project no longer uses.
#
# Three groups, all verified unreferenced before being listed here:
#
#   1. The pre-Obsidian three.js "cosmic canvas" layer.
#   2. The original Create React App scaffolding.
#   3. Résumé build artefacts — the résumé now lives in Google Drive, so the
#      local PDFs, the HTML résumé they were generated from, and the
#      Puppeteer script that generated them are all dead weight.
#
# Some of these are tracked by git and some never were; `rm` handles both,
# since git records the deletion of a tracked file on the next commit.
#
#   bash scripts/cleanup.sh
#   npm run build          # confirm still green
#   git add -A && git commit -m "Remove unused files"
#
set -euo pipefail
cd "$(dirname "$0")/.."

FILES=(
  # ── 1. Superseded 3D / cosmic layer ──────────────────────────────────
  src/components/CosmicCanvas.tsx
  src/components/Starfield.tsx
  src/components/starfieldData.ts
  src/components/Planet.tsx
  src/components/HudPanel.tsx
  src/components/FloatingParticles.tsx
  src/components/GlowCard.tsx
  src/components/TypewriterEffect.tsx
  src/components/RevealSection.tsx
  src/components/SectionHeading.tsx
  src/components/icons.ts
  src/lib/proceduralTextures.ts
  src/hooks/useScrollFractionRef.ts
  src/hooks/useScrollRoute.ts

  # Sections merged into the current Credentials section
  src/sections/Certifications.tsx
  src/sections/Education.tsx

  # ── 2. Create React App scaffolding ──────────────────────────────────
  src/Portfolio.tsx
  src/App.css
  src/App.test.tsx
  src/index.tsx
  src/logo.svg
  src/react-app-env.d.ts
  src/reportWebVitals.ts
  src/setupTests.ts

  # public/index.html is the CRA page template. Vite generates dist/index.html
  # from the index.html at the repo root and then copies public/ over the top
  # of it — so leaving this here risks the deployed site being the empty CRA
  # shell instead of the real page.
  public/index.html

  # The React-atom logos that shipped with Create React App. Until now these
  # were the site's actual favicon and touch icon — the browser tab was
  # showing React's logo, not Aniruddha's.
  public/logo192.png
  public/logo512.png

  # ── 3. Résumé build artefacts ────────────────────────────────────────
  # generate-pdf.js rendered public/resume.html to a PDF with Puppeteer. It
  # cannot run any more regardless: puppeteer is not a dependency, and it uses
  # CommonJS `require` in a package marked "type": "module".
  scripts/generate-pdf.js
  public/resume.html
  public/Aniruddha_HD_Resume.pdf
  public/Aniruddha_HD_Main_Resume.pdf

  # Superseded by this script.
  scripts/cleanup-legacy.sh
)

DIRS=(
  build          # stale Create React App output
)

removed=0
for f in "${FILES[@]}"; do
  if [ -e "$f" ]; then
    rm -f "$f"
    echo "removed  $f"
    removed=$((removed + 1))
  fi
done

for d in "${DIRS[@]}"; do
  if [ -d "$d" ]; then
    rm -rf "$d"
    echo "removed  $d/"
    removed=$((removed + 1))
  fi
done

# .DS_Store files are now gitignored, but the ones already on disk still sit
# in the working tree until something deletes them.
while IFS= read -r f; do
  rm -f "$f"
  echo "removed  $f"
  removed=$((removed + 1))
done < <(find . -name '.DS_Store' -not -path './node_modules/*' -not -path './.git/*')

echo
echo "$removed item(s) removed."
echo "Next:  npm run build   then   git add -A && git commit -m 'Remove unused files'"
