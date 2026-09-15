'use client';

import { useEffect, useState } from 'react';
import { ProjectNavigation } from '../../../components/project-navigation';

export default function HKTV3PLMMS() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const image = document.querySelector<HTMLElement>('[data-3pl-case-study]');
    if (!image) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: .01 });
    observer.observe(image);
    return () => observer.disconnect();
  }, []);

  return <main className="case-page">
    <ProjectNavigation />
    <section className="case-intro">
      <h1>HKTV 3PL MMS</h1>
      <div className="case-tags"><span>Product Design</span><span>Dashboard</span><span>B2B</span></div>
      <p className="case-lede">A merchant management system that brings 3PL services, operational visibility, and subscription planning into one focused workspace.</p>
    </section>
    <figure className={`case-final case-reveal ${visible ? 'is-visible' : ''}`} data-3pl-case-study>
      <img src="/assets/projects/hktv-3pl-mms/HKTV 3PL MMS — Case Study.jpg" loading="lazy" alt="HKTV 3PL Merchant Management System case study" />
    </figure>
  </main>;
}
