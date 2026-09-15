'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const projectOrder = [
  '/projects/hktv-3pl-mms',
  '/projects/kws-keyword-search',
  '/projects/mms-design-system',
  '/projects/hktv-hotel-booking',
  '/projects/asus-veriview',
  '/projects/rog-armoury-crate-3',
  '/projects/discover-miri',
  '/projects/insiders-club',
  '/projects/revenue-investor',
  '/projects/revenue-harvest',
  '/projects/grand-margherita-hotel',
  '/projects/kuching-marathon-2016',
];

function ArrowControl({ direction, href }: { direction: 'previous' | 'next'; href?: string }) {
  const label = direction === 'previous' ? 'View previous project' : 'View next project';
  const tooltip = direction === 'previous' ? 'Previous project' : 'Next project';
  const arrow = direction === 'previous' ? '←' : '→';
  const rememberProject = () => sessionStorage.setItem('portfolio-project-return', JSON.stringify({ source: 'internal', destinationPath: href, returnPath: `${window.location.pathname}${window.location.search}${window.location.hash}`, scrollY: window.scrollY }));
  return href
    ? <Link href={`${href}?from=internal`} aria-label={label} className="case-arrow" title={tooltip} onClick={rememberProject}><span aria-hidden="true">{arrow}</span></Link>
    : <span aria-disabled="true" aria-label={`${tooltip} unavailable`} className="case-arrow case-arrow--disabled" title={`${tooltip} unavailable`}><span aria-hidden="true">{arrow}</span></span>;
}

export function ProjectNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const index = projectOrder.indexOf(pathname);
  const previous = index > 0 ? projectOrder[index - 1] : undefined;
  const next = index >= 0 && index < projectOrder.length - 1 ? projectOrder[index + 1] : undefined;
  const [returnContext, setReturnContext] = useState<{ source?: string; destinationPath?: string; returnPath?: string; scrollY?: number; year?: string; milestoneId?: string } | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('portfolio-project-return');
      setReturnContext(saved ? JSON.parse(saved) : null);
    } catch {
      setReturnContext(null);
    }
  }, []);

  const matchingContext = returnContext?.destinationPath === pathname ? returnContext : null;
  const source = searchParams.get('from') || matchingContext?.source;
  const year = searchParams.get('year') || matchingContext?.year;
  const milestoneId = searchParams.get('milestone') || matchingContext?.milestoneId;
  const safeMilestoneId = milestoneId && /^year-\d{4}(?:-[a-z0-9-]+)?$/.test(milestoneId) ? milestoneId : year && /^\d{4}$/.test(year) ? `year-${year}` : undefined;
  const internalReturn = matchingContext?.returnPath?.startsWith('/') ? matchingContext.returnPath : undefined;
  const destination = source === 'milestones' ? `/milestone${safeMilestoneId ? `#${safeMilestoneId}` : ''}` : source === 'home' ? '/' : source === 'work' ? '/projects' : source === 'internal' && internalReturn ? internalReturn : '/projects';
  const label = source === 'milestones' ? '← Back to My Milestones' : source === 'home' ? '← Back to Home' : source === 'work' ? '← Back to My Work' : source === 'internal' && internalReturn ? '← Back to previous page' : '← Back to My Work';
  const rememberScroll = () => {
    if ((source === 'home' || source === 'work') && typeof matchingContext?.scrollY === 'number') {
      sessionStorage.setItem('portfolio-scroll-restore', JSON.stringify({ path: destination, scrollY: matchingContext.scrollY }));
    }
  };
  return <><nav className="case-nav" aria-label="Project navigation" style={{ position: 'sticky', top: 0, zIndex: 30 }}>
    <Link href={destination} className="case-back" aria-label={label} onClick={rememberScroll}>{label}</Link>
    <div className="case-arrows"><ArrowControl direction="previous" href={previous} /><ArrowControl direction="next" href={next} /></div>
  </nav><BackToTop /></>;
}

export function BackToTop({ onBeforeScroll }: { onBeforeScroll?: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 360);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    onBeforeScroll?.();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <button className={`back-to-top ${visible ? 'is-visible' : ''}`} type="button" aria-label="Back to top" onClick={scrollToTop}><span aria-hidden="true">↑</span></button>;
}
