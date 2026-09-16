import { createMetadata } from '../seo';

export const metadata = createMetadata({
  title: 'Selected Work — Kimberly Toh | Product Designer',
  description: 'Explore selected product design, UX/UI, design system, branding, and digital experience work by Kimberly Toh.',
  path: '/projects/',
});

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
