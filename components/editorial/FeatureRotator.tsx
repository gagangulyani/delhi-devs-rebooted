"use client";

import { useEffect, useState } from "react";
import {
  Network,
  Briefcase,
  BookOpen,
  Calendar,
  Code2,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  network: Network,
  briefcase: Briefcase,
  book: BookOpen,
  calendar: Calendar,
  code: Code2,
  heart: Heart,
};

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const INTERVAL = 3200;

const ARTIFACTS = [
  { char: "{ }", pos: "left-[6%] top-[18%]", anim: "animate-floaty", tone: "text-foreground/15", size: "text-2xl" },
  { char: "</>", pos: "right-[7%] top-[14%]", anim: "animate-floaty-slow", tone: "text-primary/25", size: "text-3xl" },
  { char: "#", pos: "left-[16%] bottom-[18%]", anim: "animate-floaty-reverse", tone: "text-foreground/10", size: "text-xl" },
  { char: "*", pos: "right-[18%] bottom-[22%]", anim: "animate-floaty", tone: "text-primary/15", size: "text-2xl" },
  { char: "&&", pos: "left-[44%] top-[3%]", anim: "animate-floaty-slow", tone: "text-foreground/10", size: "text-lg" },
  { char: "=>", pos: "right-[38%] bottom-[4%]", anim: "animate-floaty-reverse", tone: "text-primary/10", size: "text-xl" },
  { char: "<3", pos: "left-[28%] top-[32%]", anim: "animate-floaty", tone: "text-primary/10", size: "text-lg" },
];

export function FeatureRotator({
  features,
  className,
}: {
  features: Feature[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % features.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, features.length]);

  const feature = features[index];
  const Icon = ICON_MAP[feature.icon] ?? Network;

  return (
    <div
      className={cn("relative flex flex-col items-center py-12 text-center sm:py-16", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Animated background: soft shapes + scattered mono artifacts */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-floaty absolute -left-8 top-6 h-36 w-36 rounded-full bg-primary/10" />
        <div className="animate-floaty-slow absolute -right-10 top-1/4 h-28 w-28 rounded-md bg-secondary/60" />
        <div className="animate-floaty-reverse absolute bottom-4 left-1/4 h-32 w-32 rotate-12 bg-primary/5" />
        <div className="animate-floaty-slow absolute -bottom-6 right-1/3 h-24 w-24 rounded-full bg-secondary/40" />

        {ARTIFACTS.map((a, i) => (
          <span key={i} className={cn("absolute font-mono", a.pos, a.anim, a.tone, a.size)}>
            {a.char}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center">
        <div key={index} className="feature-anim flex flex-col items-center">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            0{index + 1} / 0{features.length}
          </span>

          <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 sm:h-20 sm:w-20">
            <Icon className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
          </div>

          <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {feature.title}
          </h3>

          <p className="mt-3 max-w-md text-base text-muted-foreground sm:text-lg">
            {feature.desc}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {features.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${features[i].title}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
