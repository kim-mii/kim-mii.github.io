'use client';

import { useEffect } from 'react';

export function RestoreScroll({ path }: { path: string }) {
  useEffect(() => {
    const saved = sessionStorage.getItem('portfolio-scroll-restore');
    if (!saved) return;
    try {
      const state = JSON.parse(saved) as { path?: string; scrollY?: number };
      if (state.path !== path || typeof state.scrollY !== 'number') return;
      requestAnimationFrame(() => window.scrollTo({ top: state.scrollY, behavior: 'auto' }));
      sessionStorage.removeItem('portfolio-scroll-restore');
    } catch {
      sessionStorage.removeItem('portfolio-scroll-restore');
    }
  }, [path]);

  return null;
}
