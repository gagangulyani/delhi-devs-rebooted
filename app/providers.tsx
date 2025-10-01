'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}