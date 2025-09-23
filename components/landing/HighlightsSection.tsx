import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Users, Trophy } from "lucide-react";
import { LinkedInPostEmbed } from "./LinkedInPostEmbed";

export function HighlightsSection() {
  const highlights = [
    {
      title: "Delhi Devs Rebooted - First Meetup Success!",
      description: "Quality over quantity! 100+ registrations, 14 amazing attendees. From AI web crawlers to stoicism - the conversations were incredible. Thanks to everyone who made it happen!",
      date: "December 2024",
      type: "Community Meetup",
      link: "https://www.linkedin.com/posts/gagan-gulyani_we-freakin-made-it-delhi-devs-rebooted-ugcPost-7354946301274304512-BHXw",
      author: "Gagan Deep Singh",
      icon: Trophy,
      stats: "14 Quality Attendees",
      badge: "First Meetup",
      isLinkedInEmbed: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Meetup Success
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our First Meetup Achievement
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From 100+ registrations to 14 passionate developers - quality over quantity delivered 
            amazing conversations and connections. The Delhi Devs community is officially thriving!
          </p>
        </div>

        <div className="flex justify-center max-w-4xl mx-auto">
          {highlights.map((highlight, index) => {
            // Render LinkedIn embed for specific posts
            if (highlight.isLinkedInEmbed) {
              return (
                <LinkedInPostEmbed
                  key={index}
                  title={highlight.title}
                  description={highlight.description}
                  author={highlight.author}
                  date={highlight.date}
                  link={highlight.link}
                  badge={highlight.badge}
                />
              );
            }

            // Regular card for other highlights
            const IconComponent = highlight.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {highlight.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                        {highlight.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{highlight.date}</span>
                        <span>•</span>
                        <span>{highlight.type}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {highlight.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-foreground">
                        {highlight.stats}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        by {highlight.author}
                      </span>
                    </div>
                    
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                      className="group/btn hover:border-primary hover:text-primary"
                    >
                      <a 
                        href={highlight.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View Post
                        <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
            <Users className="h-5 w-5 text-primary" />
            <p className="text-muted-foreground">
              Join our community and be part of the next chapter in Delhi's tech scene
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}