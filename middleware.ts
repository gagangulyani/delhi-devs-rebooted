import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/events(.*)',
  '/code-of-conduct',
  '/join',
  '/auth(.*)',
  '/api/webhooks(.*)', // Allow webhooks
])

// Define admin-only routes
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Check if route requires admin access
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth()
    
    // Redirect to auth if not logged in
    if (!userId) {
      const url = new URL('/auth', req.url)
      return NextResponse.redirect(url)
    }
    
    // Check if user has admin role
    const userRole = (sessionClaims?.public_metadata as any)?.role
    if (userRole !== 'admin') {
      // Redirect non-admins to home page
      const url = new URL('/', req.url)
      return NextResponse.redirect(url)
    }
  }
  
  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
