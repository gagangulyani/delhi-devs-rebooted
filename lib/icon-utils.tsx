import React from "react";
import {
  Home,
  UserPlus,
  User,
  Calendar,
  LogIn,
  Shield,
  Settings,
  Info,
  Github,
  LucideIcon
} from "lucide-react";

// Icon mapping for navigation and other components
export const iconMap: Record<string, LucideIcon> = {
  Home,
  UserPlus,
  User,
  Calendar,
  LogIn,
  Shield,
  Settings,
  Info,
  Github,
  // Legacy mappings for backwards compatibility
  faHome: Home,
  faUserPlus: UserPlus,
  faUser: User,
  faCalendar: Calendar,
  faSignInAlt: LogIn,
  faShieldAlt: Shield,
  faCog: Settings,
  faInfoCircle: Info,
  faGithub: Github,
};

export function getIcon(iconName: string): LucideIcon | null {
  return iconMap[iconName] || null;
}
