-- Admin SQL Functions for Birthday Presenter
-- Run this in your Supabase SQL Editor

-- Function to get all users with their stats (for admin panel)
CREATE OR REPLACE FUNCTION get_admin_users_stats()
RETURNS TABLE (
  id UUID,
  email TEXT,
  organization_name TEXT,
  display_url_slug TEXT,
  created_at TIMESTAMPTZ,
  last_sign_in TIMESTAMPTZ,
  birthday_count BIGINT,
  photo_count BIGINT
)
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    au.id,
    au.email::TEXT,
    COALESCE(p.organization_name, 'Unknown')::TEXT,
    COALESCE(p.display_url_slug, '')::TEXT,
    au.created_at,
    au.last_sign_in_at,
    COALESCE(COUNT(DISTINCT tm.id), 0)::BIGINT as birthday_count,
    COALESCE(COUNT(DISTINCT CASE WHEN tm.photo_url IS NOT NULL AND tm.photo_url != '' THEN tm.id END), 0)::BIGINT as photo_count
  FROM auth.users au
  LEFT JOIN profiles p ON p.id = au.id
  LEFT JOIN team_members tm ON tm.user_id = au.id
  GROUP BY au.id, au.email, p.organization_name, p.display_url_slug, au.created_at, au.last_sign_in_at
  ORDER BY au.created_at DESC;
END;
$$ LANGUAGE plpgsql;
