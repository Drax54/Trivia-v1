import Link from 'next/link'
import categoriesData from '@/data/categories.json'
import quizzes from '@/data/quizzes.json'
import CategoryPageClient from '@/components/CategoryPageClient'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  categoryDescription: string
  tags: string[]
  difficulty: string
  questions: any[]
}

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = categoriesData.categories
  const category = categories.find(cat => cat.id === params.categoryId)
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }
  
  const typedQuizzes = quizzes as Quiz[]
  const categoryQuizzes = typedQuizzes.filter(quiz => quiz.category === params.categoryId)
  const quizCount = categoryQuizzes.length

  const title = `${category.name} Trivia - Interactive ${category.name} Quizzes | TriviaInsider`
  const description = `Challenge yourself with ${category.name.toLowerCase()} trivia quizzes. Test your knowledge across ${quizCount} interactive ${category.name.toLowerCase()} questions with instant feedback and detailed explanations.`

  return {
    robots: "index, follow",
    title,
    description,
    keywords: [`${category.name.toLowerCase()} trivia`, `${category.name.toLowerCase()} quiz`, 'interactive quiz', 'knowledge test', 'brain training'],
    alternates: {
      canonical: `/${params.categoryId}`
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'TriviaInsider',
      url: `https://triviainsider.com/${params.categoryId}`
    },
  }
}

export async function generateStaticParams() {
  const categories = categoriesData.categories
  return categories.map((category) => ({
    categoryId: category.id,
  }))
}

function CategoryPageContent({ params }: CategoryPageProps) {
  const categories = categoriesData.categories
  const category = categories.find(cat => cat.id === params.categoryId)
  const typedQuizzes = quizzes as Quiz[]
  const categoryQuizzes = typedQuizzes.filter(quiz => quiz.category === params.categoryId)

  if (!category) {
    notFound()
  }

  return <CategoryPageClient category={category} categoryQuizzes={categoryQuizzes} />
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent params={params} />
    </Suspense>
  )
} 