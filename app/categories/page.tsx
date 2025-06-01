import Link from 'next/link'
import { 
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
  Leaf 
} from 'lucide-react'
import categoriesData from '@/data/categories.json'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Quiz Categories - Interactive Trivia and Knowledge Tests | Triviaziggle',
  description: 'Explore our comprehensive collection of trivia categories including science, technology, history, and entertainment. Find the perfect quiz to test your knowledge across diverse topics.',
  keywords: ['quiz categories', 'trivia categories', 'science quiz', 'technology quiz', 'history quiz', 'entertainment quiz', 'knowledge test', 'interactive quizzes'],
  alternates: {
    canonical: '/categories'
  },
  openGraph: {
    title: 'All Quiz Categories - Interactive Trivia and Knowledge Tests',
    description: 'Explore our comprehensive collection of trivia categories including science, technology, history, and entertainment. Find the perfect quiz to test your knowledge.',
    type: 'website',
    siteName: 'Triviaziggle',
    url: 'https://triviaziggle.com/categories'
  },
}

const colorClasses = {
  purple: 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300',
  orange: 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300',
  teal: 'bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200 hover:border-teal-300',
  primary: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300',
}

const iconColors = {
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  teal: 'text-teal-600',
  primary: 'text-blue-600',
}

const getIcon = (iconName: string, color: string) => {
  const colorClass = iconColors[color as keyof typeof iconColors] || iconColors.purple;
  
  switch (iconName) {
    case "BookOpen":
      return <BookOpen className={`h-16 w-16 ${colorClass}`} />;
    case "Atom":
      return <Atom className={`h-16 w-16 ${colorClass}`} />;
    case "Globe":
      return <Globe className={`h-16 w-16 ${colorClass}`} />;
    case "BookText":
      return <BookText className={`h-16 w-16 ${colorClass}`} />;
    case "Film":
      return <Film className={`h-16 w-16 ${colorClass}`} />;
    case "Trophy":
      return <Trophy className={`h-16 w-16 ${colorClass}`} />;
    case "Cpu":
      return <Cpu className={`h-16 w-16 ${colorClass}`} />;
    case "Utensils":
      return <Utensils className={`h-16 w-16 ${colorClass}`} />;
    case "Palette":
      return <Palette className={`h-16 w-16 ${colorClass}`} />;
    case "Leaf":
      return <Leaf className={`h-16 w-16 ${colorClass}`} />;
    default:
      return <BookOpen className={`h-16 w-16 ${colorClass}`} />;
  }
};

export default function CategoriesPage() {
  const categories = categoriesData.categories;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">
            Categories
          </span>
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🎯 All Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse collection of trivia categories. Each category contains multiple quizzes 
            with different difficulty levels and topics.
          </p>
        </div>

        {/* Horizontal Cards Layout */}
        <div className="space-y-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className={`block bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-in ${colorClasses[category.color as keyof typeof colorClasses]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-8">
                {/* Icon Section */}
                <div className="flex-shrink-0">
                  {getIcon(category.icon, category.color)}
                </div>
                
                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Tags Section */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-3">Topics include:</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white bg-opacity-80 rounded-lg text-sm font-medium text-gray-700 border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't decide? 🤔
            </h2>
            <p className="text-gray-600 mb-6">
              Start with any category that interests you! All our quizzes are designed to be fun, 
              educational, and engaging regardless of your knowledge level.
            </p>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 