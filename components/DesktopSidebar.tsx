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
} from "@/components/ui/sidebar";
import { NavigationItem } from "./NavigationItem";
import { Brand } from "./Brand";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NavigationItem as NavigationItemType, findParentNavItem } from "@/constants/navigation";

interface DesktopSidebarProps {
  navigationItems: NavigationItemType[];
}

// Inner component that uses useSidebar (must be inside SidebarProvider)
function SidebarInner({ navigationItems }: { navigationItems: NavigationItemType[] }) {
  const pathname = usePathname();
  const parentItem = React.useMemo(() => findParentNavItem(pathname), [pathname]);
  const { isMobile } = useSidebar();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border px-2 py-4">
        {isMobile ? (
          <div className="flex items-center px-3">
            <Brand variant="mobile" />
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                aria-label="Delhi Devs Rebooted"
                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
              >
                <Brand variant="collapsed" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              Delhi Devs Rebooted
            </TooltipContent>
          </Tooltip>
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
