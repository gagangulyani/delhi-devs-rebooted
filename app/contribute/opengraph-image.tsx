import { ogImage, OG_WIDTH, OG_HEIGHT } from "@/lib/og";

export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const alt = "Contribute to Delhi Devs Rebooted";

export default function Image() {
  return ogImage({
    eyebrow: "Contribute",
    title: "Build the",
    accent: "future",
    subtitle: "This website is open source.",
    meta: "MIT licensed",
  });
}
