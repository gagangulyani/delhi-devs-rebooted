"use client";

import React from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { NavigationItem } from "./NavigationItem";
import {
  NavigationItem as NavigationItemType,
  findParentNavItem,
} from "@/constants/navigation";
import { isUserAdmin } from "@/lib/clerk-utils.client";

interface MobileBottomNavigationProps {
  navigationItems: NavigationItemType[];
}

export const MobileBottomNavigation = React.memo(
  function MobileBottomNavigation({
    navigationItems,
  }: MobileBottomNavigationProps) {
    const pathname = usePathname();
    const { isSignedIn, user } = useUser();
    const isAuthed = !!isSignedIn;
    const isAdmin = user ? isUserAdmin(user) : false;

    // Curate a modern, focused set of tabs for mobile
    const tabs = useMemo(() => {
      // Filter out admin items if user is not admin
      const filteredItems = navigationItems.filter(item => {
        if (item.isPublic) return true;
        return isAdmin;
      });
      
      const preferredOrder = isAuthed
        ? ["Home", "Events", "About", "Profile"]
        : ["Home", "Events", "About", "Profile"]; // Show Profile for both states, it will redirect to login if needed
      const exclude = new Set([
        "Login",
        "Code of Conduct",
        "Admin", // Admin excluded from mobile nav for space
        "Join Community",
      ]);
      const byTitle: Record<string, NavigationItemType> = {};
      for (const item of filteredItems) byTitle[item.title] = item;
      const ordered = preferredOrder
        .map((t) => byTitle[t])
        .filter(Boolean) as NavigationItemType[];
      const extras = filteredItems.filter(
        (i) => !exclude.has(i.title) && !preferredOrder.includes(i.title)
      );
      return (ordered.length ? ordered : filteredItems)
        .slice(0, 4)
        .concat(extras)
        .slice(0, 4);
    }, [navigationItems, isAuthed, isAdmin]);

    const parentItem = useMemo(() => findParentNavItem(pathname), [pathname]);

    return (
      <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="relative bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50">
          {/* Tabs */}
          <div className="flex items-center justify-around py-3 px-1">
            {tabs.map((item) => {
              // Check if this item or its children are active
              const isParentActive = parentItem?.url === item.url;
              const isExactMatch = pathname === item.url;
              const isActive = isExactMatch || isParentActive;

              return (
                <NavigationItem
                  key={item.title}
                  item={item}
                  isActive={isActive}
                  variant="mobile"
                />
              );
            })}
          </div>
        </div>
      </nav>
    );
  }
);
