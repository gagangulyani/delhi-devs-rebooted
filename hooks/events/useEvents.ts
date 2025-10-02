'use client'

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { mockEvents } from '@/lib/mock-data';
import { EventFormData } from '@/components/events';

interface EventCreator {
  display_name: string;
  avatar_url?: string;
}

export interface Event {
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
  creator?: EventCreator;
  is_registered?: boolean;
}

export function useEvents() {
  const { user: clerkUser, isLoaded } = useUser();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(true);

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
      const eventsWithData = await Promise.all(
        data.map(async (event) => {
          const { data: creatorData } = await supabase
            .from('user_profiles')
            .select('display_name, avatar_url')
            .eq('id', event.created_by)
            .single();

          let is_registered = false;
          if (clerkUser) {
            const { data: attendeeData } = await supabase
              .from('event_attendees')
              .select('id')
              .eq('event_id', event.id)
              .eq('user_id', clerkUser.id)
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
  }, [clerkUser]);

  useEffect(() => {
    if (isLoaded) {
      fetchEvents();
      setIsLoading(false);
    }
  }, [isLoaded, fetchEvents]);

  const createEvent = async (values: EventFormData) => {
    if (!clerkUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create events.",
        variant: "destructive",
      });
      return false;
    }

    const { error } = await supabase
      .from('events')
      .insert({
        created_by: clerkUser.id,
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
      return false;
    }

    toast({
      title: "Success!",
      description: "Your event has been created.",
    });
    await fetchEvents();
    return true;
  };

  const registerForEvent = async (eventId: string) => {
    if (!clerkUser) {
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
        user_id: clerkUser.id,
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
    if (!clerkUser) return;

    const { error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', clerkUser.id);

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

  const fetchAttendees = async (eventId: string) => {
    const { data: attendeeRows, error: attendeeErr } = await supabase
      .from('event_attendees')
      .select('user_id')
      .eq('event_id', eventId);

    if (attendeeErr) {
      toast({ 
        title: 'Error', 
        description: 'Failed to load attendees.', 
        variant: 'destructive' 
      });
      return [];
    }

    const userIds = (attendeeRows || []).map((r: any) => r.user_id);
    if (userIds.length === 0) {
      return [];
    }

    const { data: profiles, error: profilesErr } = await supabase
      .from('user_profiles')
      .select('id, display_name, avatar_url')
      .in('id', userIds);

    if (profilesErr) {
      toast({ 
        title: 'Error', 
        description: 'Failed to load attendee profiles.', 
        variant: 'destructive' 
      });
      return [];
    }

    return (profiles || []) as Array<{ 
      id: string; 
      display_name: string; 
      avatar_url: string | null 
    }>;
  };

  return {
    user: clerkUser,
    events,
    isLoading,
    createEvent,
    registerForEvent,
    unregisterFromEvent,
    fetchAttendees,
  };
}
