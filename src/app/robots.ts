import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://fan-alelan.com'; // Replace with your actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/', // Example of disallowing a directory
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}