import { Heart, Users, MessageCircle, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CodeSection {
  icon: LucideIcon;
  title: string;
  color: string;
  content?: string;
  description?: string;
  list?: string[];
  guidelines?: { title: string; desc: string }[];
}

export const codeSections: CodeSection[] = [
  {
    icon: Heart,
    title: "Our Pledge",
    color: "text-red-500",
    content: "We pledge to make participation a harassment-free experience for everyone, regardless of background, identity, or experience level. We act in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community."
  },
  {
    icon: Users,
    title: "Our Standards",
    color: "text-blue-500",
    description: "Examples of behavior that contributes:",
    list: [
      "Demonstrating empathy and kindness",
      "Being respectful of differing opinions",
      "Giving and accepting constructive feedback",
      "Focusing on what's best for the community",
      "Sharing knowledge generously",
      "Promoting collaboration and networking"
    ]
  },
  {
    icon: MessageCircle,
    title: "Unacceptable Behavior",
    color: "text-orange-500",
    description: "Examples of unacceptable behavior:",
    list: [
      "Sexualized language or imagery",
      "Trolling, insulting comments, or personal attacks",
      "Public or private harassment",
      "Publishing others' private information",
      "Spam or excessive self-promotion",
      "Conduct inappropriate in a professional setting"
    ]
  },
  {
    icon: Code,
    title: "Community Guidelines",
    color: "text-green-500",
    guidelines: [
      { title: "🤝 Networking", desc: "Meaningful connections between developers. Share opportunities and collaborate." },
      { title: "💻 Technical", desc: "Keep discussions constructive. Provide context when asking for help." },
      { title: "🎯 On Topic", desc: "Keep conversations relevant to tech, development, and professional growth." },
      { title: "📢 Sharing", desc: "Share events, jobs, and resources relevant to our community." }
    ]
  }
];
