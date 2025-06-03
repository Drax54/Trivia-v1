import Link from 'next/link'
import { Brain, Target, Zap, Users, Home, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: "index, follow",
  title: 'About TriviaInsider - Interactive Trivia Quizzes and Knowledge Tests',
  description: 'Learn about TriviaInsider, your premier destination for interactive trivia quizzes across multiple categories. Join millions in challenging your knowledge and brain training.',
  keywords: ['about triviainsider', 'trivia quiz platform', 'knowledge testing', 'brain training', 'educational quizzes'],
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    title: 'About TriviaInsider - Interactive Trivia Quizzes',
    description: 'Learn about TriviaInsider, your premier destination for interactive trivia quizzes across multiple categories.',
    type: 'website',
    siteName: 'TriviaInsider',
    url: 'https://triviainsider.com/about'
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">
            About
          </span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About TriviaInsider
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about making learning fun and accessible. Our trivia platform 
            combines engaging questions with a beautiful, modern interface to create the 
            perfect brain-training experience.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            To make knowledge accessible and enjoyable for everyone. We believe that learning 
            should be fun, engaging, and rewarding. Our trivia quizzes are designed to challenge 
            your mind while keeping you entertained.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Brain Training</h3>
            <p className="text-gray-600">
              Exercise your mind with carefully crafted questions across multiple categories 
              and difficulty levels.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Targeted Learning</h3>
            <p className="text-gray-600">
              Focus on specific topics with our tag-based filtering system. Learn exactly 
              what interests you most.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Zap className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Fun</h3>
            <p className="text-gray-600">
              Quick quizzes that fit into your busy schedule. Get instant feedback and 
              detailed explanations for every question.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Everyone</h3>
            <p className="text-gray-600">
              Whether you're a trivia novice or expert, our diverse range of topics and 
              difficulties has something for everyone.
            </p>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold mb-2">Next.js</h3>
              <p className="text-purple-100">
                Static site generation for lightning-fast performance
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-bold mb-2">Tailwind CSS</h3>
              <p className="text-purple-100">
                Beautiful, responsive design that works on all devices
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">♿</div>
              <h3 className="font-bold mb-2">Accessible</h3>
              <p className="text-purple-100">
                Built with accessibility in mind for all users
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of trivia enthusiasts and start your brain training journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories" className="btn-primary">
              Browse Categories
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 