import { MetadataRoute } from 'next'
import quizzes from '@/data/quizzes.json'
import categoriesData from '@/data/categories.json'

const baseUrl = 'https://triviainsider.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = categoriesData.categories

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/all-topics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Quiz routes - Updated to new URL structure
  const quizRoutes = (quizzes as any[]).map((quiz: any) => ({
    url: `${baseUrl}/quiz/${quiz.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...quizRoutes]
} 