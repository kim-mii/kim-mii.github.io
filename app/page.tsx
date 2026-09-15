 'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CollaborationLogos } from '../components/collaboration-logos';
import { ProjectLink } from '../components/project-link';
import { ResumeSelector } from '../components/resume-selector';
import { RestoreScroll } from '../components/restore-scroll';
import { SiteHeader } from '../components/site-header';

const projects = [
  { name: 'HKTV 3PL MMS', type: 'Merchant Management System', tags: ['Product Design', 'Dashboard', 'B2B'], href: '/projects/hktv-3pl-mms', tone: 0, image: '/assets/projects/hktv-3pl-mms/Cover2.jpg' },
  { name: 'KWS — Keyword Search', type: 'Complex Product Platform', tags: ['CMS', 'Product Strategy', 'Information Architecture'], href: '/projects/kws-keyword-search', tone: 1, image: '/assets/projects/kws-keyword-search/Kws Cover2.jpg' },
  { name: 'MMS Design System', type: 'Design System Guide', tags: ['Design System', 'Component Library', 'Design Guidelines'], href: '/projects/mms-design-system', tone: 4, image: '/assets/projects/mms-design-system/Design System Cover.jpg' },
  { name: 'HKTVmall Hotel Booking', type: 'Hotel Booking Experience', tags: ['Product Design', 'App Design', 'UX Strategy'], href: '/projects/hktv-hotel-booking', tone: 5, image: '/assets/projects/hktv-hotel-booking/Hotel Booking cover.png' },
];
const experiences = [
  ['Shoalter of HKTV Group', [['Staff Product Designer', '10.2024 – 03.2026'], ['Senior Product Designer', '06.2022 – 09.2024']]],
  ['ASUS — HQ Design Centre', [['Senior UI Designer', '03.2021 – 10.2021']]],
  ['Core System', [['Jr. Creative & Art Director', '06.2018 – 12.2020'], ['UIUX Designer', '05.2015 – 05.2018']]],
];
function TagRow({ tags }: { tags: string[] }) { return <div className="work-tags">{tags.map((tag, index) => <span className={index === 3 ? 'tag-fourth' : ''} key={tag}>{tag}</span>)}{tags.length > 3 && <span className="tag-ellipsis" role="button" tabIndex={0} aria-label="Information Architecture"><span aria-hidden="true">…</span><span className="tag-tooltip">Information Architecture</span></span>}</div>; }
export default function Home() {
  const [visible, setVisible] = useState<number[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>('.home-work-card')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setVisible((current) => current.includes(Number(entry.target.dataset.index)) ? current : [...current, Number(entry.target.dataset.index)]); }), { threshold: .12 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  const moveCursor = (event: React.PointerEvent<HTMLAnchorElement>) => { if (event.pointerType === 'mouse') setCursor({ x: event.clientX, y: event.clientY, active: true }); };
  return <main>
    <RestoreScroll path="/" />
    <SiteHeader />
    <section className="hero" aria-labelledby="hero-title"><p className="eyebrow">Staff Product Designer · UIUX Designer</p><h1 id="hero-title">I shape <span>complexity</span><br />into <i>clarity.</i></h1><p className="hero-copy">I simplify complex workflows, design scalable systems, and turn business needs into intuitive product experiences.</p></section>
    <section id="contributions" className="section contributions home-work-section" aria-labelledby="contributions-title"><div className="section-intro"><p className="eyebrow">01 / Selected work</p><h2 id="contributions-title">My Work</h2></div><div className="home-work-grid">{[[0, 2], [1, 3]].map((column) => <div className="home-work-column" key={column.join('-')}>{column.map((index) => { const project = projects[index]; const isEmpty = project.name === ''; return <ProjectLink href={project.href} source="home" data-index={index} aria-label={isEmpty ? 'Project Four' : `${project.name}, ${project.type}`} className={`work-card work-card--${project.tone} home-work-card home-work-card--${index} ${project.image ? 'work-card--image' : ''} ${isEmpty ? 'work-card--empty' : ''} ${visible.includes(index) ? 'is-visible' : ''}`} key={project.href} onPointerEnter={moveCursor} onPointerMove={moveCursor} onPointerLeave={() => setCursor((current) => ({ ...current, active: false }))}>{isEmpty ? null : <><div className="work-art" aria-hidden="true">{project.image ? <img src={project.image} alt="" /> : <><span /><b /><i /></>}</div><TagRow tags={project.tags}/><span className="focus-cue">View details ↗</span></>}</ProjectLink>; })}</div>)}</div><Link className="home-all-work" href="/projects">Explore all work <span>↗</span></Link><div className={`work-cursor ${cursor.active ? 'is-active' : ''}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0) translate(-50%,-50%)` }} aria-hidden="true"><span>View<br />Details</span></div></section>
    <section className="section adventures" aria-labelledby="adventures-title"><div className="section-intro"><p className="eyebrow">02 / Experience</p><h2 id="adventures-title">My Adventures</h2></div><div className="experience-labels" aria-hidden="true"><span>Company</span><span>Role</span><span>Period</span></div><div className="experience-list">{experiences.map(([company, roles]) => <article className="experience" key={company as string}><h3>{company === 'Core System' ? 'Core System Technologies' : company as string}</h3><div>{(roles as string[][]).map(([role, period]) => <div className="role" key={role}><p>{role}</p><time>{period}</time></div>)}</div></article>)}</div></section>
    <section className="section know-me" aria-labelledby="know-title"><div className="know-heading"><p className="eyebrow">03 / A little more</p><h2 id="know-title" className="statement">A love of beautiful things evolved into a passion for creating useful, thoughtful products beyond decoration.</h2><Link className="soft-button" href="/about">More about me</Link></div><div className="know-content"><div className="clusters"><div><p className="eyebrow">Core Strengths</p><ul><li>Product Design</li><li>UX Design</li><li>UI Design</li><li>UX Copywriting</li><li>Design System</li><li>UX Research</li><li>Information Architecture</li><li>Design with AI</li></ul><p className="eyebrow tools-label">Tools</p><ul className="tools-list"><li>Figma</li><li>Adobe Creative Suite</li><li>Claude</li><li>Codex</li><li>Maze</li></ul></div></div></div></section>
    <section className="brand-section" aria-labelledby="brands-title"><div className="section-intro"><p className="eyebrow">04 / Collaboration</p><h2 id="brands-title">Together we <i>move things forward</i></h2></div><CollaborationLogos /></section>
    <footer><p>Design what <i>matters</i></p><div className="footer-links"><ResumeSelector /><a href="https://www.linkedin.com/in/kimmy-yh/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="mailto:kimmy.yh93@gmail.com">Drop a mail <span>↗</span></a></div><small>© 2026 Kimberly Toh</small></footer>
  </main>;
}
