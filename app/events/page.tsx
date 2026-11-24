import Link from "next/link";
import type { Metadata } from "next";
import { events } from "@/lib/event-data";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/editorial/Reveal";
import { SectionHead } from "@/components/editorial/Poster";
import { EventRow } from "@/components/editorial/EventRow";

export const metadata: Metadata = {
  title: "Events | Delhi Devs Rebooted",
  description:
    "In-person meetups for developers across Delhi NCR. Real projects, real conversations, no pitches.",
};

export const revalidate = 3600;

export default function EventsPage() {
  const now = new Date();
  const upcoming = events
    .filter((event) => new Date(event.event_date) >= now)
    .sort((a, b) => +new Date(a.event_date) - +new Date(b.event_date));
  const past = events
    .filter((event) => new Date(event.event_date) < now)
    .sort((a, b) => +new Date(b.event_date) - +new Date(a.event_date));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <PageHeader
        eyebrow="In-person only"
        meta={`${events.length} meetups`}
        title={
          <>
            Meet the <span className="serif-i text-primary">makers.</span>
          </>
        }
        lede="Real conversations with developers who ship. No sponsors, no pitches. Just peers sharing what they built."
      />

      <Reveal>
        <section className="mt-16">
          <SectionHead index="01" label="Upcoming" note={upcoming.length ? `${upcoming.length} scheduled` : "soon"} />
          {upcoming.length ? (
            <ol className="row-list list-none">
              {upcoming.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </ol>
          ) : (
            <p className="py-8 text-sm text-muted-foreground">
              No date announced yet.{" "}
              <Link href="/join" className="link-editorial text-foreground">
                Join the group
              </Link>{" "}
              and you&apos;ll hear about the next one first.
            </p>
          )}
        </section>
      </Reveal>

      {past.length > 0 && (
        <Reveal>
          <section className="mt-20">
            <SectionHead index="02" label="Past meetups" note={`${past.length} held`} />
            <ol className="row-list list-none">
              {past.map((event) => (
                <EventRow key={event.id} event={event} past />
              ))}
            </ol>
          </section>
        </Reveal>
      )}

      <footer className="mt-24 border-t-2 border-foreground pt-8">
        <p className="text-sm text-muted-foreground">
          Want to host or sponsor a meetup?{" "}
          <Link href="/contribute" className="link-editorial text-foreground">
            Here&apos;s what we need
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
