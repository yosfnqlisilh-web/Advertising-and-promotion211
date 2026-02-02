import { MetadataRoute } from 'next'
import { posts } from './lib/blog-data' // Assuming this is where your blog posts are
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Base static routes
  const staticRoutes = [
    {
      url: 'https://fan-alelan.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://fan-alelan.com/gallery',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://fan-alelan.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
     {
      url: 'https://fan-alelan.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Dynamic routes for blog posts
  const postRoutes = posts.map((post) => ({
    url: `https://fan-alelan.com/blog/${post.slug}`,
    lastModified: new Date(), // You can use a post-specific date if you have one
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

 
  return [...staticRoutes, ...postRoutes];
}