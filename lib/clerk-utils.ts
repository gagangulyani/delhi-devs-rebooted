/**
 * Clerk Authentication Utilities
 * 
 * Helper functions and types for working with Clerk authentication
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

/**
 * Client-side helper to check if user is admin
 * Use this in client components with useUser() hook
 * @param user - User object from useUser() hook
 * @returns boolean indicating admin status
 */
export function isUserAdmin(user: any): boolean {
  return user?.publicMetadata?.role === 'admin'
}

/**
 * Client-side helper to get user role
 * Use this in client components with useUser() hook
 * @param user - User object from useUser() hook
 * @returns 'admin' | 'user' | null
 */
export function getUserRoleClient(user: any): 'admin' | 'user' | null {
  const role = user?.publicMetadata?.role
  return role === 'admin' || role === 'user' ? role : null
}
