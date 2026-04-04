'use client';

import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StorySection } from "@/components/landing/StorySection";
import { ProductsSection } from "@/components/landing/ProductsSection";
import { MeetupsSection } from "@/components/landing/MeetupsSection";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <MeetupsSection />
      <CallToAction />
      <StorySection />
      <Footer />
    </div>
  );
}