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
  useSidebar,
  SidebarCollapseButton,
} from "@/components/ui/sidebar";
import { NavigationItem } from "./NavigationItem";
import { Brand } from "./Brand";
import { NavigationItem as NavigationItemType, findParentNavItem } from "@/constants/navigation";

interface DesktopSidebarProps {
  navigationItems: NavigationItemType[];
}

// Inner component that uses useSidebar (must be inside SidebarProvider)
function SidebarInner({ navigationItems }: { navigationItems: NavigationItemType[] }) {
  const pathname = usePathname();
  const parentItem = React.useMemo(() => findParentNavItem(pathname), [pathname]);
  const { collapsed } = useSidebar();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <Brand variant="desktop" />
              </div>
              <SidebarCollapseButton />
            </>
          )}
        </div>
        {collapsed && (
          <div className="flex justify-center py-2">
            <SidebarCollapseButton />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isParentActive = parentItem?.url === item.url;
                const isExactMatch = pathname === item.url;
                const isActive = isExactMatch || isParentActive;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="rounded-lg"
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
    </>
  );
}

export const DesktopSidebar = React.memo(function DesktopSidebar({ navigationItems }: DesktopSidebarProps) {
  return (
    <Sidebar className="h-screen">
      <SidebarInner navigationItems={navigationItems} />
    </Sidebar>
  );
});
