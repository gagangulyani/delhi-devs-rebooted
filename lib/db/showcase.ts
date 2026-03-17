import { supabase } from "@/lib/supabase";

export type ShowcaseProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  author_github: string;
  github_url: string;
  live_url: string | null;
  tech_stack: string[];
  featured: boolean;
  category: string;
  created_at: string;
};

export const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  "ai/ml": "AI / ML",
  devtools: "Dev Tools",
  "open-source": "Open Source",
  other: "Other",
};

export async function getAllShowcaseProjects(): Promise<ShowcaseProject[]> {
  const { data, error } = await supabase
    .from("showcase_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch showcase projects:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedShowcaseProjects(): Promise<ShowcaseProject[]> {
  const { data, error } = await supabase
    .from("showcase_projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Failed to fetch featured showcase projects:", error.message);
    return [];
  }
  return data ?? [];
}
