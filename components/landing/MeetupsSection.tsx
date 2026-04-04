'use client';

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { events } from "@/lib/event-data";

export function MeetupsSection() {
  return (
    <section id="meetups" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Community Meetups
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Where developers share what they&apos;re building, not just their LinkedIn profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((meetup) => (
            <div
              key={meetup.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={meetup.image_url || "/delhi-devs-rebooted.png"}
                  alt={meetup.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold">{meetup.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {meetup.description}
                </p>
                
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(meetup.event_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{meetup.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {meetup.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {meetup.event_link && (
                  <Link 
                    href={meetup.event_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View on LinkedIn →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}