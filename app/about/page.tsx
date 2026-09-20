'use client';

import { useEffect } from 'react';
import { PortfolioFooter } from '../../components/portfolio-footer';
import { ResumeSelector } from '../../components/resume-selector';
import { SiteHeader } from '../../components/site-header';
import { useTranslation } from '../../components/translation';
import { useLanguage } from '../../components/language-provider';

const paragraphs = [
  'Growing up in Borneo, Malaysia, creativity started with a love for beautiful things. When something couldn’t be found, making it became the answer—and over time, creating became second nature.',
  'Studying Multimedia Design began with animation, but discovering UI/UX shifted that perspective. Design could be more than something to look at; it could be used, solve real problems, and create meaningful value. That realization led to a career in product design.',
  'Today, a logical, systematic, and experimental mindset shapes the way complex problems are approached. Working closely with product teams to untangle complexity is where design feels most rewarding—with the belief that usability should always come before decoration.',
  'Now based in Taipei since 2021, life outside design is often spent traveling, discovering new places and perspectives. Ultimately, the goal is simple: to create products that make people think, ‘I’m glad this exists.’',
];

export default function About() {
  const t = useTranslation();
  const { language } = useLanguage();
  const localizedParagraphs = paragraphs.map((paragraph, index) => t(`about.p${index + 1}`, paragraph));
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('.reveal')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .14 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <main className="about-page">
    <SiteHeader />
    <section className="about-intro">
      <p className="eyebrow reveal">{t('about.eyebrow', 'A little more')}</p><h1 className="reveal">{language === 'zh' ? <><span className="about-kim-highlight">Kim</span>berly</> : <>About <i>me.</i></>}</h1>
      <div className="about-story"><div className="about-copy">{localizedParagraphs.map((paragraph, index) => <p className="reveal" style={{ transitionDelay: `${index * 90}ms` }} key={paragraph}>{paragraph}</p>)}<div className="resume-menu reveal"><ResumeSelector /></div></div><div className="portrait-wrap reveal"><img src="/assets/me/kimmy.jpg" alt="Kimberly Toh standing beneath an iridescent fabric installation" width={2200} height={3910} /></div></div>
    </section>
    <PortfolioFooter />
  </main>;
}
