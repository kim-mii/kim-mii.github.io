'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const paragraphs = [
  'Growing up in Borneo, Malaysia, creativity started with a love for beautiful things. When something couldn’t be found, making it became the answer—and over time, creating became second nature.',
  'Studying Multimedia Design began with animation, but discovering UI/UX shifted that perspective. Design could be more than something to look at; it could be used, solve real problems, and create meaningful value. That realization led to a career in product design.',
  'Today, a logical, systematic, and experimental mindset shapes the way complex problems are approached. Working closely with product teams to untangle complexity is where design feels most rewarding—with the belief that usability should always come before decoration.',
  'Now based in Taipei since 2021, life outside design is often spent traveling, discovering new places and perspectives. Ultimately, the goal is simple: to create products that make people think, ‘I’m glad this exists.’',
];

export default function About() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('.reveal')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .14 });
    items.forEach((item) => observer.observe(item));
    const close = (event: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => { observer.disconnect(); document.removeEventListener('mousedown', close); };
  }, []);
  const copyEmail = async () => { await navigator.clipboard?.writeText('kimmy.yh93@gmail.com'); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <main className="about-page">
    <header className="site-header"><Link className="wordmark" href="/" aria-label="Return to Kimberly Toh homepage">Kimberly Toh</Link><nav aria-label="Primary navigation"><Link href="/milestone">My Milestones</Link><Link href="/projects">My Work</Link><Link className="active-nav" href="/about">Me</Link></nav></header>
    <section className="about-intro">
      <p className="eyebrow reveal">A little more</p><h1 className="reveal">More about <i>me.</i></h1>
      <div className="about-story"><div className="about-copy">{paragraphs.map((paragraph, index) => <p className="reveal" style={{ transitionDelay: `${index * 90}ms` }} key={paragraph}>{paragraph}</p>)}</div><div className="portrait-wrap reveal" role="img" aria-label="Portrait of Kimberly Toh"><div className="portrait-placeholder"><span>KT</span></div></div></div>
    </section>
    <section className="about-resume reveal" aria-labelledby="resume-title"><p className="eyebrow" id="resume-title">Resume</p><div className="resume-menu" ref={dropdownRef}><button type="button" className="resume-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="menu">View resume <span aria-hidden="true">⌄</span></button>{open && <div className="resume-options" role="menu"><Link role="menuitem" href="/resume/kimberly-toh-zh" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Mandarin resume</Link><Link role="menuitem" href="/resume/kimberly-toh-en" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>English resume</Link></div>}</div></section>
    <section className="about-contact reveal" aria-labelledby="contact-title"><p className="eyebrow" id="contact-title">Contact</p><p className="contact-name">Kimberly</p><div className="email-row"><a href="mailto:kimmy.yh93@gmail.com">kimmy.yh93@gmail.com</a><button type="button" className="copy-email" aria-label="Copy Kimberly’s email address" onClick={copyEmail}><span aria-hidden="true">{copied ? '✓' : '⧉'}</span><span className="copy-tooltip">{copied ? 'Copied' : 'Copy email'}</span></button></div></section>
  </main>;
}
