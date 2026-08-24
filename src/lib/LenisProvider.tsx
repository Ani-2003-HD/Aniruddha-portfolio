import Lenis from 'lenis';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface LenisContextValue {
  lenis: Lenis | null;
  /** Smooth-scrolls to a section id, accounting for the fixed nav height. */
  scrollTo: (id: string) => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);
  return reduced;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const frameRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Respect the OS-level preference: skip Lenis entirely so the browser
    // scrolls natively at whatever pace the user's system dictates.
    if (prefersReducedMotion) {
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      // expo-out: fast initial response, long settle. Reads as weight.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      frameRef.current = requestAnimationFrame(raf);
    };
    frameRef.current = requestAnimationFrame(raf);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, [prefersReducedMotion]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = -72;
      if (lenis) {
        lenis.scrollTo(el, { offset, duration: 1.4 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'auto' });
      }
    },
    [lenis]
  );

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useLenis(): LenisContextValue {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error('useLenis must be used within a <LenisProvider>');
  return ctx;
}
