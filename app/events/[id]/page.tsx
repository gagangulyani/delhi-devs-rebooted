'use client';

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Link as LinkIcon,
  ExternalLink,
  MapPinned,
  Video,
  Building2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { events } from "@/lib/event-data";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function isPast(dateString: string) {
  return new Date(dateString) < new Date();
}

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium text-foreground">Event not found</h1>
          <Link href="/events" className="text-primary hover:underline">
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const isUpcoming = !isPast(event.event_date);

  const locationTypes = [
    { value: "physical", label: "In-Person" },
    { value: "virtual", label: "Virtual" },
    { value: "hybrid", label: "Hybrid" },
  ];
  const locationTypeLabel =
    locationTypes.find((type) => type.value === event.location_type)?.label ??
    event.location_type;

  const glassPanelClass =
    "rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl transition-all duration-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4 sm:py-12 sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <Link href="/events" className="text-primary hover:underline inline-flex items-center gap-1">
          ← Back to Events
        </Link>

        <div className={`${glassPanelClass} overflow-hidden`}>
          <div className="relative w-full h-64 sm:h-96 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-orange-600/20">
            {event.image_url ? (
              <Image
                src={event.image_url}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Calendar className="h-24 w-24 text-orange-500/30" />
              </div>
            )}
          </div>
        </div>

        <div className={`${glassPanelClass} p-6 sm:p-8 space-y-6`}>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground mb-3">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className="rounded-full inline-flex items-center gap-1.5 px-3 py-1"
                  >
                    {event.location_type === 'physical' && <MapPinned className="h-3 w-3" />}
                    {event.location_type === 'virtual' && <Video className="h-3 w-3" />}
                    {event.location_type === 'hybrid' && <Building2 className="h-3 w-3" />}
                    {locationTypeLabel}
                  </Badge>
                  {!isUpcoming && (
                    <Badge variant="outline" className="rounded-full">
                      Past Event
                    </Badge>
                  )}
                  {event.registration_type && (
                    <Badge variant="outline" className="rounded-full text-orange-600 border-orange-600">
                      {event.registration_type}
                    </Badge>
                  )}
                  {event.tags?.slice(0, 3).map((tag: string) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="rounded-full border-orange-500/30 text-orange-600 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isUpcoming && (
            <div className="flex flex-wrap gap-3">
              <a
                href={event.event_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors"
              >
                Register on Luma
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-border/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">{formatDate(event.event_date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-sm font-medium">
                  {formatTime(event.event_date)}
                  {event.end_date && ` - ${formatTime(event.end_date)}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50">
                {event.location_type === 'physical' ? (
                  <MapPinned className="h-5 w-5 text-muted-foreground" />
                ) : event.location_type === 'virtual' ? (
                  <Video className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{event.location}</p>
              </div>
            </div>

            {event.event_link && (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50">
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Event Link</p>
                  <a
                    href={event.event_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Luma Registration
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-medium text-foreground">About this event</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          {event.agenda && (
            <div className="space-y-3 p-4 rounded-xl bg-background/50 border border-border/50">
              <h3 className="text-lg font-medium text-foreground">Agenda</h3>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.agenda}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
