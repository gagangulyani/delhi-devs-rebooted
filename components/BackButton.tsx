"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigation } from "@/contexts/NavigationContext";

interface BackButtonProps {
  fallbackUrl?: string;
  label?: string;
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function BackButton({
  fallbackUrl = "/",
  label = "Back",
  variant = "ghost",
  size = "sm",
  className = "",
}: BackButtonProps) {
  const { goBack, previousPath } = useNavigation();

  const handleBack = () => {
    // Use navigation context's smart goBack
    goBack();
  };

  return (
    <Button
      onClick={handleBack}
      variant={variant}
      size={size}
      className={`rounded-full ${className}`}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
