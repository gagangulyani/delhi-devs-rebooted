export interface NavigationItem {
  title: string;
  url: string;
  icon: string;
  isPublic: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    url: "/",
    icon: "faHome",
    isPublic: true,
  },
  {
    title: "Events",
    url: "/events",
    icon: "faCalendar",
    isPublic: true,
  },
  {
    title: "About",
    url: "/about",
    icon: "faInfoCircle",
    isPublic: true,
  },
  {
    title: "Join Community",
    url: "/join",
    icon: "faUserPlus",
    isPublic: true,
  },
  {
    title: "Code of Conduct",
    url: "/code-of-conduct",
    icon: "faShieldAlt",
    isPublic: true,
  },
];

export const getPublicNavigationItems = () =>
  navigationItems.filter((item) => item.isPublic);

export const getPageTitle = (pathname: string): string | null => {
  if (pathname.startsWith("/events/") && pathname !== "/events") {
    return "Event Details";
  }
  return null;
};

const matchesRoute = (pathname: string, baseUrl: string): boolean => {
  if (pathname === baseUrl) {
    return true;
  }
  if (baseUrl !== "/" && pathname.startsWith(baseUrl + "/")) {
    return true;
  }
  return false;
};

export const findParentNavItem = (pathname: string) => {
  return navigationItems.find((item) => matchesRoute(pathname, item.url));
};
