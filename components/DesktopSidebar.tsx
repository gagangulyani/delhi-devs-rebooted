'use client';

import React from "react";
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
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { NavigationItem } from "./NavigationItem";
import { Brand } from "./Brand";
import { NavigationItem as NavigationItemType, findParentNavItem } from "@/constants/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DesktopSidebarProps {
  navigationItems: NavigationItemType[];
}

// Inner component that uses useSidebar (must be inside SidebarProvider)
function SidebarInner({ navigationItems }: { navigationItems: NavigationItemType[] }) {
  const pathname = usePathname();
  const parentItem = React.useMemo(() => findParentNavItem(pathname), [pathname]);
  const { toggleSidebar, state } = useSidebar();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border p-4 group">
        <div className="flex items-center justify-between">
          <Brand variant={state === 'collapsed' ? 'collapsed' : 'desktop'} />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 rounded-full shrink-0"
          >
            {state === 'collapsed' ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
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
                      className="rounded-lg w-full"
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

      <div className="border-t border-sidebar-border p-4 mt-auto group">
        <div className="flex items-center justify-between">
          <span className="text-sm text-sidebar-foreground/70 font-medium group-data-[collapsible=icon]:hidden">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export const DesktopSidebar = React.memo(function DesktopSidebar({ navigationItems }: DesktopSidebarProps) {
  return (
    <div className="hidden md:block h-screen shrink-0">
      <SidebarProvider defaultOpen={true}>
        <Sidebar collapsible="icon" className="h-full border-r">
          <SidebarInner navigationItems={navigationItems} />
        </Sidebar>
      </SidebarProvider>
    </div>
  );
});
