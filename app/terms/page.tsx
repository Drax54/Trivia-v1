import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText, AlertTriangle, Scale, Users, Clock } from 'lucide-react'

export const metadata: Metadata = {
  robots: "index, follow",
  title: 'Terms of Service - TriviaInsider',
  description: 'Read the terms and conditions for using TriviaInsider, our trivia quiz platform. Learn about user responsibilities and platform guidelines.',
  keywords: ['terms of service', 'terms and conditions', 'legal', 'user agreement'],
  alternates: {
    canonical: '/terms'
  }
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          
          <p className="text-lg text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Agreement to Terms</h3>
                  <p className="text-amber-800">
                    By accessing and using TriviaInsider, you agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our service.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of the TriviaInsider website and services 
                (collectively, the "Service") operated by TriviaInsider ("us", "we", or "our").
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your access to and use of the Service is conditioned on your acceptance of and compliance 
                with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TriviaInsider is an online platform that provides interactive trivia quizzes across various 
                categories including science, technology, history, and entertainment. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Free access to trivia quizzes and educational content</li>
                <li>Interactive quiz-taking experience with instant feedback</li>
                <li>Score tracking and progress monitoring</li>
                <li>Educational explanations for quiz answers</li>
                <li>Category-based quiz organization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                User Conduct
              </h2>
              <p className="text-gray-700 mb-4">You agree to use the Service responsibly and in accordance with these guidelines:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Permitted Uses</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Taking quizzes for educational and entertainment purposes</li>
                    <li>Sharing quiz results on social media platforms</li>
                    <li>Providing constructive feedback about our service</li>
                    <li>Using the service for personal, non-commercial purposes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Prohibited Activities</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Attempting to hack, disrupt, or compromise our systems</li>
                    <li>Using automated tools or bots to interact with our service</li>
                    <li>Copying, reproducing, or distributing our quiz content without permission</li>
                    <li>Submitting false, misleading, or inappropriate information</li>
                    <li>Violating any applicable laws or regulations</li>
                    <li>Interfering with other users' experience</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Content</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are and will remain 
                    the exclusive property of TriviaInsider and its licensors. The Service is protected by 
                    copyright, trademark, and other laws.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Content</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By submitting content to our Service (such as feedback or comments), you grant us 
                    a non-exclusive, worldwide, royalty-free license to use, modify, and display such 
                    content in connection with our Service.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed 
                by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-700">
                By using our Service, you consent to the collection and use of information as described 
                in our <Link href="/privacy" className="text-purple-600 hover:text-purple-800 underline">Privacy Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitations</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-medium">
                  Important Legal Notice: Please read this section carefully as it limits our liability.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Service "As Is"</h3>
                  <p className="text-gray-700">
                    The Service is provided on an "as is" and "as available" basis. We make no representations 
                    or warranties of any kind, express or implied, regarding the operation of our Service or 
                    the accuracy of the information included.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Educational Content</h3>
                  <p className="text-gray-700">
                    While we strive for accuracy in our quiz content, we do not guarantee that all information 
                    is correct, complete, or up-to-date. Our quizzes are intended for entertainment and educational 
                    purposes only.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-700">
                    In no event shall TriviaInsider be liable for any indirect, incidental, special, consequential, 
                    or punitive damages arising out of or relating to your use of the Service.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-purple-600" />
                Termination
              </h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to our Service immediately, without prior notice 
                or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-700">
                Upon termination, your right to use the Service will cease immediately. All provisions of 
                the Terms which by their nature should survive termination shall survive termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without 
                regard to its conflict of law provisions. Our failure to enforce any right or provision 
                of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new 
                terms taking effect.
              </p>
              <p className="text-gray-700">
                By continuing to access or use our Service after those revisions become effective, you agree 
                to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Website:</strong> <Link href="/" className="text-purple-600 hover:text-purple-800">triviainsider.com</Link></p>
                  <p><strong>Email:</strong> legal@triviainsider.com</p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">
                These terms constitute the entire agreement between you and TriviaInsider regarding 
                the use of the Service, superseding any prior agreements between you and TriviaInsider 
                relating to your use of the Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 