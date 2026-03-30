"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

interface NavigationContextType {
  goBack: (fallbackUrl?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const goBack = useCallback((fallbackUrl: string = "/") => {
    // Use Next.js router.back() which properly handles browser history
    // If no history exists, it will do nothing, so we need to check
    if (typeof window !== 'undefined') {
      // Check if we can go back
      if (window.history.length > 1) {
        router.back();
      } else {
        // No history, go to fallback
        router.push(fallbackUrl);
      }
    } else {
      router.push(fallbackUrl);
    }
  }, [router]);

  const contextValue = useMemo(
    () => ({ goBack }),
    [goBack]
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
