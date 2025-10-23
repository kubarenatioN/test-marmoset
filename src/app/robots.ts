import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/_next/image*'],
      disallow: ['/api/', '/_next/', '/server/', '/private/', '/admin/'],
    },
    sitemap: 'https://thepolyrhythm.com/sitemap.xml',
  };
}
