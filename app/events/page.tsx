'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ExternalLink, Sparkles } from "lucide-react";
import { events } from "@/lib/event-data";
import { BackButton } from "@/components/BackButton";
import { AnimatedHero } from "@/components/AnimatedHero";

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <BackButton fallbackUrl="/" />
        </div>

        <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
          <AnimatedHero
            line1="Meet the"
            line2="makers"
            description="Real conversations with developers who ship. No sponsors, no pitches—just peers sharing what they built."
            badge={{ text: "In-person only", dotColor: "#ef4444" }}
          />
        </div>

        {upcomingEvents.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Coming up</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full group">
                  <div className="flex flex-col md:flex-row h-full">
                    {event.image_url && (
                      <Link 
                        href={`/events/${event.id}`}
                        className="w-full md:w-80 h-48 md:h-auto bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
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
                            onClick={(e) => e.stopPropagation()}
                          >
                            Register
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
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold">Previous meetups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    {event.image_url && (
                      <div
                        className="h-40 w-full bg-cover bg-center rounded-t-lg group-hover:scale-105 transition-transform duration-500"
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
