'use client';

import { useState } from 'react';

const logos = [
  { name: 'Shoalter', category: 'Product Design Team', src: '/assets/collaboration/shoalter-logo.png', width: 1200, height: 630 },
  { name: 'HKTVmall', category: 'Product Design Team', src: '/assets/collaboration/hktvmall-logo.png', width: 600, height: 600 },
  { name: 'ASUS', category: 'HQ Design Centre', src: '/assets/collaboration/asus-logo.jpg', width: 650, height: 651 },
  { name: 'Hemisphere Hotel Group', category: 'App UI/UX Design', src: '/assets/collaboration/hemisphere-hotel-group-logo.png', width: 3125, height: 3125, tone: 'dark' },
  { name: 'Revenue Harvest', category: 'Web UI/UX Design', src: '/assets/collaboration/revenue-harvest-logo.png', width: 600, height: 315 },
  { name: 'revPAY', category: 'App UI/UX & Brand Experience', src: '/assets/collaboration/revpay-logo.jpg', width: 1200, height: 1200 },
  { name: 'Visit Miri', category: 'Tourism Brand Identity & Digital Design', src: '/assets/collaboration/visit-miri-logo.jpg', width: 660, height: 642 },
  { name: 'Grand Margherita Hotel', category: 'Brand Identity & Digital Design', src: '/assets/collaboration/grand-margherita-logo.jpg', width: 447, height: 447 },
];

export function CollaborationLogos() {
  const [active, setActive] = useState<string | null>(null);
  const [below, setBelow] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const activate = (name: string, target: HTMLElement) => {
    setActive(name);
    setBelow(target.getBoundingClientRect().top < 104);
  };
  const logoClass = (tone = '', hasImage = true) => `logo-box ${tone ? `logo-box--${tone.replace(' ', ' logo-box--')}` : ''} ${hasImage ? '' : 'logo-box--fallback'}`;
  return <div className={`logo-carousel ${interacted ? 'is-interacted' : ''}`} aria-label="Brands Kimberly has collaborated with" onPointerDown={(event) => { if (event.pointerType === 'touch') setInteracted(true); }}>
    <div className="logo-carousel-track">
      {[false, true].map((clone) => <div className="logo-carousel-group" aria-hidden={clone || undefined} key={clone ? 'clone' : 'original'}>
        {logos.map(({ name, category, src, width, height, tone = '' }) => {
          const tooltipId = `collaboration-tooltip-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return clone
            ? <div className={logoClass(tone, Boolean(src))} key={`${name}-clone`}>{src && <img src={src} alt="" width={width} height={height} />}<span className="logo-fallback" aria-hidden="true">{name}</span></div>
            : <button className={logoClass(tone, Boolean(src))} type="button" key={name} aria-label={`${name} — ${category}`} aria-describedby={tooltipId} onPointerEnter={(event) => activate(name, event.currentTarget)} onPointerLeave={() => setActive(null)} onFocus={(event) => activate(name, event.currentTarget)} onBlur={() => setActive(null)} onClick={(event) => activate(active === name ? '' : name, event.currentTarget)}>
              {src && <img src={src} alt={`${name} logo`} width={width} height={height} onError={(event) => event.currentTarget.parentElement?.classList.add('has-image-error')} />}
              <span className="logo-fallback" aria-hidden="true">{name}</span>
              <span className={`logo-tooltip ${active === name ? 'is-active' : ''} ${active === name && below ? 'logo-tooltip--below' : ''}`} id={tooltipId} role="tooltip"><span>{name}</span><span>{category}</span></span>
            </button>;
        })}
      </div>)}
    </div>
  </div>;
}
