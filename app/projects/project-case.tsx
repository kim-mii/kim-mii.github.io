'use client';

import { useEffect, useState } from 'react';
import { ProjectNavigation } from '../../components/project-navigation';

type Detail = { label: string; value: string };
type Section = { heading: string; copy: string };

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
      const id = entry.target.dataset.reveal || '';
      if (entry.isIntersecting) setVisible((current) => current.includes(id) ? current : [...current, id]);
    }), { threshold: .08 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  const reveal = (id: string) => `case-reveal ${visible.includes(id) ? 'is-visible' : ''}`;
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
    <figure className={`${reveal('final')} case-final`} data-reveal="final"><img src={final.src} loading="lazy" alt={final.alt} /></figure>
  </main>;
}
