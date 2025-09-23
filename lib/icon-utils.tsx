import { 
  Home, 
  UserPlus, 
  LogIn, 
  Shield, 
  Settings,
  LucideIcon
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Home,
  UserPlus,
  LogIn,
  Shield,
  Settings,
};

export function getIcon(iconName: string): LucideIcon | null {
  return iconMap[iconName] || null;
}