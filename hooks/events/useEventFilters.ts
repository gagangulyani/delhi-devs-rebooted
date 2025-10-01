'use client'

import { useState, useEffect, useCallback } from "react";
import { Event } from "./useEvents";
import { dateUtils } from '@/lib/date-utils';

export function useEventFilters(events: Event[], userId?: string) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

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
        filtered = filtered.filter(event => event.created_by === userId);
        break;
      case "registered":
        filtered = filtered.filter(event => event.is_registered);
        break;
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedFilter, userId]);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  return {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filteredEvents,
  };
}
