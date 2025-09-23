#!/bin/bash

# Cleanup script for unused files after Next.js migration
echo "🧹 Cleaning up unused files after Next.js migration..."

# Remove old component files that have been inlined into pages
echo "Removing inlined component files..."
rm -f components/AdminDashboard.tsx
rm -f components/AuthPage.tsx
rm -f components/MembershipForm.tsx
rm -f components/CodeOfConduct.tsx

# Remove old Vite build directory
echo "Removing old Vite build directory..."
rm -rf dist/

# Remove unused type definitions that are no longer needed
echo "Removing unused layout types..."
rm -f types/layout.ts

# Remove old AppLayout component since layout is now in app/layout.tsx
echo "Removing old AppLayout component..."
rm -f components/AppLayout.tsx

# Remove old index files from Vite setup
echo "Removing old Vite index files..."
rm -f index.html

echo "✅ Cleanup completed!"
echo ""
echo "📋 Summary of removed files:"
echo "  - components/AdminDashboard.tsx (inlined into app/admin/page.tsx)"
echo "  - components/AuthPage.tsx (inlined into app/auth/page.tsx)"
echo "  - components/MembershipForm.tsx (inlined into app/join/page.tsx)"
echo "  - components/CodeOfConduct.tsx (inlined into app/code-of-conduct/page.tsx)"
echo "  - components/AppLayout.tsx (functionality moved to app/layout.tsx)"
echo "  - types/layout.ts (replaced with constants/navigation.ts)"
echo "  - dist/ directory (old Vite build output)"
echo "  - index.html (Vite entry point, replaced with Next.js app structure)"
echo ""
echo "🚀 Next.js migration and cleanup complete!"