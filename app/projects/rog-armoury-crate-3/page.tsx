import { ProjectCase } from '../project-case';

export default function RogArmouryCrate() {
  return <ProjectCase
    title="ROG Armoury Crate 3.0"
    tags={['UI Design', 'Design System', 'Software Design']}
    lede="Contributed to the UI design and design system development for ROG Armoury Crate 3.0, helping refine a cohesive interface language for a high-performance gaming software experience."
    meta={[{ label: 'Client', value: 'ASUS ROG' }, { label: 'Year', value: '2021' }, { label: 'Contribution', value: 'UI Design & Design System Support' }]}
    hero={{ src: '/assets/projects/rog-armoury-crate-3/rog-armoury-crate-cover.jpg', alt: 'ROG Armoury Crate 3.0 gaming software interface displayed on an ASUS laptop' }}
    sections={[
      { heading: 'The Context', copy: 'Armoury Crate brings system controls, performance settings, lighting, macros, and device management into one unified gaming software experience.' },
      { heading: 'Contribution', copy: 'Supported the project through UI design and design system work, helping create consistent component behavior, interface hierarchy, and visual language across key product screens.' },
      { heading: 'Evolving the Interface', copy: 'Armoury Crate 3.0 moved toward a more focused, modern, and futuristic interface style — balancing high-density system controls with clearer structure and visual hierarchy.' },
      { heading: 'Design System Support', copy: 'Contributed to reusable UI patterns including buttons, dropdowns, tabs, sliders, toggles, checkboxes, and shared interface states.' },
    ]}
    final={{ src: '/assets/projects/rog-armoury-crate-3/rog-armoury-crate-final.jpg', alt: 'ROG Armoury Crate 3.0 interface exploration, UI kit, component system, and final software screens' }}
    seo={{ title: 'ROG Armoury Crate 3.0 — Gaming Software UI Design | Kimberly Toh', description: 'UI and design system contribution for ASUS ROG Armoury Crate 3.0, bringing clearer structure to high-performance gaming software controls.' }}
    previous="/projects/discover-miri"
    next="/projects/asus-veriview"
  />;
}
