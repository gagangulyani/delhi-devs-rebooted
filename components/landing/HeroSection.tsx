import { Button } from "@/components/ui/button";
import { Users, Code, Sparkles, Zap, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FloatingCodeIcons } from "@/components/FloatingCodeIcons";

export function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/8 rounded-full blur-3xl" />

        {/* Floating Code Icons Background */}
        <FloatingCodeIcons />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-8 pb-4 lg:pb-0">
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full px-4 py-2 shadow-sm">
            <span className="text-xs font-medium text-primary">Delhi</span>
          </div>
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full px-4 py-2 shadow-sm">
            <span className="text-xs font-medium text-primary">Community</span>
          </div>
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full px-4 py-2 shadow-sm">
            <span className="text-xs font-medium text-primary">
              Open Source
            </span>
          </div>
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/40 rounded-full px-4 py-2 shadow-sm">
            <span className="text-xs font-medium text-primary">
              Tech Meetups
            </span>
          </div>
        </div>

        <div className="min-h-[50rem] flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Mobile: Image at top */}
          <div className="lg:hidden w-full relative order-1">
            <div className="relative h-80 sm:h-96 flex items-center justify-center">
              {/* Floating decorative elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-bounce delay-500" />
              <div className="absolute bottom-20 left-10 w-12 h-12 bg-secondary/20 rounded-full blur-lg animate-bounce delay-700" />
              <div className="absolute top-1/2 left-5 w-8 h-8 bg-accent/20 rounded-full blur-md animate-bounce delay-300" />

              {/* Main Image Container */}
              <div className="relative w-full h-full max-w-lg mx-auto">
                <Image
                  src="/delhi-devs-rebooted.png"
                  alt="Delhi Devs Rebooted Illustration"
                  className="object-contain drop-shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
                  fill
                  priority
                />
              </div>
            </div>
          </div>

          {/* Mobile: Join button after image */}
          <div className="lg:hidden flex justify-center order-2 pb-8">
            <Link href="/join" className="w-full max-w-sm group">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-8 text-xl font-semibold shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105 w-full relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Join Our Community
                  <Zap className="w-6 h-6 transition-transform group-hover:rotate-12" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-3">
            {/* Floating Benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border-2 border-border/30 rounded-full px-4 py-2 shadow-lg">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Network & Connect</span>
              </div>
              <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border-2 border-border/30 rounded-full px-4 py-2 shadow-lg">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Learn & Grow</span>
              </div>
              <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm border-2 border-border/30 rounded-full px-4 py-2 shadow-lg">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Build Projects</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Connect.
                <span className="text-primary block relative">
                  Collaborate.
                </span>
                <span className="text-secondary-foreground">Code.</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Join a community of builders, learners, and makers;
                collaborating to ship projects, share knowledge, and level up
                together.{" "}
              </p>
              <p className="text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0 text-orange-500 font-bold hero-entrance">
                <span className="accent-pop">Born in Delhi. Built for the world.</span>
              </p>
            </div>

            {/* CTA Buttons - Desktop only */}
            <div className="hidden lg:flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start pt-8">
              <Link href="/join" className="w-full sm:w-auto group">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-8 text-xl font-semibold shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105 w-full sm:w-auto relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Join Our Community
                    <Zap className="w-6 h-6 transition-transform group-hover:rotate-12" />
                  </span>
                </Button>
              </Link>
              <Link href="/code-of-conduct" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto hover:text-white"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Learn More Button - Mobile only */}
            <div className="lg:hidden flex justify-center pt-4">
              <Link href="/code-of-conduct" className="w-full max-w-sm">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 w-full"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop: Image on the right */}
          <div className="hidden lg:block lg:col-span-5 relative order-2">
            <div className="relative h-80 sm:h-96 lg:h-[600px] flex items-center justify-center">
              {/* Floating decorative elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-bounce delay-500" />
              <div className="absolute bottom-20 left-10 w-12 h-12 bg-secondary/20 rounded-full blur-lg animate-bounce delay-700" />
              <div className="absolute top-1/2 left-5 w-8 h-8 bg-accent/20 rounded-full blur-md animate-bounce delay-300" />

              {/* Main Image Container */}
              <div className="relative w-full h-full max-w-lg mx-auto">
                <Image
                  src="/delhi-devs-rebooted.png"
                  alt="Delhi Devs Rebooted Illustration"
                  className="object-contain drop-shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
