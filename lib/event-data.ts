export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  end_date?: string;
  location: string;
  location_type: "physical" | "virtual" | "hybrid";
  event_link: string;
  location_url?: string;
  image_url?: string;
  max_attendees?: number;
  current_attendees?: number;
  tags: string[];
  agenda?: string;
  registration_type?: string;
}

export const meetup2: Event = {
  id: "meetup-2",
  title: "Delhi Devs Rebooted - Meetup #2",
  description: `A diverse gathering bringing together developers and college students building incredible things: an exoplanet identifier, a college website migrated to mobile app, and a self-hosted storage solution handling terabytes.

Anuvrat showcased live music coding with strudel. We talked tech, philosophy, and ate pizzas sponsored by the team at essentia.dev.

From deep implementation discussions to playing UNO — connections happened naturally.`,
  event_date: "2026-03-21T16:00:00+05:30",
  end_date: "2026-03-21T19:30:00+05:30",
  location: "essentia.dev, Noida",
  location_type: "physical",
  event_link: "https://www.linkedin.com/posts/gagan-gulyani_omg-finally-hosted-the-delhi-devs-rebooted-ugcPost-7441591055164211200-MV43",
  image_url: "/delhi-devs-meetup-2-group-photo.jpeg",
  tags: ["Networking", "Meetup", "College Students", "Live Coding", "Noida"],
  agenda: `Afternoon networking and introductions
Icebreaker: "What did you build that you're proud of?"
Student project showcases and technical deep dives
Live music coding demo with strudel
Pizzas sponsored by essentia.dev team
Games and casual conversations`,
};

export const meetup1: Event = {
  id: "meetup-1",
  title: "Delhi Devs Rebooted - Meetup #1",
  description: `Quality over quantity delivered beyond expectations. From AI web crawlers to philosophy, our first meetup proved that passionate developers create magic.

14 passionate developers gathered for an evening of tech discussions, philosophical conversations, and lasting connections.

Special thanks to Anuvrat Parashar for the amazing venue at essentia.dev!`,
  event_date: "2025-07-26T18:00:00+05:30",
  end_date: "2025-07-26T21:00:00+05:30",
  location: "essentia.dev, Noida",
  location_type: "physical",
  event_link: "https://www.linkedin.com/posts/gagan-gulyani_we-freakin-made-it-delhi-devs-rebooted-ugcPost-7354946301274304512-BHXw",
  image_url: "/delhi-devs-meetup-1-group-photo.jpg",
  tags: ["Networking", "Meetup", "First Meetup", "Noida"],
  agenda: `Evening of tech discussions and connections
AI-based web crawlers and WhatsApp bots
Philosophy and life conversations
Quality connections with 14 developers`,
};

export const events: Event[] = [meetup2, meetup1];
