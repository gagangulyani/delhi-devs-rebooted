import { ogImage, OG_WIDTH, OG_HEIGHT } from "@/lib/og";

export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const alt = "Delhi Devs Rebooted code of conduct";

export default function Image() {
  return ogImage({
    eyebrow: "Code of conduct",
    title: "Be kind,",
    accent: "be useful.",
    subtitle: "Don't pitch.",
    meta: "Contributor Covenant",
  });
}
