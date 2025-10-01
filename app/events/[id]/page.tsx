"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Link as LinkIcon,
  Mail,
  CheckCircle2,
  Info,
  ListChecks,
  ExternalLink,
  MapPinned,
  Video,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { dateUtils } from "@/lib/date-utils";
import { supabase } from "@/integrations/supabase/client";
import { mockEvents as importedMockEvents } from "@/lib/mock-data";
import { BackButton } from "@/components/BackButton";

// Transform mock data to match component interface
const mockEvents = importedMockEvents.map((event) => ({
  id: event.id,
  title: event.title,
  description: event.description,
  event_date: event.event_date,
  end_date: event.end_date,
  location: event.location,
  location_type: event.location_type,
  event_link: event.event_link,
  location_url: event.location_url,
  event_image: event.image_url,
  max_attendees: event.max_attendees,
  current_attendees: event.current_attendees,
  created_by: event.created_by,
  creator: event.creator,
  tags: event.tags,
  is_registered: event.is_registered,
  status: event.status,
  attendees: event.attendees || [],
  show_attendees: event.show_attendees !== false,
  prerequisites: event.prerequisites,
  instructions: event.instructions,
  agenda: event.agenda,
  host_contact: event.host_contact,
}));

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const fetchEventDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const mockEvent = mockEvents.find(e => e.id === eventId);
      
      if (!mockEvent) {
        setEvent(null);
        setIsLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      if (user) {
        setIsRegistered(mockEvent.is_registered || false);
      }

      setEvent(mockEvent);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setIsLoading(false);
    }
  }, [eventId, user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    fetchEventDetails();
  }, [eventId, fetchEventDetails]);  const handleRegister = async () => {
    if (!user) {
      alert("Please sign in to register for events");
      return;
    }

    setIsRegistered(true);
    if (event) {
      setEvent({
        ...event,
        current_attendees: event.current_attendees + 1,
      });
    }
    alert("Successfully registered for the event!");
  };

  const handleUnregister = async () => {
    if (!user) return;

    setIsRegistered(false);
    if (event) {
      setEvent({
        ...event,
        current_attendees: Math.max(0, event.current_attendees - 1),
      });
    }
    alert("Successfully unregistered from the event.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium text-foreground">
            Event not found
          </h1>
          <BackButton fallbackUrl="/events" label="Back to Events" variant="outline" />
        </div>
      </div>
    );
  }

  const isUpcoming = !dateUtils.isPast(event.event_date);
  const isCreator = event.created_by === user?.id;
  const canRegister = isUpcoming && !isRegistered && !isCreator;
  const isFullyBooked =
    event.max_attendees && event.current_attendees >= event.max_attendees;

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
        <BackButton fallbackUrl="/events" />

        <div className={`${glassPanelClass} overflow-hidden`}>
          <div className="relative w-full h-64 sm:h-96 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-orange-600/20">
            {event.event_image ? (
              <Image
                src={event.event_image}
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
                  {isRegistered && (
                    <Badge className="rounded-full bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30">
                      ✓ Registered
                    </Badge>
                  )}
                  {event.tags && event.tags.slice(0, 3).map((tag: string) => (
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
              {event.creator && (
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground">Hosted by</p>
                    <p className="text-sm font-medium">
                      {event.creator.display_name}
                    </p>
                  </div>
                  <Avatar className="h-12 w-12 ring-2 ring-background/50">
                    <AvatarImage src={event.creator.avatar_url} />
                    <AvatarFallback>
                      {event.creator.display_name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          {/* Registration Buttons - Top Position */}
          {user && !isCreator && (
            <div className="flex items-center gap-3">
              {canRegister && !isFullyBooked && (
                <Button
                  onClick={handleRegister}
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Register for Event
                </Button>
              )}
              {canRegister && isFullyBooked && (
                <Button
                  disabled
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                >
                  Event Full
                </Button>
              )}
              {isRegistered && (
                <Button
                  onClick={handleUnregister}
                  size="lg"
                  variant="outline"
                  className="rounded-full border-red-500/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Unregister
                </Button>
              )}
            </div>
          )}

          {!user && (
            <div className="flex items-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Link href="/auth">Sign in to Register</Link>
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-border/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">
                  {dateUtils.formatEventDate(event.event_date)}
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
                {event.location_url ? (
                  <a
                    href={event.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {event.location}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <p className="text-sm font-medium">{event.location}</p>
                )}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-background/30 -mx-2 px-2 py-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Attendees (click to view)</p>
                    {event.show_attendees && event.attendees?.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-3">
                          {event.attendees.slice(0, 5).map((attendee: any, index: number) => (
                            <Avatar key={attendee.id} className="h-7 w-7 border-2 border-background ring-1 ring-orange-500/20" style={{ zIndex: 5 - index }}>
                              <AvatarImage src={attendee.avatar_url} />
                              <AvatarFallback className="text-xs bg-orange-500/20 text-orange-600">
                                {attendee.display_name?.[0]?.toUpperCase() || '?'}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {event.attendees.length > 5 && `+${event.current_attendees - 5} `}
                          {event.max_attendees && `/ ${event.max_attendees}`}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm font-medium">
                        {event.current_attendees}
                        {event.max_attendees && ` / ${event.max_attendees}`}
                      </p>
                    )}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Event Attendees ({event.current_attendees})</DialogTitle>
                </DialogHeader>
                {event.show_attendees && event.attendees?.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {event.attendees.map((attendee: any) => (
                      <Link key={attendee.id} href={`/profile/${attendee.id}`}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={attendee.avatar_url} />
                            <AvatarFallback className="bg-orange-500/20 text-orange-600">
                              {attendee.display_name?.[0]?.toUpperCase() || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{attendee.display_name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {event.current_attendees > event.attendees.length && (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        +{event.current_attendees - event.attendees.length} more attendees
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      Attendee list is hidden for this event
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.current_attendees} {event.current_attendees === 1 ? 'person is' : 'people are'} attending
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>

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
                    Visit Link
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-medium text-foreground">
              About this event
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          {/* Prerequisites */}
          {event.prerequisites && (
            <div className="space-y-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-medium text-foreground">Prerequisites</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.prerequisites}
              </p>
            </div>
          )}

          {/* Agenda */}
          {event.agenda && (
            <div className="space-y-3 p-4 rounded-xl bg-background/50 border border-border/50">
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium text-foreground">Event Agenda</h3>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.agenda}
              </div>
            </div>
          )}

          {/* Instructions */}
          {event.instructions && (
            <div className="space-y-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium text-foreground">Important Instructions</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.instructions}
              </p>
            </div>
          )}

          {/* Host Contact */}
          {event.host_contact && event.creator && (
            <div className="space-y-3 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium text-foreground">Contact Host</h3>
              </div>
              <Link href={`/profile/${event.created_by}`} className="block">
                <div className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-green-500/10 transition-colors cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={event.creator.avatar_url} />
                    <AvatarFallback className="bg-green-500/20 text-green-600">
                      {event.creator.display_name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.creator.display_name}</p>
                    <a
                      href={`mailto:${event.host_contact}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-primary hover:underline"
                    >
                      {event.host_contact}
                    </a>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
