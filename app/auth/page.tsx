'use client'

import { SignIn, SignUp, useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { Users, Shield, Home, User as UserIcon, CheckCircle2 } from "lucide-react"
import { BackButton } from "@/components/BackButton"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { isUserAdmin } from "@/lib/clerk-utils.client"

export default function AuthenticationPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'login'

  const isAdmin = user ? isUserAdmin(user) : false

  useEffect(() => {
    if (isLoaded && user) {
      const timer = setTimeout(() => {
        router.push('/profile/me')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
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
                  Logged in as <strong className="text-foreground">{user.primaryEmailAddress?.emailAddress}</strong>
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
                    onClick={() => router.push('/admin')} 
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
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <BackButton fallbackUrl="/" />
        </div>
      </div>

      <div className="flex-1 flex items-start sm:items-center py-4 sm:py-8 px-4 mt-20 md:mt-0">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
            <div className="hidden lg:flex lg:justify-center lg:items-center">
              <div className="relative w-full max-w-md aspect-square">
                <Image 
                  src="/delhi-devs-community.png" 
                  alt="Delhi Devs Community" 
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 lg:col-start-2">
              <div className="lg:hidden text-center mb-6 space-y-3">
                <h1 className="text-2xl font-bold">Welcome to Delhi Devs</h1>
                <p className="text-sm text-muted-foreground">Sign in or create your account</p>
              </div>

              <div className="hidden lg:block mb-8 space-y-2">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your account or create a new one</p>
              </div>

              {/* Social Auth Info Badge */}
              <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-xs text-center text-muted-foreground">
                  ✨ Sign in with <span className="font-semibold text-foreground">Google</span>, <span className="font-semibold text-foreground">GitHub</span>, or <span className="font-semibold text-foreground">LinkedIn</span>
                </p>
              </div>

              <Tabs defaultValue={tab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-muted rounded-lg mb-6">
                  <TabsTrigger value="login" className="h-10 data-[state=active]:bg-background rounded-md">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="h-10 data-[state=active]:bg-background rounded-md">
                    Create Account
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-0">
                  <div className="flex justify-center">
                    <SignIn 
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "shadow-none border-0 bg-transparent",
                          headerTitle: "hidden",
                          headerSubtitle: "hidden",
                          socialButtonsBlockButton: "border-2 hover:bg-accent hover:border-primary/50 transition-all duration-200 ease-out font-medium",
                          socialButtonsBlockButtonText: "font-medium",
                          formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 ease-out font-semibold",
                          footerActionLink: "text-primary hover:text-primary/90 transition-colors duration-200 ease-out font-medium",
                          identityPreviewEditButton: "text-primary hover:text-primary/90",
                          formFieldInput: "border-2 focus:border-primary transition-colors duration-200 ease-out",
                          formFieldLabel: "font-medium",
                          dividerLine: "bg-border",
                          dividerText: "text-muted-foreground text-sm",
                          socialButtonsProviderIcon: "brightness-100",
                        }
                      }}
                      routing="path"
                      path="/auth"
                      signUpUrl="/auth?tab=signup"
                      afterSignInUrl="/profile/me"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-0">
                  <div className="flex justify-center">
                    <SignUp 
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "shadow-none border-0 bg-transparent",
                          headerTitle: "hidden",
                          headerSubtitle: "hidden",
                          socialButtonsBlockButton: "border-2 hover:bg-accent hover:border-primary/50 transition-all duration-200 ease-out font-medium",
                          socialButtonsBlockButtonText: "font-medium",
                          formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 ease-out font-semibold",
                          footerActionLink: "text-primary hover:text-primary/90 transition-colors duration-200 ease-out font-medium",
                          identityPreviewEditButton: "text-primary hover:text-primary/90",
                          formFieldInput: "border-2 focus:border-primary transition-colors duration-200 ease-out",
                          formFieldLabel: "font-medium",
                          dividerLine: "bg-border",
                          dividerText: "text-muted-foreground text-sm",
                          socialButtonsProviderIcon: "brightness-100",
                        }
                      }}
                      routing="path"
                      path="/auth"
                      signInUrl="/auth?tab=login"
                      afterSignUpUrl="/profile/me"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg mt-4 text-center">
                    By creating an account, you agree to follow our{' '}
                    <Link href="/code-of-conduct" className="text-primary hover:underline">
                      community guidelines
                    </Link>.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
