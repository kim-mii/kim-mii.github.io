'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PortfolioFooter } from '../../components/portfolio-footer';
import { ProjectLink } from '../../components/project-link';
import { SiteHeader } from '../../components/site-header';

const milestones = [
  ['2026','Bringing HKTVmall into the WeChat Ecosystem','HKTVmall WeChat Mini Program','Led the China-market WeChat Mini Program design from concept to launch in four months, successfully bringing new users into the HKTVmall ecosystem.','hktv-wechat-mini-program'],
  ['2024','Stepping Up to Staff','Shoalter of HKTV Group','Promoted to Staff Product Designer and became the company’s key product design lead.',null],
  ['2023','Turning Operational Complexity into GMV Growth','HKTV 3PL Merchant Management System','Independently designed HKTV’s end-to-end 3PL Merchant Management System, helping scale merchant operations and contribute to GMV growth.','hktv-3pl-mms'],
  ['2021','Designing Award-Recognised Technology','ASUS VeriView / ROG Armoury Crate 3.0','Designed UI experiences for ASUS VeriView and contributed UI design to ROG Armoury Crate 3.0, bringing clearer control and visual precision to high-performance technology products.','asus-veriview-armoury-crate'],
  ['2019','Designing Loyalty Across Hospitality','Hotel Loyalty Reward App','Designed a loyalty rewards app for notable hotel groups in Malaysia, translating membership value, rewards, and repeat-stay behavior into a simple mobile experience.','hotel-loyalty-reward-app'],
  ['2018','Creating Hospitality Beyond the Screen','Hemisphere Hotel Group','Developed branding and packaging design across Hemisphere Hotel Group’s hotels and resorts, creating a consistent identity across guest touchpoints.','hemisphere-hotel-group'],
  ['2018','Designing Commerce at Scale','Revenue Harvest / revPAY / Taobao','First collaboration with an international brand. Led revPAY’s web checkout experience for its Taobao partnership, a payment flow still in use today. Also designed the UI/UX for Revenue Harvest’s handheld POS payment device, used across Malaysia.','revpay-taobao-revenue-harvest'],
  ['2018','Designing Discovery, Independently','Discover Miri App','First collaboration with a government tourism board — and the first project as an independent Product Designer, defining the product experience, user journey, and digital strategy for discovering Miri.','discover-miri-app'],
  ['2017','Making a City Discoverable','Visit Miri Year','Led the tourism campaign’s brand identity and website design, translating Miri’s local culture, destinations, and ambitions into a unified digital experience.','visit-miri-year'],
  ['2017','Building Brands Made to Travel','Kit Hin','Created brand identity and packaging design for Kit Hin, supporting a product positioned for international export markets.','kit-hin'],
  ['2016','22 Industries. 30 Days.','Corporate Web Design Sprint','Independently designed 22 corporate websites across different industries within one month. Every site was given its own visual direction and personality — no repeated templates, no recycled solutions.','corporate-web-design-sprint'],
  ['2015','Putting Kuching on the Starting Line','Kuching Marathon 2016','Designed the complete website and registration experience that helped launch Kuching Marathon as a major local race event — from its public-facing digital identity to the end-to-end participant sign-up journey.','kuching-marathon'],
  ['2015','The Start of a Design Career','Core System Technologies','Joined Core System Technologies and began building commercial digital experiences across websites, products, branding, and diverse industries.',null],
  ['2014','Designing Play Through Culture','Layer Up — Microsoft Malaysia Collaboration','Collaborated with Microsoft Malaysia on Layer Up, a final-year game design project created to bring local culture to a wider audience through interactive play and storytelling.','layer-up'],
  ['2012','A Foundation in Digital Craft','Swinburne University of Technology, Melbourne','Entered the Multimedia Design program, building a foundation across interaction, visual communication, branding, and digital storytelling.',null],
] as const;

