import { ProjectCase } from '../project-case';

export default function DiscoverMiri() {
  return <ProjectCase
    title="Discover Miri"
    tags={['Product Design', 'App Design', 'UIUX']}
    lede="Discover Miri was my first fully owned Product Design project, created for Miri City Council. As the sole designer, I shaped the experience from research and product structure to user flows, wireframes, visual UI, and the component system."
    meta={[{ label: 'Client', value: 'Miri City Council' }, { label: 'Year', value: '2018' }, { label: 'Role', value: 'Product Designer' }, { label: 'Contribution', value: 'Sole Designer, End-to-End Product Design' }]}
    hero={{ src: '/assets/projects/discover-miri/cover.jpg', alt: 'Discover Miri mobile app interface and tourism branding' }}
    sections={[
      { heading: 'The Opportunity', copy: 'Miri needed a more accessible way for visitors to discover its attractions, food, local experiences, and travel information through one mobile experience.' },
      { heading: 'The Challenge', copy: 'The app needed to turn a broad range of tourism content into a clear, approachable journey — helping visitors decide where to go, what to do, and how to explore the city.' },
      { heading: 'My Role', copy: 'As the sole Product Designer, I was fully responsible for research, product structure, user flows, wireframes, UI design, visual language, and reusable components.' },
      { heading: 'Designing the Journey', copy: 'From trip planning and discovery to maps, search, saved places, and user profiles, the experience was designed to make Miri feel easier to explore before and during a visit.' },
      { heading: 'Building a Consistent System', copy: 'A fresh visual language, clear component patterns, and a cohesive color system helped create a friendly tourism experience across the app.' },
    ]}
    final={{ src: '/assets/projects/discover-miri/discover-miri-final.jpg', alt: 'Discover Miri app research, user flow, wireframes, components, mobile screens, and interface design' }}
    next="/projects/rog-armoury-crate-3"
  />;
}
