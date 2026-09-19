import type { Metadata } from 'next';
import Script from 'next/script';
import { createMetadata, siteUrl } from './seo';
import { LanguageProvider } from '../components/language-provider';
import './globals.css';
import './refinements.css';
import './milestone/milestones.css';
import './about/about.css';
import './about/about-english-fix.css';
import './milestone/fixes.css';
import './resume/resume.css';
import './projects/projects.css';
import './projects/balance.css';
import './projects/featured.css';
import './projects/featured-overrides.css';
import './projects/project-detail.css';
import './projects/veriview-refinements.css';
import './projects/veriview-card.css';
import './home-work.css';
import './projects/cursor-refinement.css';
import './projects/project-case-refinements.css';
import './projects/tone-art.css';
import './responsive.css';
import './responsive-final.css';
import './mobile-navigation.css';
import './mobile-floating-menu.css';
import './mobile-menu-refinements.css';
import './collaboration-logos.css';
import './projects/hotel-case-rebuild.css';
import './projects/hotel-image-sequence.css';
import './projects/hktv-3pl-card.css';
import './projects/mms-design-system.css';
import './projects/project-navigation.css';
import './resume-selector.css';
import './language.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createMetadata({
    title: 'Kimberly Toh — Product Designer | Portfolio',
    description: 'Kimberly Toh is a product designer who turns complex workflows, systems, and business needs into clear, intuitive digital experiences.',
    path: '/',
  }),
  verification: { google: 'jXHxTxnmsnfCLp5AmrUmDIRfPu1Fwdq4_xleIPWZY9I' },
  icons: { icon: '/assets/shared/favicon.svg' },
};
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kimberly Toh',
  url: siteUrl,
  jobTitle: 'Product Designer',
  description: 'Product designer who turns complex workflows, systems, and business needs into clear, intuitive digital experiences.',
  sameAs: ['https://www.linkedin.com/in/kimmy-yh/'],
  knowsAbout: ['Product Design', 'UX Design', 'UI Design', 'Design Systems', 'Information Architecture'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>
    <Script id="language-preference-bootstrap" strategy="beforeInteractive">{`(function(){try{var language=localStorage.getItem('kimberlicious-language');if(language==='zh'||language==='en'){document.documentElement.dataset.languagePreference=language;document.documentElement.lang=language==='zh'?'zh-Hant-TW':'en';}else{document.documentElement.dataset.languagePreference='';}}catch(e){}document.documentElement.classList.add('language-preparing');})();`}</Script>
    <Script id="kimberly-toh-person-schema" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(personSchema)}
    </Script>
    <LanguageProvider>{children}</LanguageProvider>
  </body></html>;
}
