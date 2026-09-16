import type { Metadata } from 'next';

export const siteUrl = 'https://kimberlicious.com';

type SeoPage = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createMetadata({ title, description, path, image = '/assets/Logomark.png' }: SeoPage): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: path,
      siteName: 'Kimberly Toh',
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
