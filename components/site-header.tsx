'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './language-provider';
import { useTranslation } from './translation';

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
  const { language } = useLanguage();
  const t = useTranslation();

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
  const visibleLinks = links.map((link) => ({ ...link, label: link.href === '/milestone' ? t('nav.milestones', 'My Milestones') : link.href === '/projects' ? t('nav.work', 'My Work') : t('nav.me', 'Me') }));
  return <header className="site-header">
    <a className="wordmark" href="/" aria-label={language === 'zh' ? '返回 Kimberly Toh 首頁' : 'Return to Kimberly Toh homepage'}>
      <img className="wordmark-logo" src="/assets/Logomark.png" alt="Kimberly Toh" width={761} height={174} />
    </a>
    <div className="header-actions"><nav className="desktop-navigation" aria-label={language === 'zh' ? '主要導覽' : 'Primary navigation'}>{visibleLinks.map((link) => <a className={pathname === link.href ? 'active-nav' : ''} href={`${link.href}/`} key={link.href}>{link.label}</a>)}</nav><LanguageSwitcher />
    <button className={`menu-button ${open ? 'is-open' : ''}`} type="button" ref={menuButton} aria-label={open ? t('menu.close', 'Close navigation menu') : t('menu.open', 'Open navigation menu')} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => open ? close() : setOpen(true)}><span /><span /><span /></button></div>
    {open ?
      <aside id="mobile-navigation" className="navigation-drawer" ref={drawer} aria-label="Mobile navigation">
        <nav aria-label={language === 'zh' ? '行動版導覽' : 'Mobile navigation'}>{visibleLinks.map((link) => <a className={pathname === link.href ? 'active-nav' : ''} href={`${link.href}/`} key={link.href} onClick={close}>{link.label}</a>)}</nav>
      </aside>
    : null}
  </header>;
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeMenu = (event: PointerEvent) => { if (!menu.current?.contains(event.target as Node)) setOpen(false); };
    const closeEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', closeMenu); document.addEventListener('keydown', closeEscape);
    return () => { document.removeEventListener('pointerdown', closeMenu); document.removeEventListener('keydown', closeEscape); };
  }, [open]);
  const t = useTranslation();
  return <div className="language-switcher" ref={menu}><button className="language-switcher__toggle" type="button" aria-label={t('nav.switch', 'Switch language')} aria-expanded={open} aria-haspopup="menu" aria-controls="language-menu" onClick={() => setOpen((current) => !current)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M3.8 12h16.4M12 3.5c2.3 2.3 3.5 5.1 3.5 8.5S14.3 18.2 12 20.5C9.7 18.2 8.5 15.4 8.5 12S9.7 5.8 12 3.5" /></svg></button>{open ? <div id="language-menu" className="language-switcher__menu" role="menu" aria-label={t('nav.choose', 'Choose language')}><button type="button" role="menuitemradio" aria-checked={language === 'zh'} aria-current={language === 'zh'} onClick={() => { setLanguage('zh'); setOpen(false); }}>中文</button><button type="button" role="menuitemradio" aria-checked={language === 'en'} aria-current={language === 'en'} onClick={() => { setLanguage('en'); setOpen(false); }}>English</button></div> : null}</div>;
}
