'use client';

import type { ComponentProps, MouseEvent, ReactNode } from 'react';

type ProjectSource = 'home' | 'work' | 'milestones' | 'internal';

type ProjectLinkProps = Omit<ComponentProps<'a'>, 'href' | 'onClick' | 'children'> & {
  href: string;
  source: ProjectSource;
  year?: string;
  milestoneId?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function ProjectLink({ href, source, year, milestoneId, children, onClick, ...props }: ProjectLinkProps) {
  const query = new URLSearchParams({ from: source });
  if (year) query.set('year', year);
  if (milestoneId) query.set('milestone', milestoneId);
  const destination = `${href.replace(/\/+$/, '')}/?${query.toString()}`;

  const rememberSource = (event: MouseEvent<HTMLAnchorElement>) => {
    sessionStorage.setItem('portfolio-project-return', JSON.stringify({
      source,
      destinationPath: href,
      returnPath: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      scrollY: window.scrollY,
      year,
      milestoneId,
    }));
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Use a normal document navigation after recording the source. This avoids
    // losing a milestone destination when a development-time hydration refresh
    // interrupts framework-managed link navigation.
    event.preventDefault();
    window.location.assign(destination);
  };

  // A native anchor keeps project destinations usable even before client hydration.
  // The URL itself contains the milestone source, while session storage augments
  // Home and My Work returns with their prior scroll position.
  return <a {...props} href={destination} onClick={rememberSource}>{children}</a>;
}
