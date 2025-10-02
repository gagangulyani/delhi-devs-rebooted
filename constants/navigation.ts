import { isFeatureEnabled } from "./features";

export type FeatureKey = "events" | "blogs" | "admin";

export interface NavigationItem {
  title: string;
  url: string;
  icon: string;
  isPublic: boolean;
  feature?: FeatureKey;
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
    // feature controls visibility in navigation, route still exists
    feature: "events",
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: "faNewspaper",
    isPublic: true,
    feature: "blogs",
  },
  {
    title: "About",
    url: "/about",
    icon: "faInfoCircle",
    isPublic: true,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: "faUser",
    isPublic: true,
  },
  {
    title: "Join Community",
    url: "/join",
    icon: "faUserPlus",
    isPublic: true,
  },
  {
    title: "Login",
    url: "/auth",
    icon: "faSignInAlt",
    isPublic: true,
  },
  {
    title: "Code of Conduct",
    url: "/code-of-conduct",
    icon: "faShieldAlt",
    isPublic: true,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: "faCog",
    isPublic: false, // Admin-only item
    feature: "admin",
  },
];

// Filter function to get only public navigation items
// Helper to check if a navigation item should be visible in menus based on feature flags
const isNavItemVisible = (item: any) => {
  if (!item.feature) return true;
  // only show in navigation if feature is enabled
  return isFeatureEnabled(item.feature as any);
};

export const getPublicNavigationItems = () =>
  navigationItems.filter((item) => item.isPublic && isNavItemVisible(item));

// Filter function to get navigation items for authenticated users
export const getAuthenticatedNavigationItems = (isAdmin: boolean = false) => {
  if (isAdmin) {
    // Admins see all items but respect feature flags so that toggling off a feature hides it from menus
    return navigationItems.filter(isNavItemVisible);
  }
  return navigationItems.filter(
    (item) => item.isPublic && isNavItemVisible(item)
  ); // Regular users see only public items
};

// Helper function to check if a pathname matches a nav item's routes
const matchesRoute = (pathname: string, baseUrl: string): boolean => {
  // Exact match
  if (pathname === baseUrl) {
    return true;
  }

  // Check for child routes (e.g., /events/123 matches /events)
  if (baseUrl !== "/" && pathname.startsWith(baseUrl + "/")) {
    return true;
  }

  return false;
};

// Find the parent navigation item for a given pathname
export const findParentNavItem = (pathname: string) => {
  return navigationItems.find((item) => matchesRoute(pathname, item.url));
};

// Get page title based on pathname
export const getPageTitle = (pathname: string): string | null => {
  // Special handling for dynamic routes
  if (pathname.startsWith("/events/") && pathname !== "/events") {
    return "Event Details";
  }
  if (pathname.startsWith("/profile/")) {
    if (pathname === "/profile/me") {
      return "My Profile";
    }
    return "User Profile";
  }
  if (pathname.startsWith("/admin/") && pathname !== "/admin") {
    return "Admin Panel";
  }

  return null;
};

// (NavigationItem is exported above)
