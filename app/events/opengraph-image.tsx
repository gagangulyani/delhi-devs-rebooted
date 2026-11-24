import { ogImage, OG_WIDTH, OG_HEIGHT } from "@/lib/og";

export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const alt = "Delhi Devs Rebooted events";

export default function Image() {
  return ogImage({
    eyebrow: "Events",
    title: "Meet the",
    accent: "makers.",
    subtitle: "No sponsors, no pitches. Just peers.",
    meta: "In-person only",
  });
}
