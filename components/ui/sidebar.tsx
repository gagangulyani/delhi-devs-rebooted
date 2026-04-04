"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:collapsed";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "22rem";
const SIDEBAR_WIDTH_ICON = "3.5rem";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

export function useSidebarSafe() {
  return React.useContext(SidebarContext);
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({ children, defaultCollapsed = false }: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Initialize from cookie on mount only
  React.useEffect(() => {
    setMounted(true);
    const cookies = document.cookie.split(";");
    const sidebarCookie = cookies.find((c) => c.trim().startsWith(`${SIDEBAR_COOKIE_NAME}=`));
    if (sidebarCookie) {
      const value = sidebarCookie.split("=")[1];
      setCollapsed(value === "true");
    }
  }, []);

  const updateCollapsed = React.useCallback((value: boolean) => {
    setCollapsed(value);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, []);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => {
        const newValue = !prev;
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${newValue}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        return newValue;
      });
    }
  }, [isMobile]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const value = React.useMemo(
    () => ({
      collapsed,
      setCollapsed: updateCollapsed,
      toggleSidebar,
      isMobile: !!isMobile,
      mobileOpen,
      setMobileOpen,
    }),
    [collapsed, updateCollapsed, toggleSidebar, isMobile, mobileOpen]
  );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <TooltipProvider delayDuration={0}>
        <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
    </TooltipProvider>
  );
}

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  const { collapsed, isMobile, mobileOpen, setMobileOpen } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[280px] p-0 bg-sidebar border-l border-sidebar-border">
          <div className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out md:flex",
          collapsed ? "w-[var(--sidebar-width-icon)]" : "w-[var(--sidebar-width)]",
          className
        )}
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </TooltipProvider>
  );
}

interface SidebarTriggerProps {
  className?: string;
}

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { isMobile, mobileOpen, setMobileOpen, toggleSidebar } = useSidebar();

  if (!isMobile) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={toggleSidebar}
    >
      {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
}

interface SidebarCollapseButtonProps {
  className?: string;
}

export function SidebarCollapseButton({ className }: SidebarCollapseButtonProps) {
  const { collapsed, toggleSidebar, isMobile } = useSidebar();

  if (isMobile) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={cn("h-8 w-8 shrink-0", className)}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarLayout({ children, className }: SidebarLayoutProps) {
  const { collapsed, isMobile } = useSidebar();

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-300 ease-in-out",
        !isMobile && (collapsed ? "md:pl-[var(--sidebar-width-icon)]" : "md:pl-[var(--sidebar-width)]"),
        className
      )}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 p-4", className)} {...props} />
  )
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className)}
      {...props}
    />
  )
);
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 p-4", className)} {...props} />
  )
);
SidebarFooter.displayName = "SidebarFooter";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 p-2", className)} {...props} />
  )
);
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed, isMobile } = useSidebar();
    if (collapsed && !isMobile) return null;
    return (
      <div
        ref={ref}
        className={cn(
          "px-2 py-1.5 text-xs font-semibold text-sidebar-foreground/60",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
  )
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("relative", className)} {...props} />
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  {
    variants: {
      isActive: {
        true: "bg-sidebar-accent text-sidebar-accent-foreground",
        false: "text-sidebar-foreground",
      },
      collapsed: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isActive: true,
        collapsed: true,
        className: "bg-transparent",
      },
      {
        collapsed: true,
        className: "hover:bg-transparent",
      },
    ],
    defaultVariants: {
      isActive: false,
      collapsed: false,
    },
  }
);

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  tooltip?: string;
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, asChild = false, tooltip, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { collapsed, isMobile } = useSidebar();
    const button = (
      <Comp
        ref={ref}
        className={cn(
          sidebarMenuButtonVariants({ isActive, collapsed: collapsed && !isMobile }),
          collapsed && !isMobile && "justify-center px-2",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );

    if (tooltip && collapsed && !isMobile) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={cn("mx-3 bg-sidebar-border", className)} {...props} />
));
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentPropsWithoutRef<typeof Input>>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      className={cn(
        "h-8 w-full border-sidebar-border bg-background shadow-none focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
);
SidebarInput.displayName = "SidebarInput";

export {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInput,
};
