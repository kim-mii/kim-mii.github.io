import { ProjectNavigation } from '../../../components/project-navigation';

const visuals = [
  { src: '/assets/projects/hktv-hotel-booking/01 — Cover.jpg', width: 1920, height: 1080 },
  { src: '/assets/projects/hktv-hotel-booking/02 — Project Overview.jpg', width: 1920, height: 1080 },
  { src: '/assets/projects/hktv-hotel-booking/03 — Challenge.jpg', width: 1920, height: 940 },
  { src: '/assets/projects/hktv-hotel-booking/04 — Journey Overview.jpg', width: 1920, height: 940 },
  { src: '/assets/projects/hktv-hotel-booking/05 — Discover.jpg', width: 1920, height: 1200 },
  { src: '/assets/projects/hktv-hotel-booking/06 — Decide.jpg', width: 1920, height: 1200 },
  { src: '/assets/projects/hktv-hotel-booking/07 — Redeem + Confirm.gif', width: 1920, height: 1360 },
  { src: '/assets/projects/hktv-hotel-booking/08 — Reflection.jpg', width: 1920, height: 1040 },
];

export default function HotelBooking() {
  return <main className="case-page hotel-image-case">
    <h1 className="sr-only">HKTVmall Hotel Booking</h1>
    <ProjectNavigation />
    <section className="hotel-image-sequence" aria-label="HKTVmall Hotel Booking case study">
      {visuals.map(({ src, width, height }, index) => <img key={src} src={src} width={width} height={height} alt="" aria-hidden="true" loading={index === 0 ? 'eager' : 'lazy'} />)}
    </section>
  </main>;
}
