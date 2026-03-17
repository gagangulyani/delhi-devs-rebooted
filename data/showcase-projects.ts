export interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  author: string;
  authorGithub: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  featured: boolean;
  category: "web" | "mobile" | "ai/ml" | "devtools" | "open-source" | "other";
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "delhi-devs-rebooted",
    title: "Delhi Devs Rebooted Website",
    description:
      "The official Delhi Devs Rebooted community website — open-source, built by community members and contributors. Next.js, Tailwind, Supabase.",
    author: "Gagan Deep Singh",
    authorGithub: "gagangulyani",
    githubUrl: "https://github.com/gagangulyani/delhi-devs-rebooted",
    liveUrl: "https://delhidevs.com",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    featured: true,
    category: "web",
  },
  // ──────────────────────────────────────────────────────────────────────────
  // 🚀 Add your project below this line!
  // Follow the structure above. Set featured: true for highlight on homepage.
  // Submit a pull request to get your project listed.
  // ──────────────────────────────────────────────────────────────────────────
];

export const getFeaturedProjects = () =>
  showcaseProjects.filter((p) => p.featured).slice(0, 3);

export const categoryLabels: Record<ShowcaseProject["category"], string> = {
  "web": "Web",
  "mobile": "Mobile",
  "ai/ml": "AI / ML",
  "devtools": "Dev Tools",
  "open-source": "Open Source",
  "other": "Other",
};
