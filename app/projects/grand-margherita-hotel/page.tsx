import { ProjectCase } from '../project-case';

export default function GrandMargheritaHotel() {
  return <ProjectCase
    title="Grand Margherita Hotel"
    tags={['Branding', 'Hospitality', 'Web Design']}
    lede="A branding and website revamp for Grand Margherita Hotel, positioned as a featured five-star hotel within a wider Hemisphere Hotel Group hospitality identity refresh."
    meta={[{ label: 'Client', value: 'Hemisphere Hotel Group' }, { label: 'Discipline', value: 'Branding & Web Revamp' }]}
    hero={{ src: '/assets/projects/grand-margherita-hotel/Cover.jpg', alt: 'Grand Margherita Hotel branding and website design' }}
    sections={[
      { heading: 'A Group-Wide Refresh', copy: 'Grand Margherita Hotel is one part of a broader branding and website refresh across hotels and resorts in the Hemisphere Hotel Group.' },
      { heading: 'A Featured Kuching Stay', copy: 'The direction frames Grand Margherita as a five-star hotel experience while retaining a coherent relationship with the wider group identity.' },
    ]}
    final={{ src: '/assets/projects/grand-margherita-hotel/Final.jpg', alt: 'Grand Margherita Hotel branding and website redesign' }}
    previous="/projects/revenue-harvest"
    next="/projects/kuching-marathon-2016"
  />;
}
