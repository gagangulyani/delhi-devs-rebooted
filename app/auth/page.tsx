"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Users,
  Shield,
  Home,
  User as UserIcon,
  CheckCircle2,
} from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isUserAdmin } from "@/lib/clerk-utils.client";
import { FloatingCodeIcons } from "@/components/FloatingCodeIcons";

export default function AuthenticationPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "login";

  const isAdmin = user ? isUserAdmin(user) : false;

  const handleTabChange = (value: string) => {
    router.push(`/auth?tab=${value}`);
  };

  useEffect(() => {
    if (isLoaded && user) {
      const timer = setTimeout(() => {
        router.push("/profile/me");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-lg">
          <div className="mb-8">
            <BackButton fallbackUrl="/" />
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Welcome Back!</CardTitle>
                <CardDescription className="text-base">
                  Logged in as{" "}
                  <strong className="text-foreground">
                    {user.primaryEmailAddress?.emailAddress}
                  </strong>
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  You're now connected to Delhi NCR's tech community
                </p>
              </div>

              <div className="space-y-3">
                {isAdmin && (
                  <Button
                    onClick={() => router.push("/admin")}
                    className="w-full"
                    size="lg"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Admin Dashboard
                  </Button>
                )}

                <Link href="/" className="block">
                  <Button variant="default" className="w-full" size="lg">
                    <Home className="mr-2 h-5 w-5" />
                    Explore Community
                  </Button>
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <Link href="/events">
                    <Button variant="outline" className="w-full" size="lg">
                      <Users className="mr-2 h-4 w-4" />
                      Events
                    </Button>
                  </Link>

                  <Link href="/profile/me">
                    <Button variant="outline" className="w-full" size="lg">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/8 rounded-full blur-3xl" />

        {/* Floating Code Icons */}
        <FloatingCodeIcons />
      </div>

      <div className="py-4 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <BackButton fallbackUrl="/" />
        </div>
      </div>

      <div className="flex-1 flex items-start sm:items-center py-4 sm:py-8 px-4 mt-20 md:mt-0 relative z-10">
        <div className="container mx-auto max-w-md w-full">
          <div className="w-full">
              <Tabs
                value={tab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsContent value="login" className="mt-0">
                  <div className="flex justify-center">
                    <SignIn
                      routing="path"
                      path="/auth"
                      signUpUrl="/auth?tab=signup"
                      fallbackRedirectUrl="/profile/me"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="mt-0">
                  <div className="flex justify-center">
                    <SignUp
                      routing="path"
                      path="/auth"
                      signInUrl="/auth?tab=login"
                      fallbackRedirectUrl="/profile/me"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg mt-4 text-center">
                    By creating an account, you agree to follow our{" "}
                    <Link
                      href="/code-of-conduct"
                      className="text-primary hover:underline"
                    >
                      community guidelines
                    </Link>
                    .
                  </div>
                </TabsContent>
              </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
