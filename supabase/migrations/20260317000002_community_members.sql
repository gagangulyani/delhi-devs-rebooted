-- Community Members (Portfolio Showcase) table
CREATE TABLE IF NOT EXISTS community_members (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT        UNIQUE NOT NULL,
  name            TEXT        NOT NULL,
  title           TEXT        NOT NULL,
  bio             TEXT        NOT NULL,
  location        TEXT,
  github_username TEXT,
  linkedin_url    TEXT,
  twitter_handle  TEXT,
  portfolio_url   TEXT,
  skills          TEXT[]      NOT NULL DEFAULT '{}',
  open_to         TEXT[]      NOT NULL DEFAULT '{}',
  featured        BOOLEAN     NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Anyone can read profiles
CREATE POLICY "Public read access"
  ON community_members FOR SELECT
  USING (true);
