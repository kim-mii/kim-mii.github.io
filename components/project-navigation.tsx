'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from './translation';
import { LanguageSwitcher } from './site-header';

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

type ReturnContext = {
  source?: string;
  destinationPath?: string;
  returnPath?: string;
  scrollY?: number;
  year?: string;
  milestoneId?: string;
};

function staticRoute(path: string) {
  const [pathWithQuery, hash = ''] = path.split('#', 2);
  const [pathname, query = ''] = pathWithQuery.split('?', 2);
  const normalizedPath = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  return `${normalizedPath}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

function ArrowControl({ direction, href, source, year, milestoneId, returnContext, label, tooltip, unavailableLabel }: {
  direction: 'previous' | 'next';
  href?: string;
  source?: string;
  year?: string;
  milestoneId?: string;
  returnContext: ReturnContext | null;
  label: string;
  tooltip: string;
  unavailableLabel: string;
}) {
  const arrow = direction === 'previous' ? '←' : '→';
  const originalSource = source === 'home' || source === 'work' || source === 'milestones' ? source : 'work';
  const query = new URLSearchParams({ from: originalSource });
  if (year) query.set('year', year);
  if (milestoneId) query.set('milestone', milestoneId);
  const rememberProject = () => sessionStorage.setItem('portfolio-project-return', JSON.stringify({
    source: originalSource,
    destinationPath: href,
    returnPath: returnContext?.returnPath || `${window.location.pathname}${window.location.search}${window.location.hash}`,
    scrollY: returnContext?.scrollY ?? window.scrollY,
    year: returnContext?.year || year,
    milestoneId: returnContext?.milestoneId || milestoneId,
  }));
  return href
    ? <a href={staticRoute(`${href}?${query.toString()}`)} aria-label={label} className="case-arrow" title={tooltip} onClick={rememberProject}><span aria-hidden="true">{arrow}</span></a>
    : <span aria-disabled="true" aria-label={unavailableLabel} className="case-arrow case-arrow--disabled" title={unavailableLabel}><span aria-hidden="true">{arrow}</span></span>;
}

export function ProjectNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // GitHub Pages serves exported routes with a trailing slash. Normalize the
  // browser path before matching it against the portfolio's canonical order.
  const canonicalPathname = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const index = projectOrder.indexOf(canonicalPathname);
  const previous = index > 0 ? projectOrder[index - 1] : undefined;
  const next = index >= 0 && index < projectOrder.length - 1 ? projectOrder[index + 1] : undefined;
  const [returnContext, setReturnContext] = useState<ReturnContext | null>(null);
  const [navigationReady, setNavigationReady] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('portfolio-project-return');
      setReturnContext(saved ? JSON.parse(saved) : null);
    } catch {
      setReturnContext(null);
    }
    setNavigationReady(true);
  }, []);

  const matchingContext = returnContext?.destinationPath === canonicalPathname ? returnContext : null;
  const inheritedContext = (() => {
    if (!matchingContext?.returnPath) return null;
    try { return new URL(matchingContext.returnPath, 'https://portfolio.local').searchParams; } catch { return null; }
  })();
  const requestedSource = searchParams.get('from') || matchingContext?.source;
  const source = requestedSource === 'internal' ? inheritedContext?.get('from') || 'work' : requestedSource || 'work';
  const year = searchParams.get('year') || matchingContext?.year || inheritedContext?.get('year') || undefined;
  const milestoneId = searchParams.get('milestone') || matchingContext?.milestoneId || inheritedContext?.get('milestone') || undefined;
  const safeMilestoneId = milestoneId && /^year-\d{4}(?:-[a-z0-9-]+)?$/.test(milestoneId) ? milestoneId : year && /^\d{4}$/.test(year) ? `year-${year}` : undefined;
  const internalReturn = matchingContext?.returnPath?.startsWith('/') ? matchingContext.returnPath : undefined;
  const destination = source === 'milestones' ? `/milestone${safeMilestoneId ? `#${safeMilestoneId}` : ''}` : source === 'home' ? '/' : source === 'work' ? '/projects' : source === 'internal' && internalReturn ? internalReturn : '/projects';
  const resolvedLabel = source === 'milestones' ? t('back.milestones', '← Back to My Milestones') : source === 'home' ? t('back.home', '← Back to Home') : source === 'work' ? t('back.work', '← Back to My Work') : source === 'internal' && internalReturn ? t('back.previous', '← Back to previous page') : t('back.work', '← Back to My Work');
  // A static export cannot read the query string during its first render. Keep
  // that first frame neutral until the browser has resolved the real source.
  const label = navigationReady ? resolvedLabel : '← Back';
  const rememberScroll = () => {
    if ((source === 'home' || source === 'work') && typeof matchingContext?.scrollY === 'number') {
      sessionStorage.setItem('portfolio-scroll-restore', JSON.stringify({ path: destination, scrollY: matchingContext.scrollY }));
    }
  };
  return <><nav className="case-nav" aria-label="Project navigation" style={{ position: 'sticky', top: 0, zIndex: 30 }}>
    <a href={staticRoute(destination)} className={`case-back ${navigationReady ? '' : 'case-back--pending'}`} aria-label={label} tabIndex={navigationReady ? undefined : -1} onClick={rememberScroll}>{label}</a>
    <div className="case-arrows"><LanguageSwitcher /><ArrowControl direction="previous" href={previous} source={source} year={year} milestoneId={milestoneId} returnContext={matchingContext} label={t('project.previous', 'View previous project')} tooltip={t('project.previous', 'Previous project')} unavailableLabel={t('project.previousUnavailable', 'Previous project unavailable')} /><ArrowControl direction="next" href={next} source={source} year={year} milestoneId={milestoneId} returnContext={matchingContext} label={t('project.next', 'View next project')} tooltip={t('project.next', 'Next project')} unavailableLabel={t('project.nextUnavailable', 'Next project unavailable')} /></div>
  </nav><BackToTop /></>;
}

export function BackToTop({ onBeforeScroll }: { onBeforeScroll?: () => void }) {
  const [visible, setVisible] = useState(false);
  const t = useTranslation();

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
  return <button className={`back-to-top ${visible ? 'is-visible' : ''}`} type="button" aria-label={t('back.top', 'Back to top')} onClick={scrollToTop}><span aria-hidden="true">↑</span></button>;
}
