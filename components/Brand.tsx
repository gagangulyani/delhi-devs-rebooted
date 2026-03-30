'use client';

import Image from "next/image";

interface BrandProps {
  variant?: "mobile" | "desktop" | "collapsed";
  className?: string;
}

export function Brand({ variant = "desktop", className = "" }: BrandProps) {
  // Collapsed state - icon only (used when sidebar is collapsed)
  if (variant === "collapsed") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src="/delhi-devs-rebooted.png"
          alt="Delhi Devs Rebooted"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full shadow-sm"
        />
      </div>
    );
  }

  // Mobile state - icon + text
  if (variant === "mobile") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Image
          src="/delhi-devs-rebooted.png"
          alt="Delhi Devs Rebooted"
          width={28}
          height={28}
          className="w-7 h-7 rounded-full shadow-sm"
        />
        <span className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Delhi Devs Rebooted
        </span>
      </div>
    );
  }

  // Desktop state - icon + text
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Image
        src="/delhi-devs-rebooted.png"
        alt="Delhi Devs Rebooted"
        width={40}
        height={40}
        className="w-10 h-10 flex-shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <span className="text-xl font-bold text-sidebar-foreground truncate">
          Delhi Devs Rebooted
        </span>
      </div>
    </div>
  );
}
