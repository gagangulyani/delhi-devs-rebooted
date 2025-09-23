'use client'

import { usePathname } from "next/navigation";
import { navigationItems } from "@/constants/navigation";

export function useNavigation() {
  const pathname = usePathname();

  const getActiveNavigationItem = () => {
    return navigationItems.find(item => item.url === pathname);
  };

  const isActiveRoute = (url: string) => {
    return pathname === url;
  };

  return {
    navigationItems,
    currentLocation: { pathname },
    activeItem: getActiveNavigationItem(),
    isActiveRoute,
  };
}