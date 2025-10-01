'use client'

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, CheckCircle2, Loader2 } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { BackButton } from "@/components/BackButton";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  linkedin_profile: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  agreed_to_terms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  join_mailing_list: z.boolean()
});

type FormData = z.infer<typeof formSchema>;

export const dynamic = 'force-dynamic';

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      linkedin_profile: "",
      agreed_to_terms: false,
      join_mailing_list: false,
    },
  });

  useEffect(() => {
    const checkAuthAndMembership = async () => {
      setIsCheckingAuth(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Check if user already has a member record
        const { data: memberData } = await supabase
          .from('members')
          .select('*')
          .eq('email', user.email)
          .single();

        if (memberData) {
          setIsMember(true);
        }

        // Get user profile
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setUserProfile(profileData);
      }

      setIsCheckingAuth(false);
    };

    checkAuthAndMembership();
  }, []);

  const handleOneClickJoin = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Create member record with user's existing info
      const { error } = await supabase
        .from("members")
        .insert({
          name: userProfile?.display_name || user.email?.split('@')[0] || 'Member',
          phone: userProfile?.phone || '',
          email: user.email!,
          linkedin_profile: userProfile?.linkedin_url || null,
          agreed_to_terms: true,
          join_mailing_list: true,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already a member",
            description: "You're already a member of Delhi Devs!",
            variant: "destructive",
          });
          setIsMember(true);
        } else {
          throw error;
        }
      } else {
        setIsMember(true);
        toast({
          title: "Welcome to Delhi Devs! 🎉",
          description: "You've successfully joined the community. Let's build something amazing together!",
        });
        
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (error) {
      console.error("Error joining community:", error);
      toast({
        title: "Join Failed",
        description: "There was an error joining the community. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("members")
        .insert({
          name: values.name,
          phone: values.phone,
          email: values.email,
          linkedin_profile: values.linkedin_profile || null,
          agreed_to_terms: values.agreed_to_terms,
          join_mailing_list: values.join_mailing_list,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Email already exists",
            description: "This email is already registered. Please use a different email address.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Application Submitted!",
          description: "Thank you for applying to join Delhi Devs. We'll review your application and get back to you soon.",
        });
        
        form.reset();
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking your status...</p>
        </div>
      </div>
    );
  }

  if (user && isMember) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-6">
            <BackButton fallbackUrl="/" />
          </div>
          
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">You're Already a Member! 🎉</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Welcome back! You're already part of the Delhi Devs community.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push("/events")}>
                  Browse Events
                </Button>
                <Button variant="outline" onClick={() => router.push("/profile")}>
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <BackButton fallbackUrl="/" />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">Join Delhi Devs</h1>
            <p className="text-xl text-muted-foreground">
              {user 
                ? "One click away from joining our vibrant developer community" 
                : "Apply to become a member of our vibrant developer community"}
            </p>
          </div>
        </div>

        {/* One-click join for authenticated users */}
        {user && !isMember && (
          <Card className="mb-6 border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Quick Join Available
              </CardTitle>
              <CardDescription>
                You're logged in as <strong>{user.email}</strong>. Join the community instantly!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleOneClickJoin} 
                disabled={isSubmitting}
                size="lg"
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Joining Community...
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-5 w-5" />
                    Join Delhi Devs Community Now
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By clicking, you agree to our terms and conditions and will be subscribed to community updates.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Traditional form for non-authenticated users */}
        {!user && (
          <>
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth" className="text-primary font-semibold hover:underline">
                  Sign in for one-click join
                </Link>
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Membership Application</CardTitle>
                <CardDescription>
                  Fill out the form below to apply for membership. All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin_profile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://linkedin.com/in/yourprofile" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Share your LinkedIn profile to help us get to know you better.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="agreed_to_terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions *
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you agree to follow our community guidelines and code of conduct.
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="join_mailing_list"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Join our mailing list
                          </FormLabel>
                          <FormDescription>
                            Receive updates about events, workshops, and community news.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}