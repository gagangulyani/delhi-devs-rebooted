"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

export function ClerkThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: "hsl(22, 90%, 58%)",
          colorBackground:
            theme === "dark" ? "hsl(12, 60%, 8%)" : "hsl(28, 75%, 96%)",
          colorInputBackground:
            theme === "dark" ? "hsl(15, 35%, 22%)" : "hsl(24, 35%, 85%)",
          colorInputText:
            theme === "dark" ? "hsl(28, 65%, 94%)" : "hsl(18, 24%, 20%)",
          colorText:
            theme === "dark" ? "hsl(28, 65%, 94%)" : "hsl(18, 24%, 20%)",
          colorTextSecondary:
            theme === "dark" ? "hsl(24, 30%, 70%)" : "hsl(22, 25%, 40%)",
          colorDanger:
            theme === "dark" ? "hsl(2, 70%, 48%)" : "hsl(2, 78%, 55%)",
          colorSuccess: "hsl(142, 76%, 36%)",
          colorWarning: "hsl(38, 92%, 50%)",
          colorNeutral:
            theme === "dark" ? "hsl(15, 35%, 20%)" : "hsl(28, 40%, 88%)",
          colorShimmer:
            theme === "dark" ? "hsl(15, 35%, 25%)" : "hsl(24, 35%, 80%)",
          fontFamily: "inherit",
          borderRadius: "0.5rem",
        },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        },
        elements: {
          card: "shadow-lg border border-border bg-card",
          rootBox: "border border-border rounded-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "border border-border hover:bg-accent/10 hover:border-primary/50 transition-colors",
          socialButtonsBlockButtonText: "text-foreground",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-primary-foreground border-0",
          footerActionLink: "text-primary hover:text-primary/90",
          formFieldInput:
            "border border-border bg-input text-foreground focus:border-primary focus:ring-1 focus:ring-primary",
          formFieldLabel: "text-foreground",
          formFieldInputShowPasswordButton:
            "text-muted-foreground hover:text-foreground",
          identityPreviewEditButton:
            "text-primary hover:text-primary/90 border border-border",
          badge: "bg-secondary text-secondary-foreground border border-border",
          alertText: "text-foreground",
          alert: "border border-border bg-card",
          otpCodeFieldInput:
            "border border-border bg-input text-foreground focus:border-primary",
          selectButton:
            "border border-border bg-input text-foreground hover:bg-accent/10",
          backLink: "text-primary hover:text-primary/90",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
