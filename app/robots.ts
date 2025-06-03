import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Block all URLs with query parameters to prevent duplicate content
          '/all-topics/?*',
          '/categories/?*',
          '/*?tag=*',
          '/*?category=*',
          '/*?filter=*',
          '/*?search=*',
          // Block any URL with query parameters
          '/*?*'
        ],
      }
    ],
    sitemap: 'https://triviainsider.com/sitemap.xml',
  }
} 