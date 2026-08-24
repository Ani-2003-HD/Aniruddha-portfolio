/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Matte blacks — the page ground. Deliberately warm-neutral rather
        // than blue-black so the glossy surfaces above read as "lacquer"
        // instead of "navy".
        void: '#050506',
        matte: '#0a0a0c',
        soot: '#0e0e11',
        // Shiny blacks — panel/card fills. Lighter than the ground so the
        // specular highlight has somewhere to sit.
        lacquer: '#141418',
        lacquerHi: '#1b1b21',
        // Chrome text ramp.
        chrome: {
          100: '#f7f7f8',
          200: '#d8d8dd',
          300: '#a8a8b2',
          400: '#78787f',
          500: '#4a4a52',
          600: '#2a2a30',
        },
        // The single cold accent — used only in glows, never as a fill.
        ice: '#9fb6ff',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      // Three radii, all small. The machined-panel look depends on crisp
      // edges — a large radius is what makes a dark surface read as a
      // software card rather than a physical object.
      borderRadius: {
        slab: '4px',
        ctl: '3px',
        chip: '2px',
      },
      boxShadow: {
        // Top-edge highlight + deep ambient drop = the "polished slab" look.
        lacquer:
          'inset 0 1px 0 0 rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.045), 0 24px 60px -20px rgba(0,0,0,0.9)',
        lacquerHover:
          'inset 0 1px 0 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.09), 0 32px 80px -24px rgba(0,0,0,1)',
        rim: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      },
      keyframes: {
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-14deg)' },
          '100%': { transform: 'translateX(220%) skewX(-14deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.06)' },
        },
        caret: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
        },
      },
      animation: {
        sheen: 'sheen 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
        marquee: 'marquee 38s linear infinite',
        breathe: 'breathe 9s ease-in-out infinite',
        caret: 'caret 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
