'use client'

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { NavigationProvider } from "@/contexts/NavigationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <LoadingProvider>
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </LoadingProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
