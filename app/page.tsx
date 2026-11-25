import Link from "next/link";
import type { Metadata } from "next";
import {
  Code2,
  Heart,
  Network,
  Briefcase,
  BookOpen,
  Calendar,
  Zap,
  Coffee,
  PartyPopper,
} from "lucide-react";
import { events } from "@/lib/event-data";
import { eventDate } from "@/lib/event-date";
import { WHATSAPP_INVITE_LINK } from "@/constants/links";
import { Reveal } from "@/components/editorial/Reveal";
import { SectionHead, PrintPhoto, Marquee, IconCard, GroupTile } from "@/components/editorial/Poster";
import { Magnetic, FloatingShapes } from "@/components/editorial/motion";
import { FeatureCarousel } from "@/components/editorial/FeatureCarousel";

export const metadata: Metadata = {
  title: "Delhi Devs Rebooted | Connecting Passionate Developers in Delhi NCR",
  description:
    "Join Delhi Devs Rebooted - the largest developer community in Delhi NCR. Connect with passionate developers, attend tech meetups, share knowledge, and build the future of technology together.",
};

export const revalidate = 3600;

const groups = [
  { src: "/delhi-devs-community.png", name: "Delhi Devs Community", desc: "Tech doubts & articles" },
  { src: "/delhi-devs-friends-group.png", name: "Friends Group", desc: "Off-topic & self-promo" },
  { src: "/delhi-devs-tech-meetups-and-events.png", name: "Tech Meetups and Events", desc: "Meetups & hackathons" },
  { src: "/delhi-devs-jobs-opportunities.jpeg", name: "Jobs and Opportunities", desc: "Job referrals & openings" },
];

const features = [
  { icon: Network, title: "Professional Networking", desc: "Connect with devs across Delhi NCR" },
  { icon: Briefcase, title: "Job Opportunities", desc: "Referrals from people who know you" },
  { icon: BookOpen, title: "Knowledge Sharing", desc: "Talks, workshops, hands-on" },
  { icon: Calendar, title: "Community Events", desc: "Hackathons to coffee chats" },
  { icon: Code2, title: "Project Collaboration", desc: "Find partners, build together" },
  { icon: Heart, title: "Mentorship", desc: "Learn from seniors, give back" },
];

const joinFeatures = [
  { icon: Zap, title: "Lightning Fast", desc: "Stuck? Someone replies in minutes, not hours." },
  { icon: Coffee, title: "3AM Club", desc: "Debugging at ungodly hours is normal here." },
  { icon: Code2, title: "Real Talk", desc: "No LinkedIn fluff. Just shipping and breaking things." },
  { icon: PartyPopper, title: "Good Vibes", desc: "Meetups worth leaving your house for. Actually." },
];

const meetupTitles = {
  "meetup-1": "Meetup #1: The Beginning",
  "meetup-2": "Meetup #2: New Faces, Same Vibe",
};

const tilts = ["left", "right"] as const;

