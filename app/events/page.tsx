'use client'

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  ExternalLink,
  Search,
  Edit,
  LayoutGrid,
  List as ListIcon
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { dateUtils } from '@/lib/date-utils';
import { mockEvents } from '@/lib/mock-data';

const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  event_date: z.string(),
  end_date: z.string().optional(),
  location: z.string().min(3, "Location is required"),
  location_type: z.enum(["physical", "virtual", "hybrid"]),
  event_link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  max_attendees: z.number().min(1).optional(),
  tags: z.string(),
});

type EventData = z.infer<typeof eventSchema>;

interface Event {
  id: string;
  created_by: string;
  title: string;
  description: string;
  event_date: string;
  end_date?: string;
  location: string;
  location_type: string;
  event_link?: string;
  max_attendees?: number;
  current_attendees: number;
  tags: string[];
  image_url?: string;
  is_featured: boolean;
  status: string;
  created_at: string;
  creator?: {
    display_name: string;
    avatar_url?: string;
  };
  is_registered?: boolean;
}

const locationTypes = [
  { value: "physical", label: "In-Person", icon: MapPin },
  { value: "virtual", label: "Virtual", icon: ExternalLink },
  { value: "hybrid", label: "Hybrid", icon: Users },
];

export default function EventsPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid");
  const [attendeesOpen, setAttendeesOpen] = useState(false);
  const [attendeesLoading, setAttendeesLoading] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<Array<{ id: string; display_name: string; avatar_url: string | null }>>([]);

  const eventForm = useForm<EventData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      event_date: "",
      end_date: "",
      location: "",
      location_type: "physical",
      event_link: "",
      max_attendees: undefined,
      tags: "",
    },
  });

  const fetchEvents = useCallback(async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return;
    }

    if (data) {
      // Fetch creator profiles and attendee info separately for now
      const eventsWithData = await Promise.all(
        data.map(async (event) => {
          // Get creator profile
          const { data: creatorData } = await supabase
            .from('user_profiles')
            .select('display_name, avatar_url')
            .eq('id', event.created_by)
            .single();

          // Check if user is registered
          let is_registered = false;
          if (user) {
            const { data: attendeeData } = await supabase
              .from('event_attendees')
              .select('id')
              .eq('event_id', event.id)
              .eq('user_id', user.id)
              .single();
            is_registered = !!attendeeData;
          }

          return {
            ...event,
            creator: creatorData || { display_name: 'Unknown User', avatar_url: null },
            is_registered,
            tags: Array.isArray(event.tags) ? event.tags : (event.tags || [])
          };
        })
      );
      
      setEvents(eventsWithData);
    }
  }, [user]);

  const filterEvents = useCallback(() => {
    let filtered = [...events];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    switch (selectedFilter) {
      case "upcoming":
        filtered = filtered.filter(event => !dateUtils.isPast(event.event_date));
        break;
      case "past":
        filtered = filtered.filter(event => dateUtils.isPast(event.event_date));
        break;
      case "my-events":
        filtered = filtered.filter(event => event.created_by === user?.id);
        break;
      case "registered":
        filtered = filtered.filter(event => event.is_registered);
        break;
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedFilter, user]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      await fetchEvents();
      setIsLoading(false);
    };

    getUser();
  }, [fetchEvents]);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  // Open create form when hash is #create
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const setFromHash = () => setShowCreateEvent(window.location.hash === '#create');
    setFromHash();
    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, []);

  const openAttendees = async (eventId: string) => {
    setSelectedEventId(eventId);
    setAttendeesOpen(true);
    setAttendeesLoading(true);
    const { data: attendeeRows, error: attendeeErr } = await supabase
      .from('event_attendees')
      .select('user_id')
      .eq('event_id', eventId);
    if (attendeeErr) {
      toast({ title: 'Error', description: 'Failed to load attendees.', variant: 'destructive' });
      setAttendeesLoading(false);
      return;
    }
    const userIds = (attendeeRows || []).map((r: any) => r.user_id);
    if (userIds.length === 0) {
      setAttendees([]);
      setAttendeesLoading(false);
      return;
    }
    const { data: profiles, error: profilesErr } = await supabase
      .from('user_profiles')
      .select('id, display_name, avatar_url')
      .in('id', userIds);
    if (profilesErr) {
      toast({ title: 'Error', description: 'Failed to load attendee profiles.', variant: 'destructive' });
      setAttendeesLoading(false);
      return;
    }
    setAttendees((profiles || []) as any);
    setAttendeesLoading(false);
  };



  const onEventSubmit = async (values: EventData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create events.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase
      .from('events')
      .insert({
        created_by: user.id,
        ...values,
        tags: values.tags.split(',').map(t => t.trim()),
        max_attendees: values.max_attendees || null,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your event has been created.",
      });
      setShowCreateEvent(false);
      eventForm.reset();
      await fetchEvents();
    }
    setIsLoading(false);
  };

  const registerForEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for events.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('event_attendees')
      .insert({
        event_id: eventId,
        user_id: user.id,
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already Registered",
          description: "You're already registered for this event.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to register for event. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Success!",
        description: "You've been registered for the event.",
      });
      await fetchEvents();
    }
  };

  const unregisterFromEvent = async (eventId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to unregister from event. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "You've been unregistered from the event.",
      });
      await fetchEvents();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }
  const glassPanelClass = "rounded-3xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 shadow-xl backdrop-blur-2xl";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 py-12 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className={`${glassPanelClass} p-6 sm:p-8`}>
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Delhi NCR Tech Events</h1>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  Curated meetups, workshops, and community happenings for builders across Delhi NCR.
                </p>
              </div>
              {user && (
                <Button onClick={() => setShowCreateEvent(true)} className="self-start sm:self-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Create event
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={`${glassPanelClass} p-5 sm:p-6`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title, topic, or venue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-2xl border-none bg-white/70 pl-10 text-sm shadow-inner backdrop-blur"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { value: "all", label: "All" },
                { value: "upcoming", label: "Upcoming" },
                { value: "past", label: "Past" },
                ...(user ? [
                  { value: "my-events", label: "My events" },
                  { value: "registered", label: "Registered" }
                ] : [])
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "ghost"}
                  size="sm"
                  className="rounded-full border border-white/50 bg-white/60 text-xs font-medium backdrop-blur transition"
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-white/40 bg-white/60 p-1 backdrop-blur">
              <Button
                type="button"
                size="icon"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                className="h-9 w-9 rounded-full"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                className="h-9 w-9 rounded-full"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {showCreateEvent && (
          <Card className={`${glassPanelClass} p-0`}>
            <CardHeader className="space-y-1">
              <CardTitle>Create a new event</CardTitle>
              <CardDescription>Share what you're hosting with the Delhi Devs community.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...eventForm}>
                <form onSubmit={eventForm.handleSubmit(onEventSubmit)} className="space-y-4">
                  <FormField
                    control={eventForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Delhi Devs React Workshop" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={eventForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your event, what attendees will learn, and what to expect..."
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={eventForm.control}
                      name="event_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date & Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={eventForm.control}
                      name="end_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date & Time (Optional)</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={eventForm.control}
                      name="location_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md bg-background">
                              {locationTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={eventForm.control}
                      name="max_attendees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Attendees (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={eventForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location/Venue</FormLabel>
                        <FormControl>
                          <Input placeholder="Connaught Place, New Delhi or Zoom Meeting" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={eventForm.control}
                    name="event_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://zoom.us/meeting/... or registration link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={eventForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="React, JavaScript, Workshop, Beginner (comma separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Event"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowCreateEvent(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Events */}
        <div className="grid gap-6">
          {filteredEvents.length === 0 ? (
            <Card className={glassPanelClass}>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedFilter !== "all" 
                    ? "Try adjusting your filters or search terms."
                    : "Be the first to create an event for the community!"
                  }
                </p>
                {user && (
                  <Button onClick={() => setShowCreateEvent(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Event
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "grid grid-cols-1 gap-4"}>
              {filteredEvents.map((event) => {
                const isUpcoming = !dateUtils.isPast(event.event_date);
                const isCreator = event.created_by === user?.id;
                const canRegister = isUpcoming && !event.is_registered && !isCreator;
                const isFullyBooked = event.max_attendees && event.current_attendees >= event.max_attendees;
                const locationTypeLabel = locationTypes.find((type) => type.value === event.location_type)?.label ?? event.location_type;
                const CardInner = (
                  <Card
                    key={event.id}
                    className={`${glassPanelClass} text-left`}
                  >
                    <CardContent className="space-y-5 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-foreground line-clamp-2">{event.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {dateUtils.formatEventDate(event.event_date)}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-2 py-0.5 text-xs uppercase tracking-wide text-muted-foreground backdrop-blur">
                              {locationTypeLabel}
                            </span>
                          </div>
                        </div>
                        {event.creator && (
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={event.creator.avatar_url} />
                              <AvatarFallback className="text-sm">
                                {event.creator.display_name?.[0]?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="leading-tight">
                              <p className="font-medium text-foreground">{event.creator.display_name}</p>
                              <p className="text-xs text-muted-foreground">Host</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>

                      <div className="flex flex-col gap-3 border-t border-white/40 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start rounded-full border border-white/40 bg-white/40 text-xs font-medium text-foreground backdrop-blur hover:bg-white/60 sm:w-auto"
                          onClick={() => openAttendees(event.id)}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          {event.current_attendees} going{event.max_attendees ? ` / ${event.max_attendees}` : ''}
                        </Button>
                        <div className="flex flex-wrap items-center gap-2">
                          {canRegister && !isFullyBooked && (
                            <Button
                              size="sm"
                              className="rounded-full"
                              onClick={() => registerForEvent(event.id)}
                            >
                              Register
                            </Button>
                          )}
                          {event.is_registered && !isCreator && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full"
                              onClick={() => unregisterFromEvent(event.id)}
                            >
                              Unregister
                            </Button>
                          )}
                          {event.event_link && (
                            <Button size="sm" variant="outline" asChild className="rounded-full">
                              <Link href={event.event_link} target="_blank">
                                <ExternalLink className="mr-1 h-4 w-4" /> Join
                              </Link>
                            </Button>
                          )}
                          {isCreator && (
                            <Button size="sm" variant="outline" className="rounded-full">
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );

                return CardInner;
              })}
            </div>
          )}
        </div>
      </div>
      {/* Attendees Modal */}
      <Dialog open={attendeesOpen} onOpenChange={setAttendeesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attendees</DialogTitle>
          </DialogHeader>
          <div className="max-h-80 overflow-auto">
            {attendeesLoading ? (
              <p className="text-sm text-muted-foreground">Loading attendees…</p>
            ) : attendees.length === 0 ? (
              <p className="text-sm text-muted-foreground">No attendees yet.</p>
            ) : (
              <ul className="space-y-2">
                {attendees.map((a) => (
                  <li key={a.id} className="flex items-center gap-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={a.avatar_url || undefined} />
                      <AvatarFallback className="text-xs">{a.display_name?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{a.display_name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}