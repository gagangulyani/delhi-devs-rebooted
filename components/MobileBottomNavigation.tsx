"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { NavigationItem as NavigationItemType } from "@/constants/navigation";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MobileBottomNavigationProps {
  navigationItems: NavigationItemType[];
}

export function MobileBottomNavigation({
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
      ? ["Home", "Events", "Profile", "Join Community"]
      : ["Home", "Events", "Join Community", "Login"]; // replace Profile with Login when unauthenticated
    const exclude = new Set(["Login", "Code of Conduct", "Admin"]);
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

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="relative bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50">
        {/* Tabs */}
        <div className="flex items-center justify-around py-3 px-1">
          {tabs.map((item) => {
            const isActive = pathname === item.url;
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

        {/* Center primary action - Host Event */}
        <div className="absolute inset-x-0 -top-6 flex justify-center pointer-events-none">
          <Link
            href="/events#create"
            aria-label="Host an event"
            className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-xl shadow-blue-500/30 ring-4 ring-white/70 dark:ring-black/40"
          >
            <Plus className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
