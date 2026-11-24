import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/PageHeader";

export const metadata: Metadata = {
  title: "Code of Conduct | Delhi Devs Rebooted",
  description:
    "Be kind, be useful, don't pitch. The rules that keep this community worth showing up to.",
};

const sections = [
  {
    id: "pledge",
    title: "Our pledge",
    paragraphs: [
      "We pledge to make participation a harassment-free experience for everyone, regardless of background, identity, or experience level. We act in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.",
    ],
  },
  {
    id: "standards",
    title: "Our standards",
    paragraphs: ["Examples of behaviour that contributes:"],
    list: [
      "Demonstrating empathy and kindness",
      "Being respectful of differing opinions",
      "Giving and accepting constructive feedback",
      "Focusing on what's best for the community",
      "Sharing knowledge generously",
      "Promoting collaboration and networking",
    ],
  },
  {
    id: "unacceptable",
    title: "Unacceptable behaviour",
    paragraphs: ["Examples of unacceptable behaviour:"],
    list: [
      "Sexualised language or imagery",
      "Trolling, insulting comments, or personal attacks",
      "Public or private harassment",
      "Publishing others' private information",
      "Spam or excessive self-promotion",
      "Conduct inappropriate in a professional setting",
    ],
  },
  {
    id: "guidelines",
    title: "Community guidelines",
    paragraphs: [
      "A few specifics that come up often in the group and at meetups.",
    ],
    pairs: [
      { title: "Networking", desc: "Meaningful connections between developers. Share opportunities and collaborate." },
      { title: "Technical", desc: "Keep discussions constructive. Provide context when asking for help." },
      { title: "On topic", desc: "Keep conversations relevant to tech, development, and professional growth." },
      { title: "Sharing", desc: "Share events, jobs, and resources relevant to our community." },
    ],
  },
  {
    id: "enforcement",
    title: "Enforcement",
    paragraphs: [
      "Community leaders are responsible for clarifying and enforcing our standards. They will take appropriate and fair corrective action in response to any behaviour that they deem inappropriate, threatening, offensive, or harmful.",
      "Reporting issues: if you experience or witness unacceptable behaviour, contact the community administrators immediately. All reports will be handled with discretion and confidentiality.",
    ],
  },
];

export default function CodeOfConductPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <PageHeader
        eyebrow="Code of conduct"
        meta="Contributor Covenant 2.0"
        title={
          <>
            Be kind, be useful,{" "}
            <span className="serif-i text-primary">don&apos;t pitch.</span>
          </>
        }
        lede="This is a place for developers to grow, learn, and connect without the toxicity that usually comes with a public group chat. These are the rules that keep it that way."
      />

      <div className="mt-12 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-14">
        <nav aria-label="Contents" className="hidden lg:block">
          <div className="sticky top-10">
            <p className="eyebrow text-foreground">Contents</p>
            <ul className="mt-4 space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#attribution"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Attribution
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-10 border-t-2 border-foreground py-8 first:border-t-0 first:pt-0"
            >
              <h2 className="flex items-baseline gap-4 text-xl font-bold tracking-tight text-foreground">
                <span aria-hidden="true" className="font-mono text-sm tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>

              <div className="prose-editorial mt-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {"list" in section && section.list && (
                <ul className="mt-4 max-w-[65ch] space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {"pairs" in section && section.pairs && (
                <dl className="row-list mt-2">
                  {section.pairs.map((pair) => (
                    <div key={pair.title} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                        {pair.title}
                      </dt>
                      <dd className="max-w-[56ch] text-sm leading-6 text-muted-foreground">{pair.desc}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}

          <section id="attribution" className="scroll-mt-10 border-t-2 border-foreground py-8">
            <h2 className="flex items-baseline gap-4 text-xl font-bold tracking-tight text-foreground">
              <span aria-hidden="true" className="font-mono text-sm tabular-nums text-primary">
                06
              </span>
              Attribution
            </h2>
            <div className="prose-editorial mt-4">
              <p>
                Adapted from the{" "}
                <a
                  href="https://www.contributor-covenant.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial text-foreground"
                >
                  Contributor Covenant
                </a>
                , version 2.0.
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-8">
        <p className="serif-i text-xl text-foreground">
          By joining, you agree to follow this code.
        </p>
        <Link href="/join" className="btn-ink">
          Join the community
        </Link>
      </footer>
    </div>
  );
}
