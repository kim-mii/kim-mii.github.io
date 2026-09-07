import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Kimberly Toh — Product Designer', description: 'Portfolio of Kimberly Toh, Staff Product Designer and UIUX Designer.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
