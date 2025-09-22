import React from "react";
import { Link } from "react-router-dom";
import { NavigationItem as NavigationItemType, LayoutVariant } from "@/types/layout";

interface NavigationItemProps extends LayoutVariant {
  item: NavigationItemType;
  isActive: boolean;
  className?: string;
}

export const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ item, isActive, variant = "desktop", className = "" }, ref) => {
    const getDisplayName = (title: string) => {
      if (variant === "mobile") {
        switch (title) {
          case "Join Community":
            return "Join";
          case "Code of Conduct":
            return "Code";
          default:
            return title;
        }
      }
      return title;
    };

    const baseClasses = "flex flex-col items-center justify-center transition-all duration-200 ease-out";
    
    const mobileClasses = `${baseClasses} py-2.5 px-2 rounded-xl min-w-0 flex-1 group ${
      isActive 
        ? "text-primary" 
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/5 hover:backdrop-blur-sm hover:scale-102"
    }`;

    if (variant === "mobile") {
      return (
        <Link
          ref={ref}
          to={item.url}
          className={`${mobileClasses} ${className}`}
        >
          <item.icon className={`h-5 w-5 mb-1.5 transition-all duration-200 ease-out ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
          <span className={`text-[10px] font-semibold leading-none tracking-wide transition-all duration-200 ease-out ${isActive ? 'scale-105' : ''}`}>
            {getDisplayName(item.title)}
          </span>
        </Link>
      );
    }

    // Desktop variant - for sidebar
    return (
      <Link 
        ref={ref} 
        to={item.url} 
        className={`flex items-center space-x-4 px-4 py-3 ${className}`}
      >
        <item.icon className="h-6 w-6" />
        <span className="text-lg font-medium">{item.title}</span>
      </Link>
    );
  }
);

NavigationItem.displayName = "NavigationItem";