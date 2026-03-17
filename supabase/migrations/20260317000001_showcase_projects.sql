-- Community Showcase Projects table
CREATE TABLE IF NOT EXISTS showcase_projects (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT        UNIQUE NOT NULL,
  title        TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  author       TEXT        NOT NULL,
  author_github TEXT       NOT NULL,
  github_url   TEXT        NOT NULL,
  live_url     TEXT,
  tech_stack   TEXT[]      NOT NULL DEFAULT '{}',
  featured     BOOLEAN     NOT NULL DEFAULT false,
  category     TEXT        NOT NULL
                CHECK (category IN ('web','mobile','ai/ml','devtools','open-source','other')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE showcase_projects ENABLE ROW LEVEL SECURITY;

-- Anyone can read projects
CREATE POLICY "Public read access"
  ON showcase_projects FOR SELECT
  USING (true);