export default function HomePage() {
  const ticker = ["Join the group", "Meetups in Delhi NCR", "Ship projects", "Born in Delhi", "Share knowledge"];
  const now = new Date();
  const nextEvent = events.find((event) => new Date(event.event_date) >= now);

  return (
    <>
      {/* ---- HERO ---- */}
      <section className="relative">
        <FloatingShapes />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <Reveal>
            <span className="marker">
              {nextEvent
                ? `Next meetup · ${eventDate(nextEvent.event_date).day} ${eventDate(nextEvent.event_date).month} ${eventDate(nextEvent.event_date).year} · ${nextEvent.location}`
                : "No date announced · Delhi NCR"}
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="display-hero mt-8 text-foreground">
              Developers across
              <br />
              Delhi NCR, <span className="serif-i text-primary stamp-in">in person.</span>
            </h1>
          </Reveal>

          <Reveal delay={110}>
            <p className="lede mt-7">
              A tech-agnostic community of builders, learners and makers. We meet
              up, share knowledge, and level up together.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={WHATSAPP_INVITE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink"
                >
                  Join the group
                  <span aria-hidden="true">→</span>
                </a>
              </Magnetic>
              <Link href="/events" className="btn-ghost">
                {nextEvent ? "See the next meetup" : "See past meetups"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- TICKER (full width) ---- */}
      <Reveal delay={80}>
        <Marquee items={ticker} className="mt-14 py-4" />
      </Reveal>

      {/* ---- MEETUPS ---- */}
      <Reveal>
        <section className="mx-auto mt-20 w-full max-w-6xl px-5 sm:px-8">
          <SectionHead index="01" label="The meetups" note="where connections happen" />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {events.map((event, i) => (
              <article key={event.id} className="flex flex-col">
                {event.image_url && (
                  <PrintPhoto
                    src={event.image_url}
                    alt={`${event.title} group photo`}
                    caption={meetupTitles[event.id as keyof typeof meetupTitles] ?? event.title}
                    tilt={tilts[i % tilts.length]}
                  />
                )}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span>{eventDate(event.event_date).date}</span>
                  <span>{event.location}</span>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Read the recap
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ---- WHAT YOU GET ---- */}
      <section className="mt-20">
        <Reveal>
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHead index="02" label="What you get" note={`${features.length} ways`} />
          </div>
        </Reveal>
        <FeatureCarousel className="mt-8">
          {features.map((feature) => (
            <IconCard key={feature.title} icon={feature.icon} title={feature.title} desc={feature.desc} />
          ))}
        </FeatureCarousel>
      </section>

      {/* ---- GROUPS ---- */}
      <section className="mt-20">
        <Reveal>
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHead index="03" label="Our community groups" note={`${groups.length} chats`} />
          </div>
        </Reveal>
        <FeatureCarousel className="mt-8">
          {groups.map((group, i) => (
            <GroupTile
              key={group.name}
              src={group.src}
              title={group.name}
              desc={group.desc}
              tilt={tilts[i % tilts.length]}
            />
          ))}
        </FeatureCarousel>
      </section>

      {/* ---- JOIN US ---- */}
      <section id="join" className="mt-20">
        <Reveal>
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionHead index="04" label="Join us" note="the group chat" />
            <p className="lede mt-6 max-w-2xl">
              A WhatsApp group for Delhi developers who actually build things.
              No recruiters. Just real conversations at 3am.
            </p>
          </div>
        </Reveal>
        <FeatureCarousel className="mt-8">
          {joinFeatures.map((feature) => (
            <IconCard key={feature.title} icon={feature.icon} title={feature.title} desc={feature.desc} />
          ))}
        </FeatureCarousel>
        <Reveal>
          <div className="mx-auto mt-10 w-full max-w-6xl px-5 sm:px-8">
            <div
              className="flex flex-col items-center gap-6 border-2 border-foreground bg-card p-8 text-center sm:p-10"
              style={{ boxShadow: "6px 6px 0 0 hsl(var(--primary))" }}
            >
              <h2 className="display text-foreground">
                Ready to <span className="serif-i text-primary">Code Together?</span>
              </h2>
              <p className="lede mx-auto">
                Your next opportunity, collaboration, or friendship is just one
                click away.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={WHATSAPP_INVITE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink"
                >
                  Join on WhatsApp
                </a>
                <Link href="/code-of-conduct" className="btn-ghost">
                  Read Our Code of Conduct
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["Open Source Friendly", "All Skill Levels Welcome", "Diverse & Inclusive"].map((label) => (
                  <span key={label} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 bg-primary" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-24 border-t-2 border-foreground">
        <div className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="serif-i text-xl text-foreground">Born in Delhi. Built for the world.</p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <Link href="/events" className="hover:text-foreground">Events</Link>
              <Link href="/about" className="hover:text-foreground">About</Link>
              <Link href="/#join" className="hover:text-foreground">Join</Link>
              <Link href="/contribute" className="hover:text-foreground">Contribute</Link>
              <Link href="/code-of-conduct" className="hover:text-foreground">Code of conduct</Link>
              <a
                href="https://github.com/gagangulyani/delhi-devs-rebooted"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                GitHub ↗
              </a>
            </nav>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
            © {new Date().getFullYear()} Delhi Devs Rebooted
          </p>
        </div>
      </footer>
    </>
  );
}
