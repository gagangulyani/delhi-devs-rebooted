'use client';

import { useEffect, useState } from 'react';
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
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        showLoader('Checking authentication...');

        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error checking auth:', error);
          // On error, show landing page as fallback
          setShowLanding(true);
          hideLoader();
          return;
        }

        if (session?.user) {
          // User is logged in, redirect to their profile
          showLoader('Redirecting to your profile...');
          router.replace('/profile/me');
        } else {
          // User is not logged in, show landing page
          setShowLanding(true);
          hideLoader();
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        // On unexpected error, show landing page
        setShowLanding(true);
        hideLoader();
      }
    };

    checkAuthAndRedirect();
  }, [router, showLoader, hideLoader]);

  // Show landing page if auth check fails or as fallback
  if (showLanding) {
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

  // Loading is handled by GlobalLoader, so return null
  return null;
}