'use client';

import { useEffect, useState } from 'react';
import { ProjectNavigation } from '../../../components/project-navigation';

export default function AsusVeriView() {
  const [visible, setVisible] = useState<string[]>([]);
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('.case-reveal')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) setVisible((current) => current.includes(target.dataset.reveal || '') ? current : [...current, target.dataset.reveal || '']);
    }), { threshold: .01 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  const reveal = (id: string) => `case-reveal ${visible.includes(id) ? 'is-visible' : ''}`;
  return <main className="case-page">
    <ProjectNavigation />
    <section className="case-intro"><h1>ASUS VeriView</h1><div className="case-tags"><span>UX Research</span><span>UI Design</span><span>Hardware R&amp;D</span></div><p className="case-lede">Designing a dedicated second-screen experience for business professionals — such as bank and cashier teams — to access essential controls and information with greater clarity.</p></section>
    <figure className={`${reveal('final')} case-final`} data-reveal="final"><img src="/assets/projects/asus-veriview/veriview-final-1.jpg" loading="lazy" alt="ASUS VeriView UX research, information architecture, wireframes, design system, and final UI" width={1400} height={10085} /></figure>
    <section className={`${reveal('video')} case-video`} data-reveal="video"><video controls preload="metadata" aria-label="ASUS VeriView interface walkthrough"><source src="/assets/projects/asus-veriview/veriview.mp4" type="video/mp4" />Your browser does not support this video.</video></section>
  </main>;
}
