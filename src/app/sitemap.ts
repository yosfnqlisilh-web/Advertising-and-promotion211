
import { MetadataRoute } from 'next';
import { services, blogPosts } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://fan-alelan.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes = [
    '/',
    '/services',
    '/gallery',
    '/blog',
    '/faq',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // Dynamic service pages
  const serviceRoutes = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic blog post pages
  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
