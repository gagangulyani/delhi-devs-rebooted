import { useState, useEffect, useCallback } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserProfile } from "@/types/profile";
import { getMockProfile } from "@/lib/profile/mock-data";
import { supabase } from "@/integrations/supabase/client";

export function useProfileData() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    // TODO: Replace with actual Supabase query when ready
    // const { data, error } = await supabase
    //   .from("user_profiles")
    //   .select("*")
    //   .eq("id", userId)
    //   .single();
    
    // For now, use mock data
    const mockProfile = getMockProfile(userId);
    setProfile(mockProfile);
  }, []);

  const updateProfile = useCallback(async (userId: string, updates: Partial<UserProfile>) => {
    // Ensure display_name is provided since it's required
    if (!updates.display_name && !profile?.display_name) {
      return { error: { message: "Display name is required" } };
    }

    const { error } = await supabase
      .from("user_profiles")
      .upsert({
        id: userId,
        display_name: updates.display_name || profile?.display_name || '',
        ...updates,
      });

    if (!error) {
      await fetchProfile(userId);
    }

    return { error };
  }, [fetchProfile, profile]);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        // Mock user for demonstration
        const mockUser = {
          id: "mock-user-id",
          email: "gagan@example.com",
          user_metadata: {
            display_name: "Gagan Deep Singh"
          },
          app_metadata: {},
          aud: "authenticated",
          created_at: new Date().toISOString()
        } as SupabaseUser;
        
        setUser(mockUser);
        await fetchProfile(mockUser.id);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProfile();
  }, [fetchProfile]);

  return {
    user,
    profile,
    isLoading,
    fetchProfile,
    updateProfile,
  };
}
