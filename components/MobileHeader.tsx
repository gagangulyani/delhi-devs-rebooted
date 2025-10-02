"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Brand } from "./Brand";
import { usePathname } from "next/navigation";

interface MobileHeaderProps {
  children?: ReactNode;
}

export function MobileHeader({ children }: MobileHeaderProps) {
  const pathname = usePathname();
  const isProfilePage = pathname?.startsWith('/profile');
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 bg-background/70 backdrop-blur-2xl border-b border-border py-3 px-4 md:hidden">
      <Link href="/" className="transition-opacity hover:opacity-80">
        <Brand variant="mobile" />
      </Link>
      {/* Replace theme toggle with settings button on profile pages (mobile) - profile page renders its own settings trigger */}
      {!isProfilePage && (
        <div className="rounded-full">
          <ThemeToggle variant="ghost" />
        </div>
      )}
      {children}
    </header>
  );
}