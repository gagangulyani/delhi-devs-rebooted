'use client';

import { HeroSection } from "@/components/landing/HeroSection";
import { MeetupAchievementSection } from "@/components/landing/MeetupAchievementSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GroupsSection } from "@/components/landing/GroupsSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
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
