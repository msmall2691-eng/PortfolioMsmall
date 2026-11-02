import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { profile, siteUrl } from '@/content/site';
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
  'Business systems, implementation and front-end work by Megan Small — websites, workflows, integrations and the data underneath, shaped by running a multi-crew service company in Maine.';

const title = `${profile.name} — Business Systems & Implementation`;

/**
 * Link previews (LinkedIn, email, iMessage, Slack) read these tags. The
 * share image is public/og.jpg, 1200×630. metadataBase makes every URL
 * absolute on the custom domain, and the canonical tag keeps the
 * *.vercel.app aliases from competing with it in search.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: profile.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${profile.name} — Building the systems small businesses run on` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.jpg'],
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
