export const navigationItems = [
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
    icon: "faHome",
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
  },
];

// Filter function to get only public navigation items
export const getPublicNavigationItems = () => navigationItems.filter(item => item.isPublic);

// Filter function to get navigation items for authenticated users
export const getAuthenticatedNavigationItems = (isAdmin: boolean = false) => {
  if (isAdmin) {
    return navigationItems; // Admins see all items
  }
  return navigationItems.filter(item => item.isPublic); // Regular users see only public items
};

export type NavigationItem = typeof navigationItems[0];