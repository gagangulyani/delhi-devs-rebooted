'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useLoading } from '@/contexts/LoadingContext';
import { HeroSection } from "@/components/landing/HeroSection";
import { MeetupAchievementSection } from "@/components/landing/MeetupAchievementSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GroupsSection } from "@/components/landing/GroupsSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  const router = useRouter();
  const { showLoader } = useLoading();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // User is logged in, redirect to their profile
      showLoader('Redirecting to your profile...');
      router.replace('/profile/me');
    }
  }, [isLoaded, isSignedIn, router, showLoader]);

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