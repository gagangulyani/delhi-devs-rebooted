'use client'

import { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { isFeatureEnabled } from "@/constants/features";
import { dateUtils } from '@/lib/date-utils';
import { 
  EventCard, 
  EventFilters, 
  eventSchema,
  EventFormData
} from '@/components/events';
import { EventsGridSkeleton, EventsListSkeleton } from '@/components/skeletons';
import { useEvents, useEventFilters } from '@/hooks/events';

// Lazy load heavy components
const CreateEventForm = lazy(() => import('@/components/events').then(m => ({ default: m.CreateEventForm })));
const AttendeesDialog = lazy(() => import('@/components/events').then(m => ({ default: m.AttendeesDialog })));
const EmptyEventsState = lazy(() => import('@/components/events').then(m => ({ default: m.EmptyEventsState })));

const locationTypes = [
  { value: "physical", label: "In-Person" },
  { value: "virtual", label: "Virtual" },
  { value: "hybrid", label: "Hybrid" },
];

export default function EventsPage() {
  const { 
    user, 
    events, 
    isLoading: isEventsLoading, 
    createEvent, 
    registerForEvent, 
    unregisterFromEvent,
    fetchAttendees 
  } = useEvents();
  
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedFilter, 
    setSelectedFilter, 
    filteredEvents 
  } = useEventFilters(events, user?.id);

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid");
  const [attendeesOpen, setAttendeesOpen] = useState(false);
  const [attendeesLoading, setAttendeesLoading] = useState(false);
  const [attendees, setAttendees] = useState<Array<{ id: string; display_name: string; avatar_url: string | null }>>([]);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const eventForm = useForm<EventFormData>({
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

  // Handle user loading state
  useEffect(() => {
    if (user !== null) {
      setIsUserLoading(false);
    }
  }, [user]);

  // Open create form when hash is #create
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const setFromHash = () => setShowCreateEvent(window.location.hash === '#create');
    setFromHash();
    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, []);

  const openAttendees = async (eventId: string) => {
    setAttendeesOpen(true);
    setAttendeesLoading(true);
    const attendeesData = await fetchAttendees(eventId);
    setAttendees(attendeesData);
    setAttendeesLoading(false);
  };

  const onEventSubmit = async (values: EventFormData) => {
    const success = await createEvent(values);
    if (success) {
      setShowCreateEvent(false);
      eventForm.reset();
    }
  };

  const filters = [
    { value: "all", label: "All" },
    { value: "upcoming", label: "Upcoming" },
    { value: "past", label: "Past" },
    ...(user ? [
      { value: "my-events", label: "My Events" },
      { value: "registered", label: "Registered" }
    ] : [])
  ];

  const glassPanelClass = "rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl transition-all duration-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4 sm:py-12 sm:px-6">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Header - Always visible, never shows skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground">Events</h1>
            <p className="text-sm text-muted-foreground">
              Discover upcoming meetups and workshops
            </p>
          </div>
          {!isUserLoading && user && isFeatureEnabled('events') && (
            <Button 
              onClick={() => setShowCreateEvent(true)} 
              className="rounded-full self-start sm:self-auto group"
              size="lg"
            >
              <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-200" />
              Create Event
            </Button>
          )}
        </div>

        {/* Search and Filters - Always visible, never shows skeleton */}
        <EventFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={filters}
        />

        {/* Create Event Form - Lazy loaded */}
        {isFeatureEnabled('events') && showCreateEvent && (
          <Suspense fallback={
            <div className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-6">
              <div className="space-y-4">
                <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                <div className="h-32 w-full bg-muted animate-pulse rounded" />
              </div>
            </div>
          }>
            <CreateEventForm
              form={eventForm}
              onSubmit={onEventSubmit}
              onCancel={() => setShowCreateEvent(false)}
              isLoading={isEventsLoading}
            />
          </Suspense>
        )}

        {/* Events - Show skeleton while loading */}
        {isEventsLoading ? (
          viewMode === 'grid' ? <EventsGridSkeleton /> : <EventsListSkeleton />
        ) : filteredEvents.length === 0 ? (
          <Suspense fallback={
            <div className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-16 w-16 bg-muted animate-pulse rounded-full" />
                <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-64 bg-muted animate-pulse rounded" />
              </div>
            </div>
          }>
            <EmptyEventsState
              searchQuery={searchQuery}
              selectedFilter={selectedFilter}
              showCreateButton={!!user && isFeatureEnabled('events')}
              onCreateClick={isFeatureEnabled('events') ? () => setShowCreateEvent(true) : undefined}
            />
          </Suspense>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "grid grid-cols-1 gap-3"}>
            {filteredEvents.map((event) => {
              const isUpcoming = !dateUtils.isPast(event.event_date);
              const isCreator = event.created_by === user?.id;
              const canRegister = isUpcoming && !event.is_registered && !isCreator;
              const isFullyBooked = event.max_attendees && event.current_attendees >= event.max_attendees;
              const locationTypeLabel = locationTypes.find((type) => type.value === event.location_type)?.label ?? event.location_type;
              
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  locationTypeLabel={locationTypeLabel}
                  isCreator={isCreator}
                  canRegister={canRegister}
                  isFullyBooked={isFullyBooked}
                  onRegister={() => registerForEvent(event.id)}
                  onUnregister={() => unregisterFromEvent(event.id)}
                  userId={user?.id}
                />
              );
            })}
          </div>
        )}
      </div>
      
      {/* Attendees Dialog - Lazy loaded */}
      <Suspense fallback={<div />}>
        <AttendeesDialog
          open={attendeesOpen}
          onOpenChange={setAttendeesOpen}
          attendees={attendees}
          isLoading={attendeesLoading}
        />
      </Suspense>
    </div>
  );
}