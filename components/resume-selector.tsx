'use client';

import { useEffect, useId, useRef, useState } from 'react';

const resumes = [
  { label: '中文履歷', href: '/assets/resumes/履歷_Kimberly.pdf' },
  { label: 'English Resume', href: '/assets/resumes/Resume_Kimberly.pdf' },
];

export function ResumeSelector() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const selectorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => { if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) setOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', closeOnEscape); };
  }, []);

  return <div className="resume-menu" ref={selectorRef}>
    <button className="resume-toggle" type="button" ref={buttonRef} onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-haspopup="menu" aria-controls={menuId}>View resume</button>
    {open && <div className="resume-options" id={menuId} role="menu" aria-label="Resume options">{resumes.map(({ label, href }) => <a href={href} key={label} target="_blank" rel="noopener noreferrer" role="menuitem" aria-label={`Open ${label} PDF in a new tab`} onClick={() => setOpen(false)}>{label}</a>)}</div>}
  </div>;
}
