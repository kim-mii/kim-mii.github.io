'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/milestone', label: 'My Milestones' },
  { href: '/projects', label: 'My Contributions' },
  { href: '/about', label: 'Me' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); requestAnimationFrame(() => menuButton.current?.focus()); }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!drawer.current?.contains(event.target as Node) && !menuButton.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); };
  }, [open]);

  const close = () => { setOpen(false); requestAnimationFrame(() => menuButton.current?.focus()); };
  return <header className="site-header">
    <Link className="wordmark" href="/" aria-label="Return to Kimberly Toh homepage">
      <img className="wordmark-logo" src="/assets/Logomark.png" alt="Kimberly Toh" />
    </Link>
    <nav className="desktop-navigation" aria-label="Primary navigation">{links.map((link) => <Link className={pathname === link.href ? 'active-nav' : ''} href={link.href} key={link.href}>{link.label === 'My Contributions' ? 'My Work' : link.label}</Link>)}</nav>
    <button className={`menu-button ${open ? 'is-open' : ''}`} type="button" ref={menuButton} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => open ? close() : setOpen(true)}><span /><span /><span /></button>
    {open ?
      <aside id="mobile-navigation" className="navigation-drawer" ref={drawer} aria-label="Mobile navigation">
        <nav aria-label="Mobile navigation">{links.map((link) => <Link className={pathname === link.href ? 'active-nav' : ''} href={link.href} key={link.href} onClick={close}>{link.label}</Link>)}</nav>
      </aside>
    : null}
  </header>;
}
