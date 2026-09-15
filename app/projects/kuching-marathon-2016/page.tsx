import { ProjectCase } from '../project-case';

export default function KuchingMarathon() {
  return <ProjectCase
    title="Kuching Marathon 2016"
    tags={['Web Design', 'UX Design', 'Development']}
    lede="Designed the official Kuching Marathon 2016 website to turn event interest into participation, creating a clearer registration journey and helping attract more than 1,000 additional runners compared with 2015."
    meta={[{ label: 'Client', value: 'Kuching Marathon' }, { label: 'Year', value: '2016' }, { label: 'Discipline', value: 'Official Event Website' }]}
    hero={{ src: '/assets/projects/kuching-marathon-2016/cover.jpg', alt: 'Kuching Marathon 2016 official event website' }}
    sections={[
      { heading: 'From Interest to Registration', copy: 'The official event website was designed to guide visitors quickly from marathon interest to a confident registration decision.' },
      { heading: 'Everything Runners Need', copy: 'Race information, countdown, schedules, route details, and the registration journey were organised into a clear, responsive event experience.' },
      { heading: 'A Stronger Starting Line', copy: 'The clearer digital journey helped the event attract more than 1,000 additional participants compared with the previous year.' },
    ]}
    final={{ src: '/assets/projects/kuching-marathon-2016/final.jpg', alt: 'Kuching Marathon 2016 website design, registration journey, and responsive screens' }}
    previous="/projects/grand-margherita-hotel"
  />;
}
