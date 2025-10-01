"use client";

import React from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import {
  NavigationItem as NavigationItemType,
  findParentNavItem,
} from "@/constants/navigation";
import { supabase } from "@/integrations/supabase/client";

interface MobileBottomNavigationProps {
  navigationItems: NavigationItemType[];
}

export const MobileBottomNavigation = React.memo(
  function MobileBottomNavigation({
    navigationItems,
  }: MobileBottomNavigationProps) {
    const pathname = usePathname();
    const [isAuthed, setIsAuthed] = useState<boolean>(false);

    useEffect(() => {
      let mounted = true;
      const init = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (mounted) setIsAuthed(!!user);
      };
      init();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_e, session) => {
        setIsAuthed(!!session?.user);
      });
      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }, []);

    // Curate a modern, focused set of tabs for mobile
    const tabs = useMemo(() => {
      const preferredOrder = isAuthed
        ? ["Home", "Events", "About", "Profile"]
        : ["Home", "Events", "About", "Profile"]; // Show Profile for both states, it will redirect to login if needed
      const exclude = new Set([
        "Login",
        "Code of Conduct",
        "Admin",
        "Join Community",
      ]);
      const byTitle: Record<string, NavigationItemType> = {};
      for (const item of navigationItems) byTitle[item.title] = item;
      const ordered = preferredOrder
        .map((t) => byTitle[t])
        .filter(Boolean) as NavigationItemType[];
      const extras = navigationItems.filter(
        (i) => !exclude.has(i.title) && !preferredOrder.includes(i.title)
      );
      return (ordered.length ? ordered : navigationItems)
        .slice(0, 4)
        .concat(extras)
        .slice(0, 4);
    }, [navigationItems, isAuthed]);

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
