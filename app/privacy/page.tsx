import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Database, UserCheck, Mail } from 'lucide-react'

export const metadata: Metadata = {
  robots: "index, follow",
  title: 'Privacy Policy - TriviaInsider',
  description: 'Learn how TriviaInsider protects your privacy and handles your personal information when you use our trivia quiz platform.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'cookies', 'privacy'],
  alternates: {
    canonical: '/privacy'
  }
}

export default function PrivacyPage() {
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
            <Shield className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <p className="text-lg text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
              <div className="flex items-start gap-3">
                <Eye className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Our Commitment</h3>
                  <p className="text-blue-800">
                    At TriviaInsider, we are committed to protecting your privacy and ensuring transparency 
                    about how we collect, use, and protect your personal information.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="h-6 w-6 text-purple-600" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Quiz responses and scores</li>
                    <li>Feedback and comments you submit</li>
                    <li>Email address if you contact us</li>
                    <li>Any other information you voluntarily provide</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address and general location</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Referring website information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Provide and improve our quiz services</li>
                <li>Analyze user behavior to enhance user experience</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Generate anonymous analytics and usage statistics</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-medium">
                  We do not sell, trade, or rent your personal information to third parties.
                </p>
              </div>
              <p className="text-gray-700 mb-4">We may share information only in these limited circumstances:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>With service providers who help us operate our website (under strict confidentiality agreements)</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger (with prior notice)</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Secure data transmission using SSL encryption</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure data storage practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-purple-600" />
                Your Rights
              </h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand user behavior</li>
                <li>Performance cookies to improve site speed</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our service is not directed to children under 13. We do not knowingly collect 
                personal information from children under 13. If you become aware that a child 
                has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any 
                material changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-purple-600" />
                Contact Us
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Website:</strong> <Link href="/" className="text-purple-600 hover:text-purple-800">triviainsider.com</Link></p>
                  <p><strong>Email:</strong> privacy@triviainsider.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 