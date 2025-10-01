import React from "react";
import {
  Home,
  UserPlus,
  User,
  Calendar,
  LogIn,
  Shield,
  Settings,
  LucideIcon
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserPlus,
  faUser,
  faCalendar,
  faSignInAlt,
  faShieldAlt,
  faCog,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

// Create wrapper components for Font Awesome icons
const FAHome = (props: any) => <FontAwesomeIcon icon={faHome} {...props} />;
const FAUserPlus = (props: any) => <FontAwesomeIcon icon={faUserPlus} {...props} />;
const FAUser = (props: any) => <FontAwesomeIcon icon={faUser} {...props} />;
const FACalendar = (props: any) => <FontAwesomeIcon icon={faCalendar} {...props} />;
const FASignInAlt = (props: any) => <FontAwesomeIcon icon={faSignInAlt} {...props} />;
const FAShieldAlt = (props: any) => <FontAwesomeIcon icon={faShieldAlt} {...props} />;
const FACog = (props: any) => <FontAwesomeIcon icon={faCog} {...props} />;
const FAInfoCircle = (props: any) => <FontAwesomeIcon icon={faInfoCircle} {...props} />;

export const iconMap: Record<string, LucideIcon | React.ComponentType<any>> = {
  Home,
  UserPlus,
  User,
  Calendar,
  LogIn,
  Shield,
  Settings,
  // Font Awesome icons
  faHome: FAHome,
  faUserPlus: FAUserPlus,
  faUser: FAUser,
  faCalendar: FACalendar,
  faSignInAlt: FASignInAlt,
  faShieldAlt: FAShieldAlt,
  faCog: FACog,
  faInfoCircle: FAInfoCircle,
};

export function getIcon(iconName: string): LucideIcon | React.ComponentType<any> | null {
  return iconMap[iconName] || null;
}