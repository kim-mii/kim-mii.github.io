'use client';

import { useEffect, useState } from 'react';
import { ProjectNavigation } from '../../components/project-navigation';

type Detail = { label: string; value: string };
type Section = { heading: string; copy: string };

const finalImageDimensions: Record<string, { width: number; height: number }> = {
  '/assets/projects/discover-miri/discover-miri-final.jpg': { width: 1400, height: 10487 },
  '/assets/projects/insiders-club/Final.jpg': { width: 1400, height: 7807 },
  '/assets/projects/kuching-marathon-2016/final.jpg': { width: 1920, height: 9022 },
  '/assets/projects/revenue-harvest/Final.jpg': { width: 1400, height: 5434 },
  '/assets/projects/revenue-investor/Final.jpg': { width: 1400, height: 5864 },
  '/assets/projects/grand-margherita-hotel/Final.jpg': { width: 1400, height: 5385 },
  '/assets/projects/rog-armoury-crate-3/rog-armoury-crate-final.jpg': { width: 1400, height: 8014 },
};

export type ProjectCaseProps = {
  title: string;
  tags: string[];
  lede: string;
  meta: Detail[];
  hero: { src: string; alt: string };
  sections: Section[];
  final: { src: string; alt: string };
  previous?: string;
  next?: string;
  experienceAreas?: string[];
};

export function ProjectCase({ title, tags, lede, sections, final, previous, next }: ProjectCaseProps) {
  const [visible, setVisible] = useState<string[]>([]);
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('.case-reveal')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const id = (entry.target as HTMLElement).dataset.reveal || '';
      if (entry.isIntersecting) setVisible((current) => current.includes(id) ? current : [...current, id]);
    }), { threshold: .08 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  const reveal = (id: string) => `case-reveal ${visible.includes(id) ? 'is-visible' : ''}`;
  const finalDimensions = finalImageDimensions[final.src];
  return <main className="case-page">
    <ProjectNavigation />
    <section className="case-intro">
      <h1>{title}</h1>
      <div className="case-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <p className="case-lede">{lede}</p>
    </section>
    <section className="case-copy-flow" aria-label={`${title} case study`}>
      {sections.map((section, index) => <article className={`${reveal(`copy-${index}`)} case-copy ${index % 3 === 1 ? 'case-copy--2' : index % 3 === 2 ? 'case-copy--3' : ''}`} data-reveal={`copy-${index}`} key={section.heading}><p className="case-number">{String(index + 1).padStart(2, '0')}</p><div><h2>{section.heading}</h2><p>{section.copy}</p></div></article>)}
    </section>
    <figure className={`${reveal('final')} case-final`} data-reveal="final"><img src={final.src} loading="lazy" alt={final.alt} width={finalDimensions?.width} height={finalDimensions?.height} /></figure>
  </main>;
}
