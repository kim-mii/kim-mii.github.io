import { createMetadata } from '../../seo';

export const metadata = createMetadata({ title: 'MMS Design System — Components & Guidelines | Kimberly Toh', description: 'A shared design system of components, patterns, and guidelines that improves consistency, clarity, and delivery speed across the MMS product experience.', path: '/projects/mms-design-system/', image: '/assets/projects/mms-design-system/Design System Cover.jpg' });

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
