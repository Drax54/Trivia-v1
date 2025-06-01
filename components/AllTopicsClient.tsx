'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Home, 
  ChevronRight,
  Tag,
  Grid3X3,
  BookOpen,
  Atom,
  Globe,
  Film,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  tags: string[]
  totalQuizzes: number
}

interface AllTopicsClientProps {
  allTags: string[]
  organizedTags: Record<string, string[]>
  categories: Category[]
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "BookOpen":
      return <BookOpen className="h-6 w-6" />;
    case "Atom":
      return <Atom className="h-6 w-6" />;
    case "Globe":
      return <Globe className="h-6 w-6" />;
    case "Film":
      return <Film className="h-6 w-6" />;
    default:
      return <Tag className="h-6 w-6" />;
  }
};

const getCategoryColor = (categoryId: string) => {
  switch (categoryId) {
    case 'technology':
      return 'border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50'
    case 'history':
      return 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50'
    case 'science':
      return 'border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50'
    case 'entertainment':
      return 'border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50'
    default:
      return 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50'
  }
}

const getCategoryGradient = (categoryId: string) => {
  switch (categoryId) {
    case 'technology':
      return 'from-purple-500 to-indigo-600'
    case 'history':
      return 'from-orange-500 to-amber-600'
    case 'science':
      return 'from-teal-500 to-cyan-600'
    case 'entertainment':
      return 'from-pink-500 to-rose-600'
    default:
      return 'from-gray-500 to-slate-600'
  }
}

export default function AllTopicsClient({ allTags, organizedTags, categories }: AllTopicsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTags = allTags.filter(tag => 
    tag.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || organizedTags[selectedCategory]?.includes(tag))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">All Topics</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl shadow-xl">
                <Grid3X3 className="h-16 w-16 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30 scale-110"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">All Topics</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover and explore all available trivia topics across our quiz collection. Click any topic to filter quizzes by category.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md">
              <div className="p-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">{allTags.length} total topics</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md">
              <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                <Tag className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">{categories.length} categories</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-scale-in">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl bg-white"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 animate-bounce-in">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`tag ${selectedCategory === 'all' ? 'tag-active' : 'tag-inactive'}`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`tag flex items-center gap-2 ${selectedCategory === category.id ? 'tag-active' : 'tag-inactive'}`}
              >
                {getIcon(category.icon)}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tags organized by category */}
        <div className="space-y-8">
          {Object.entries(organizedTags).map(([categoryId, categoryTags], categoryIndex) => {
            const category = categories.find(c => c.id === categoryId)
            if (!category) return null

            const visibleTags = categoryTags.filter(tag => 
              tag.toLowerCase().includes(searchQuery.toLowerCase()) &&
              (selectedCategory === 'all' || selectedCategory === categoryId)
            )

            if (visibleTags.length === 0) return null

            return (
              <div 
                key={categoryId} 
                className={`p-8 rounded-3xl border-2 ${getCategoryColor(categoryId)} shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in`}
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${getCategoryGradient(categoryId)} shadow-lg`}>
                    {getIcon(category.icon)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">({visibleTags.length} topics)</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <TrendingUp className="h-3 w-3" />
                        <span>Popular</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                  {visibleTags.map((tag, tagIndex) => (
                    <Link
                      key={`${categoryId}-${tag}`}
                      href={`/${categoryId}?tag=${encodeURIComponent(tag)}`}
                      className="group block p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-scale-in"
                      style={{ animationDelay: `${(categoryIndex * 0.2) + (tagIndex * 0.05)}s` }}
                    >
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors text-center">
                        {tag}
                      </div>
                      <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Zap className="h-3 w-3 text-purple-500" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* No results */}
        {filteredTags.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-gray-400 mb-6">
              <Search className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No topics found</h3>
            <p className="text-gray-500 text-lg">
              No topics match your search criteria. Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 