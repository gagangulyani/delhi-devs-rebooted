import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/HeroSection";
import { MeetupAchievementSection } from "@/components/landing/MeetupAchievementSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GroupsSection } from "@/components/landing/GroupsSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Delhi Devs Rebooted - Connecting Passionate Developers in Delhi NCR",
  description:
    "Join Delhi Devs Rebooted — the largest developer community in Delhi NCR. Connect with passionate developers, attend tech meetups, share knowledge, and build the future of technology together.",
};

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
