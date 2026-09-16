import { createMetadata } from '../../seo';

export const metadata = createMetadata({ title: 'Insiders Club — Hotel Loyalty App Design | Kimberly Toh', description: 'A hotel loyalty app that brings member rewards, hotel discovery, booking offers, payment, and confirmation into one connected experience.', path: '/projects/insiders-club/', image: '/assets/projects/insiders-club/cover.jpg' });

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
