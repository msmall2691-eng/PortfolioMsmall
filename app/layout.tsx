import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { profile } from '@/content/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const description =
  'Business systems, implementation and front-end work by Megan Small — websites, workflows, integrations and the data underneath, shaped by running a multi-crew service company in Maine.';

export const metadata: Metadata = {
  title: `${profile.name} — Business Systems & Implementation`,
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Business Systems & Implementation`,
    description,
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#212539',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
