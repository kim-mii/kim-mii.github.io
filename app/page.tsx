import Link from 'next/link';

const projects = [
  { name: '3PL MMS', type: 'Complex B2B Product Design', kind: 'systems', className: 'project--wide' },
  { name: 'Keyword Search', type: 'Product Strategy, UX Research & Design System', kind: 'search', className: 'project--tall' },
  { name: 'MMS Design System', type: 'Design Governance & Component Standards', kind: 'library', className: 'project--compact' },
  { name: 'HKTVmall WeChat Mini Program', type: 'Cross-market B2C Commerce Experience', kind: 'commerce', className: 'project--wide' },
];
const experiences = [
  ['Shoalter of HKTV Group', [['Staff Product Designer', '10.2024 – 03.2026'], ['Senior Product Designer', '06.2022 – 09.2024']]],
  ['ASUS — HQ Design Centre', [['Senior UI Designer', '03.2021 – 10.2021']]],
  ['Core System', [['Jr. Creative & Art Director', '06.2018 – 12.2020'], ['UIUX Designer', '05.2015 – 05.2018']]],
];
const brands = [
  ['HKTVmall', 'Product Design, B2C Commerce & Design Systems'], ['Shoalter', 'B2B Product Design, 3PL & Merchant Management'], ['ASUS', 'UI Design & Commercial Design Guidelines'], ['Revenue Harvest', 'Web UI/UX Design'], ['revPAY', 'App UI/UX & Brand Experience'], ['Visit Miri', 'Tourism Brand Identity & Digital Design'], ['Grand Margherita', 'Website Design'], ['Hemispheres', 'App UI/UX Design'],
];
function ProjectVisual({ kind }: { kind: string }) { return <div className={`project-visual project-visual--${kind}`} aria-hidden="true"><i /><b /><em /><span /></div>; }

export default function Home() {
  return <main>
    <header className="site-header"><Link className="wordmark" href="/">Kimberly Toh</Link><nav aria-label="Primary navigation"><Link href="/milestone">My Milestones</Link><Link href="/projects">My Work</Link><Link href="/about">Me</Link></nav></header>
    <section className="hero" aria-labelledby="hero-title"><p className="eyebrow">Staff Product Designer · UIUX Designer</p><h1 id="hero-title">I shape <span>complexity</span><br />into <i>clarity.</i></h1><p className="hero-copy">I simplify complex workflows, design scalable systems, and turn business needs into intuitive product experiences.</p></section>
    <section id="contributions" className="section contributions" aria-labelledby="contributions-title"><div className="section-intro"><p className="eyebrow">01 / Selected work</p><h2 id="contributions-title">My Work</h2></div><div className="project-grid">{projects.map((project, i) => <Link href={`/projects#${project.name.toLowerCase().replaceAll(' ', '-')}`} className={`project ${project.className}`} key={project.name} aria-label={`View ${project.name} project`}><ProjectVisual kind={project.kind} /><div className="project-caption"><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{project.name}</h3><p>{project.type}</p></div><b>↗</b></div></Link>)}</div><Link className="soft-button all-works" href="/projects">Explore All Works <span>↗</span></Link></section>
    <section className="section adventures" aria-labelledby="adventures-title"><div className="section-intro"><p className="eyebrow">02 / Experience</p><h2 id="adventures-title">My Adventures</h2></div><div className="experience-labels" aria-hidden="true"><span>Company</span><span>Role</span><span>Period</span></div><div className="experience-list">{experiences.map(([company, roles]) => <article className="experience" key={company as string}><h3>{company === 'Core System' ? <>Core System Technologies <i>— Malaysia</i></> : company as string}</h3><div>{(roles as string[][]).map(([role, period]) => <div className="role" key={role}><p>{role}</p><time>{period}</time></div>)}</div></article>)}</div></section>
    <section className="section know-me" aria-labelledby="know-title"><div className="know-heading"><p className="eyebrow">03 / A little more</p><h2 id="know-title" className="statement">A love of beautiful things evolved into a passion for creating useful, thoughtful products beyond decoration.</h2><Link className="soft-button" href="/about">Get to know me <span>↗</span></Link></div><div className="know-content"><div className="clusters"><div><p className="eyebrow">Core Strengths</p><ul><li>Product Design</li><li>UX Design</li><li>UI Design</li><li>UX Copywriting</li><li>Design System</li><li>UX Research</li><li>Information Architecture</li><li>Design with AI</li></ul><p className="eyebrow tools-label">Tools</p><ul className="tools-list"><li>Figma</li><li>Adobe Creative Suite</li><li>Maze</li><li>Codex</li><li>Claude</li></ul></div></div></div></section>
    <section className="brand-section" aria-labelledby="brands-title"><div className="section-intro"><p className="eyebrow">04 / Collaboration</p><h2 id="brands-title">Together we <i>move things forward</i></h2></div><div className="marquee" tabIndex={0} aria-label="Brands Kimberly has collaborated with. Focus to pause the carousel."><div className="marquee-track">{[...brands, ...brands].map(([brand, detail], index) => <button className="brand" key={`${brand}-${index}`} type="button" aria-label={`${brand}: ${detail}`}><span className="tooltip" role="tooltip">{detail}</span><strong>{brand}</strong></button>)}</div></div></section>
    <footer><p>Design what <i>matters</i></p><div className="footer-links"><a href="/Kimberly_2026履歷.pdf" target="_blank" rel="noreferrer">View Resume <span>↗</span></a><a href="https://www.linkedin.com/in/kimmy-yh/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="mailto:kimmy.yh93@gmail.com">Drop a mail <span>↗</span></a></div><small>© 2026 Kimberly Toh</small></footer>
  </main>;
}
