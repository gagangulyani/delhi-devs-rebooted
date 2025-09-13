import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Sparkles,
  Zap,
  Rocket,
  Crown,
  Wand2,
  Stars,
  PartyPopper,
  Gem,
  Rainbow,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Music,
  Palette,
  Camera,
  Gamepad2,
  Coffee,
  Brain,
  Heart,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Theme-aware background overlay */}
      <div className="absolute inset-0 bg-primary/5"></div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/80 backdrop-blur-lg rounded-full px-8 py-4 border border-border shadow-lg">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Nexus</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/join">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                Enter the Nexus
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-accent rounded-full"
              >
                Access Portal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-orange-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section - Diagonal Split */}
      <section className="min-h-screen flex items-center relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-orange-500 text-white border-0 rounded-full px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Experience the Future
                </Badge>
              </div>
              <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
                Where
                <span className="text-orange-600 dark:text-orange-400">
                  {" "}
                  Magic{" "}
                </span>
                Happens
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Step into a realm where creativity knows no bounds, connections
                spark innovation, and every interaction creates ripples of
                possibility.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg group"
                  >
                    Begin Your Journey
                    <Rocket className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent rounded-full px-8 py-6 text-lg"
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Discover More
                </Button>
              </div>
            </div>

            {/* Interactive Avatar Constellation */}
            <div className="relative h-96 lg:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {/* Central Avatar */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Crown className="h-10 w-10 text-white" />
                  </div>

                  {/* Orbiting Avatars */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(
                    (rotation, index) => (
                      <div
                        key={index}
                        className="absolute w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center animate-spin"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-120px) rotate(-${rotation}deg)`,
                          animationDuration: "20s",
                          animationDelay: `${index * 0.5}s`,
                        }}
                      >
                        <Stars className="h-6 w-6 text-white" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Stats - Hexagonal Grid */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The Energy of Our Universe
            </h2>
            <p className="text-xl text-muted-foreground">
              Numbers that tell our extraordinary story
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              {/* Hexagonal grid of stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group">
                  <div className="relative w-32 h-32 bg-orange-500/20 backdrop-blur-lg rounded-3xl border border-white/20 flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      500+
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Dreamers
                    </div>
                    <PartyPopper className="absolute -top-2 -right-2 h-6 w-6 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="group">
                  <div className="relative w-32 h-32 bg-orange-600/20 backdrop-blur-lg rounded-3xl border border-white/20 flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      ∞
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Possibilities
                    </div>
                    <Gem className="absolute -top-2 -right-2 h-6 w-6 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="group col-span-2 lg:col-span-1 mx-auto">
                  <div className="relative w-32 h-32 bg-orange-400/20 backdrop-blur-lg rounded-3xl border border-white/20 flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Magic
                    </div>
                    <Rainbow className="absolute -top-2 -right-2 h-6 w-6 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Experience Cards */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every legend has its archetype. Discover your role in the cosmic
              story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Creative Path */}
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-card/50 backdrop-blur-lg border-border rounded-3xl hover:bg-card/80 transition-all duration-300 transform group-hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-6">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    The Creative
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Express your inner artist and share your unique vision with
                    a network of fellow creators who celebrate originality.
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-orange-500 text-white">
                        🎨
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        Luna Artist
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Visual Storyteller
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Innovator Path */}
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-card/50 backdrop-blur-lg border-border rounded-3xl hover:bg-card/80 transition-all duration-300 transform group-hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    The Innovator
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    "Ideas are my currency. This space amplifies my thoughts and
                    turns visions into reality."
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-orange-400">
                      <AvatarFallback className="bg-orange-600 text-white">
                        💡
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        Alex Visionary
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Idea Architect
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Connector Path */}
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-card/50 backdrop-blur-lg border-border rounded-3xl hover:bg-card/80 transition-all duration-300 transform group-hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    The Connector
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    "I weave connections like spider silk. Every introduction
                    creates a new possibility."
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-orange-400">
                      <AvatarFallback className="bg-orange-400 text-white">
                        🤝
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        Maya Bridge
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Nexus Architect
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Experience Zones */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-orange-900/50 backdrop-blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Experience Dimensions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Step into different realms of connection and discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Creativity Lab */}
            <div className="group relative">
              <Card className="bg-orange-500/10 backdrop-blur-lg border-orange-500/20 rounded-3xl hover:bg-orange-500/20 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-orange-400 text-orange-400 bg-orange-500/10 rounded-full"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                    <Music className="h-6 w-6 text-orange-400 group-hover:animate-bounce" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">
                    Creativity Lab
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Where imagination meets reality. Create, collaborate, and
                    bring visions to life.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 bg-orange-400 rounded-full border-2 border-white/20"
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      15 creators active
                    </span>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-full">
                    Enter Lab
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Gaming Arena */}
            <div className="group relative">
              <Card className="bg-orange-600/10 backdrop-blur-lg border-orange-600/20 rounded-3xl hover:bg-orange-600/20 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-orange-400 text-orange-400 bg-orange-600/10 rounded-full"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                    <Gamepad2 className="h-6 w-6 text-orange-400 group-hover:animate-pulse" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">
                    Gaming Arena
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Compete, connect, and conquer challenges together in epic
                    gaming sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-muted-foreground">
                      3 tournaments running
                    </span>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 rounded-full">
                    Join Battle
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Chill Zone */}
            <div className="group relative">
              <Card className="bg-orange-400/10 backdrop-blur-lg border-orange-400/20 rounded-3xl hover:bg-orange-400/20 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-orange-400 text-orange-400 bg-orange-400/10 rounded-full"
                    >
                      <Coffee className="w-3 h-3 mr-1" />
                      Cozy
                    </Badge>
                    <Camera className="h-6 w-6 text-orange-400 group-hover:animate-spin" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">
                    Chill Zone
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Relax, share stories, and build meaningful connections in a
                    laid-back atmosphere.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-muted-foreground">
                      Vibes: Immaculate
                    </span>
                  </div>
                  <Button className="w-full bg-orange-400 hover:bg-orange-500 rounded-full">
                    Vibe Check
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-accent rounded-full px-8"
            >
              Explore All Dimensions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Feature Cards */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              The Nexus Effect
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              When you join us, you don't just gain access - you gain
              superpowers
            </p>
          </div>

          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Large Feature Card */}
            <div className="md:col-span-8 group">
              <Card className="h-full bg-orange-500/10 backdrop-blur-lg border-orange-500/20 rounded-3xl hover:bg-orange-500/20 transition-all duration-500 transform group-hover:scale-105">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Wand2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">
                        Reality Amplification
                      </CardTitle>
                      <CardDescription className="text-white/70 text-lg">
                        Your ideas don't just exist here - they multiply,
                        evolve, and become legendary
                      </CardDescription>
                    </div>
                  </div>
                  <p className="text-white/60 text-lg">
                    Experience the phenomenon where individual brilliance meets
                    collective intelligence, creating something far greater than
                    the sum of its parts.
                  </p>
                </CardHeader>
              </Card>
            </div>

            {/* Tall Feature Card */}
            <div className="md:col-span-4 group">
              <Card className="h-full bg-orange-600/10 backdrop-blur-lg border-orange-600/20 rounded-3xl hover:bg-orange-600/20 transition-all duration-500 transform group-hover:scale-105">
                <CardHeader className="p-8">
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">
                    Instant Momentum
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    From thought to reality in an instant. The Nexus doesn't
                    just support your journey - it transforms it into legend.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Wide Feature Card */}
            <div className="md:col-span-6 group">
              <Card className="h-full bg-orange-400/10 backdrop-blur-lg border-orange-400/20 rounded-3xl hover:bg-orange-400/20 transition-all duration-500 transform group-hover:scale-105">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">
                        Legendary Status
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Be remembered not just for what you did, but for how you
                        changed the game
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Square Feature Card */}
            <div className="md:col-span-6 group">
              <Card className="h-full bg-orange-300/10 backdrop-blur-lg border-orange-300/20 rounded-3xl hover:bg-orange-300/20 transition-all duration-500 transform group-hover:scale-105">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-300 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Gem className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">
                        Rare Connections
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Find the people you never knew you needed but can't
                        imagine living without
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cosmic Achievement Showcase */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-orange-900/30 backdrop-blur-xl"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Nexus Achievements Unlocked
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              When brilliant minds converge, extraordinary things happen.
              Witness the magic we've created together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Epic Achievement 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-card/50 backdrop-blur-lg border-border rounded-3xl hover:bg-card/80 transition-all duration-300 transform group-hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Quantum Collaboration
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Nexus Initiative
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    ∞ Ideas Realized
                  </CardTitle>
                  <CardDescription className="mb-4 text-white/70">
                    The Nexus has become a dimensional gateway where impossible
                    dreams become inevitable destinies through the power of
                    collective consciousness.
                  </CardDescription>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-orange-500/20 text-orange-300 border-orange-500/30"
                    >
                      Innovation
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-600/20 text-orange-300 border-orange-600/30"
                    >
                      Limitless
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-400/20 text-orange-300 border-orange-400/30"
                    >
                      Quantum
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-orange-400/50 text-orange-300 hover:bg-orange-500/20"
                  >
                    Experience Magic
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Epic Achievement 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-card/50 backdrop-blur-lg border-border rounded-3xl hover:bg-card/80 transition-all duration-300 transform group-hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-orange-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Reality Distortion Field
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Nexus Physics
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    Time Acceleration x1000
                  </CardTitle>
                  <CardDescription className="mb-4 text-muted-foreground">
                    Members report achieving in weeks what used to take years.
                    The Nexus effect bends the laws of productivity and personal
                    growth.
                  </CardDescription>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-orange-600/20 text-orange-300 border-orange-600/30"
                    >
                      Velocity
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-500/20 text-orange-300 border-orange-500/30"
                    >
                      Breakthrough
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-400/20 text-orange-300 border-orange-400/30"
                    >
                      Epic
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-orange-400/50 text-orange-300 hover:bg-orange-600/20"
                  >
                    Join Acceleration
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Epic Achievement 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-card/50 backdrop-blur-lg border-border rounded-3xl hover:bg-card/80 transition-all duration-300 transform group-hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-orange-400 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Legendary Network
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Connection Matrix
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    100% Life Transformation
                  </CardTitle>
                  <CardDescription className="mb-4 text-muted-foreground">
                    Every single member reports profound life changes. The Nexus
                    doesn't just connect people - it awakens their highest
                    potential.
                  </CardDescription>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-orange-400/20 text-orange-300 border-orange-400/30"
                    >
                      Legendary
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-500/20 text-orange-300 border-orange-500/30"
                    >
                      Transform
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-600/20 text-orange-300 border-orange-600/30"
                    >
                      Epic
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-orange-400/50 text-orange-300 hover:bg-orange-400/20"
                  >
                    Begin Transformation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-accent rounded-full px-8"
            >
              Witness All Achievements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/10 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Your{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Legend
              </span>{" "}
              Begins Now
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Step through the portal into an extraordinary realm where
              innovation meets imagination. Your destiny awaits among the stars.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/join">
                <Button size="lg" className="text-lg px-8 group">
                  Begin Your Legend
                  <Rocket className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Meet Our Family
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span>Infinite Possibilities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Epic Adventures</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                <span>Legendary Status</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]"></div>
      </section>

      {/* Futuristic Footer */}
      <footer className="py-16 px-4 bg-card/30 backdrop-blur-xl border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Nexus</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                Where the impossible becomes inevitable. Join the revolution of
                consciousness, creativity, and connection that's reshaping what
                it means to be human.
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
              <h3 className="font-semibold mb-4 text-foreground">Dimensions</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Creativity Lab
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gaming Arena
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Chill Zone
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Reality Portal
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Powers</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Amplification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Acceleration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Transformation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Legendary Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm text-center md:text-left mb-4 md:mb-0">
              <p>
                &copy; 2025 Nexus. Transcending reality, one connection at a
                time.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">
                Quantum Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Reality Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Connect
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
