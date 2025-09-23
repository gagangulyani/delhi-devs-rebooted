export const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: "Home",
  },
  {
    title: "Join Community",
    url: "/join",
    icon: "UserPlus",
  },
  {
    title: "Login",
    url: "/auth",
    icon: "LogIn",
  },
  {
    title: "Code of Conduct",
    url: "/code-of-conduct",
    icon: "Shield",
  },
  {
    title: "Admin",
    url: "/admin",
    icon: "Settings",
  },
];

export type NavigationItem = typeof navigationItems[0];