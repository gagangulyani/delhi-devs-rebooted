import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming and past Delhi Devs Rebooted meetups and tech events in Delhi NCR. Register for the next event and connect with the community.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
