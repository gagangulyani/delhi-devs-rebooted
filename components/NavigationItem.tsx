import React from "react";
import Link from "next/link";
import { NavigationItem as NavigationItemType } from "@/constants/navigation";
import { getIcon } from "@/lib/icon-utils";

interface LayoutVariant {
  variant?: "desktop" | "mobile";
}

interface NavigationItemProps extends LayoutVariant {
  item: NavigationItemType;
  isActive: boolean;
  isParentActive?: boolean; // For showing when we're in a child page
  className?: string;
}

export const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ item, isActive, isParentActive = false, variant = "desktop", className = "" }, ref) => {
    const Icon = getIcon(item.icon);
    
    if (!Icon) {
      console.error(`Icon not found for: ${item.icon}`);
      return null;
    }
    
    // Show indicator when we're in a child page of this parent
    const showIndicator = isParentActive && !isActive;

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
          href={item.url}
          className={`${mobileClasses} ${className}`}
        >
          <Icon className={`h-5 w-5 mb-1.5 transition-all duration-200 ease-out ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
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
        href={item.url} 
        className={`flex items-center gap-3 w-full transition-colors duration-150 ${className}`}
      >
        <div className={`relative flex items-center justify-center min-w-10 w-10 h-10 rounded-lg transition-all duration-150 ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : showIndicator
            ? 'bg-primary/10 text-primary'
            : 'text-sidebar-foreground/70'
        }`}>
          <Icon className={`h-5 w-5 transition-transform duration-150 ${
            isActive ? '' : 'group-hover:scale-110'
          }`} />
          {showIndicator && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          )}
        </div>
        <span className={`text-sm font-medium transition-all duration-150 overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 ${
          isActive 
            ? 'text-primary font-semibold' 
            : showIndicator
            ? 'text-primary/80'
            : 'text-sidebar-foreground group-hover:text-primary'
        }`}>
          {item.title}
        </span>
      </Link>
    );
  }
);

NavigationItem.displayName = "NavigationItem";