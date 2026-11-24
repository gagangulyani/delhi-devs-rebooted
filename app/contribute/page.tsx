import Link from "next/link";
import type { Metadata } from "next";
import { GitBranch, Heart, Code2, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/editorial/Reveal";
import { SectionHead, IconCard, StepCard } from "@/components/editorial/Poster";

export const metadata: Metadata = {
  title: "Contribute | Delhi Devs Rebooted",
  description: "This website is open source. Built by the community, for the community.",
};

const REPO = "https://github.com/gagangulyani/delhi-devs-rebooted";

const steps = [
  { n: "01", title: "Fork It", desc: "Grab the repo and make it yours." },
  { n: "02", title: "Break It", desc: "Find a bug or build a feature." },
  { n: "03", title: "Ship It", desc: "Open a PR and let's talk." },
];

const ways = [
  { icon: GitBranch, title: "Code", desc: "Fix bugs, add features, refactor. Everything counts." },
  { icon: Heart, title: "Design", desc: "UI/UX improvements, icons, animations. Make it pretty." },
  { icon: Code2, title: "Docs", desc: "Typos, better explanations, examples. Help people understand." },
];

const guidelines = [
  { title: "Keep it focused", desc: "One feature or fix per PR. Easier to review, faster to merge." },
  { title: "Explain your changes", desc: "A good PR description saves everyone time. What changed? Why?" },
  { title: "Test before you push", desc: "Run npm run lint and make sure it actually works." },
];

export default function ContributePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <PageHeader
        eyebrow="Contribute"
        meta="Open Source"
        title={
          <>
            Build the <span className="serif-i text-primary">future</span>
          </>
        }
        lede="This website is open source. Built by the community, for the community. Your code could be live tomorrow."
      >
        <a href={REPO} target="_blank" rel="noopener noreferrer" className="btn-ink">
          View on GitHub
          <span aria-hidden="true">↗</span>
        </a>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          MIT License
        </span>
      </PageHeader>

      <Reveal>
        <section className="mt-16">
          <SectionHead index="01" label="How to contribute" note="three steps. no bureaucracy." />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {steps.map((step) => (
              <StepCard key={step.n} n={step.n} title={step.title} desc={step.desc} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <SectionHead index="02" label="Every skill helps" note="pick your weapon" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {ways.map((way) => (
              <IconCard key={way.title} icon={way.icon} title={way.title} desc={way.desc} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <SectionHead index="03" label="Contribution guidelines" note="quick rules" />
          <ul className="row-list mt-4 list-none">
            {guidelines.map((guideline) => (
              <li key={guideline.title} className="flex gap-4 py-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-base font-bold text-foreground">{guideline.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{guideline.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            First time contributing? Check out issues labeled{" "}
            <span className="font-mono text-[13px] text-foreground">good first issue</span>.
          </p>
        </section>
      </Reveal>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-8">
        <p className="serif-i text-xl text-foreground">No CLA. No committee. Just review.</p>
        <a href={`${REPO}/issues`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          View Issues
        </a>
      </footer>
    </div>
  );
}
