"use client";

import { usePathname } from "next/navigation";
import { findParentNavItem, getPageTitle } from "@/constants/navigation";
import { getIcon } from "@/lib/icon-utils";
import { ChevronRight } from "lucide-react";

export function SidebarBreadcrumb() {
  const pathname = usePathname();
  const parentItem = findParentNavItem(pathname);
  const pageTitle = getPageTitle(pathname);

  // If we're on a root page (no child page), don't show breadcrumb
  if (!pageTitle || !parentItem) {
    return null;
  }

  const ParentIcon = getIcon(parentItem.icon);

  return (
    <div className="px-4 py-3 border-b border-sidebar-border bg-sidebar-accent/20 group-data-[collapsible=icon]:hidden">
      <div className="flex items-center gap-2 text-xs overflow-hidden">
        <div className="flex items-center gap-1.5 text-sidebar-foreground/60 min-w-0">
          {ParentIcon && <ParentIcon className="h-3.5 w-3.5 flex-shrink-0" />}
          <span className="font-medium truncate">{parentItem.title}</span>
        </div>
        <ChevronRight className="h-3 w-3 text-sidebar-foreground/30 flex-shrink-0" />
        <span className="font-semibold text-sidebar-foreground/90 truncate flex-1">{pageTitle}</span>
      </div>
    </div>
  );
}
