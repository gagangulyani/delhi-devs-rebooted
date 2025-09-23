import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { 
  ExternalLink, 
  MessageSquare, 
  Trophy, 
  Sparkles, 
  Calendar,
  MapPin,
} from "lucide-react";

export function MeetupAchievementSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Community Milestone
            </Badge>
            <div className="p-2 bg-primary/10 rounded-full">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
            Our First Meetup
            <span className="block text-4xl md:text-5xl mt-2">Was Epic! 🎉</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Quality over quantity delivered beyond expectations. From AI web crawlers to philosophy, 
            our first meetup proved that{" "}
            <span className="text-primary font-semibold">passionate developers create magic</span>.
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Highlights */}
          <div className="space-y-8">
            <div className="hidden lg:block">
              <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-primary" />
                What Made It Special
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card/40 border-2 border-border/30 hover:border-primary/40 transition-colors duration-200">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Tech Deep Dives</h4>
                    <p className="text-sm text-muted-foreground">From AI-based web crawlers to WhatsApp bots - cutting-edge tech discussions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card/40 border-2 border-border/30 hover:border-primary/40 transition-colors duration-200">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Philosophy & Life</h4>
                    <p className="text-sm text-muted-foreground">Conversations flowed from stoicism to life perspectives (and that "repulsive" inside joke!)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card/40 border-2 border-border/30 hover:border-primary/40 transition-colors duration-200">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Quality Connections</h4>
                    <p className="text-sm text-muted-foreground">14 passionate developers creating lasting bonds and meaningful relationships</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue & Thanks */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 hidden lg:block">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Special Thanks
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Huge gratitude to <span className="text-primary font-medium">Anuvrat Parashar</span> for the amazing venue at essentia.dev, 
                and our incredible team: <span className="text-primary font-medium">Animesh Singh, Krish Khattar, Udit Gupta</span> for management, 
                plus <span className="text-primary font-medium">Nupur Agrahari & Shiny Parashar</span> for capturing all the memories!
              </p>
            </div>
          </div>

          {/* Right: LinkedIn-style Post */}
          <div className="space-y-6">
            {/* LinkedIn Post Embed */}
            <Card className="overflow-hidden border border-border/20 bg-card/80 backdrop-blur-sm">
              {/* LinkedIn Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border/10">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold">
                  GD
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Gagan Deep Singh</h3>
                  <p className="text-sm text-muted-foreground">July 26, 2025</p>
                </div>
                <FontAwesomeIcon icon={faLinkedin} className="h-10 w-10 text-[#0A66C2]" />
              </div>

              {/* Post Content */}
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/delhi-devs-meetup-1-group-photo.jpg"
                    alt="Delhi Devs Rebooted Meetup 1 - Group Photo"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h5 className="text-lg font-bold drop-shadow-lg">
                      🎉 Delhi Devs Rebooted - First Meetup Success!
                    </h5>
                  </div>
                </div>

                {/* Simple engagement and CTA */}
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <span>❤️ 245 likes</span>
                      <span>💬 14 comments</span>
                      <span>🔄 5 reposts</span>
                    </div>
                  </div>

                  <Button 
                    asChild 
                    className="w-full"
                    variant="outline"
                  >
                    <a 
                      href="https://www.linkedin.com/posts/gagan-gulyani_we-freakin-made-it-delhi-devs-rebooted-ugcPost-7354946301274304512-BHXw" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View on LinkedIn
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <Calendar className="h-6 w-6 text-primary" />
            <div className="text-left">
              <p className="text-lg font-semibold text-foreground">
                Ready for the next meetup?
              </p>
              <p className="text-sm text-muted-foreground">
                Join our community and be part of the next amazing gathering
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}