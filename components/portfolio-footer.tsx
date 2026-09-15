import { ResumeSelector } from './resume-selector';

export function PortfolioFooter({ statement = 'Design what matters' }: { statement?: string }) {
  const leading = statement.replace(/ matters$/, '');
  return <footer><p>{leading} <i>matters</i></p><div className="footer-links"><ResumeSelector /><a href="https://www.linkedin.com/in/kimmy-yh/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="mailto:kimmy.yh93@gmail.com">Drop a mail <span>↗</span></a></div><small>© 2026 Kimberly Toh</small></footer>;
}
