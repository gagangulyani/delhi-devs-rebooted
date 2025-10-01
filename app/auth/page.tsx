'use client'

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, LogOut, Shield, Home, Mail, Lock, User as UserIcon, Phone, Linkedin, Sparkles, CheckCircle2 } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedin_profile: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

export default function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<{ role: string } | null>(null);
  const router = useRouter();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin_profile: "",
      password: "",
      confirmPassword: "",
    },
  });

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setUserProfile(data);
        // Disabled for testing purposes
        // if (data.role === 'admin') {
        //   router.push('/admin');
        // }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile to check if admin
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  const onLogin = async (values: LoginData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (values: SignupData) => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: values.name,
          }
        }
      });

      if (signupError) {
        toast({
          title: "Signup Failed",
          description: signupError.message,
          variant: "destructive",
        });
        return;
      }

      // Create user profile
      if (signupData.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: signupData.user.id,
            display_name: values.name,
            linkedin_url: values.linkedin_profile || null,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        // Create member record
        const { error: memberError } = await supabase
          .from('members')
          .insert({
            name: values.name,
            email: values.email,
            phone: values.phone,
            linkedin_profile: values.linkedin_profile || null,
            agreed_to_terms: true,
            join_mailing_list: true,
          });

        if (memberError && memberError.code !== '23505') {
          console.error('Member record creation error:', memberError);
        }
      }

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });
      signupForm.reset();
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      
      router.push('/');
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-lg">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Welcome Back!</CardTitle>
                <CardDescription className="text-base">
                  Logged in as <strong className="text-foreground">{user.email}</strong>
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
                {userProfile?.role === 'admin' && (
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

                  <Link href="/profile">
                    <Button variant="outline" className="w-full" size="lg">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                </div>

                <Button 
                  onClick={handleSignOut} 
                  variant="ghost" 
                  className="w-full text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content - Centered Vertically */}
      <div className="flex-1 flex items-start sm:items-center py-4 sm:py-8 px-4 mt-20 md:mt-0">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
            {/* Left Side - Image (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:justify-center lg:items-center">
              <div className="relative w-full max-w-md aspect-square">
                <Image 
                  src="/delhi-devs-community.png" 
                  alt="Delhi Devs Community" 
                  fill
                  className="object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:col-start-2">
              {/* Mobile Hero (Centered, shown only on mobile) */}
              <div className="lg:hidden text-center mb-6 space-y-3">
                <h1 className="text-2xl font-bold">Welcome to Delhi Devs</h1>
                <p className="text-sm text-muted-foreground">Sign in or create your account</p>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block mb-8 space-y-2">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your account or create a new one</p>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-muted rounded-lg">
                  <TabsTrigger value="login" className="h-10 data-[state=active]:bg-background rounded-md">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="h-10 data-[state=active]:bg-background rounded-md">
                    Create Account
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-5 mt-6">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                className="h-11"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter your password" 
                                className="h-11"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full h-11" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 px-6 pb-6 pt-6">
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
                                className="h-11"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="you@example.com" 
                                  className="h-11"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel" 
                                  placeholder="Your phone" 
                                  className="h-11"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={signupForm.control}
                        name="linkedin_profile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="linkedin.com/in/yourprofile" 
                                className="h-11"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="Create password" 
                                  className="h-11"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem className="col-span-2 sm:col-span-1">
                              <FormLabel>Confirm</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="Confirm password" 
                                  className="h-11"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                        By creating an account, you agree to follow our <Link href="/code-of-conduct" className="text-primary hover:underline">community guidelines</Link>.
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-11" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}