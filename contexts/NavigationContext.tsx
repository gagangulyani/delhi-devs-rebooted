"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface NavigationContextType {
  previousPath: string | null;
  goBack: () => void;
  setPreviousPath: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Update history when pathname changes
    setNavigationHistory((prev) => {
      // Don't add the same path twice in a row
      if (prev.length > 0 && prev[prev.length - 1] === pathname) {
        return prev;
      }
      
      // Store previous path before adding new one
      if (prev.length > 0) {
        setPreviousPath(prev[prev.length - 1]);
      }
      
      // Keep only last 10 paths to avoid memory issues
      const newHistory = [...prev, pathname];
      return newHistory.slice(-10);
    });
  }, [pathname]);

  const goBack = useCallback(() => {
    // Try to use browser history first
    if (navigationHistory.length > 1) {
      // Get the path before current one
      const targetPath = navigationHistory[navigationHistory.length - 2];
      
      // Remove current path from history
      setNavigationHistory((prev) => prev.slice(0, -1));
      
      router.push(targetPath);
    } else if (previousPath) {
      router.push(previousPath);
    } else {
      // Fallback to home if no history
      router.push("/");
    }
  }, [navigationHistory, previousPath, router]);

  return (
    <NavigationContext.Provider value={{ previousPath, goBack, setPreviousPath }}>
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
