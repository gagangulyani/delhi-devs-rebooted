// Data is now stored in Supabase.
// See: supabase/migrations/20260317000002_community_members.sql
// Seed: supabase/seed/community_members_seed.sql
export { openToLabels } from "@/lib/db/members";
export type { CommunityMember } from "@/lib/db/members";
