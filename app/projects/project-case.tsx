'use client';

import { useEffect, useState } from 'react';
import { ProjectNavigation } from '../../components/project-navigation';
import { useTranslation } from '../../components/translation';

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
  seo?: { title: string; description: string };
};

export function ProjectCase({ title, tags, lede, sections, final, previous, next, seo }: ProjectCaseProps) {
  const t = useTranslation();
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
  useEffect(() => {
    if (!seo) return;
    const localizedTitle = t(`project.${title}.seo.title`, seo.title);
    const localizedDescription = t(`project.${title}.seo.description`, seo.description);
    document.title = localizedTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', localizedDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', localizedTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', localizedDescription);
  }, [seo, t, title]);
  const reveal = (id: string) => `case-reveal ${visible.includes(id) ? 'is-visible' : ''}`;
  const finalDimensions = finalImageDimensions[final.src];
  return <main className="case-page">
    <ProjectNavigation />
    <section className="case-intro">
      <h1>{title}</h1>
      <div className="case-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <p className="case-lede">{t(`lede.${title}`, lede)}</p>
    </section>
    <section className="case-copy-flow" aria-label={t(`project.${title}.aria.caseStudy`, `${title} case study`)}>
      {sections.map((section, index) => <article className={`${reveal(`copy-${index}`)} case-copy ${index % 3 === 1 ? 'case-copy--2' : index % 3 === 2 ? 'case-copy--3' : ''}`} data-reveal={`copy-${index}`} key={section.heading}><p className="case-number">{String(index + 1).padStart(2, '0')}</p><div><h2>{t(`project.${title}.section.${index}.heading`, section.heading)}</h2><p>{t(`project.${title}.section.${index}.copy`, section.copy)}</p></div></article>)}
    </section>
    <figure className={`${reveal('final')} case-final`} data-reveal="final"><img src={final.src} loading="lazy" alt={t(`project.${title}.image.final`, final.alt)} width={finalDimensions?.width} height={finalDimensions?.height} /></figure>
  </main>;
}
