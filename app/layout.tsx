import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import Link from 'next/link'
import { Brain, Home, BookOpen, Info, Github, Twitter, Linkedin } from 'lucide-react'

export const metadata: Metadata = {
  robots: "index, follow",
  metadataBase: new URL('https://triviaziggle.com'),
  title: 'Triviaziggle - Challenge Your Knowledge with Interactive Quizzes',
  description: 'Join millions of quiz enthusiasts and test your expertise across science, technology, history, and entertainment. Free interactive trivia quizzes with instant feedback and detailed explanations.',
  keywords: ['trivia quiz', 'knowledge test', 'interactive quiz', 'science quiz', 'technology quiz', 'history quiz', 'entertainment quiz', 'brain training', 'educational games'],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Triviaziggle - Challenge Your Knowledge with Interactive Quizzes',
    description: 'Join millions of quiz enthusiasts and test your expertise across science, technology, history, and entertainment. Free interactive trivia quizzes with instant feedback.',
    type: 'website',
    siteName: 'Triviaziggle',
    url: 'https://triviaziggle.com'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Triviaziggle - Challenge Your Knowledge',
    description: 'Test your knowledge with interactive trivia quizzes across multiple categories. Join millions of learners today!',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-8 w-8 text-purple-400" />
                  <span className="text-2xl font-bold">Triviaziggle</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Challenge your knowledge with thousands of quizzes across various categories. 
                  From technology to history, science to entertainment - test your knowledge and learn something new!
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/technology" className="text-gray-400 hover:text-white transition-colors">
                      💻 Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="/history" className="text-gray-400 hover:text-white transition-colors">
                      🏛️ History
                    </Link>
                  </li>
                  <li>
                    <Link href="/science" className="text-gray-400 hover:text-white transition-colors">
                      🔬 Science
                    </Link>
                  </li>
                  <li>
                    <Link href="/entertainment" className="text-gray-400 hover:text-white transition-colors">
                      🎬 Entertainment
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  © 2025 Triviaziggle. All rights reserved.
                </p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 