import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/work/brightbase/`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${siteUrl}/work/maineclean/`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${siteUrl}/work/linx/`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${siteUrl}/work/agent-command-center/`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${siteUrl}/work/m-studio-tools/`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${siteUrl}/work/m-linx-guide/`, changeFrequency: 'yearly', priority: 0.6 },
  ];
}