const milestoneRoutes: Record<string, string> = {
  'hktv-3pl-mms': '/projects/hktv-3pl-mms',
  'hotel-loyalty-reward-app': '/projects/insiders-club',
  'discover-miri-app': '/projects/discover-miri',
  'kuching-marathon': '/projects/kuching-marathon-2016',
  'asus-veriview': '/projects/asus-veriview',
  'rog-armoury-crate-3': '/projects/rog-armoury-crate-3',
};

export default function Milestone() {
  const [open, setOpen] = useState<number | null>(null);
  const [visible, setVisible] = useState<number[]>([]);
  const [returnedId, setReturnedId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('.milestone-item')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setVisible((current) => current.includes(Number(entry.target.dataset.index)) ? current : [...current, Number(entry.target.dataset.index)]);
    }), { threshold: .18 });
    items.forEach((item) => observer.observe(item));
    const draw = () => { const node = timelineRef.current; if (!node) return; const rect = node.getBoundingClientRect(); node.style.setProperty('--timeline-progress', String(Math.min(1, Math.max(0, (window.innerHeight * .68 - rect.top) / rect.height)))); };
    draw(); window.addEventListener('scroll', draw, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', draw); };
  }, []);
  useEffect(() => {
    let timer: number | undefined;
    const returnToMilestone = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!/^year-\d{4}(?:-[a-z0-9-]+)?$/.test(id)) return;
      const item = document.getElementById(id);
      if (!item) return;
      requestAnimationFrame(() => item.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
      setReturnedId(id);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setReturnedId(null), 1800);
    };
    returnToMilestone();
    window.addEventListener('hashchange', returnToMilestone);
    return () => { window.removeEventListener('hashchange', returnToMilestone); window.clearTimeout(timer); };
  }, []);
  return <main className="milestone-page">
    <SiteHeader />
    <section className="milestone-intro"><p className="eyebrow">2012 — 2026</p><h1>Journey from <i>visual storytelling</i> to <i>scalable product systems.</i></h1></section>
    <section className="timeline" ref={timelineRef} aria-label="Kimberly Toh career milestones"><div className="timeline-line" aria-hidden="true" />
      {milestones.map(([year, title, project, detail, slug], index) => { const expanded = open === index; const detailRoute = slug ? milestoneRoutes[slug] : undefined; const repeatedYear = milestones.filter(([candidate]) => candidate === year).length > 1; const milestoneId = repeatedYear ? `year-${year}-${slug || index}` : `year-${year}`; const projectLinks = index === 3 ? [['ASUS VeriView', 'asus-veriview'], ['ROG Armoury Crate 3.0', 'rog-armoury-crate-3']] : null; return <article id={milestoneId} data-index={index} className={`milestone-item ${index % 2 ? 'milestone-item--right' : 'milestone-item--left'} ${visible.includes(index) ? 'is-visible' : ''} ${expanded ? 'is-open' : ''} ${returnedId === milestoneId ? 'is-returned' : ''}`} key={`${year}-${title}`}>
        {detailRoute ? <ProjectLink className="milestone-toggle milestone-toggle--link" href={detailRoute} source="milestones" year={year} milestoneId={milestoneId}><span className="milestone-year">{year}</span><span className="milestone-title">{title}</span></ProjectLink> : <button className="milestone-toggle" type="button" onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}><span className="milestone-year">{year}</span><span className="milestone-title">{title}</span></button>}
        <button className="timeline-marker" type="button" aria-label={`Expand ${title}`} onClick={() => setOpen(expanded ? null : index)} />
        <div className="milestone-detail" aria-hidden={!expanded}><p className="milestone-project">{project}</p><p>{detail}</p>{projectLinks ? <div className="project-link-list">{projectLinks.map(([label, projectSlug]) => <ProjectLink key={projectSlug} href={milestoneRoutes[projectSlug]} source="milestones" year={year} milestoneId={milestoneId} data-project-slug={projectSlug}>View {label} ↗</ProjectLink>)}</div> : null}</div>
      </article>; })}
    </section>
    <section className="milestone-closing"><Link href="/projects">Explore my work ↗</Link></section>
    <PortfolioFooter />
  </main>;
}
