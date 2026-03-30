'use client';

import { useState } from "react";
import { 
  MessageCircle, 
  Zap, 
  Coffee, 
  Code2, 
  PartyPopper,
  ArrowRight,
  Hash,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppJoinModal } from "@/components/WhatsAppJoinModal";
import { BackButton } from "@/components/BackButton";
import { AnimatedHero } from "@/components/AnimatedHero";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Stuck? Someone replies in minutes, not hours.",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Coffee,
    title: "3AM Club",
    desc: "Debugging at ungodly hours is normal here.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Code2,
    title: "Real Talk",
    desc: "No LinkedIn fluff. Just shipping and breaking things.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: PartyPopper,
    title: "Good Vibes",
    desc: "Meetups worth leaving your house for. Actually.",
    color: "from-pink-500/20 to-rose-500/20",
  },
];

export default function JoinPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <BackButton fallbackUrl="/" />
        </div>

        <div className="grid lg:grid-cols-1 gap-8 lg:gap-12 items-start min-h-0">
          {/* Hero Section */}
          <div className="space-y-8 max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
            <AnimatedHero
              line1="Join the"
              line2="chaos"
              description="A WhatsApp group for Delhi developers who actually build things. No recruiters. Just real conversations at 3am."
              badge={{ text: "Active now", dotColor: "#22c55e" }}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-7 text-lg font-semibold shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105 group"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Get In
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="flex items-center gap-3 px-6 py-3 bg-muted/50 rounded-full backdrop-blur-sm">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Curated community</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 justify-items-center lg:justify-items-start">
              <div className="flex items-center gap-2 sm:block">
                <span className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">Growing</span>
                <span className="text-xs sm:text-sm text-muted-foreground sm:block">community</span>
              </div>
              <div className="flex items-center gap-2 sm:block">
                <span className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">Regular</span>
                <span className="text-xs sm:text-sm text-muted-foreground sm:block">meetups</span>
              </div>
              <div className="flex items-center gap-2 sm:block">
                <span className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">Always</span>
                <span className="text-xs sm:text-sm text-muted-foreground sm:block">awake</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <Hash className="w-6 h-6 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">What you actually get</h2>
            <p className="text-muted-foreground">Not features. Real things that happen.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-3xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center pb-12">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-b from-muted/50 to-muted/20 border border-border/50">
            <h3 className="text-2xl font-bold">One click away from the chaos</h3>
            <Button
              onClick={() => setModalOpen(true)}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join WhatsApp Group
            </Button>
            <p className="text-sm text-muted-foreground">
              Free to join. Leave anytime.
            </p>
          </div>
        </div>
      </div>

      <WhatsAppJoinModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
