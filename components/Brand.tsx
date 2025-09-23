import Image from "next/image";

interface BrandProps {
  variant?: "mobile" | "desktop";
  className?: string;
}

export function Brand({ variant = "desktop", className = "" }: BrandProps) {
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
        <span className="text-xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden truncate">
          Delhi Devs Rebooted
        </span>
      </div>
    </div>
  );
}
