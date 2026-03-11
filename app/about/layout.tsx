import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Delhi Devs Rebooted — from its origin at HackTheMountains to a thriving developer community in Delhi NCR. Meet the founder and discover our principles.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
