import { ProjectCase } from '../project-case';

export default function RevenueInvestor() {
  return <ProjectCase
    title="Revenue Investor"
    tags={['App Design', 'UIUX', 'Product Design']}
    lede="Designed a mobile investor relations app for Revenue Group Berhad, making share price information, announcements, reports, company information, and financial documents easy to find and use."
    meta={[{ label: 'Client', value: 'Revenue Group Berhad' }, { label: 'Discipline', value: 'Investor Relations App' }]}
    hero={{ src: '/assets/projects/revenue-investor/cover.jpg', alt: 'Revenue Investor app interface and investor relations information' }}
    sections={[
      { heading: 'Investor Information, Made Clear', copy: 'The app brings fast-moving share price information, company announcements, reports, and financial documents into one clear mobile reference.' },
      { heading: 'A Focused Mobile Experience', copy: 'Information hierarchy and simple navigation help investors move directly from market context to the documents and company details they need.' },
      { heading: 'Designed for Ongoing Access', copy: 'The experience supports regular check-ins with accessible company information and downloadable documents across key investor moments.' },
    ]}
    final={{ src: '/assets/projects/revenue-investor/Final.jpg', alt: 'Revenue Investor mobile app screens, investor information, and interface design' }}
    previous="/projects/insiders-club"
    next="/projects/revenue-harvest"
  />;
}
