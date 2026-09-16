import type { Metadata } from 'next';
import Script from 'next/script';
import { createMetadata, siteUrl } from './seo';
import './globals.css';
import './refinements.css';
import './milestone/milestones.css';
import './about/about.css';
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
  return <html lang="en"><body>
    <Script id="kimberly-toh-person-schema" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(personSchema)}
    </Script>
    {children}
  </body></html>;
}
