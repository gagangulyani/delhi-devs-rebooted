import { ogImage, OG_WIDTH, OG_HEIGHT } from "@/lib/og";

export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const alt = "About Delhi Devs Rebooted";

export default function Image() {
  return ogImage({
    eyebrow: "About",
    title: "Our",
    accent: "story",
    subtitle: "Started by accident, kept alive by people who care.",
    meta: "Since 2024",
  });
}
