import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-muted/50 via-muted/80 to-muted/50 bg-[length:200%_100%]",
        "animate-shimmer",
        className
      )}
      style={{
        animation: "shimmer 2s ease-in-out infinite",
      }}
      {...props}
    />
  );
}

export { Skeleton };
