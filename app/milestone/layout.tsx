import { createMetadata } from '../seo';

export const metadata = createMetadata({
  title: 'Career Milestones — Kimberly Toh | Product Designer',
  description: 'Follow Kimberly Toh’s design journey from visual storytelling to scalable product systems, across product, UX/UI, branding, and digital experiences.',
  path: '/milestone/',
});

export default function MilestoneLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
