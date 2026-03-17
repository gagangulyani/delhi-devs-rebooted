import { supabase } from "@/lib/supabase";

export type CommunityMember = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  location: string | null;
  github_username: string | null;
  linkedin_url: string | null;
  twitter_handle: string | null;
  portfolio_url: string | null;
  skills: string[];
  open_to: string[];
  featured: boolean;
  created_at: string;
};

export const openToLabels: Record<string, string> = {
  "full-time": "Open to Full-time",
  freelance: "Freelance",
  collaboration: "Open to Collaborate",
  mentorship: "Mentoring",
};

export async function getAllMembers(): Promise<CommunityMember[]> {
  const { data, error } = await supabase
    .from("community_members")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch community members:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedMembers(): Promise<CommunityMember[]> {
  const { data, error } = await supabase
    .from("community_members")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: true })
    .limit(6);

  if (error) {
    console.error("Failed to fetch featured members:", error.message);
    return [];
  }
  return data ?? [];
}
