import { useLayoutEffect, useState } from 'react';

export default function useScrollEvent() {
  const [scrollPassed, setScrollPassed] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.scrollingElement || document.documentElement;

    let rafId: number | null = null;

    const measure = () => {
      const y = root.scrollTop;
      const vh = window.innerHeight;
      const sh = root.scrollHeight;

      setScrollY(y);
      setScrollHeight(sh);

      const denom = Math.max(sh - vh, 1); // avoid /0
      const pct = (y / denom) * 100;
      setScrollPassed(Math.min(100, Math.max(0, pct)));
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        measure();
      });
    };

    const ro = new ResizeObserver(() => {
      // Content/layout changed; recompute once.
      onScroll();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    ro.observe(root);

    queueMicrotask(onScroll);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return {
    scrollPassed,
    scrollY,
    scrollHeight,
  };
}

/**
 * Returns whether the page is scrolled at least `threshold` pixels.
 * Only re-renders when the threshold is crossed.
 */
export function useScrollThreshold(threshold: number) {
  const [passed, setPassed] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.scrollingElement || document.documentElement;
    let rafId: number | null = null;

    const measure = () => {
      rafId = null;
      setPassed(root.scrollTop >= threshold);
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    queueMicrotask(onScroll);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);

  return passed;
}
