import Link from 'next/link'
import quizzes from '@/data/quizzes.json'
import categoriesData from '@/data/categories.json'
import QuizPageClient from '@/components/QuizPageClient'
import { Metadata } from 'next'
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
  articleContent: string
  metaDescription?: string
}

interface QuizPageProps {
  params: {
    quizId: string
  }
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const typedQuizzes = quizzes as Quiz[]
  const quiz = typedQuizzes.find(q => q.id === params.quizId)
  
  if (!quiz) {
    return {
      title: 'Quiz Not Found',
      description: 'The requested quiz could not be found.',
      robots: 'noindex, nofollow'
    }
  }
  
  return {
    robots: "index, follow",
    title: `${quiz.title} - Interactive Trivia Quiz | TriviaInsider`,
    description: `${quiz.description} Test your knowledge with this interactive ${quiz.category} trivia quiz featuring ${quiz.questions.length} challenging questions.`,
    keywords: [quiz.title, `${quiz.category} quiz`, 'trivia', 'interactive quiz', 'knowledge test', ...quiz.tags],
    alternates: {
      canonical: `/quiz/${params.quizId}`
    },
    openGraph: {
      title: `${quiz.title} - Interactive Trivia Quiz`,
      description: quiz.description,
      type: 'website',
      siteName: 'TriviaInsider',
      url: `https://triviainsider.com/quiz/${params.quizId}`
    },
  }
}

export async function generateStaticParams() {
  const typedQuizzes = quizzes as Quiz[]
  return typedQuizzes.map((quiz) => ({
    quizId: quiz.id,
  }))
}

export default function QuizPage({ params }: QuizPageProps) {
  const typedQuizzes = quizzes as Quiz[]
  const quiz = typedQuizzes.find(q => q.id === params.quizId)
  const categories = categoriesData.categories

  if (!quiz) {
    notFound()
  }

  // Find the category based on the quiz's category field
  const category = categories.find(cat => cat.id === quiz.category)

  if (!category) {
    notFound()
  }

  // Pass the categoryId from the quiz data to maintain breadcrumbs
  return <QuizPageClient quiz={quiz} categoryId={quiz.category} />
} 