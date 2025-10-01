'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { useLoading } from '@/contexts/LoadingContext';
import { HeroSection } from "@/components/landing/HeroSection";
import { MeetupAchievementSection } from "@/components/landing/MeetupAchievementSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GroupsSection } from "@/components/landing/GroupsSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Get the current session silently
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error checking auth:', error);
          return;
        }

        if (session?.user) {
          // User is logged in, redirect to their profile
          showLoader('Redirecting to your profile...');
          router.replace('/profile/me');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    checkAuthAndRedirect();
  }, [router, showLoader, hideLoader]);

  // Always show landing page immediately
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MeetupAchievementSection />
      <FeaturesSection />
      <GroupsSection />
      <CallToAction />
      <Footer />
    </div>
  );
}