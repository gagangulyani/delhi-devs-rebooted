import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CommunityStats {
  totalMembers: number;
  approvedMembers: number;
  pendingMembers: number;
  recentJoins: number; // Members joined in last 30 days
}

export const useCommunityStats = () => {
  return useQuery({
    queryKey: ["community-stats"],
    queryFn: async (): Promise<CommunityStats> => {
      try {
        // Get total members count
        const { count: totalMembers, error: totalError } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true });

        if (totalError) throw totalError;

        // Get approved members count
        const { count: approvedMembers, error: approvedError } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true })
          .eq("status", "approved");

        if (approvedError) throw approvedError;

        // Get pending members count
        const { count: pendingMembers, error: pendingError } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        if (pendingError) throw pendingError;

        // Get recent joins (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { count: recentJoins, error: recentError } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true })
          .gte("created_at", thirtyDaysAgo.toISOString());

        if (recentError) throw recentError;

        return {
          totalMembers: totalMembers || 0,
          approvedMembers: approvedMembers || 0,
          pendingMembers: pendingMembers || 0,
          recentJoins: recentJoins || 0,
        };
      } catch (error) {
        console.error("Error fetching community stats:", error);
        // Return fallback stats
        return {
          totalMembers: 0,
          approvedMembers: 0,
          pendingMembers: 0,
          recentJoins: 0,
        };
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};