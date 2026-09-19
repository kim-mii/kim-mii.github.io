'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export type Language = 'en' | 'zh';
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; ready: boolean; needsChoice: boolean };
const preferenceKey = 'kimberlicious-language';
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setCurrentLanguage] = useState<Language>('en');
  const [ready, setReady] = useState(false);
  const [needsChoice, setNeedsChoice] = useState(false);
  const choices = useRef<HTMLDialogElement>(null);
  const originalMeta = useRef<Record<string, { title: string; description: string }>>({});
  useEffect(() => {
    const saved = window.localStorage.getItem(preferenceKey);
    if (saved === 'en' || saved === 'zh') setCurrentLanguage(saved);
    else setNeedsChoice(true);
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language === 'zh' ? 'zh-Hant-TW' : 'en';
    document.documentElement.dataset.languagePreference = language;
    document.documentElement.classList.remove('language-preparing');
  }, [language, ready]);
  useEffect(() => {
    if (!ready) return;
    const zhMeta: Record<string, [string, string]> = {
      '/': ['Kimberly Toh｜產品設計師作品集', 'Kimberly Toh 將複雜流程、系統與商業需求轉化為清晰直覺的數位產品體驗。'],
      '/projects': ['我做過的酷東西｜Kimberly Toh', '收錄產品、UIUX、品牌、包裝與數位體驗等不同領域的作品。'],
      '/milestone': ['我的闖關紀錄｜Kimberly Toh', '從把故事說好，到把系統做好。'],
      '/about': ['我是誰｜Kimberly Toh', '產品設計師 Kimberly Toh 的故事與設計觀點。'],
    };
    const key = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    if (!zhMeta[key]) return;
    if (!originalMeta.current[key]) originalMeta.current[key] = { title: document.title, description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || '' };
    const original = originalMeta.current[key];
    const [title, description] = language === 'zh' ? zhMeta[key] : [original.title, original.description];
    document.title = title;
    ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[name="twitter:title"]', 'meta[name="twitter:description"]'].forEach((selector) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = selector.includes('description') ? description : title;
    });
  }, [language, pathname, ready]);
  useEffect(() => { if (!needsChoice) return; document.body.style.overflow = 'hidden'; requestAnimationFrame(() => choices.current?.querySelector<HTMLButtonElement>('button')?.focus()); return () => { document.body.style.overflow = ''; }; }, [needsChoice]);
  const setLanguage = (next: Language) => { window.localStorage.setItem(preferenceKey, next); setCurrentLanguage(next); setNeedsChoice(false); };
  const chooseInitialLanguage = (next: Language) => { setLanguage(next); window.location.assign('/'); };
  const trapChoiceFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => { if (event.key !== 'Tab') return; const buttons = [...(choices.current?.querySelectorAll<HTMLButtonElement>('button') || [])]; if (!buttons.length) return; const first = buttons[0]; const last = buttons[buttons.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } };
  return <LanguageContext.Provider value={{ language, setLanguage, ready, needsChoice }}>{children}{ready && needsChoice ? <div className="language-gate"><div className="language-gate__backdrop" /><dialog open className="language-gate__dialog" aria-labelledby="language-gate-title" ref={choices} onKeyDown={trapChoiceFocus}><p id="language-gate-title">Choose your language<br /><span>選擇語言</span></p><div><button type="button" onClick={() => chooseInitialLanguage('zh')}>中文</button><button type="button" onClick={() => chooseInitialLanguage('en')}>English</button></div></dialog></div> : null}</LanguageContext.Provider>;
}

export function useLanguage() { const context = useContext(LanguageContext); if (!context) throw new Error('useLanguage must be used inside LanguageProvider'); return context; }
