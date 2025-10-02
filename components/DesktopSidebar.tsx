'use client'

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
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
import { NavigationItem as NavigationItemType, findParentNavItem } from "@/constants/navigation";
import { getIcon } from "@/lib/icon-utils";
import { isUserAdmin } from "@/lib/clerk-utils.client";

interface DesktopSidebarProps {
  navigationItems: NavigationItemType[];
}

export const DesktopSidebar = React.memo(function DesktopSidebar({ navigationItems }: DesktopSidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const parentItem = useMemo(() => findParentNavItem(pathname), [pathname]);
  
  // Filter navigation items based on user role
  const filteredNavItems = useMemo(() => {
    const isAdmin = user ? isUserAdmin(user) : false;
    return navigationItems.filter(item => {
      // Show public items to everyone
      if (item.isPublic) return true;
      // Show admin items only to admins
      return isAdmin;
    });
  }, [navigationItems, user]);

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
                {filteredNavItems.map((item) => {
                  // Check if this item or its children are active
                  const isParentActive = parentItem?.url === item.url;
                  const isExactMatch = pathname === item.url;
                  const isActive = isExactMatch || isParentActive;
                  
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
                          isActive={isExactMatch}
                          isParentActive={isParentActive}
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
});