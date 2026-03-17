export interface CommunityMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  githubUsername?: string;
  linkedinUrl?: string;
  twitterHandle?: string;
  portfolioUrl?: string;
  skills: string[];
  openTo: ("full-time" | "freelance" | "collaboration" | "mentorship")[];
  featured: boolean;
}

export const communityMembers: CommunityMember[] = [
  {
    id: "gagan-deep-singh",
    name: "Gagan Deep Singh",
    title: "Founder & Full-Stack Developer",
    bio: "Building Delhi Devs Rebooted to connect passionate developers in Delhi NCR. Loves open source, community building, and shipping products.",
    location: "Delhi, India",
    githubUsername: "gagangulyani",
    linkedinUrl: "https://linkedin.com/in/gagan-gulyani",
    twitterHandle: "GaganGulyani",
    portfolioUrl: "https://gagangulyani.com",
    skills: ["React", "Node.js", "TypeScript", "Python", "Community Building"],
    openTo: ["collaboration", "mentorship"],
    featured: true,
  },
  // ──────────────────────────────────────────────────────────────────────────
  // 👋 Add yourself below this line!
  // Fill in the fields above — all fields except id, name, title, bio are optional.
  // Submit a pull request and your profile will appear on the members page.
  // ──────────────────────────────────────────────────────────────────────────
];

export const openToLabels: Record<CommunityMember["openTo"][number], string> = {
  "full-time": "Open to Full-time",
  "freelance": "Freelance",
  "collaboration": "Open to Collaborate",
  "mentorship": "Mentoring",
};

export const getFeaturedMembers = () =>
  communityMembers.filter((m) => m.featured).slice(0, 6);
