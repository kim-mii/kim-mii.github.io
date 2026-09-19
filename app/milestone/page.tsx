'use client';

import { useEffect, useRef, useState } from 'react';
import { PortfolioFooter } from '../../components/portfolio-footer';
import { BackToTop } from '../../components/project-navigation';
import { ProjectLink } from '../../components/project-link';
import { SiteHeader } from '../../components/site-header';
import { useTranslation } from '../../components/translation';
import { useLanguage } from '../../components/language-provider';

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

type MilestoneTitle = (typeof milestones)[number][1];

// Keep the display title and every expanded-detail key tied to one explicit,
// typed source. Adding a future timeline item now requires declaring its
// translation namespace instead of silently deriving a mismatched slug key.
const milestoneContentKeys = {
  'Bringing HKTVmall into the WeChat Ecosystem': 'milestone.hktv-wechat-mini-program',
  'Stepping Up to Staff': 'milestone.2024',
  'Turning Operational Complexity into GMV Growth': 'milestone.hktv-3pl-mms',
  'Designing Award-Recognised Technology': 'milestone.asus-veriview-armoury-crate',
  'Designing Loyalty Across Hospitality': 'milestone.hotel-loyalty-reward-app',
  'Creating Hospitality Beyond the Screen': 'milestone.hemisphere-hotel-group',
  'Designing Commerce at Scale': 'milestone.revpay-taobao-revenue-harvest',
  'Designing Discovery, Independently': 'milestone.discover-miri-app',
  'Making a City Discoverable': 'milestone.visit-miri-year',
  'Building Brands Made to Travel': 'milestone.kit-hin',
  '22 Industries. 30 Days.': 'milestone.corporate-web-design-sprint',
  'Putting Kuching on the Starting Line': 'milestone.kuching-marathon',
  'The Start of a Design Career': 'milestone.2015-career',
  'Designing Play Through Culture': 'milestone.layer-up',
  'A Foundation in Digital Craft': 'milestone.2012',
} satisfies Record<MilestoneTitle, string>;

const milestoneRoutes: Record<string, string> = {
  'hktv-3pl-mms': '/projects/hktv-3pl-mms',
  'hotel-loyalty-reward-app': '/projects/insiders-club',
  'discover-miri-app': '/projects/discover-miri',
  'kuching-marathon': '/projects/kuching-marathon-2016',
  'asus-veriview': '/projects/asus-veriview',
  'rog-armoury-crate-3': '/projects/rog-armoury-crate-3',
};

