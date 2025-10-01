export interface UserProfile {
  id: string;
  display_name: string;
  bio?: string;
  location?: string;
  job_title?: string;
  company?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  looking_for_collaborators: boolean;
  created_at: string;
}

export interface ProfileStats {
  totalBlogs: number;
  totalEvents: number;
  totalAttendees: number;
  totalViews: number;
}

export interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: 'join' | 'event' | 'blog' | 'project';
}
