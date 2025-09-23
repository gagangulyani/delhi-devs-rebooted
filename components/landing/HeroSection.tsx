import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, MapPin } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-8 md:pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Hero Illustration - Now first in mobile order */}
          <div className="relative h-80 sm:h-96 lg:h-[560px] flex items-center justify-center lg:order-2 mb-8 lg:mb-0">
            <img
              src="/delhi-devs-rebooted.png"
              alt="Delhi Devs Rebooted Illustration"
              className="object-contain w-full h-full drop-shadow-xl"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-background/0 to-background/10" />
          </div>

          <div className="text-center lg:text-left hero-content lg:order-1 space-y-6">
            <div className="flex items-center gap-2 mb-6 hero-badge justify-center lg:justify-start">
              <Badge className="bg-primary text-primary-foreground border-0 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                Delhi NCR Tech Hub
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Connect.
              <span className="text-primary block">Collaborate.</span>
              <span className="text-secondary-foreground">Code.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join Delhi Devs Rebooted - where passionate developers across
              Delhi NCR come together to build, learn, and grow. From startups
              to enterprises, from junior developers to tech leads, we're
              united by code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 hero-buttons items-center justify-center lg:justify-start pt-4">
              <Link href="/join" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg group w-full sm:w-auto"
                >
                  Join Our Community
                  <Users className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}