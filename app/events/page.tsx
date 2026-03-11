import type { Metadata } from "next";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { events, upcomingEvent } from "@/lib/event-data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming and past Delhi Devs Rebooted meetups and tech events in Delhi NCR. Register for the next event and connect with the community.",
};

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

export default function EventsPage() {
  const upcomingEvents = events.filter(
    (event) => new Date(event.event_date) >= new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.event_date) < new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4 sm:py-12 sm:px-6">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground">
              Events
            </h1>
            <p className="text-sm text-muted-foreground">
              Join our upcoming meetups and connect with the community
            </p>
          </div>
        </div>

        {upcomingEvents.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Upcoming</h2>
            <div className="grid grid-cols-1 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    {event.image_url && (
                      <Link 
                        href={`/events/${event.id}`}
                        className="w-full md:w-80 h-48 md:h-auto bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image_url})` }}
                        aria-label={`View ${event.title} details`}
                      />
                    )}
                    <CardContent className="flex-1 p-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Upcoming
                        </Badge>
                      </div>

                      <Link href={`/events/${event.id}`} className="hover:underline block mt-6">
                        <h3 className="text-2xl font-semibold">{event.title}</h3>
                      </Link>

                        <p className="text-muted-foreground line-clamp-3">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(event.event_date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {formatTime(event.event_date)}
                              {event.end_date && ` - ${formatTime(event.end_date)}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-full"
                          >
                            <a
                              href={event.event_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Register on Luma
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    {event.image_url && (
                      <div
                        className="h-40 w-full bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url(${event.image_url})` }}
                      />
                    )}
                    <CardContent className="p-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {event.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="font-semibold text-lg line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.event_date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
