'use client';

import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { NavigationItem } from "./NavigationItem";
import { Brand } from "./Brand";
import { NavigationItem as NavigationItemType, findParentNavItem } from "@/constants/navigation";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
  navigationItems: NavigationItemType[];
}

const MIN_WIDTH = 80;
const MAX_WIDTH = 320;
const DEFAULT_WIDTH = 260;
const COLLAPSE_THRESHOLD = 120;

// Inner component that uses useSidebar
function SidebarInner({ navigationItems }: { navigationItems: NavigationItemType[] }) {
  const pathname = usePathname();
  const parentItem = React.useMemo(() => findParentNavItem(pathname), [pathname]);
  const { toggleSidebar, state } = useSidebar();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <Brand variant={state === 'collapsed' ? 'mobile' : 'desktop'} />
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

      <div className="border-t border-sidebar-border p-4 mt-auto">
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
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_WIDTH);

  // Load saved width
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-width');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
        setWidth(parsed);
      }
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  }, [width]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidthRef.current + delta));
    setWidth(newWidth);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    localStorage.setItem('sidebar-width', width.toString());
  }, [width]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Determine if collapsed based on width
  const isCollapsed = width < COLLAPSE_THRESHOLD;

  return (
    <div 
      ref={sidebarRef}
      className={cn(
        "hidden md:block relative h-screen shrink-0",
        isDragging && "[&_*]:transition-none"
      )}
      style={{ 
        width: isCollapsed ? MIN_WIDTH : width,
        minWidth: MIN_WIDTH 
      }}
    >
      <Sidebar 
        collapsible="icon" 
        className="h-full border-r"
        style={{
          // Override the CSS variable for sidebar width when expanded
          ['--sidebar-width' as string]: isCollapsed ? `${MIN_WIDTH}px` : `${width}px`,
        }}
      >
        <SidebarInner navigationItems={navigationItems} />
      </Sidebar>

      {/* Resize Handle */}
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-4 cursor-col-resize z-50 flex items-center justify-center",
          "opacity-0 hover:opacity-100 transition-opacity",
          isDragging && "opacity-100"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="h-12 w-1 rounded-full bg-border hover:bg-primary/50 transition-colors flex items-center justify-center">
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
});
