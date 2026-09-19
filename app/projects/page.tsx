'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PortfolioFooter } from '../../components/portfolio-footer';
import { BackToTop } from '../../components/project-navigation';
import { ProjectLink } from '../../components/project-link';
import { RestoreScroll } from '../../components/restore-scroll';
import { SiteHeader } from '../../components/site-header';
import { useTranslation } from '../../components/translation';
import { useLanguage } from '../../components/language-provider';

const names = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'];
const slugs = ['one','two','three','four','asus-veriview','rog-armoury-crate-3','discover-miri','insiders-club','revenue-investor','revenue-harvest','grand-margherita-hotel','kuching-marathon-2016'];
const projects = names.map((name, index) => {
  const project = { title: `Project ${name}`, subtitle: '', slug: `project-${slugs[index]}`, tone: index % 6, tags: ['Product Design','UIUX','Design System'], image: undefined as string | undefined };
  if (index === 0) return { ...project, title: 'HKTV 3PL MMS', subtitle: 'Merchant Management System', slug: 'hktv-3pl-mms', tags: ['Product Design','Dashboard','B2B'], image: '/assets/projects/hktv-3pl-mms/Cover2.jpg' };
  if (index === 1) return { ...project, title: 'KWS — Keyword Search', subtitle: 'Complex Product Platform', slug: 'kws-keyword-search', tags: ['CMS','Product Strategy','Information Architecture'], image: '/assets/projects/kws-keyword-search/Kws Cover2.jpg' };
  if (index === 2) return { ...project, title: 'MMS Design System', subtitle: 'Design System Guide', slug: 'mms-design-system', tags: ['Design System','Component Library','Design Guidelines'], image: '/assets/projects/mms-design-system/Design System Cover.jpg' };
  if (index === 3) return { ...project, title: 'HKTVmall Hotel Booking', subtitle: 'Hotel Booking Experience', slug: 'hktv-hotel-booking', tags: ['Product Design','App Design','UX Strategy'], image: '/assets/projects/hktv-hotel-booking/Hotel Booking cover.png' };
  if (index === 4) return { ...project, title: 'ASUS VeriView', slug: 'asus-veriview', tags: ['UX Research','UI Design','Hardware R&D'], image: '/assets/projects/asus-veriview/veriview-cover.jpg' };
  if (index === 5) return { ...project, title: 'ROG Armoury Crate 3.0', slug: 'rog-armoury-crate-3', tags: ['UI Design','Design System','Software Design'], image: '/assets/projects/rog-armoury-crate-3/rog-armoury-crate-cover.jpg' };
  if (index === 6) return { ...project, title: 'Discover Miri', slug: 'discover-miri', tags: ['Product Design','App Design','UIUX'], image: '/assets/projects/discover-miri/cover.jpg' };
  if (index === 7) return { ...project, title: 'Insiders Club', slug: 'insiders-club', tags: ['App Design','UIUX','Product Design'], image: '/assets/projects/insiders-club/cover.jpg' };
  if (index === 8) return { ...project, title: 'Revenue Investor', slug: 'revenue-investor', tags: ['App Design','UIUX','Product Design'], image: '/assets/projects/revenue-investor/cover.jpg' };
  if (index === 9) return { ...project, title: 'Revenue Harvest', slug: 'revenue-harvest', tags: ['Web Design','Brand Experience','Development'], image: '/assets/projects/revenue-harvest/revenue-harvest-cover.jpg' };
  if (index === 10) return { ...project, title: 'Grand Margherita Hotel', slug: 'grand-margherita-hotel', tags: ['Branding','Hospitality','Web Design'], image: '/assets/projects/grand-margherita-hotel/Cover.jpg' };
  if (index === 11) return { ...project, title: 'Kuching Marathon 2016', slug: 'kuching-marathon-2016', tags: ['Web Design','UX Design','Development'], image: '/assets/projects/kuching-marathon-2016/cover.jpg' };
  return project;
});
function TagRow({ tags }: { tags: string[] }) { return <div className="work-tags">{tags.map((tag, index) => <span className={index === 3 ? 'tag-fourth' : ''} key={tag}>{tag}</span>)}{tags.length > 3 && <span className="tag-ellipsis" role="button" tabIndex={0} aria-label="Information Architecture"><span aria-hidden="true">…</span><span className="tag-tooltip">Information Architecture</span></span>}</div>; }

export default function Projects() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [visible, setVisible] = useState<number[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>('.work-card')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { const target = entry.target as HTMLElement; if (entry.isIntersecting) setVisible((current) => current.includes(Number(target.dataset.index)) ? current : [...current, Number(target.dataset.index)]); }), { threshold: .12 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  const moveCursor = (event: React.PointerEvent<HTMLAnchorElement>) => { if (event.pointerType === 'mouse') setCursor({ x: event.clientX, y: event.clientY, active: true }); };
  const columns = [projects.filter((_, index) => index % 2 === 0), projects.filter((_, index) => index % 2 === 1)];
  return <main className="work-page">
    <RestoreScroll path="/projects" />
    <SiteHeader />
    <section className="work-intro"><p className="eyebrow">{t('work.selected', 'Selected work')}</p><h1 className={language === 'zh' ? 'zh-display' : undefined}>{language === 'zh' ? t('work.title', 'A closer look at what I’ve shaped.') : <>A closer look at what I’ve <i>shaped.</i></>}</h1><p>{t('work.intro', 'A selection of work across product, UI/UX, branding, packaging, and digital experiences.')}</p></section>
    <section className="work-grid" aria-label={t('work.title', 'Project archive')}>{columns.map((column, columnIndex) => <div className={`work-column work-column--${columnIndex + 1}`} key={columnIndex}>{column.map((project) => { const index = projects.indexOf(project); const hasImage = Boolean(project.image); const isEmpty = project.title === ''; return <ProjectLink href={`/projects/${project.slug}`} source="work" data-index={index} aria-label={isEmpty ? 'Project Four' : `${project.title}${project.subtitle ? `, ${project.subtitle}` : ''}`} className={`work-card work-card--tone-${project.tone} work-card--${index} ${hasImage ? 'work-card--image' : ''} ${isEmpty ? 'work-card--empty' : ''} ${visible.includes(index) ? 'is-visible' : ''}`} key={project.slug} onPointerEnter={moveCursor} onPointerMove={moveCursor} onPointerLeave={() => setCursor((current) => ({ ...current, active: false }))}>{isEmpty ? null : <><div className="work-art" aria-hidden="true">{project.image ? <img src={project.image} alt="" width={1600} height={2000} /> : <><span /><b /><i /></>}</div><TagRow tags={project.tags}/><span className="focus-cue">{t('project.view', 'View details')} ↗</span></>}</ProjectLink>; })}</div>)}</section>
    <div className={`work-cursor ${cursor.active ? 'is-active' : ''}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0) translate(-50%,-50%)` }} aria-hidden="true"><span>{language === 'zh' ? t('project.view', '進去看看') : <>View<br />Details</>}</span></div>
    <PortfolioFooter />
    <BackToTop />
  </main>;
}
