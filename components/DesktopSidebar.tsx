'use client'

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavigationItem } from "./NavigationItem";
import { Brand } from "./Brand";
import { NavigationItem as NavigationItemType } from "@/constants/navigation";
import { getIcon } from "@/lib/icon-utils";

interface DesktopSidebarProps {
  navigationItems: NavigationItemType[];
}

export function DesktopSidebar({ navigationItems }: DesktopSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:block">
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border p-6">
          <Brand variant="desktop" />
        </SidebarHeader>
        
        <SidebarContent className="flex-1 px-3 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        size="lg"
                        tooltip={item.title}
                        className="rounded-full"
                      >
                        <NavigationItem 
                          item={item}
                          isActive={isActive}
                          variant="desktop"
                        />
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
    </div>
  );
}