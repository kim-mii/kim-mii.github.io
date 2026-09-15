import { ProjectNavigation } from '../../../components/project-navigation';

const visuals = [
  '/assets/projects/hktv-hotel-booking/01 — Cover.jpg',
  '/assets/projects/hktv-hotel-booking/02 — Project Overview.jpg',
  '/assets/projects/hktv-hotel-booking/03 — Challenge.jpg',
  '/assets/projects/hktv-hotel-booking/04 — Journey Overview.jpg',
  '/assets/projects/hktv-hotel-booking/05 — Discover.jpg',
  '/assets/projects/hktv-hotel-booking/06 — Decide.jpg',
  '/assets/projects/hktv-hotel-booking/07 — Redeem + Confirm.gif',
  '/assets/projects/hktv-hotel-booking/08 — Reflection.jpg',
];

export default function HotelBooking() {
  return <main className="case-page hotel-image-case">
    <ProjectNavigation />
    <section className="hotel-image-sequence" aria-label="HKTVmall Hotel Booking case study">
      {visuals.map((src, index) => <img key={src} src={src} alt="" aria-hidden="true" loading={index === 0 ? 'eager' : 'lazy'} />)}
    </section>
  </main>;
}
