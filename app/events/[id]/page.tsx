import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { events } from "@/lib/event-data";
import { eventDate, eventTimeRange } from "@/lib/event-date";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/editorial/Reveal";
import { SectionHead, PrintPhoto, Timeline } from "@/components/editorial/Poster";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) return { title: "Event not found | Delhi Devs Rebooted" };

  return {
    title: `${event.title} | Delhi Devs Rebooted`,
    description: event.description.split("\n")[0],
  };
}

const locationLabels = {
  physical: "In person",
  virtual: "Online",
  hybrid: "Hybrid",
};

export default async function EventDetailPage({ params }: Params) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) notFound();

  const date = eventDate(event.event_date);
  const isUpcoming = new Date(event.event_date) >= new Date();
  const paragraphs = event.description.split("\n").filter(Boolean);
  const agenda = event.agenda?.split("\n").filter(Boolean) ?? [];

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/events" className="eyebrow inline-block hover:text-foreground">
        ← All events
      </Link>

      <PageHeader
        eyebrow={`${isUpcoming ? "Upcoming" : "Past meetup"} · ${date.month} ${date.year}`}
        title={
          <>
            {event.title}
          </>
        }
        lede={paragraphs[0]}
      >
        {isUpcoming && event.event_link ? (
          <a href={event.event_link} target="_blank" rel="noopener noreferrer" className="btn-ink">
            Register
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          event.event_link && (
            <a
              href={event.event_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Read the recap
              <span aria-hidden="true">↗</span>
            </a>
          )
        )}
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {event.location} · {locationLabels[event.location_type]}
        </span>
      </PageHeader>

      <dl className="mt-10 grid gap-4 border-b-2 border-foreground pb-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Calendar, label: "Date", value: date.date },
          { icon: Clock, label: "Time", value: eventTimeRange(event.event_date, event.end_date) },
          { icon: MapPin, label: "Venue", value: event.location },
          { icon: Tag, label: "Format", value: locationLabels[event.location_type] },
        ].map((fact) => (
          <div key={fact.label} className="border-2 border-foreground bg-card p-4" style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
            <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <fact.icon className="h-3.5 w-3.5 text-primary" />
              {fact.label}
            </dt>
            <dd className="mt-2 text-sm font-medium leading-snug text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {event.image_url && (
        <Reveal>
          <PrintPhoto
            src={event.image_url}
            alt={`${event.title} group photo`}
            caption={`${event.title}`}
            tilt="right"
            priority
            className="mt-10"
          />
        </Reveal>
      )}

      <Reveal>
        <section className="mt-16">
          <SectionHead index="01" label="About this event" />
          <div className="prose-editorial pt-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      </Reveal>

      {agenda.length > 0 && (
        <Reveal>
          <section className="mt-16">
            <SectionHead index="02" label="Agenda" note={`${agenda.length} items`} />
            <Timeline
              className="mt-8"
              items={agenda.map((item, index) => ({
                year: String(index + 1).padStart(2, "0"),
                title: item,
                desc: "",
              }))}
            />
          </section>
        </Reveal>
      )}

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-6">
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="border-2 border-foreground px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href="/events" className="eyebrow hover:text-foreground">
          All events →
        </Link>
      </footer>
    </div>
  );
}
