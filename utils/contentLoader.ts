import contentData from '../data/quiz-content.json'

export interface QuizContent {
  quizId: string
  categoryId: string
  subcategoryId: string
  title: string
  content: string
  knowledgeGraphHtml?: string
  lastUpdated: string
  wordCount: number
  generatedBy: string
  success?: boolean
  error?: string
}

export interface QuizContentResponse {
  quizContents: QuizContent[]
}

/**
 * Get content for a specific quiz by quiz ID
 */
export function getQuizContent(quizId: string): QuizContent | null {
  const content = (contentData as QuizContentResponse).quizContents.find(
    item => item.quizId === quizId
  )
  return content || null
}

/**
 * Get all content for a specific category
 */
export function getContentByCategory(categoryId: string): QuizContent[] {
  return (contentData as QuizContentResponse).quizContents.filter(
    item => item.categoryId === categoryId
  )
}

/**
 * Get all content for a specific subcategory
 */
export function getContentBySubcategory(categoryId: string, subcategoryId: string): QuizContent[] {
  return (contentData as QuizContentResponse).quizContents.filter(
    item => item.categoryId === categoryId && item.subcategoryId === subcategoryId
  )
}

/**
 * Get content statistics
 */
export function getContentStats() {
  const contents = (contentData as QuizContentResponse).quizContents
  
  return {
    totalContent: contents.length,
    successfulContent: contents.filter(item => item.success !== false).length,
    totalWords: contents.reduce((sum, item) => sum + item.wordCount, 0),
    categoriesWithContent: Array.from(new Set(contents.map(item => item.categoryId))),
    subcategoriesWithContent: Array.from(new Set(contents.map(item => item.subcategoryId)))
  }
}

/**
 * Search content by keyword
 */
export function searchContent(keyword: string): QuizContent[] {
  const searchTerm = keyword.toLowerCase()
  return (contentData as QuizContentResponse).quizContents.filter(
    item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm) ||
      item.categoryId.toLowerCase().includes(searchTerm) ||
      item.subcategoryId.toLowerCase().includes(searchTerm)
  )
} 