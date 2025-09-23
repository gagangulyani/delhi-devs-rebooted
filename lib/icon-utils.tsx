import React from "react";
import {
  Home,
  UserPlus,
  LogIn,
  Shield,
  Settings,
  LucideIcon
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserPlus,
  faSignInAlt,
  faShieldAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons';

// Create wrapper components for Font Awesome icons
const FAHome = (props: any) => <FontAwesomeIcon icon={faHome} {...props} />;
const FAUserPlus = (props: any) => <FontAwesomeIcon icon={faUserPlus} {...props} />;
const FASignInAlt = (props: any) => <FontAwesomeIcon icon={faSignInAlt} {...props} />;
const FAShieldAlt = (props: any) => <FontAwesomeIcon icon={faShieldAlt} {...props} />;
const FACog = (props: any) => <FontAwesomeIcon icon={faCog} {...props} />;

export const iconMap: Record<string, LucideIcon | React.ComponentType<any>> = {
  Home,
  UserPlus,
  LogIn,
  Shield,
  Settings,
  // Font Awesome icons
  faHome: FAHome,
  faUserPlus: FAUserPlus,
  faSignInAlt: FASignInAlt,
  faShieldAlt: FAShieldAlt,
  faCog: FACog,
};

export function getIcon(iconName: string): LucideIcon | React.ComponentType<any> | null {
  return iconMap[iconName] || null;
}