import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Heart, Code, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Delhi Devs</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/join">
                <Button>Join Community</Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline">Admin Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Growing Tech Community
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Welcome to <span className="text-primary">Delhi Devs</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Delhi's most vibrant developer community. Connect, learn, and grow with fellow developers, 
            attend amazing events, and be part of something bigger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button size="lg" className="text-lg px-8">
                Join Our Community
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Companies Partnered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Join Delhi Devs?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of a community that values learning, sharing, and growing together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Networking</CardTitle>
                <CardDescription>
                  Connect with like-minded developers, share experiences, and build lasting professional relationships.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Workshops & Events</CardTitle>
                <CardDescription>
                  Regular workshops, hackathons, and tech talks to keep you updated with the latest technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Supportive Community</CardTitle>
                <CardDescription>
                  Get help with your projects, share knowledge, and contribute to open source initiatives.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Regular Meetups</CardTitle>
                <CardDescription>
                  Monthly meetups with industry experts sharing insights on cutting-edge technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Local Focus</CardTitle>
                <CardDescription>
                  Connect with developers in Delhi NCR and explore local opportunities and collaborations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Skill Development</CardTitle>
                <CardDescription>
                  Improve your coding skills through pair programming sessions and code reviews.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Join?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards joining Delhi's most active developer community.
          </p>
          <Link to="/join">
            <Button size="lg" className="text-lg px-8">
              Apply for Membership
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Delhi Devs</span>
            </div>
            <div className="text-muted-foreground text-center md:text-right">
              <p>&copy; 2024 Delhi Devs Community. Building the future together.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}