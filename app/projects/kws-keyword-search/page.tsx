'use client';

import { useEffect, useState } from 'react';
import { ProjectNavigation } from '../../../components/project-navigation';
import { useTranslation } from '../../../components/translation';

export default function KWSKeywordSearch() {
  const t = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const image = document.querySelector<HTMLElement>('[data-kws-case-study]');
    if (!image) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: .01 });
    observer.observe(image);
    return () => observer.disconnect();
  }, []);

  return <main className="case-page">
    <ProjectNavigation />
    <section className="case-intro">
      <h1>KWS — Keyword Search</h1>
      <div className="case-tags"><span>CMS</span><span>Product Design</span><span>Product Strategy</span><span>Information Architecture</span></div>
      <p className="case-lede">{t('lede.KWS — Keyword Search', 'A scalable internal platform that translates complex product configuration, CMS workflows, information architecture, and operational decisions into a clear extensible experience.')}</p>
    </section>
    <figure className={`case-final case-reveal ${visible ? 'is-visible' : ''}`} data-kws-case-study>
      <img src="/assets/projects/kws-keyword-search/KWS Portfolio Case Study — Long Export.jpg" loading="lazy" alt="KWS Keyword Search product platform case study" width={1920} height={14685} />
    </figure>
  </main>;
}
