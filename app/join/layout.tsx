import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Join the Delhi Devs Rebooted community. Connect with 500+ developers in Delhi NCR via WhatsApp, attend events, and grow your network.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
