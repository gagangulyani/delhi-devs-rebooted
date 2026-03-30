'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Users, Heart, Code, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { AnimatedHero } from "@/components/AnimatedHero";

const sections = [
  {
    icon: Heart,
    title: "Our Pledge",
    color: "text-red-500",
    content: "We pledge to make participation a harassment-free experience for everyone, regardless of background, identity, or experience level. We act in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community."
  },
  {
    icon: Users,
    title: "Our Standards",
    color: "text-blue-500",
    description: "Examples of behavior that contributes:",
    list: [
      "Demonstrating empathy and kindness",
      "Being respectful of differing opinions",
      "Giving and accepting constructive feedback",
      "Focusing on what's best for the community",
      "Sharing knowledge generously",
      "Promoting collaboration and networking"
    ]
  },
  {
    icon: MessageCircle,
    title: "Unacceptable Behavior",
    color: "text-orange-500",
    description: "Examples of unacceptable behavior:",
    list: [
      "Sexualized language or imagery",
      "Trolling, insulting comments, or personal attacks",
      "Public or private harassment",
      "Publishing others' private information",
      "Spam or excessive self-promotion",
      "Conduct inappropriate in a professional setting"
    ]
  },
  {
    icon: Code,
    title: "Community Guidelines",
    color: "text-green-500",
    guidelines: [
      { title: "🤝 Networking", desc: "Meaningful connections between developers. Share opportunities and collaborate." },
      { title: "💻 Technical", desc: "Keep discussions constructive. Provide context when asking for help." },
      { title: "🎯 On Topic", desc: "Keep conversations relevant to tech, development, and professional growth." },
      { title: "📢 Sharing", desc: "Share events, jobs, and resources relevant to our community." }
    ]
  }
];

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <BackButton fallbackUrl="/" />
        </div>

        <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
          <AnimatedHero
            line1="Play"
            line2="nice"
            description="Be kind, be helpful, or be elsewhere. This is a safe space for developers to grow, learn, and connect without the toxicity."
            badge={{ text: "Community Rules", dotColor: "#3b82f6" }}
          />
        </div>

        {/* Content Cards */}
        <div className="mt-12 space-y-6">
          {sections.map((section) => (
            <Card key={section.title} className="group hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <section.icon className={`h-6 w-6 ${section.color}`} />
                  <CardTitle>{section.title}</CardTitle>
                </div>
                {section.description && (
                  <CardDescription>{section.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {section.content && <p>{section.content}</p>}
                
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                
                {section.guidelines && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.guidelines.map((guideline) => (
                      <div key={guideline.title}>
                        <h4 className="font-semibold mb-1">{guideline.title}</h4>
                        <p className="text-sm text-muted-foreground">{guideline.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Enforcement */}
          <Card>
            <CardHeader>
              <CardTitle>Enforcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Community leaders are responsible for clarifying and enforcing our standards. 
                They will take appropriate and fair corrective action in response to any behavior 
                that they deem inappropriate, threatening, offensive, or harmful.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Reporting Issues:</strong> If you experience or witness unacceptable behavior, 
                  please contact the community administrators immediately. All reports will be handled 
                  with discretion and confidentiality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Attribution */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Attribution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Adapted from the{" "}
                <a 
                  href="https://www.contributor-covenant.org/" 
                  className="text-primary hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Contributor Covenant
                </a>, version 2.0.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-b from-muted/50 to-muted/20 border border-border/50">
            <h3 className="text-2xl font-bold">Ready to join?</h3>
            <p className="text-muted-foreground max-w-md">
              By joining Delhi Devs Rebooted, you agree to follow this Code of Conduct 
              and help us build an amazing developer community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group"
              >
                <Link href="/join">
                  Apply for Membership
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-semibold"
              >
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
