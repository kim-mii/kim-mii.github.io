'use client';

import { useState } from 'react';

const logos = [
  { name: 'Shoalter', category: 'Product Design Team', src: '/assets/collaboration/shoalter-logo.png' },
  { name: 'HKTVmall', category: 'Product Design Team', src: '/assets/collaboration/hktvmall-logo.png' },
  { name: 'ASUS', category: 'HQ Design Centre', src: '/assets/collaboration/asus-logo.jpg' },
  { name: 'Hemisphere Hotel Group', category: 'App UI/UX Design', src: '/assets/collaboration/hemisphere-hotel-group-logo.png', tone: 'dark' },
  { name: 'Revenue Harvest', category: 'Web UI/UX Design' },
  { name: 'revPAY', category: 'App UI/UX & Brand Experience', src: '/assets/collaboration/revpay-logo.jpg' },
  { name: 'Visit Miri', category: 'Tourism Brand Identity & Digital Design', src: '/assets/collaboration/visit-miri-logo.jpg' },
  { name: 'Grand Margherita Hotel', category: 'Brand Identity & Digital Design', src: '/assets/collaboration/grand-margherita-logo.jpg' },
];

export function CollaborationLogos() {
  const [active, setActive] = useState<string | null>(null);
  const [below, setBelow] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const activate = (name: string, target: HTMLElement) => {
    setActive(name);
    setBelow(target.getBoundingClientRect().top < 104);
  };
  const logoClass = (tone = '') => `logo-box ${tone ? `logo-box--${tone.replace(' ', ' logo-box--')}` : ''}`;
  return <div className={`logo-carousel ${interacted ? 'is-interacted' : ''}`} aria-label="Brands Kimberly has collaborated with" onPointerDown={(event) => { if (event.pointerType === 'touch') setInteracted(true); }}>
    <div className="logo-carousel-track">
      {[false, true].map((clone) => <div className="logo-carousel-group" aria-hidden={clone || undefined} key={clone ? 'clone' : 'original'}>
        {logos.map(({ name, category, src, tone = '' }) => {
          const tooltipId = `collaboration-tooltip-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return clone
            ? <div className={logoClass(tone)} key={`${name}-clone`}>{src && <img src={src} alt="" />}<span className="logo-fallback" aria-hidden="true">{name}</span></div>
            : <button className={logoClass(tone)} type="button" key={name} aria-describedby={tooltipId} onPointerEnter={(event) => activate(name, event.currentTarget)} onPointerLeave={() => setActive(null)} onFocus={(event) => activate(name, event.currentTarget)} onBlur={() => setActive(null)} onClick={(event) => activate(active === name ? '' : name, event.currentTarget)}>
              {src && <img src={src} alt={`${name} logo`} onError={(event) => event.currentTarget.parentElement?.classList.add('has-image-error')} />}
              <span className="logo-fallback" aria-hidden="true">{name}</span>
              <span className={`logo-tooltip ${active === name ? 'is-active' : ''} ${active === name && below ? 'logo-tooltip--below' : ''}`} id={tooltipId} role="tooltip"><span>{name}</span><span>{category}</span></span>
            </button>;
        })}
      </div>)}
    </div>
  </div>;
}
