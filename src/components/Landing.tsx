import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Users,
  MapPin,
  Building2,
  Network,
  Briefcase,
  Calendar,
  BookOpen,
  Heart,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  TrendingUp,
  Terminal,
  Database,
  Globe,
  Cpu,
  Zap,
  Rocket,
  Coffee,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCommunityStats } from "@/hooks/use-community-stats";
import useReveal from '@/hooks/use-reveal';

export default function Landing() {
  const { data: stats, isLoading } = useCommunityStats();
  useReveal('.reveal');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 md:pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left hero-content">
              <div className="flex items-center gap-2 mb-6 hero-badge reveal">
                <Badge className="bg-primary text-primary-foreground border-0 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Delhi NCR Tech Hub
                </Badge>
              </div>
              <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight reveal">
                Connect.
                <span className="text-primary block">Collaborate.</span>
                <span className="text-secondary-foreground">Code.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join Delhi Devs Rebooted - where passionate developers across Delhi NCR
                come together to build, learn, and grow. From startups to enterprises,
                from junior developers to tech leads, we're united by code.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 hero-buttons reveal">
                <Link to="/join">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg group"
                  >
                    Join Our Community
                    <Users className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent rounded-full px-8 py-6 text-lg"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Explore Projects
                </Button>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative h-96 lg:h-[560px] flex items-center justify-center reveal">
              <img
                src="/delhi-devs-rebooted.png"
                alt="Delhi Devs Rebooted Illustration"
                className="object-contain w-full h-full drop-shadow-xl"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-background/0 to-background/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 relative stats-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Growing Strong Together
            </h2>
            <p className="text-xl text-muted-foreground">
              Real numbers from our thriving Delhi NCR developer ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center reveal">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  <span
                    className="stat-number"
                    data-value={stats?.totalMembers || 0}
                  >
                    {isLoading ? "..." : "0"}
                  </span>+
                </div>
                <p className="text-muted-foreground">Total Members</p>
              </CardContent>
            </Card>

            <Card className="text-center reveal">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  <span
                    className="stat-number"
                    data-value={stats?.approvedMembers || 0}
                  >
                    {isLoading ? "..." : "0"}
                  </span>
                </div>
                <p className="text-muted-foreground">Active Developers</p>
              </CardContent>
            </Card>

            <Card className="text-center reveal">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  <span
                    className="stat-number"
                    data-value={stats?.recentJoins || 0}
                  >
                    {isLoading ? "..." : "0"}
                  </span>
                </div>
                <p className="text-muted-foreground">Joined This Month</p>
              </CardContent>
            </Card>

            <Card className="text-center reveal">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  NCR
                </div>
                <p className="text-muted-foreground">Cities Connected</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 relative cards-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Join Delhi Devs Rebooted?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're more than just a community - we're your gateway to the Delhi NCR tech ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Networking */}
            <Card className="feature-card group hover:shadow-lg transition-all duration-300 reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Professional Networking</CardTitle>
                <CardDescription>
                  Connect with developers from startups to MNCs across Delhi, Gurgaon, Noida, and beyond.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Job Opportunities */}
            <Card className="feature-card group hover:shadow-lg transition-all duration-300 reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Job Opportunities</CardTitle>
                <CardDescription>
                  Access exclusive job postings and referrals from top tech companies in the NCR region.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Knowledge Sharing */}
            <Card className="feature-card group hover:shadow-lg transition-all duration-300 reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Knowledge Sharing</CardTitle>
                <CardDescription>
                  Learn from tech talks, workshops, and hands-on sessions by industry experts.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Community Events */}
            <Card className="feature-card group hover:shadow-lg transition-all duration-300 reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Regular Meetups</CardTitle>
                <CardDescription>
                  Join monthly meetups, hackathons, and social events across different NCR locations.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Collaboration */}
            <Card className="feature-card group hover:shadow-lg transition-all duration-300 reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle>Project Collaboration</CardTitle>
                <CardDescription>
                  Find project partners, form teams, and work on exciting side projects together.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Mentorship */}
            <Card className="feature-card group hover:shadow-lg transition-all duration-300 reveal">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Mentorship</CardTitle>
                <CardDescription>
                  Get guidance from senior developers and contribute by mentoring newcomers.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Code Together?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are building the future of technology in Delhi NCR.
            Your next opportunity, collaboration, or friendship is just one click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/join">
              <Button size="lg" className="text-lg px-8 group">
                Apply for Membership
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/code-of-conduct">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Read Our Code of Conduct
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Open Source Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All Skill Levels Welcome</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Diverse & Inclusive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/delhi-devs-rebooted.png" alt="Delhi Devs Rebooted" className="w-10 h-10" />
                <span className="text-2xl font-bold text-foreground">Delhi Devs Rebooted</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Connecting passionate developers across Delhi NCR. Building tomorrow's technology
                through collaboration, learning, and community.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Community</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/join" className="hover:text-foreground transition-colors">
                    Join Us
                  </Link>
                </li>
                <li>
                  <Link to="/code-of-conduct" className="hover:text-foreground transition-colors">
                    Code of Conduct
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <Link to="/auth" className="hover:text-foreground transition-colors">
                    Member Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm text-center md:text-left mb-4 md:mb-0">
              <p>
                &copy; 2025 Delhi Devs Rebooted. Building the future of tech in Delhi NCR.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <Link to="/code-of-conduct" className="hover:text-foreground transition-colors">
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
