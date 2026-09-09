import Link from 'next/link';
import { PortfolioFooter } from '../../../components/portfolio-footer';
export default function MandarinResume(){return <><main className="resume-viewer"><header className="site-header"><Link className="wordmark" href="/" aria-label="Return to Kimberly Toh homepage">Kimberly Toh</Link></header><section><p className="eyebrow">Mandarin resume</p><h1>Kimberly Toh</h1><div className="resume-frame"><iframe src="/resume-kimberly-zh.pdf#toolbar=0&navpanes=0" title="Kimberly Toh Mandarin resume" /></div></section></main><PortfolioFooter /></>}
