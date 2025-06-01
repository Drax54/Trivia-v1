import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old category URLs to new structure
  if (pathname.startsWith('/category/')) {
    const categoryId = pathname.replace('/category/', '').replace('/', '')
    
    // Valid category IDs
    const validCategories = ['science', 'technology', 'history', 'entertainment']
    
    if (validCategories.includes(categoryId)) {
      const newUrl = new URL(`/${categoryId}`, request.url)
      return NextResponse.redirect(newUrl, 301) // Permanent redirect
    }
    
    // Handle quiz URLs - /category/{categoryId}/quiz/{quizId}
    const quizMatch = pathname.match(/^\/category\/([^\/]+)\/quiz\/([^\/]+)\/?$/)
    if (quizMatch) {
      const [, categoryId, quizId] = quizMatch
      if (validCategories.includes(categoryId)) {
        const newUrl = new URL(`/${categoryId}/quiz/${quizId}`, request.url)
        return NextResponse.redirect(newUrl, 301) // Permanent redirect
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 