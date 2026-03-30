'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  GitBranch, 
  ExternalLink, 
  CheckCircle2,
  Code2,
  Heart,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { AnimatedHero } from "@/components/AnimatedHero";

const steps = [
  {
    step: "01",
    title: "Fork It",
    desc: "Grab the repo and make it yours.",
  },
  {
    step: "02",
    title: "Break It",
    desc: "Find a bug or build a feature.",
  },
  {
    step: "03",
    title: "Ship It",
    desc: "Open a PR and let's talk.",
  },
];

const waysToHelp = [
  {
    icon: GitBranch,
    title: "Code",
    desc: "Fix bugs, add features, refactor. Everything counts.",
  },
  {
    icon: Heart,
    title: "Design",
    desc: "UI/UX improvements, icons, animations. Make it pretty.",
  },
  {
    icon: Code2,
    title: "Docs",
    desc: "Typos, better explanations, examples. Help people understand.",
  },
];

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <BackButton fallbackUrl="/" />
        </div>

        <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
          <AnimatedHero
            line1="Build the"
            line2="future"
            description="This website is open source. Built by the community, for the community. Your code could be live tomorrow."
            badge={{ text: "Open Source", dotColor: "#f59e0b" }}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-7 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group"
            >
              <a
                href="https://github.com/gagangulyani/delhi-devs-rebooted"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <GitBranch className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                View on GitHub
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <div className="flex items-center gap-3 px-6 py-3 bg-muted/50 rounded-full backdrop-blur-sm justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-muted-foreground">MIT License</span>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">How to contribute</h2>
            <p className="text-muted-foreground">Three steps. No bureaucracy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <Card key={item.step} className="group hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ways to Help */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Every skill helps</h2>
            <p className="text-muted-foreground">Code, design, docs—pick your weapon.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {waysToHelp.map((way) => (
              <div
                key={way.title}
                className="group relative p-6 rounded-3xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <way.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{way.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {way.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines Card */}
        <div className="mt-16">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 p-6">
              <CardTitle>Contribution Guidelines</CardTitle>
              <CardDescription>Quick rules to keep things smooth</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Keep it focused</h4>
                  <p className="text-sm text-muted-foreground">One feature or fix per PR. Easier to review, faster to merge.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Explain your changes</h4>
                  <p className="text-sm text-muted-foreground">A good PR description saves everyone time. What changed? Why?</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Test before you push</h4>
                  <p className="text-sm text-muted-foreground">Run <code className="bg-muted px-1 rounded text-xs">npm run lint</code> and make sure it actually works.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center pb-12">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-b from-muted/50 to-muted/20 border border-border/50">
            <h3 className="text-2xl font-bold">Ready to ship something?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-7 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
              >
                <a
                  href="https://github.com/gagangulyani/delhi-devs-rebooted/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  View Issues
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Link href="/join">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-10 py-7 text-lg font-semibold"
                >
                  Join Community First
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              First time contributing? Check out issues labeled "good first issue"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
