import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  UserPlus, 
  LogIn, 
  Shield, 
  Settings,
  Users
} from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Join Community",
    url: "/join",
    icon: UserPlus,
  },
  {
    title: "Login",
    url: "/auth",
    icon: LogIn,
  },
  {
    title: "Code of Conduct",
    url: "/code-of-conduct",
    icon: Shield,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Settings,
  },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border p-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/delhi-devs-rebooted.png" 
                alt="Delhi Devs Rebooted" 
                className="w-10 h-10 flex-shrink-0" 
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden truncate">
                  Delhi Devs
                </span>
                <span className="text-sm text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden truncate">
                  Rebooted
                </span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="flex-1 px-3 py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive}
                          size="lg"
                          tooltip={item.title}
                          className="rounded-full"
                        >
                          <Link to={item.url} className="flex items-center space-x-4 px-4 py-3">
                            <item.icon className="h-6 w-6" />
                            <span className="text-lg font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <div className="border-t border-sidebar-border p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden font-medium">
                Theme
              </span>
              <ThemeToggle />
            </div>
          </div>
          
          <SidebarRail />
        </Sidebar>
        
        <main className="flex-1 overflow-auto min-h-screen">
          {/* Mobile header with sidebar trigger */}
          <div className="sticky top-0 z-40 flex items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border p-4 md:hidden">
            <SidebarTrigger />
            <div className="flex items-center space-x-2">
              <img 
                src="/delhi-devs-rebooted.png" 
                alt="Delhi Devs Rebooted" 
                className="w-6 h-6" 
              />
              <span className="text-lg font-semibold">Delhi Devs Rebooted</span>
            </div>
          </div>
          
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}