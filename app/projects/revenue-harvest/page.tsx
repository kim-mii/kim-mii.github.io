import { ProjectCase } from '../project-case';

export default function RevenueHarvest() {
  return <ProjectCase
    title="Revenue Harvest"
    tags={['Web Design', 'Brand Experience', 'Development']}
    lede="Redesigned Revenue Harvest’s official website ahead of its July 2018 public listing, creating a corporate digital presence inspired by candlestick charts, growth signals, and the company’s upward momentum."
    meta={[{ label: 'Client', value: 'Revenue Harvest' }, { label: 'Year', value: '2018' }, { label: 'Discipline', value: 'Corporate Website Revamp' }]}
    hero={{ src: '/assets/projects/revenue-harvest/revenue-harvest-cover.jpg', alt: 'Revenue Harvest corporate website redesign' }}
    sections={[
      { heading: 'A Listing-Ready Presence', copy: 'The website revamp created a credible corporate presence for Revenue Harvest’s upcoming public listing, with clear signals of business scale and momentum.' },
      { heading: 'Growth as a Visual System', copy: 'Candlestick-chart inspiration and upward triangle elements established a visual language that communicates growth while keeping the site restrained and professional.' },
      { heading: 'Clarity for Every Audience', copy: 'Products, services, partnerships, company information, and investor relations were structured to help visitors understand the business quickly.' },
    ]}
    final={{ src: '/assets/projects/revenue-harvest/Final.jpg', alt: 'Revenue Harvest website screens, visual direction, and corporate information design' }}
    previous="/projects/revenue-investor"
    next="/projects/grand-margherita-hotel"
  />;
}
