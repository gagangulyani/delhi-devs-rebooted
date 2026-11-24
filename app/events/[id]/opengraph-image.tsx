import { notFound } from "next/navigation";
import { events } from "@/lib/event-data";
import { eventDate } from "@/lib/event-date";
import { ogImage, OG_WIDTH, OG_HEIGHT } from "@/lib/og";

const titles = {
  "meetup-1": "The Beginning",
  "meetup-2": "New Faces, Same Vibe",
};

export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const alt = "Delhi Devs Rebooted meetup";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  const date = eventDate(event.event_date);
  const n = id === "meetup-1" ? "#1" : "#2";

  return ogImage({
    eyebrow: "Delhi Devs Rebooted",
    title: `Meetup ${n}`,
    accent: titles[id as keyof typeof titles] ?? "Delhi Devs",
    subtitle: `${date.date} · ${event.location}`,
    meta: "In person",
  });
}
