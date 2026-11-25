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
    title: "Code of Conduct",
    url: "/code-of-conduct",
    icon: "faShieldAlt",
    isPublic: true,
  },
  {
    title: "Contribute",
    url: "/contribute",
    icon: "faGithub",
    isPublic: true,
  },
];

export const getPublicNavigationItems = () =>
  navigationItems.filter((item) => item.isPublic);
