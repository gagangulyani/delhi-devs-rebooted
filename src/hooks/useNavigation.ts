import { useLocation } from "react-router-dom";
import { navigationItems } from "@/constants/navigation";

export function useNavigation() {
  const location = useLocation();

  const getActiveNavigationItem = () => {
    return navigationItems.find(item => item.url === location.pathname);
  };

  const isActiveRoute = (url: string) => {
    return location.pathname === url;
  };

  return {
    navigationItems,
    currentLocation: location,
    activeItem: getActiveNavigationItem(),
    isActiveRoute,
  };
}