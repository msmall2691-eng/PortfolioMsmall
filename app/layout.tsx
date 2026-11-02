import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { profile } from '@/content/site';
import './globals.css';

/**
 * Fonts are committed to the repo and loaded from disk rather than fetched
 * from Google at build time, so the build needs no network and cannot fail
 * on a font request. Both files are variable (one file covers the whole
 * weight range) and carry the `latin` subset, which covers every character
 * on this page. See README.md → Fonts.
 */
const inter = localFont({
  src: [{ path: './fonts/inter-latin-var.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const jetbrains = localFont({
  src: [
    { path: './fonts/jetbrains-mono-latin-var.woff2', weight: '400 500', style: 'normal' },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

const description =
  'Megan Small designs, models and builds business systems — data models, workflows, integrations and the interfaces on top of them, shaped by running a multi-crew service company in Maine.';

export const metadata: Metadata = {
  title: `${profile.name} — Business Systems & Front-End Development`,
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Business Systems & Front-End Development`,
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
