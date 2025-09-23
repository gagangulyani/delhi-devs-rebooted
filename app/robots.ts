import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/auth/'],
    },
    sitemap: 'https://delhidevs.com/sitemap.xml',
  }
}