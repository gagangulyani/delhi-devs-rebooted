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

export const upcomingEvent: Event = {
  id: "meetup-2",
  title: "Delhi Devs Rebooted - Meet-up #2",
  description: `If you're looking to network with Developers, PMs, AI/ML Engineers, and Co-founders, this meet-up is for you.

The Delhi Devs Rebooted meet-up first took place last year, and the atmosphere will be casual again.

No technical sessions, and sponsorship fluff, pure focus on connections.

Need a referral? Need some career advice? Need to figure out why your AI model stops working after 5 tool calls?

This place has got your back.`,
  event_date: "2026-03-21T16:00:00+05:30",
  end_date: "2026-03-21T19:30:00+05:30",
  location: "Noida, Uttar Pradesh",
  location_type: "physical",
  event_link: "https://lu.ma/k297hfqm",
  image_url: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=800,height=400/event-covers/yg/45d2c2c0-06ea-47c0-b0a1-2728cd5c3ceb.jpg",
  tags: ["Networking", "Meetup", "Delhi", "Noida"],
  agenda: `4 PM: Networking begins!
5:30 PM: We order food (bill will be split among us)
6:30 PM: We have the food that we ordered
7:30 PM: Event ends with a group picture`,
  registration_type: "Approval Required",
};

const pastEvent: Event = {
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

export const events: Event[] = [upcomingEvent, pastEvent];
