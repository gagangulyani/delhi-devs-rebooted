import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Zap, Heart, Code, Calendar, MapPin, Quote, Star, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
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
          
          {/* Community Highlights */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex -space-x-2 overflow-hidden">
              <Avatar className="inline-block border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <Avatar className="inline-block border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar className="inline-block border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className="inline-block border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <Avatar className="inline-block border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">12</span> members joined this week
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button size="lg" className="text-lg px-8 group">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
            <div className="group cursor-default">
              <div className="text-4xl font-bold text-primary mb-2 transition-transform group-hover:scale-110">500+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="group cursor-default">
              <div className="text-4xl font-bold text-accent mb-2 transition-transform group-hover:scale-110">50+</div>
              <div className="text-muted-foreground">Events Hosted</div>
            </div>
            <div className="group cursor-default">
              <div className="text-4xl font-bold text-primary mb-2 transition-transform group-hover:scale-110">10+</div>
              <div className="text-muted-foreground">Companies Partnered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">What Our Members Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from developers who found their community home with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "Delhi Devs transformed my career. The mentorship and networking opportunities are incredible. 
                  I landed my dream job through connections I made here!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Rahul Kumar</div>
                    <div className="text-sm text-muted-foreground">Full Stack Developer @ Tech Corp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "The workshops and hackathons here are top-notch. I've learned more in 6 months than I did in 2 years on my own. 
                  The community is incredibly supportive!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>PJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Priya Jain</div>
                    <div className="text-sm text-muted-foreground">Frontend Developer @ StartupXYZ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  "From a complete beginner to contributing to open source projects - Delhi Devs made it possible. 
                  The mentors here are amazing and always ready to help!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Arjun Singh</div>
                    <div className="text-sm text-muted-foreground">Backend Developer @ InnovateLab</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on our exciting upcoming events and workshops
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="mb-2">Workshop</Badge>
                  <div className="text-sm text-muted-foreground">Sep 25, 2025</div>
                </div>
                <CardTitle className="text-xl">React.js Advanced Patterns</CardTitle>
                <CardDescription>
                  Deep dive into advanced React patterns, hooks, and performance optimization techniques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Connaught Place, New Delhi</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">45 registered • 15 spots left</span>
                </div>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="mb-2">Hackathon</Badge>
                  <div className="text-sm text-muted-foreground">Oct 2-3, 2025</div>
                </div>
                <CardTitle className="text-xl">Delhi Devs Hackathon 2025</CardTitle>
                <CardDescription>
                  48-hour coding marathon with prizes worth ₹1 Lakh. Team up and build something amazing!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">IIT Delhi Campus</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">120 registered • 30 spots left</span>
                </div>
                <Button className="w-full">Register Team</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="mb-2">Meetup</Badge>
                  <div className="text-sm text-muted-foreground">Oct 15, 2025</div>
                </div>
                <CardTitle className="text-xl">AI/ML in Production</CardTitle>
                <CardDescription>
                  Industry experts share insights on deploying machine learning models at scale.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Cyber Hub, Gurgaon</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">85 registered • 25 spots left</span>
                </div>
                <Button className="w-full">Join Meetup</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110" />
                <CardTitle>Networking</CardTitle>
                <CardDescription>
                  Connect with like-minded developers, share experiences, and build lasting professional relationships.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mb-4 transition-transform group-hover:scale-110" />
                <CardTitle>Workshops & Events</CardTitle>
                <CardDescription>
                  Regular workshops, hackathons, and tech talks to keep you updated with the latest technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110" />
                <CardTitle>Supportive Community</CardTitle>
                <CardDescription>
                  Get help with your projects, share knowledge, and contribute to open source initiatives.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <Calendar className="h-12 w-12 text-accent mb-4 transition-transform group-hover:scale-110" />
                <CardTitle>Regular Meetups</CardTitle>
                <CardDescription>
                  Monthly meetups with industry experts sharing insights on cutting-edge technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110" />
                <CardTitle>Local Focus</CardTitle>
                <CardDescription>
                  Connect with developers in Delhi NCR and explore local opportunities and collaborations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <Code className="h-12 w-12 text-accent mb-4 transition-transform group-hover:scale-110" />
                <CardTitle>Skill Development</CardTitle>
                <CardDescription>
                  Improve your coding skills through pair programming sessions and code reviews.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Community Spotlight</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Celebrating our members' achievements and contributions to the tech ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Sneha Mehta</div>
                    <div className="text-sm text-muted-foreground">Open Source Contributor</div>
                  </div>
                </div>
                <CardTitle className="text-lg">EcoTrack - Sustainability App</CardTitle>
                <CardDescription className="mb-4">
                  Built a carbon footprint tracking app that won the National Green Tech Challenge 2025.
                </CardDescription>
                <div className="flex gap-2">
                  <Badge variant="secondary">React Native</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>VG</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Vikash Gupta</div>
                    <div className="text-sm text-muted-foreground">ML Engineer</div>
                  </div>
                </div>
                <CardTitle className="text-lg">AIAssist - Code Generator</CardTitle>
                <CardDescription className="mb-4">
                  Developed an AI-powered code generation tool that helps developers write better code faster.
                </CardDescription>
                <div className="flex gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">TensorFlow</Badge>
                  <Badge variant="secondary">FastAPI</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Try It
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Amit Kumar</div>
                    <div className="text-sm text-muted-foreground">DevOps Engineer</div>
                  </div>
                </div>
                <CardTitle className="text-lg">CloudDeploy - CI/CD Platform</CardTitle>
                <CardDescription className="mb-4">
                  Created a simplified CI/CD platform that reduced deployment time by 70% for startups.
                </CardDescription>
                <div className="flex gap-2">
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">Go</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View More Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Level Up Your Career?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 500+ developers who are already accelerating their careers with Delhi Devs. 
              Your next opportunity is just one connection away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/join">
                <Button size="lg" className="text-lg px-8 group">
                  Join the Community
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                📅 Attend Next Meetup
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>No spam ever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Delhi Devs</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Building Delhi's strongest developer community through collaboration, learning, and innovation. 
                Join us and be part of something amazing.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Join Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Code of Conduct</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contributing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Member Directory</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Workshops</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Job Board</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Mentorship</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2025 Delhi Devs Community. Building the future together.</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}