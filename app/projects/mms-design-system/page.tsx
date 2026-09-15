'use client';

import { useEffect, useState } from 'react';
import { ProjectNavigation } from '../../../components/project-navigation';

export default function MMSDesignSystem() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visual = document.querySelector<HTMLElement>('[data-mms-case-study]');
    if (!visual) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: .01 });
    observer.observe(visual);
    return () => observer.disconnect();
  }, []);

  return <main className="case-page">
    <ProjectNavigation />
    <section className="case-intro">
      <h1>MMS Design System</h1>
      <div className="case-tags"><span>Design System</span><span>Component Library</span><span>Design Guidelines</span></div>
      <p className="case-lede">A shared system of components and guidelines that brings consistency, clarity, and speed to the MMS product experience.</p>
    </section>
    <figure className={`case-final case-reveal mms-case-study ${visible ? 'is-visible' : ''}`} data-mms-case-study>
      <img src="/assets/projects/mms-design-system/MMS Design System Guide.jpg" loading="lazy" alt="MMS Design System Guide with component library and design guidelines" />
    </figure>
  </main>;
}
