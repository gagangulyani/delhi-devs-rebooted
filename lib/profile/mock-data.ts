import { UserProfile, Project, ProfileStats } from "@/types/profile";

export const getMockProfile = (userId: string): UserProfile => ({
  id: userId,
  display_name: "Gagan Deep Singh",
  bio: "Full-stack developer passionate about building communities and open-source projects. Founder of Delhi Devs, focused on creating inclusive spaces for developers in Delhi NCR. Love working with React, Node.js, and Python.",
  location: "Delhi, India",
  job_title: "Software Engineer",
  company: "Tech Startup",
  github_url: "https://github.com/gagangulyani",
  linkedin_url: "https://linkedin.com/in/gagangulyani",
  twitter_url: "https://twitter.com/gagangulyani",
  website_url: "https://gagangulyani.com",
  avatar_url: "",
  created_at: "2025-08-01T10:00:00Z",
});

export const getMockProjects = (): Project[] => [
  {
    id: "1",
    title: "Delhi Devs Community Website",
    description: "A modern, responsive website for the Delhi Devs community built with Next.js, TypeScript, and Tailwind CSS. Features include event listings, member profiles, and blog posts.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    github_url: "https://github.com/delhi-devs/community-website",
    live_url: "https://delhi-devs.com",
    looking_for_collaborators: true,
    created_at: "2025-09-15T10:00:00Z",
  },
  {
    id: "2",
    title: "React Native Meetup App",
    description: "A mobile app for organizing and managing tech meetups in Delhi NCR. Built with React Native and Expo, featuring real-time updates and community engagement features.",
    technologies: ["React Native", "Expo", "Firebase", "Node.js"],
    github_url: "https://github.com/delhi-devs/meetup-app",
    looking_for_collaborators: true,
    created_at: "2025-08-20T14:30:00Z",
  },
  {
    id: "3",
    title: "Open Source Contribution Tracker",
    description: "A dashboard to track and visualize open source contributions across different platforms. Helps developers showcase their impact in the open source community.",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    github_url: "https://github.com/delhi-devs/contrib-tracker",
    live_url: "https://contrib-tracker.delhi-devs.com",
    looking_for_collaborators: false,
    created_at: "2025-07-10T09:15:00Z",
  },
  {
    id: "4",
    title: "AI-Powered Code Review Tool",
    description: "An intelligent code review assistant that uses machine learning to suggest improvements and catch potential bugs. Currently in early development phase.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    github_url: "https://github.com/delhi-devs/ai-code-review",
    looking_for_collaborators: true,
    created_at: "2025-09-01T16:45:00Z",
  },
];

export const getMockStats = (): ProfileStats => ({
  totalBlogs: 12,
  totalEvents: 8,
  totalAttendees: 246,
  totalViews: 3542,
});
