import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Define the base URL of the website
  const baseUrl = 'https://fan-alelan.com'; // Make sure this is your production domain

  // Get the current date for the lastModified property
  const lastModified = new Date().toISOString();

  // Define the core, high-value pages for search engines
  const routes = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: 'monthly' as const },
    // Internal page links (#) have been removed to avoid redundancy and focus SEO value.
  ];

  // Map the routes to the sitemap format
  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: route.url,
    lastModified: lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return sitemapEntries;
}
