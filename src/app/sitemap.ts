import type { MetadataRoute } from 'next';
import { getProjects } from './(pages)/work/data';

export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await getProjects()).map((p) => {
    const images = [];
    images.push(p.previewUrl);

    return {
      url: `https://thepolyrhythm.com/work/${p.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as any,
      priority: 0.8,
      images,
    };
  });

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
      priority: 0.9,
    },
    {
      url: 'https://thepolyrhythm.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects,
  ];
}
