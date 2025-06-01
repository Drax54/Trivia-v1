'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Home, ChevronRight } from 'lucide-react'
import { getQuizContent, type QuizContent } from '../utils/contentLoader'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  categoryDescription: string
  tags: string[]
  difficulty: string
  questions: Question[]
  articleContent: string
}

interface Answer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}

interface QuizPageClientProps {
  quiz: Quiz
  categoryId: string
}

export default function QuizPageClient({ quiz, categoryId }: QuizPageClientProps) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [showResult, setShowResult] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: number]: boolean }>({})
  
  // Load quiz content
  const quizContent = getQuizContent(quiz.id)

  useEffect(() => {
    if (!isQuizCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isQuizCompleted])

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }))
  }

  const handleRevealAnswer = (questionId: number) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const handleSubmitQuiz = () => {
    const finalAnswers: Answer[] = quiz.questions.map(question => ({
      questionId: question.id,
      selectedAnswer: answers[question.id] ?? -1,
      isCorrect: answers[question.id] === question.correctAnswer
    }))

    setIsQuizCompleted(true)
    setShowResult(true)
  }

  const scrollToContent = () => {
    const contentSection = document.getElementById('article-content-section')
    if (contentSection) {
      contentSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const answeredQuestions = Object.keys(answers).length
  const finalAnswers: Answer[] = quiz.questions.map(question => ({
    questionId: question.id,
    selectedAnswer: answers[question.id] ?? -1,
    isCorrect: answers[question.id] === question.correctAnswer
  }))
  const correctAnswers = finalAnswers.filter(answer => answer.isCorrect).length
  const scorePercentage = Math.round((correctAnswers / quiz.questions.length) * 100)

  // Get content title - only used when content exists
  const contentTitle = quizContent?.title

  // Function to determine subcategory based on quiz data
  const getQuizSubcategory = () => {
    const titleLower = quiz.title.toLowerCase()
    const tags = quiz.tags.map(tag => tag.toLowerCase())
    const category = quiz.category

    // Subcategory detection logic
    if (category === "entertainment") {
      if (titleLower.includes("movie") || titleLower.includes("film") || titleLower.includes("cinema") || 
          tags.some(tag => ["movie", "film", "cinema", "actor", "actress", "director"].includes(tag))) {
        return "Movies"
      } else if (titleLower.includes("tv") || titleLower.includes("television") || titleLower.includes("series") || titleLower.includes("show") ||
                tags.some(tag => ["tv", "television", "series", "show", "episode"].includes(tag))) {
        return "TV Shows"
      } else if (titleLower.includes("music") || titleLower.includes("song") || titleLower.includes("album") || titleLower.includes("artist") ||
                tags.some(tag => ["music", "song", "album", "artist", "band", "singer", "musician"].includes(tag))) {
        return "Music"
      } else {
        return "Movies" // Default for entertainment
      }
    } else if (category === "technology") {
      return "Technology"
    } else if (category === "science") {
      return "Science"
    } else if (category === "history") {
      return "History"
    } else {
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  const subcategory = getQuizSubcategory()

  // Function to process inline formatting in text
  const processInlineFormatting = (text: string): React.ReactNode => {
    // Handle italic text *text*
    let parts = text.split(/(\*[^*]+\*)/)
    const processedParts: React.ReactNode[] = []
    
    parts.forEach((part, partIndex) => {
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        processedParts.push(
          <em key={`italic-${partIndex}`} className="italic">
            {part.replace(/^\*/, '').replace(/\*$/, '')}
          </em>
        )
      } else {
        // Handle bold text **text** within this part
        const boldParts = part.split(/(\*\*[^*]+\*\*)/)
        boldParts.forEach((boldPart, boldIndex) => {
          if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
            processedParts.push(
              <strong key={`bold-${partIndex}-${boldIndex}`} className="font-semibold">
                {boldPart.replace(/^\*\*/, '').replace(/\*\*$/, '')}
              </strong>
            )
          } else if (boldPart) {
            processedParts.push(boldPart)
          }
        })
      }
    })
    
    return processedParts
  }

  // Function to render content - handles both HTML and markdown formats
  const renderContent = (content: string) => {
    // Check if content is HTML format (starts with <article> or contains HTML tags)
    const isHTMLContent = content.trim().startsWith('<article') || content.includes('<p class=')
    
    if (isHTMLContent) {
      // Handle HTML content - parse and render as JSX
      return (
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    }
    
    // Handle markdown format (existing logic)
    const paragraphs = content.split('\n\n').filter(p => p.trim())
    const elements = []
    
    // Function to break long paragraphs into smaller ones
    const breakLongParagraph = (text: string) => {
      // If paragraph is over 400 characters, try to break it at sentence boundaries
      if (text.length > 400) {
        const sentences = text.split(/(?<=[.!?])\s+/)
        const chunks = []
        let currentChunk = ''
        
        for (const sentence of sentences) {
          if (currentChunk.length + sentence.length > 350 && currentChunk) {
            chunks.push(currentChunk.trim())
            currentChunk = sentence
          } else {
            currentChunk += (currentChunk ? ' ' : '') + sentence
          }
        }
        
        if (currentChunk) {
          chunks.push(currentChunk.trim())
        }
        
        return chunks
      }
      
      return [text]
    }
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i].trim()
      
      // Skip empty paragraphs
      if (!paragraph) continue
      
      // Handle numbered headers like "1. Opening", "2. Background"
      if (/^\d+\.\s+/.test(paragraph) || /^\*\*\d+\.\s+.*\*\*$/.test(paragraph)) {
        const headerText = paragraph.replace(/^\*\*/, '').replace(/\*\*$/, '').replace(/^\d+\.\s*/, '')
        elements.push(
          <h3 key={elements.length} className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {headerText}
          </h3>
        )
        continue
      }
      
      // Handle section headers
      if (paragraph.startsWith('###')) {
        elements.push(
          <h3 key={elements.length} className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            {paragraph.replace(/^###\s*/, '')}
          </h3>
        )
        continue
      } else if (paragraph.startsWith('##')) {
        elements.push(
          <h2 key={elements.length} className="text-2xl font-bold text-gray-900 mt-8 mb-6">
            {paragraph.replace(/^##\s*/, '')}
          </h2>
        )
        continue
      }
      
      // Handle bold headers that are full lines
      if (paragraph.startsWith('**') && paragraph.endsWith('**') && paragraph.length > 4) {
        elements.push(
          <h3 key={elements.length} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            {paragraph.replace(/^\*\*/, '').replace(/\*\*$/, '')}
          </h3>
        )
        continue
      }
      
      // Handle bullet point lists
      if (paragraph.includes('\n•') || paragraph.includes('\n*')) {
        const lines = paragraph.split('\n')
        const listItems = []
        let currentItem = ''
        
        for (const line of lines) {
          const trimmedLine = line.trim()
          if (trimmedLine.startsWith('•') || (trimmedLine.startsWith('*') && !trimmedLine.startsWith('**'))) {
            if (currentItem) {
              listItems.push(currentItem)
            }
            currentItem = trimmedLine.replace(/^[•*]\s*/, '')
          } else if (currentItem) {
            currentItem += ' ' + trimmedLine
          }
        }
        
        if (currentItem) {
          listItems.push(currentItem)
        }
        
        if (listItems.length > 0) {
          elements.push(
            <ul key={elements.length} className="list-disc list-inside space-y-2 mb-6">
              {listItems.map((item, index) => (
                <li key={index} className="text-gray-700 leading-relaxed">
                  {processInlineFormatting(item)}
                </li>
              ))}
            </ul>
          )
          continue
        }
      }
      
      // Handle regular paragraphs - break them up if too long
      const chunks = breakLongParagraph(paragraph)
      
      chunks.forEach(chunk => {
        elements.push(
          <p key={elements.length} className="text-gray-700 leading-relaxed mb-4">
            {processInlineFormatting(chunk)}
          </p>
        )
      })
    }
    
    return elements
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-6">
              {scorePercentage >= 80 ? '🎉' : scorePercentage >= 60 ? '👍' : '📚'}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
            <p className="text-xl text-gray-600 mb-8">
              You scored {correctAnswers} out of {quiz.questions.length} questions correctly
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-2xl font-bold text-purple-600">{scorePercentage}%</div>
                <div className="text-purple-700">Score</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-2xl font-bold text-blue-600">{formatTime(timeElapsed)}</div>
                <div className="text-blue-700">Time</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-2xl font-bold text-green-600">{correctAnswers}/{quiz.questions.length}</div>
                <div className="text-green-700">Correct</div>
              </div>
            </div>

            {/* Answer Review */}
            <div className="text-left mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Answers</h2>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => {
                  const userAnswer = finalAnswers.find(a => a.questionId === question.id)
                  const isCorrect = userAnswer?.isCorrect || false
                  
                  return (
                    <div key={question.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        {isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Question {index + 1}: {question.question}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {question.options.map((option, optionIndex) => {
                              const isUserAnswer = userAnswer?.selectedAnswer === optionIndex
                              const isCorrectAnswer = optionIndex === question.correctAnswer
                              
                              let className = "p-3 rounded-lg border "
                              if (isCorrectAnswer) {
                                className += "bg-green-100 border-green-300 text-green-800"
                              } else if (isUserAnswer && !isCorrectAnswer) {
                                className += "bg-red-100 border-red-300 text-red-800"
                              } else {
                                className += "bg-gray-50 border-gray-200 text-gray-700"
                              }
                              
                              return (
                                <div key={optionIndex} className={className}>
                                  {option}
                                  {isCorrectAnswer && <span className="ml-2 font-semibold">✓ Correct</span>}
                                  {isUserAnswer && !isCorrectAnswer && <span className="ml-2 font-semibold">✗ Your answer</span>}
                                </div>
                              )
                            })}
                          </div>
                          <p className="mt-3 text-sm text-gray-600 italic">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${categoryId}`} className="btn-secondary">
                Back to Category
              </Link>
              <Link href="/" className="btn-primary">
                Try Another Quiz
              </Link>
            </div>
          </div>

          {/* Article Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {contentTitle}
                </h2>
                <p className="text-lg text-gray-600">{quiz.categoryDescription}</p>
              </div>
              
              <div className="prose prose-lg max-w-none">
                {renderContent(quizContent!.content)}
              </div>
              
              <div className="border-t border-gray-200 pt-8 mt-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Ready for More Challenges?
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/${categoryId}`} className="btn-primary">
                      More {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Quizzes
                    </Link>
                    <Link href="/categories" className="btn-secondary">
                      Explore All Categories
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <Link href={`/${categoryId}`} className="hover:text-purple-600 transition-colors capitalize">
            {categoryId} Trivia
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">
            {quiz.title.replace(' - Quiz', '')}
          </span>
        </nav>

        {/* New Elaborate Header - Reduced Height */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
                  </svg>
                </div>
                <span className="text-white font-medium capitalize">{categoryId} Trivia Quiz</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                {quiz.title}
              </h1>

              {/* Description */}
              <p className="text-white text-opacity-90 text-base mb-4 leading-relaxed">
                {quiz.description}. Test your knowledge and challenge yourself with our comprehensive quiz covering all aspects of this fascinating topic.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-500 rounded-xl p-3 text-center">
                  <div className="text-xs text-blue-100 mb-1">Questions</div>
                  <div className="text-xl font-bold">{quiz.questions.length}</div>
                </div>
                <div className="bg-pink-500 rounded-xl p-3 text-center">
                  <div className="text-xs text-pink-100 mb-1">Time Elapsed</div>
                  <div className="text-xl font-bold">{formatTime(timeElapsed)}</div>
                </div>
                <div className="bg-orange-500 rounded-xl p-3 text-center">
                  <div className="text-xs text-orange-100 mb-1">Difficulty</div>
                  <div className="text-xl font-bold">{quiz.difficulty}</div>
                </div>
                {quizContent?.content && (
                  <div className="bg-green-500 rounded-xl p-3 text-center">
                    <div className="text-xs text-green-100 mb-1">Study Materials</div>
                    <button 
                      onClick={scrollToContent}
                      className="text-base font-bold text-white hover:text-green-100 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Quiz Tips */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-3">Quiz Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-opacity-90 text-sm">
                      Read each question carefully before selecting an answer
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-white text-opacity-90 text-sm">
                      Take your time - there's no rush to complete all questions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                      <path d="M9 18h6"></path>
                      <path d="M10 22h4"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-opacity-90 text-sm">
                      Review the study materials below for additional learning
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-white bg-opacity-10 rounded-lg">
                  <div className="text-sm">
                    <strong>Difficulty: {quiz.difficulty}</strong>
                  </div>
                  <div className="text-xs text-white text-opacity-75 mt-1">
                    This quiz is rated {quiz.difficulty.toLowerCase()} based on question complexity and specialized knowledge required.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {subcategory}
            </span>
            <span className="text-gray-600">
              Progress: {answeredQuestions}/{quiz.questions.length} answered
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Questions Left:</span>
            <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium">
              {quiz.questions.length - answeredQuestions} Questions Left
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area - Quiz + Article */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quiz Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* All Questions */}
              <div className="space-y-8">
                {quiz.questions.map((question, questionIndex) => (
                  <div key={question.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                        {questionIndex + 1}. {question.question}
                      </h2>
                      <button
                        onClick={() => handleRevealAnswer(question.id)}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {revealedAnswers[question.id] ? 'Hide Answer' : 'Reveal Answer'}
                      </button>
                    </div>

                    {/* Revealed Answer Section */}
                    {revealedAnswers[question.id] && (
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-900">
                            Correct Answer: {question.options[question.correctAnswer]}
                          </span>
                        </div>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    )}

                    {/* Answer Options in 2x2 Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = answers[question.id] === optionIndex
                        const isCorrect = optionIndex === question.correctAnswer
                        const isRevealed = revealedAnswers[question.id]
                        
                        let buttonClass = "p-4 text-left rounded-xl border-2 transition-all duration-200 "
                        
                        if (isRevealed && isCorrect) {
                          buttonClass += "border-green-500 bg-green-50 text-green-900"
                        } else if (isSelected) {
                          buttonClass += "border-purple-500 bg-purple-50 text-purple-900"
                        } else {
                          buttonClass += "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }
                        
                        return (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(question.id, optionIndex)}
                            className={buttonClass}
                          >
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                                isRevealed && isCorrect
                                  ? 'border-green-500 bg-green-500'
                                  : isSelected
                                  ? 'border-purple-500 bg-purple-500'
                                  : 'border-gray-300'
                              }`}>
                                {(isSelected || (isRevealed && isCorrect)) && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <span className="font-medium">{option}</span>
                              {isRevealed && isCorrect && (
                                <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={answeredQuestions < quiz.questions.length}
                  className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz ({answeredQuestions}/{quiz.questions.length} answered)
                </button>
                {answeredQuestions < quiz.questions.length && (
                  <p className="text-sm text-gray-500 mt-2">
                    Please answer all questions before submitting
                  </p>
                )}
              </div>
            </div>

            {/* Article Content Section - Only show if content exists in JSON */}
            {quizContent?.content && (
              <div id="article-content-section" className="bg-white rounded-2xl shadow-xl p-8">
                <div className="max-w-none">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {contentTitle}
                    </h2>
                    <p className="text-lg text-gray-600">{quiz.categoryDescription}</p>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    {renderContent(quizContent.content)}
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Graph Section */}
            {quizContent?.knowledgeGraphHtml && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="max-w-none">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Knowledge Graph
                    </h2>
                    <p className="text-lg text-gray-600">
                      Key entities, relationships, and details related to {quiz.title.replace(/ Trivia Questions and Answers$/i, '')}
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <div 
                      className="knowledge-graph-table"
                      dangerouslySetInnerHTML={{ __html: quizContent.knowledgeGraphHtml }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Now spans both Quiz and Article */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              {/* Timer */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold text-gray-700">Time</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatTime(timeElapsed)}
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">
                    {answeredQuestions}/{quiz.questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredQuestions / quiz.questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {quiz.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-3 rounded-full ${
                        answers[quiz.questions[index].id] !== undefined
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Quiz Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Quiz Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Difficulty: <span className="font-medium">{quiz.difficulty}</span></div>
                  <div>Questions: <span className="font-medium">{quiz.questions.length}</span></div>
                  <div>Category: <span className="font-medium capitalize">{categoryId}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 