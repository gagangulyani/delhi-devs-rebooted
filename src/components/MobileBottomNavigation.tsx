import { useLocation } from "react-router-dom";
import { NavigationItem } from "./NavigationItem";
import { NavigationItem as NavigationItemType } from "@/types/layout";

interface MobileBottomNavigationProps {
  navigationItems: NavigationItemType[];
}

export function MobileBottomNavigation({ navigationItems }: MobileBottomNavigationProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50">
        <div className="flex items-center justify-around py-3 px-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
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