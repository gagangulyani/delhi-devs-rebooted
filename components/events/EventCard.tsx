'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Users, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { dateUtils } from '@/lib/date-utils';

interface EventCreator {
  display_name: string;
  avatar_url?: string;
}

interface EventCardProps {
  event: {
    id: string;
    created_by: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    location_type: string;
    event_link?: string;
    event_image?: string;
    max_attendees?: number;
    current_attendees: number;
    creator?: EventCreator;
    is_registered?: boolean;
  };
  locationTypeLabel: string;
  isCreator: boolean;
  canRegister: boolean;
  isFullyBooked: boolean;
  onRegister: () => void;
  onUnregister: () => void;
  userId?: string;
}

export function EventCard({
  event,
  locationTypeLabel,
  isCreator,
  canRegister,
  isFullyBooked,
  onRegister,
  onUnregister,
}: EventCardProps) {
  const glassPanelClass = "rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl transition-all duration-200";

  return (
    <Link href={`/events/${event.id}`} target="_blank" rel="noopener noreferrer">
      <Card
        className={`${glassPanelClass} group hover:shadow-xl hover:scale-[1.02] overflow-hidden cursor-pointer`}
      >
        {/* Event Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-orange-600/20 overflow-hidden">
        {event.event_image ? (
          <Image
            src={event.event_image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="h-16 w-16 text-orange-500/30" />
          </div>
        )}
        {/* Creator Avatar Overlay */}
        {event.creator && (
          <div className="absolute top-3 right-3 z-10">
            <Avatar className="h-10 w-10 ring-2 ring-background/80 shadow-lg">
              <AvatarImage src={event.creator.avatar_url} />
              <AvatarFallback className="text-xs bg-background/80">
                {event.creator.display_name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground line-clamp-2 leading-snug">
            {event.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {dateUtils.formatEventDate(event.event_date)}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/30">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {event.current_attendees}
              {event.max_attendees && <span className="text-muted-foreground/60">/ {event.max_attendees}</span>}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/50 px-2 py-0.5 text-xs text-muted-foreground backdrop-blur">
              {locationTypeLabel}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            {isCreator && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 p-0"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
