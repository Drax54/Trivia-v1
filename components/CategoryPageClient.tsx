'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Search, 
  Clock, 
  Star, 
  Home, 
  ChevronRight,
  BookOpen,
  Atom,
  Globe,
  BookText,
  Film,
  Trophy,
  Cpu,
  Utensils,
  Palette,
  Leaf,
  Grid3X3,
  Play,
  ArrowRight
} from 'lucide-react'

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

interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  tags: string[]
}

interface CategoryPageClientProps {
  category: Category
  categoryQuizzes: Quiz[]
}

const difficultyColors = {
  Easy: 'bg-green-50 text-green-600 border-green-200',
  Medium: 'bg-amber-50 text-amber-600 border-amber-200',
  Hard: 'bg-red-50 text-red-600 border-red-200',
}

const difficultyGlowColors = {
  Easy: 'shadow-green-200',
  Medium: 'shadow-orange-200', 
  Hard: 'shadow-red-200',
}

const categoryGradients = {
  technology: 'from-purple-50 to-indigo-50',
  entertainment: 'from-pink-50 to-rose-50',
  history: 'from-orange-50 to-amber-50',
  science: 'from-teal-50 to-cyan-50',
  default: 'from-gray-50 to-slate-50'
}

const categoryAccents = {
  technology: 'border-purple-200 hover:border-purple-300',
  entertainment: 'border-pink-200 hover:border-pink-300',
  history: 'border-orange-200 hover:border-orange-300',
  science: 'border-teal-200 hover:border-teal-300',
  default: 'border-gray-200 hover:border-gray-300'
}

const categoryTitleColors = {
  technology: 'group-hover:text-purple-600',
  entertainment: 'group-hover:text-pink-600',
  history: 'group-hover:text-orange-600',
  science: 'group-hover:text-teal-600',
  default: 'group-hover:text-gray-600'
}

const categoryButtons = {
  technology: 'border-purple-200 text-purple-600 hover:bg-purple-50',
  entertainment: 'border-pink-200 text-pink-600 hover:bg-pink-50',
  history: 'border-orange-200 text-orange-600 hover:bg-orange-50',
  science: 'border-teal-200 text-teal-600 hover:bg-teal-50',
  default: 'border-gray-200 text-gray-600 hover:bg-gray-50'
}

// Function to get tag colors - 4 rotating colors
const getTagColor = (tag: string, index: number) => {
  const tagColors = [
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-blue-50 text-blue-700 border-blue-200', 
    'bg-green-50 text-green-700 border-green-200',
    'bg-orange-50 text-orange-700 border-orange-200'
  ];
  
  return tagColors[index % 4];
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "BookOpen":
      return <BookOpen className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Atom":
      return <Atom className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Globe":
      return <Globe className="h-16 w-16 text-purple-600 mx-auto" />;
    case "BookText":
      return <BookText className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Film":
      return <Film className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Trophy":
      return <Trophy className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Cpu":
      return <Cpu className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Utensils":
      return <Utensils className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Palette":
      return <Palette className="h-16 w-16 text-purple-600 mx-auto" />;
    case "Leaf":
      return <Leaf className="h-16 w-16 text-purple-600 mx-auto" />;
    default:
      return <BookOpen className="h-16 w-16 text-purple-600 mx-auto" />;
  }
};

export default function CategoryPageClient({ category, categoryQuizzes }: CategoryPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  // Get tag from URL parameters
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag')
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl)
    }
  }, [searchParams])

  // Update URL when tag changes
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    const params = new URLSearchParams(searchParams)
    
    if (tag) {
      params.set('tag', tag)
    } else {
      params.delete('tag')
    }
    
    router.push(`/${category.id}?${params.toString()}`)
  }

  const filteredQuizzes = useMemo(() => {
    return categoryQuizzes.filter(quiz => {
      const matchesTag = !selectedTag || quiz.tags.includes(selectedTag)
      const matchesSearch = !searchQuery || 
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTag && matchesSearch
    })
  }, [categoryQuizzes, selectedTag, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link href="/categories" className="hover:text-purple-600 transition-colors">
            Categories
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium capitalize">
            {category.name} Trivia
          </span>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{getIcon(category.icon)}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {categoryQuizzes.length > 0 ? categoryQuizzes[0].categoryDescription : category.description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tag Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleTagChange('')}
              className={`tag ${selectedTag === '' ? 'tag-active' : 'tag-inactive'}`}
            >
              All
            </button>
            {category.tags.map((tag, index) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`tag ${selectedTag === tag ? 'tag-active' : 'tag-inactive'}`}
              >
                {tag}
              </button>
            ))}
            <Link
              href="/all-topics"
              className="tag tag-special flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              <Grid3X3 className="h-4 w-4" />
              All Topics
            </Link>
          </div>
        </div>

        {/* Quiz Grid - Changed to 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Content */}
              <div className="p-6 bg-white">
                {/* Tags and Difficulty Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap gap-1">
                    {quiz.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-md text-xs font-medium border ${getTagColor(tag, tagIndex)}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {quiz.tags.length > 2 && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium border border-gray-100">
                        +{quiz.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold border ${difficultyColors[quiz.difficulty as keyof typeof difficultyColors]}`}>
                    {quiz.difficulty}
                  </span>
                </div>

                {/* Title - Clean and Prominent */}
                <Link href={`/quiz/${quiz.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 leading-tight cursor-pointer transition-colors duration-300 hover:text-purple-600">
                    {quiz.title}
                  </h3>
                </Link>

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{quiz.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button - Modern, Centered Design */}
                <div className="text-center">
                  <Link
                    href={`/quiz/${quiz.id}`}
                    className="inline-flex items-center gap-2 py-2 px-6 rounded-full font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 text-sm shadow-sm hover:shadow-md group/btn"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Start Quiz</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-500">
              {selectedTag 
                ? `No quizzes found for "${selectedTag}" tag. Try selecting a different tag or search term.`
                : 'No quizzes match your search. Try a different search term.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 