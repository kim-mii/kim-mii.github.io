'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent, ReactNode } from 'react';

type ProjectSource = 'home' | 'work' | 'milestones' | 'internal';

type ProjectLinkProps = Omit<ComponentProps<typeof Link>, 'href' | 'onClick' | 'children'> & {
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
  const destination = `${href}?${query.toString()}`;

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
  };

  return <Link {...props} href={destination} onClick={rememberSource}>{children}</Link>;
}
