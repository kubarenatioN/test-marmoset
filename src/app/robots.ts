import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/_next/static/', // Essential for CSS/JS to render the page correctly
        '/_next/image', // CRITICAL: Allows Googlebot-Image to crawl optimized Cloudinary images
      ],
      disallow: ['/api/', '/server/', '/private/', '/admin/'],
    },
    sitemap: 'https://thepolyrhythm.com/sitemap.xml',
  };
}
