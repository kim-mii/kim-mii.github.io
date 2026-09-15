import { ProjectCase } from '../project-case';

export default function InsidersClub() {
  return <ProjectCase
    title="Insiders Club"
    tags={['App Design', 'UIUX', 'Product Design']}
    lede="Designed a hotel loyalty app for Hemisphere Hotel Group, bringing points, hotel discovery, member benefits, booking deals, payment, and booking confirmation into one member experience."
    meta={[{ label: 'Client', value: 'Hemisphere Hotel Group' }, { label: 'Discipline', value: 'Hotel Loyalty App' }]}
    hero={{ src: '/assets/projects/insiders-club/cover.jpg', alt: 'Insiders Club hotel loyalty app interface' }}
    sections={[
      { heading: 'The Opportunity', copy: 'The loyalty experience needed to make member benefits, points, hotel discovery, and booking offers feel clear and useful throughout a guest journey.' },
      { heading: 'Member Journey', copy: 'The app brings discovery, booking deals, payment, and booking confirmation into a cohesive experience designed around returning hotel guests.' },
      { heading: 'A Connected Loyalty Experience', copy: 'Clear patterns and approachable UI help members understand their benefits and move confidently between hotels, offers, and reservations.' },
    ]}
    final={{ src: '/assets/projects/insiders-club/Final.jpg', alt: 'Insiders Club hotel loyalty app flows, UI design, and mobile screens' }}
    previous="/projects/discover-miri"
    next="/projects/revenue-investor"
  />;
}
