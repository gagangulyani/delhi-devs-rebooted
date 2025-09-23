export const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: "faHome",
  },
  {
    title: "Join Community",
    url: "/join",
    icon: "faUserPlus",
  },
  {
    title: "Login",
    url: "/auth",
    icon: "faSignInAlt",
  },
  {
    title: "Code of Conduct",
    url: "/code-of-conduct",
    icon: "faShieldAlt",
  },
  {
    title: "Admin",
    url: "/admin",
    icon: "faCog",
  },
];

export type NavigationItem = typeof navigationItems[0];