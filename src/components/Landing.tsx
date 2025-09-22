import useReveal from "@/hooks/use-reveal";
import { HeroSection } from "./landing/HeroSection";
import { CommunityStats } from "./landing/CommunityStats";
import { FeaturesSection } from "./landing/FeaturesSection";
import { CallToAction } from "./landing/CallToAction";
import { Footer } from "./landing/Footer";

export default function Landing() {
  useReveal(".reveal");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <HeroSection />
      <CommunityStats />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
