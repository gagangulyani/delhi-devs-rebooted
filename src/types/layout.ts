import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface LayoutVariant {
  variant?: "mobile" | "desktop";
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}