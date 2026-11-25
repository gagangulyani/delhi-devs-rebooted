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
      className={cn("flex flex-col items-center text-center", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
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
  );
}
