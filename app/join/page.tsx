import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Coffee, Code2, PartyPopper } from "lucide-react";
import { WHATSAPP_INVITE_LINK } from "@/constants/links";
import { Reveal } from "@/components/editorial/Reveal";
import { SectionHead, IconCard } from "@/components/editorial/Poster";

export const metadata: Metadata = {
  title: "Join — Delhi Devs Rebooted",
  description: "Join the Delhi Devs Rebooted WhatsApp group.",
};

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Stuck? Someone replies in minutes, not hours." },
  { icon: Coffee, title: "3AM Club", desc: "Debugging at ungodly hours is normal here." },
  { icon: Code2, title: "Real Talk", desc: "No LinkedIn fluff. Just shipping and breaking things." },
  { icon: PartyPopper, title: "Good Vibes", desc: "Meetups worth leaving your house for. Actually." },
];

export default function JoinPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <section>
        <Reveal>
          <span className="marker">Active now</span>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display-hero mt-8 text-foreground">
            Join the <span className="serif-i text-primary">chaos</span>
          </h1>
        </Reveal>

        <Reveal delay={110}>
          <p className="lede mt-7">
            A WhatsApp group for Delhi developers who actually build things.
            No recruiters. Just real conversations at 3am.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink"
            >
              Get In
              <span aria-hidden="true">→</span>
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Curated community
            </span>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section className="mt-16">
          <SectionHead index="01" label="What you actually get" note="not features. real things that happen." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <IconCard key={feature.title} icon={feature.icon} title={feature.title} desc={feature.desc} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <div
            className="flex flex-col items-center gap-6 border-2 border-foreground bg-card p-8 text-center sm:p-10"
            style={{ boxShadow: "6px 6px 0 0 hsl(var(--primary))" }}
          >
            <h2 className="display text-foreground">
              One click away from the <span className="serif-i text-primary">chaos</span>
            </h2>
            <a
              href={WHATSAPP_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink"
            >
              Join WhatsApp Group
              <span aria-hidden="true">→</span>
            </a>
            <p className="text-sm text-muted-foreground">Free to join. Leave anytime.</p>
          </div>
        </section>
      </Reveal>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-8">
        <p className="serif-i text-xl text-foreground">
          Free to join. Leave anytime. No hard feelings.
        </p>
        <a
          href={WHATSAPP_INVITE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink"
        >
          Join WhatsApp Group
          <span aria-hidden="true">→</span>
        </a>
      </footer>
    </div>
  );
}
