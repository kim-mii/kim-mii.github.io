import { createMetadata } from '../seo';

export const metadata = createMetadata({
  title: 'About Kimberly Toh | Product Designer',
  description: 'Learn about Kimberly Toh, a product designer focused on making complex products, workflows, and systems feel useful, clear, and human.',
  path: '/about/',
});

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
