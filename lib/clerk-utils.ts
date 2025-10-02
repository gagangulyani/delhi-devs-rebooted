/**
 * Clerk Authentication Utilities - Server Side
 * 
 * Helper functions for working with Clerk authentication in Server Components
 * For client components, use lib/clerk-utils.client.ts
 */

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * Check if user is authenticated (server component)
 * Redirects to /auth if not authenticated
 */
export async function requireAuth() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/auth')
  }
  
  return userId
}

/**
 * Check if user is admin (server component)
 * @returns boolean indicating admin status
 */
export async function isAdmin(): Promise<boolean> {
  const { sessionClaims } = await auth()
  // Check publicMetadata for role set in Clerk dashboard
  return (sessionClaims?.public_metadata as any)?.role === 'admin'
}

/**
 * Get user role from Clerk (server component)
 * @returns 'admin' | 'user' | null
 */
export async function getUserRole(): Promise<'admin' | 'user' | null> {
  const { sessionClaims } = await auth()
  const role = (sessionClaims?.public_metadata as any)?.role
  return role === 'admin' || role === 'user' ? role : null
}

/**
 * Require admin access (server component)
 * Redirects to / if not admin
 */
export async function requireAdmin() {
  const userId = await requireAuth()
  const admin = await isAdmin()
  
  if (!admin) {
    redirect('/')
  }
  
  return userId
}

/**
 * Get current user ID (server component)
 * @returns userId or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth()
  return userId
}

/**
 * Get current user's email (server component)
 * @returns email or null if not authenticated
 */
export async function getCurrentUserEmail(): Promise<string | null> {
  const { sessionClaims } = await auth()
  return sessionClaims?.email as string | null
}
