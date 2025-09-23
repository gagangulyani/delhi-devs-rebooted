import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, Heart, MessageCircle, Repeat2 } from "lucide-react";

interface LinkedInPostEmbedProps {
  title: string;
  description: string;
  author: string;
  date: string;
  link: string;
  badge: string;
}

export function LinkedInPostEmbed({ 
  title, 
  description, 
  author, 
  date, 
  link, 
  badge 
}: LinkedInPostEmbedProps) {
  return (
    <div className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden">
      {/* LinkedIn Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          {/* Profile Picture */}
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg">
            GD
          </div>
          <div className="p-2 bg-[#0A66C2] rounded-lg">
            <Linkedin className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{author}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {badge}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{date} • LinkedIn</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Mock Post Image/Preview */}
        <div className="relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-border/20">
          <div className="aspect-[16/9] relative">
            <Image
              src="/delhi-devs-meetup-1-group-photo.jpg"
              alt="Delhi Devs Rebooted Meetup 1 - Group Photo"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with celebratory elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h5 className="text-xl font-bold mb-2 drop-shadow-lg">
                🎉 Delhi Devs Rebooted - First Meetup Success!
              </h5>
              <p className="text-sm drop-shadow-md opacity-90">
                Quality over quantity! Amazing conversations from AI to philosophy. 14 passionate developers made it unforgettable.
              </p>
            </div>
          </div>
        </div>

        {/* LinkedIn Engagement Mock */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4 pb-4 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>47 reactions</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>12 comments</span>
          </div>
          <div className="flex items-center gap-2">
            <Repeat2 className="h-4 w-4" />
            <span>8 reposts</span>
          </div>
        </div>

        {/* View Original Post Button */}
        <Button 
          asChild 
          variant="outline" 
          size="sm"
          className="w-full group/btn hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5"
        >
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Linkedin className="h-4 w-4" />
            View Original LinkedIn Post
            <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}