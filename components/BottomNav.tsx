"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { NavigationItem } from "@/constants/navigation";
import { getIcon } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";

const shortLabels: Record<string, string> = {
  "Code of Conduct": "Conduct",
};

export function BottomNav({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(url + "/");

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:bottom-6"
    >
      <div
        className="flex items-center gap-1 rounded-full border-2 border-foreground bg-card p-1.5"
        style={{ boxShadow: "5px 5px 0 0 hsl(var(--primary))" }}
      >
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          const active = isActive(item.url);
          const label = shortLabels[item.title] ?? item.title;

          return (
            <Link
              key={item.title}
              href={item.url}
              aria-label={item.title}
              title={item.title}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-2 rounded-full px-2.5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-150 sm:px-3",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              style={active ? { boxShadow: "2px 2px 0 0 hsl(var(--primary))" } : undefined}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-150",
                    active ? "scale-110" : "group-hover:scale-105"
                  )}
                />
              )}
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}

        <span aria-hidden="true" className="mx-1 h-6 w-px bg-border" />

        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
        >
          {mounted ? (
            <>
              <Sun
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isDark ? "rotate-0 scale-100 opacity-100" : "absolute -rotate-90 scale-0 opacity-0"
                )}
              />
              <Moon
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isDark ? "absolute rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
              />
            </>
          ) : (
            <span className="h-5 w-5" />
          )}
        </button>
      </div>
    </nav>
  );
}
