import { useState, useEffect, useCallback } from "react";
import { Project } from "@/types/profile";
import { getMockProjects } from "@/lib/profile/mock-data";
import { supabase } from "@/integrations/supabase/client";

export function useProjects(userId: string | null) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async (uid: string) => {
    // TODO: Replace with actual Supabase query when ready
    // const { data, error } = await supabase
    //   .from("user_projects")
    //   .select("*")
    //   .eq("user_id", uid)
    //   .order("created_at", { ascending: false });
    
    // For now, use mock data
    const mockProjects = getMockProjects();
    setProjects(mockProjects);
    setIsLoading(false);
  }, []);

  const addProject = useCallback(async (uid: string, projectData: Omit<Project, 'id' | 'created_at'>) => {
    const { error } = await supabase.from("user_projects").insert({
      user_id: uid,
      ...projectData,
    });

    if (!error) {
      await fetchProjects(uid);
    }

    return { error };
  }, [fetchProjects]);

  const deleteProject = useCallback(async (projectId: string, uid: string) => {
    const { error } = await supabase
      .from("user_projects")
      .delete()
      .eq("id", projectId);

    if (!error) {
      await fetchProjects(uid);
    }

    return { error };
  }, [fetchProjects]);

  useEffect(() => {
    if (userId) {
      fetchProjects(userId);
    }
  }, [userId, fetchProjects]);

  return {
    projects,
    isLoading,
    fetchProjects,
    addProject,
    deleteProject,
  };
}
