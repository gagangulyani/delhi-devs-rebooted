/**
 * Clerk Authentication Utilities - Client Side
 * 
 * Helper functions for working with Clerk authentication in Client Components
 */

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
