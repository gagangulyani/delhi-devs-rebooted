import { ogImage, OG_WIDTH, OG_HEIGHT } from "@/lib/og";

export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const alt = "Delhi Devs Rebooted — developers across Delhi NCR";

export default function Image() {
  return ogImage({
    eyebrow: "Delhi Devs Rebooted",
    title: "Connect. Collaborate.",
    accent: "Code.",
    subtitle: "A community of builders, learners and makers.",
    meta: "Delhi NCR",
  });
}
