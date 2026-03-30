'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CalendarDays, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import { AnimatedHero } from '@/components/AnimatedHero';

const storyCards = [
  {
    title: "The Origin",
    subtitle: "From a coffee break to a community",
    content: [
      "It started at HTM (HackTheMountains). Chaitanya Chawla mentioned wanting a WhatsApp group for Delhi-NCR developers.",
      "Gagan Deep Singh created it on the spot. Simarpreet Singh, Vani Chitkara, Shivam Bhasin, Nishant Mishra and others joined right there.",
      "What started as an impromptu idea took off. The group became the go-to hub for sharing events, job postings, and dev tips. Word spread to colleges across Delhi-NCR, scaling to 1600+ active members."
    ]
  },
  {
    title: "The Reboot",
    subtitle: "Fresh energy, same mission",
    content: [
      "Like many organic communities, the original group eventually dissolved. The spark faded, but the need didn't.",
      "Delhi Devs Rebooted launched in May 2025. The focus: networking over technical sessions. Quality over quantity.",
      "Meetup #1 drew 100+ registrations in August 2025. A clear signal that Delhi's developer community was eager to reconnect."
    ]
  }
];

const principles = [
  {
    icon: Sparkles,
    title: "Quality over hype",
    desc: "Learnings you can apply, not just noise."
  },
  {
    icon: Users,
    title: "Community over numbers",
    desc: "Real connections, respectful culture."
  },
  {
    icon: MapPin,
    title: "Delhi NCR first",
    desc: "Rooted in a thriving tech hub."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <BackButton fallbackUrl="/" />
        </div>

        <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
          <AnimatedHero
            line1="Our"
            line2="story"
            description="A tech-agnostic community for developers across Delhi NCR. Started by accident, kept alive by people who care."
            badge={{ text: "Since 2024", dotColor: "#8b5cf6" }}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-7 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group"
            >
              <Link href="/events">
                <CalendarDays className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                See Events
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-7 text-lg font-semibold group"
            >
              <Link href="/join">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Link>
            </Button>
          </div>
        </div>

        {/* Story Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {storyCards.map((card) => (
            <Card key={card.title} className="group hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {card.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Principles */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>What we believe</CardTitle>
              <CardDescription>Simple principles that compound</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
              {principles.map((principle) => (
                <div key={principle.title} className="p-4 rounded-xl border bg-card/50">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <principle.icon className="h-4 w-4 text-primary" />
                    {principle.title}
                  </div>
                  <p className="text-muted-foreground">{principle.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Ecosystem */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-muted/50 to-background">
            <CardHeader>
              <CardTitle>The Delhi tech ecosystem</CardTitle>
              <CardDescription>Big, diverse, and full of opportunity</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Delhi NCR is home to a vibrant tech scene with thousands of startups and major
                technology companies. Delhi Devs is intentionally tech agnostic—a friendly
                home for developers across stacks, roles, and experience levels.
              </p>
              <p>
                The aim is simple: help you find your people, discover new ideas, and ship more
                together—one meetup, project, or conversation at a time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col md:flex-row gap-3">
          <Link href="/join" className="flex-1">
            <Button className="w-full py-6 text-lg">Join the Community</Button>
          </Link>
          <Link href="/events" className="flex-1">
            <Button variant="outline" className="w-full py-6 text-lg">Explore Events</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
