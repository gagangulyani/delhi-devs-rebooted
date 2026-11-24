import { ogImage, OG_WIDTH, OG_HEIGHT } from "@/lib/og";

export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const alt = "Join Delhi Devs Rebooted";

export default function Image() {
  return ogImage({
    eyebrow: "Join",
    title: "Join the",
    accent: "chaos",
    subtitle: "A WhatsApp group for Delhi developers.",
    meta: "Active now",
  });
}
