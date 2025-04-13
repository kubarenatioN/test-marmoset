import type { MetadataRoute } from 'next';
import { getProjects } from './(pages)/work/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await getProjects()).map((p) => ({
    url: `https://thepolyrhythm.com/work/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as any,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://thepolyrhythm.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://thepolyrhythm.com/work',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://thepolyrhythm.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...projects,
  ];
}
