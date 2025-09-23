import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { MobileBottomNavigation } from "@/components/MobileBottomNavigation";
import { navigationItems } from "@/constants/navigation";

export const metadata: Metadata = {
  title: 'Delhi Devs Community',
  description: 'Join the Delhi Devs community - connecting developers in Delhi',
  keywords: ['delhi', 'developers', 'community', 'tech', 'meetups'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster />
          <Sonner />
          <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
              {/* Desktop Sidebar - Hidden on mobile */}
              <DesktopSidebar navigationItems={navigationItems} />
              
              <main className="flex-1 flex flex-col min-h-screen w-full md:ml-0">
                {/* Mobile header - Sticky with glassmorphism */}
                <MobileHeader />
                
                {/* Main content with proper margins */}
                <div className="flex-1 md:px-8 lg:px-12 xl:px-16 pb-24 md:pb-8 pt-2 md:pt-0">
                  {children}
                </div>
              </main>
              
              {/* Mobile Bottom Navigation - Floating glassmorphism design */}
              <MobileBottomNavigation navigationItems={navigationItems} />
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}