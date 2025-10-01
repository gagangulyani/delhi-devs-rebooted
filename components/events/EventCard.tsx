'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Users, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";
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
    <Card
      className={`${glassPanelClass} group hover:shadow-xl hover:scale-[1.02] overflow-hidden`}
    >
      <CardContent className="p-5 space-y-4">
        {/* Header with Host */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
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
          {event.creator && (
            <Avatar className="h-8 w-8 ring-2 ring-background/50">
              <AvatarImage src={event.creator.avatar_url} />
              <AvatarFallback className="text-xs">
                {event.creator.display_name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
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
  );
}
