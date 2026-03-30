'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
} from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NavigationItem } from './NavigationItem';
import { Brand } from './Brand';
import { NavigationItem as NavigationItemType, findParentNavItem } from '@/constants/navigation';
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResizableSidebarProps {
  navigationItems: NavigationItemType[];
  children: React.ReactNode;
}

const MIN_WIDTH = 60;
const MAX_WIDTH = 400;
const DEFAULT_WIDTH = 260;
const COLLAPSE_THRESHOLD = 100;

function ResizableSidebarContent({
  navigationItems,
}: {
  navigationItems: NavigationItemType[];
}) {
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
            className="h-8 w-8 rounded-full"
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
                      className="rounded-xl justify-start"
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

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden font-medium">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export function ResizableSidebar({ navigationItems, children }: ResizableSidebarProps) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Load saved width from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem('sidebar-width');
    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedWidth) {
      const parsed = parseInt(savedWidth, 10);
      if (parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
        setWidth(parsed);
        setIsCollapsed(parsed < COLLAPSE_THRESHOLD);
      }
    }
    if (savedCollapsed === 'true') {
      setIsCollapsed(true);
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  }, [width]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = e.clientX - startXRef.current;
      const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidthRef.current + delta));

      setWidth(newWidth);
      setIsCollapsed(newWidth < COLLAPSE_THRESHOLD);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem('sidebar-width', width.toString());
      localStorage.setItem('sidebar-collapsed', (width < COLLAPSE_THRESHOLD).toString());
    }
  }, [isDragging, width]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const toggleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    setWidth(newCollapsed ? MIN_WIDTH : DEFAULT_WIDTH);
    localStorage.setItem('sidebar-collapsed', newCollapsed.toString());
    localStorage.setItem('sidebar-width', newCollapsed ? MIN_WIDTH.toString() : DEFAULT_WIDTH.toString());
  }, [isCollapsed]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Container */}
      <div
        ref={sidebarRef}
        className={cn(
          'relative flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200 ease-linear',
          isDragging && 'transition-none'
        )}
        style={{
          width: isCollapsed ? MIN_WIDTH : width,
          minWidth: MIN_WIDTH,
        }}
      >
        <SidebarProvider defaultOpen={!isCollapsed}>
          <Sidebar collapsible={isCollapsed ? 'icon' : 'none'} className="w-full">
            <ResizableSidebarContent navigationItems={navigationItems} />
          </Sidebar>
        </SidebarProvider>

        {/* Resize Handle */}
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-4 cursor-col-resize flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-50',
            isDragging && 'opacity-100'
          )}
          onMouseDown={handleMouseDown}
        >
          <div className="h-8 w-1 rounded-full bg-border hover:bg-primary/50 transition-colors">
            <GripVertical className="w-3 h-3 mx-auto mt-2.5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-w-0">{children}</div>
    </div>
  );
}
