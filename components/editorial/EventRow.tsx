import Link from "next/link";
import type { Event } from "@/lib/event-data";
import { eventDate, eventTimeRange } from "@/lib/event-date";

interface EventRowProps {
  event: Event;
  past?: boolean;
}

export function EventRow({ event, past = false }: EventRowProps) {
  const date = eventDate(event.event_date);

  return (
    <li className="group grid gap-5 py-8 sm:grid-cols-[7rem_1fr_10rem] sm:gap-8">
      <div className="font-mono leading-none">
        <span className="block text-5xl font-semibold tabular-nums text-foreground">{date.day}</span>
        <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {date.month}
        </span>
        <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {date.year}
        </span>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            <Link
              href={`/events/${event.id}`}
              className="group inline-flex items-baseline gap-2 underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {event.title}
              <span
                aria-hidden="true"
                className="font-mono text-base text-primary transition-transform duration-150 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </h3>

          {!past && event.event_link && (
            <a
              href={event.event_link}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 border-primary font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
            >
              Register
            </a>
          )}
        </div>

        <p className="mt-3 line-clamp-2 max-w-[65ch] text-sm leading-6 text-muted-foreground">
          {event.description.split("\n")[0]}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>{eventTimeRange(event.event_date, event.end_date)}</span>
          <span aria-hidden="true">·</span>
          <span>{event.location}</span>
          {event.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-muted-foreground/70">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {event.image_url && (
        <Link href={`/events/${event.id}`} className="hidden sm:block" aria-label={`${event.title} photo`}>
          <div
            className="border-2 border-foreground bg-card p-1.5 transition-transform duration-150 group-hover:-translate-y-1"
            style={{ boxShadow: "4px 4px 0 0 hsl(var(--foreground))" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image_url}
              alt=""
              loading="lazy"
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
        </Link>
      )}
    </li>
  );
}
