-- Create a public function to get community stats
-- This bypasses RLS since it's a SECURITY DEFINER function run as the owner
CREATE OR REPLACE FUNCTION public.get_community_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_members_count INTEGER;
  approved_members_count INTEGER;
  pending_members_count INTEGER;
  recent_joins_count INTEGER;
  thirty_days_ago TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Calculate date 30 days ago
  thirty_days_ago := NOW() - INTERVAL '30 days';
  
  -- Get total members count
  SELECT COUNT(*) INTO total_members_count
  FROM public.members;
  
  -- Get approved members count
  SELECT COUNT(*) INTO approved_members_count
  FROM public.members
  WHERE status = 'approved';
  
  -- Get pending members count
  SELECT COUNT(*) INTO pending_members_count
  FROM public.members
  WHERE status = 'pending';
  
  -- Get recent joins (last 30 days)
  SELECT COUNT(*) INTO recent_joins_count
  FROM public.members
  WHERE created_at >= thirty_days_ago;
  
  -- Return as JSON
  RETURN json_build_object(
    'totalMembers', COALESCE(total_members_count, 0),
    'approvedMembers', COALESCE(approved_members_count, 0),
    'pendingMembers', COALESCE(pending_members_count, 0),
    'recentJoins', COALESCE(recent_joins_count, 0)
  );
END;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.get_community_stats() TO anon;
GRANT EXECUTE ON FUNCTION public.get_community_stats() TO authenticated;

-- Create RLS policy to allow anyone to execute this function
-- (this is handled by the GRANT above, but adding for clarity)