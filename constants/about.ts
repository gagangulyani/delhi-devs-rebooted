import { Sparkles, Users, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StoryCard {
  title: string;
  subtitle: string;
  content: string[];
}

export interface Principle {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const storyCards: StoryCard[] = [
  {
    title: "The Origin",
    subtitle: "From a coffee break to a community",
    content: [
      "It started at HTM (HackTheMountains). Chaitanya Chawla mentioned wanting a WhatsApp group for Delhi-NCR developers.",
      "Gagan Deep Singh created it on the spot. Simarpreet Singh, Vani Chitkara, Shivam Bhasin, Nishant Mishra and others joined right there.",
      "What started as an impromptu idea took off. The group became the go-to hub for sharing events, job postings, and dev tips. Word spread to colleges across Delhi-NCR, scaling to 1600+ active members."
    ]
  },
  {
    title: "The Reboot",
    subtitle: "Fresh energy, same mission",
    content: [
      "Like many organic communities, the original group eventually dissolved. The spark faded, but the need didn't.",
      "Delhi Devs Rebooted launched in May 2025. The focus: networking over technical sessions. Quality over quantity.",
      "Meetup #1 drew 100+ registrations in August 2025. A clear signal that Delhi's developer community was eager to reconnect."
    ]
  }
];

export const principles: Principle[] = [
  {
    icon: Sparkles,
    title: "Quality over hype",
    desc: "Learnings you can apply, not just noise."
  },
  {
    icon: Users,
    title: "Community over numbers",
    desc: "Real connections, respectful culture."
  },
  {
    icon: MapPin,
    title: "Delhi NCR first",
    desc: "Rooted in a thriving tech hub."
  }
];