export default function Milestone() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [open, setOpen] = useState<number[]>([]);
  const [visible, setVisible] = useState<number[]>([]);
  const [returnedId, setReturnedId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('.milestone-item')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) setVisible((current) => current.includes(Number(target.dataset.index)) ? current : [...current, Number(target.dataset.index)]);
    }), { threshold: .18 });
    items.forEach((item) => observer.observe(item));
    const updateTimeline = () => {
      const node = timelineRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--timeline-progress', String(Math.min(1, Math.max(0, (window.innerHeight * .68 - rect.top) / rect.height))));

      const scrollY = window.scrollY;
      const isMovingDown = scrollY > lastScrollY.current;
      const isMovingUp = scrollY < lastScrollY.current;
      const activeLine = Math.max(118, window.innerHeight * .56);
      if (isMovingDown) {
        const entering = items.flatMap((item) => {
          const itemRect = item.getBoundingClientRect();
          const index = Number(item.dataset.index);
          return itemRect.top <= activeLine && itemRect.bottom > 104 ? [index] : [];
        });
        if (entering.length) setOpen((current) => [...new Set([...current, ...entering])]);
      }
      if (isMovingUp) {
        setOpen((current) => current.filter((index) => {
          const item = items.find((candidate) => Number(candidate.dataset.index) === index);
          return Boolean(item && item.getBoundingClientRect().top <= activeLine);
        }));
      }
      lastScrollY.current = scrollY;
    };
    updateTimeline(); window.addEventListener('scroll', updateTimeline, { passive: true }); window.addEventListener('resize', updateTimeline);
    return () => { observer.disconnect(); window.removeEventListener('scroll', updateTimeline); window.removeEventListener('resize', updateTimeline); };
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
    <section className="milestone-intro"><p className="eyebrow">2012 — 2026</p><h1 className={language === 'zh' ? 'zh-display' : undefined}>{language === 'zh' ? <>從把<span className="milestone-highlight">故事</span>說好，<br className="milestone-zh-desktop-break" />到把<span className="milestone-highlight">系統</span>做好。</> : <>Journey from <i>visual storytelling</i> to <i>scalable product systems.</i></>}</h1></section>
    <section className="timeline" ref={timelineRef} aria-label={t('milestone.timelineAria', 'Kimberly Toh career milestones')}><div className="timeline-line" aria-hidden="true" />
      {milestones.map(([year, title, project, detail, slug], index) => {
        const expanded = open.includes(index);
        const detailRoute = slug ? milestoneRoutes[slug] : undefined;
        const repeatedYear = milestones.filter(([candidate]) => candidate === year).length > 1;
        const milestoneId = repeatedYear ? `year-${year}-${slug || index}` : `year-${year}`;
        const projectLinks = index === 3 ? [['ASUS VeriView', 'asus-veriview'], ['ROG Armoury Crate 3.0', 'rog-armoury-crate-3']] : detailRoute && slug ? [[project, slug]] : null;
        const toggle = () => setOpen((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
        const titleKey = ({
          'Bringing HKTVmall into the WeChat Ecosystem': 'milestone.2026',
          'Stepping Up to Staff': 'milestone.2024',
          'Turning Operational Complexity into GMV Growth': 'milestone.2023',
          'Designing Award-Recognised Technology': 'milestone.2021',
          'Designing Loyalty Across Hospitality': 'milestone.2019',
          'Designing Discovery, Independently': 'milestone.2018-discover',
          '22 Industries. 30 Days.': 'milestone.2016',
          'Putting Kuching on the Starting Line': 'milestone.2015',
        } as Record<string, string>)[title];
        const contentKey = milestoneContentKeys[title];
        const visibleTitle = t(`${contentKey}.title`, titleKey ? t(titleKey, title) : title);
        const visibleProject = t(`${contentKey}.project`, project);
        const visibleDetail = t(`${contentKey}.detail`, detail);
        const expandLabel = t(`${contentKey}.expand`, t('milestone.expand', `Expand ${title}`));
        return <article id={milestoneId} data-index={index} className={`milestone-item ${index % 2 ? 'milestone-item--right' : 'milestone-item--left'} ${visible.includes(index) ? 'is-visible' : ''} ${expanded ? 'is-open' : ''} ${returnedId === milestoneId ? 'is-returned' : ''}`} key={`${year}-${title}`}>
        <button className="milestone-toggle" type="button" onClick={toggle} aria-controls={`milestone-detail-${index}`} aria-expanded={expanded}><span className="milestone-year">{year}</span><span className="milestone-title">{visibleTitle}</span></button>
        <button className="timeline-marker" type="button" aria-label={expandLabel} tabIndex={-1} onClick={toggle} />
        <div id={`milestone-detail-${index}`} className="milestone-detail" aria-hidden={!expanded}><p className="milestone-project">{visibleProject}</p><p>{visibleDetail}</p>{projectLinks ? <div className="project-link-list">{projectLinks.map(([label, projectSlug]) => {
          const projectRoute = milestoneRoutes[projectSlug];
          const linkCopy = t(`${contentKey}.link`, `View ${label} ↗`);
          return projectRoute ? <ProjectLink key={projectSlug} href={projectRoute} source="milestones" year={year} milestoneId={milestoneId} data-project-slug={projectSlug} tabIndex={expanded ? 0 : -1}>{linkCopy}</ProjectLink> : null;
        })}</div> : null}</div>
      </article>; })}
    </section>
    <section className="milestone-closing"><a className="text-button" href="/projects/">{t('milestone.allWork', 'Explore my work')} ↗</a></section>
    <PortfolioFooter statement="Design what matters" />
    <BackToTop onBeforeScroll={() => setOpen([])} />
  </main>;
}
