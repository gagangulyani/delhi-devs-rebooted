import { GitBranch, Code2, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Step {
  step: string;
  title: string;
  desc: string;
}

export interface WayToHelp {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    step: "01",
    title: "Fork It",
    desc: "Grab the repo and make it yours.",
  },
  {
    step: "02",
    title: "Break It",
    desc: "Find a bug or build a feature.",
  },
  {
    step: "03",
    title: "Ship It",
    desc: "Open a PR and let's talk.",
  },
];

export const waysToHelp: WayToHelp[] = [
  {
    icon: GitBranch,
    title: "Code",
    desc: "Fix bugs, add features, refactor. Everything counts.",
  },
  {
    icon: Heart,
    title: "Design",
    desc: "UI/UX improvements, icons, animations. Make it pretty.",
  },
  {
    icon: Code2,
    title: "Docs",
    desc: "Typos, better explanations, examples. Help people understand.",
  },
];
