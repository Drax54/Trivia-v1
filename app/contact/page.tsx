import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, HelpCircle, Bug, Shield, Scale, MessageCircle, FileText, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  robots: "index, follow",
  title: 'Contact Us - TriviaInsider',
  description: 'Get in touch with the TriviaInsider team. Contact us for support, feedback, privacy questions, or business inquiries.',
  keywords: ['contact', 'support', 'feedback', 'help', 'customer service'],
  alternates: {
    canonical: '/contact'
  }
}

export default function ContactPage() {
  const contactSections = [
    {
      icon: MessageCircle,
      title: "General Inquiries",
      description: "Questions about our platform or general feedback",
      email: "hello@triviainsider.com",
      color: "purple"
    },
    {
      icon: HelpCircle,
      title: "Support",
      description: "Need help with quizzes or technical issues?",
      email: "support@triviainsider.com",
      color: "blue"
    },
    {
      icon: Bug,
      title: "Bug Reports",
      description: "Found a bug? Let us know so we can fix it!",
      email: "bugs@triviainsider.com",
      color: "red"
    },
    {
      icon: Shield,
      title: "Privacy & Data",
      description: "Questions about privacy, data handling, or GDPR",
      email: "privacy@triviainsider.com",
      color: "green"
    },
    {
      icon: FileText,
      title: "Legal & Terms",
      description: "Legal questions, terms of service, or licensing",
      email: "legal@triviainsider.com",
      color: "yellow"
    },
    {
      icon: Briefcase,
      title: "Business & Partnerships",
      description: "Business partnerships, licensing, or commercial use",
      email: "business@triviainsider.com",
      color: "indigo"
    }
  ]

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
            <Mail className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          </div>
          
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Get in touch with our team for any questions or feedback.
          </p>
        </div>

        {/* Contact Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactSections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <section.icon className={`h-6 w-6 text-${section.color}-600`} />
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">
                {section.description}
              </p>
              <a 
                href={`mailto:${section.email}`} 
                className="inline-flex items-center gap-2 text-${section.color}-600 hover:text-${section.color}-800 font-medium"
              >
                <Mail className="h-4 w-4" />
                {section.email}
              </a>
            </div>
          ))}
        </div>

        {/* Legal Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Legal & Business</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Legal Matters</h3>
              <p className="text-gray-600 mb-3">
                Terms of service, copyright, or other legal inquiries.
              </p>
              <a 
                href="mailto:legal@triviainsider.com" 
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
              >
                <Mail className="h-4 w-4" />
                legal@triviainsider.com
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Partnerships</h3>
              <p className="text-gray-600 mb-3">
                Interested in partnering with us or business opportunities.
              </p>
              <a 
                href="mailto:business@triviainsider.com" 
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
              >
                <Mail className="h-4 w-4" />
                business@triviainsider.com
              </a>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Response Times</h3>
          <div className="space-y-2 text-blue-800">
            <p>• <strong>General inquiries:</strong> Within 24-48 hours</p>
            <p>• <strong>Technical support:</strong> Within 12-24 hours</p>
            <p>• <strong>Bug reports:</strong> Within 24 hours</p>
            <p>• <strong>Privacy & Legal:</strong> Within 48-72 hours</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            You can also find answers to common questions in our{' '}
            <Link href="/about" className="text-purple-600 hover:text-purple-800 underline">
              About page
            </Link>
            {' '}or review our{' '}
            <Link href="/privacy" className="text-purple-600 hover:text-purple-800 underline">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/terms" className="text-purple-600 hover:text-purple-800 underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 