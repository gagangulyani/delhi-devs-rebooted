"use client";

import React from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import {
  NavigationItem as NavigationItemType,
  findParentNavItem,
} from "@/constants/navigation";

interface MobileBottomNavigationProps {
  navigationItems: NavigationItemType[];
}

export const MobileBottomNavigation = React.memo(
  function MobileBottomNavigation({
    navigationItems,
  }: MobileBottomNavigationProps) {
    const pathname = usePathname();

    const tabs = useMemo(() => {
      const preferredOrder = ["Home", "Events", "About", "Join Community"];
      const exclude = new Set(["Code of Conduct"]);
      const byTitle: Record<string, NavigationItemType> = {};
      for (const item of navigationItems) byTitle[item.title] = item;
      const ordered = preferredOrder
        .map((t) => byTitle[t])
        .filter(Boolean) as NavigationItemType[];
      const extras = navigationItems.filter(
        (i) => !exclude.has(i.title) && !preferredOrder.includes(i.title)
      );
      return (ordered.length ? ordered : navigationItems)
        .slice(0, 5)
        .concat(extras)
        .slice(0, 5);
    }, [navigationItems]);

    const parentItem = useMemo(() => findParentNavItem(pathname), [pathname]);

    return (
      <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="relative bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50">
          <div className="flex items-center justify-around py-3 px-1">
            {tabs.map((item) => {
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
