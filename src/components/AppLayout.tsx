import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNavigation } from "./MobileBottomNavigation";
import { navigationItems } from "@/constants/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
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
  );
}