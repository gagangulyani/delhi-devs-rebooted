import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { 
  ExternalLink, 
  MapPin,
  Calendar,
  Users,
  Sparkles,
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
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
            Meetups
            <span className="block text-4xl md:text-5xl mt-2">where connections happen</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Where developers share what they're building, not just their LinkedIn profiles
          </p>
        </div>

        {/* Two Meetup Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Meetup #1 */}
          <Card className="overflow-hidden border border-border/20 bg-card/80 backdrop-blur-sm flex flex-col">
            <div className="flex items-center gap-3 p-4 border-b border-border/10">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/gagan-deep-singh.jpg"
                  alt="Gagan Deep Singh"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Gagan Deep Singh</h3>
                <p className="text-sm text-muted-foreground">July 26, 2025</p>
              </div>
              <FontAwesomeIcon icon={faLinkedin} className="h-10 w-10 text-[#0A66C2]" />
            </div>

            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/delhi-devs-meetup-1-group-photo.jpg"
                  alt="Delhi Devs Rebooted Meetup 1"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h5 className="text-lg font-bold drop-shadow-lg">
                    Meetup #1 — The Beginning
                  </h5>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Passionate developers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>July 26, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>essentia.dev, Noida</span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">
                    From AI-based web crawlers to WhatsApp bots. Philosophy, stoicism, and life conversations. Quality over quantity.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Thanks to:</span> Anuvrat Parashar for the venue. Animesh Singh, Krish Khattar, Udit Gupta for management. Nupur Agrahari & Shiny Parashar for capturing memories.
                  </p>
                </div>

                <Button 
                  asChild 
                  className="w-full mt-auto"
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

          {/* Meetup #2 */}
          <Card className="overflow-hidden border border-border/20 bg-card/80 backdrop-blur-sm flex flex-col">
            <div className="flex items-center gap-3 p-4 border-b border-border/10">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/gagan-deep-singh.jpg"
                  alt="Gagan Deep Singh"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Gagan Deep Singh</h3>
                <p className="text-sm text-muted-foreground">March 21, 2026</p>
              </div>
              <FontAwesomeIcon icon={faLinkedin} className="h-10 w-10 text-[#0A66C2]" />
            </div>

            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/delhi-devs-meetup-2-group-photo.jpeg"
                  alt="Delhi Devs Rebooted Meetup 2"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h5 className="text-lg font-bold drop-shadow-lg">
                    Meetup #2 — New Faces, Same Vibe
                  </h5>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Developers and college students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>March 21, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>essentia.dev, Noida</span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">
                    Student projects: exoplanet identifier, college website to mobile app, self-hosted cloud storage. Live music coding with strudel.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Thanks to:</span> Anuvrat Parashar for venue and insights. Nupur and team at essentia.dev for pizzas. Nirbhay, Akshay, Shrutika, Karishma, Avneet, Mohit, Ojas, Siddhartha for making it special.
                  </p>
                </div>

                <Button 
                  asChild 
                  className="w-full mt-auto"
                  variant="outline"
                >
                  <a 
                    href="https://www.linkedin.com/posts/gagan-gulyani_omg-finally-hosted-the-delhi-devs-rebooted-ugcPost-7441591055164211200-MV43" 
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
    </section>
  );
}
