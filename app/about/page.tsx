import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, Users, MapPin } from "lucide-react";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/editorial/Reveal";
import { SectionHead, IconCard } from "@/components/editorial/Poster";

export const metadata: Metadata = {
  title: "About | Delhi Devs Rebooted",
  description:
    "A tech-agnostic community for developers across Delhi NCR. Started by accident, kept alive by people who care.",
};

const principles = [
  { icon: Sparkles, title: "Quality over hype", desc: "Learnings you can apply, not just noise." },
  { icon: Users, title: "Community over numbers", desc: "Real connections, respectful culture." },
  { icon: MapPin, title: "Delhi NCR first", desc: "Rooted in a thriving tech hub." },
];

const storyCards = [
  {
    title: "The Origin",
    subtitle: "From a coffee break to a community",
    content: [
      "It started at HTM (HackTheMountains). Chaitanya Chawla mentioned wanting a WhatsApp group for Delhi-NCR developers.",
      "Gagan Deep Singh created it on the spot. Simarpreet Singh, Vani Chitkara, Shivam Bhasin, Nishant Mishra and others joined right there.",
      "What started as an impromptu idea took off. The group became the go-to hub for sharing events, job postings, and dev tips. Word spread to colleges across Delhi-NCR, scaling to 1600+ active members.",
    ],
  },
  {
    title: "The Reboot",
    subtitle: "Fresh energy, same mission",
    content: [
      "Like many organic communities, the original group eventually dissolved. The spark faded, but the need didn't.",
      "Delhi Devs Rebooted launched in May 2025. The focus: networking over technical sessions. Quality over quantity.",
      "Meetup #1 drew 100+ registrations in August 2025. A clear signal that Delhi's developer community was eager to reconnect.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <PageHeader
        eyebrow="About"
        meta="Since 2024"
        title={
          <>
            Our <span className="serif-i text-primary">story</span>
          </>
        }
        lede="A tech-agnostic community for developers across Delhi NCR. Started by accident, kept alive by people who care."
      >
        <Link href="/events" className="btn-ink">
          See Events
        </Link>
        <Link href="/#join" className="btn-ghost">
          Join Community
        </Link>
      </PageHeader>

      <Reveal>
        <section className="mt-16">
          <SectionHead index="01" label="The story" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {storyCards.map((card) => (
              <article
                key={card.title}
                className="border-2 border-foreground bg-card p-6"
                style={{ boxShadow: "5px 5px 0 0 hsl(var(--foreground))" }}
              >
                <h2 className="text-xl font-bold tracking-tight text-foreground">{card.title}</h2>
                <p className="serif-i mt-1 text-lg text-muted-foreground">{card.subtitle}</p>
                <div className="prose-editorial mt-5">
                  {card.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <SectionHead index="02" label="What we believe" note={`${principles.length} principles`} />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {principles.map((principle) => (
              <IconCard
                key={principle.title}
                icon={principle.icon}
                title={principle.title}
                desc={principle.desc}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-8">
        <p className="serif-i text-xl text-foreground">
          Come to one meetup. That&apos;s usually enough to decide.
        </p>
        <Link href="/events" className="btn-ghost">
          Upcoming meetups
        </Link>
      </footer>
    </div>
  );
}
