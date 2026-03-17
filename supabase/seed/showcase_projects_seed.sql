-- Seed data for showcase_projects
-- Run this after applying the migration to populate initial data.

INSERT INTO showcase_projects (slug, title, description, author, author_github, github_url, live_url, tech_stack, featured, category)
VALUES
  (
    'delhi-devs-rebooted',
    'Delhi Devs Rebooted Website',
    'The official Delhi Devs Rebooted community website — open-source, built by community members and contributors.',
    'Gagan Deep Singh',
    'gagangulyani',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    'https://delhidevs.com',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    true,
    'open-source'
  ),
  (
    'devlog-ai',
    'DevLog AI',
    'An AI-powered developer journal that auto-summarises your git commits into readable daily standups and weekly reports. Built at a Delhi Devs hackathon.',
    'Priya Sharma',
    'priyasharma-dev',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    NULL,
    ARRAY['Next.js', 'OpenAI', 'GitHub API', 'PostgreSQL'],
    true,
    'devtools'
  ),
  (
    'code-review-bot',
    'CodeReview Bot',
    'A GitHub App that automatically reviews PRs for code quality, security issues, and style violations using static analysis and AI suggestions.',
    'Arjun Mehta',
    'arjunmehta-codes',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    NULL,
    ARRAY['Node.js', 'GitHub Apps', 'TypeScript', 'LLM'],
    true,
    'devtools'
  ),
  (
    'ncr-transit',
    'NCR Transit Tracker',
    'Real-time Delhi Metro and bus tracking with offline-first support, route planning, and crowd density predictions for NCR commuters.',
    'Divya Kapoor',
    'divyak-dev',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    'https://delhidevs.com',
    ARRAY['React Native', 'Expo', 'DMRC API', 'SQLite'],
    false,
    'mobile'
  ),
  (
    'dsa-practice-hub',
    'DSA Practice Hub',
    'A curated DSA practice platform with an integrated code editor, company-wise question banks, and peer review for solutions.',
    'Rohan Gupta',
    'rohangupta-io',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    'https://delhidevs.com',
    ARRAY['React', 'Node.js', 'MongoDB', 'Judge0'],
    false,
    'web'
  ),
  (
    'open-resume',
    'OpenResume Builder',
    'A clean, open-source resume builder with LaTeX-quality PDF output, ATS scoring, and one-click LinkedIn import. No sign-up required.',
    'Sneha Nair',
    'snehanair-codes',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    'https://delhidevs.com',
    ARRAY['Next.js', 'React-PDF', 'Tailwind CSS', 'TypeScript'],
    false,
    'web'
  ),
  (
    'hinglish-nlp',
    'Hinglish NLP Toolkit',
    'An NLP toolkit for processing Hinglish (Hindi-English) code-mixed text — tokenisation, sentiment analysis, and transliteration models.',
    'Karan Verma',
    'karanv-nlp',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    NULL,
    ARRAY['Python', 'PyTorch', 'HuggingFace', 'FastAPI'],
    false,
    'ai/ml'
  ),
  (
    'split-it',
    'Split It — Expense Splitter',
    'A lightweight PWA for splitting expenses with friends. Works offline, no login needed. Inspired by splitting bills at Delhi Devs meetups!',
    'Anjali Singh',
    'anjalisingh-builds',
    'https://github.com/gagangulyani/delhi-devs-rebooted',
    'https://delhidevs.com',
    ARRAY['Vue.js', 'Pinia', 'PWA', 'IndexedDB'],
    false,
    'web'
  )
ON CONFLICT (slug) DO NOTHING;
