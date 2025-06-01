import Link from 'next/link'
import quizzes from '@/data/quizzes.json'
import categoriesData from '@/data/categories.json'
import { Metadata } from 'next'
import AllTopicsClient from '@/components/AllTopicsClient'

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

export const metadata: Metadata = {
  robots: "index, follow",
  title: 'All Topics - Trivia Quiz Browser | Triviaziggle',
  description: 'Browse all available trivia topics and tags. Find quizzes by your favorite subjects including movies, TV shows, music, technology, history, science and more.',
  keywords: ['trivia topics', 'quiz categories', 'trivia tags', 'quiz browser', 'entertainment quiz', 'technology quiz', 'history quiz', 'science quiz'],
  alternates: {
    canonical: '/all-topics'
  },
  openGraph: {
    title: 'All Topics - Trivia Quiz Browser',
    description: 'Browse all available trivia topics and tags. Find quizzes by your favorite subjects.',
    type: 'website',
    siteName: 'Triviaziggle',
    url: 'https://triviaziggle.com/all-topics'
  },
}

export default function AllTopicsPage() {
  // Get all unique tags from all quizzes
  const typedQuizzes = quizzes as Quiz[]
  const allTags = Array.from(new Set(typedQuizzes.flatMap(quiz => quiz.tags))).sort()
  
  // Group tags by category for better organization
  const tagsByCategory = typedQuizzes.reduce((acc, quiz) => {
    if (!acc[quiz.category]) {
      acc[quiz.category] = new Set<string>()
    }
    quiz.tags.forEach(tag => acc[quiz.category].add(tag))
    return acc
  }, {} as Record<string, Set<string>>)

  // Convert sets to sorted arrays
  const organizedTags = Object.entries(tagsByCategory).reduce((acc, [category, tagSet]) => {
    acc[category] = Array.from(tagSet).sort()
    return acc
  }, {} as Record<string, string[]>)

  const categories = categoriesData.categories

  return <AllTopicsClient allTags={allTags} organizedTags={organizedTags} categories={categories} />
} 