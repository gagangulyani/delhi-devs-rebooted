import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface InlineLoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const InlineLoading = React.memo(function InlineLoading({
  message = "Loading...",
  size = "md",
  className = ""
}: InlineLoadingProps) {
  return (
    <div className={`flex items-center justify-center gap-2 p-4 ${className}`}>
      <LoadingSpinner size={size} />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
});