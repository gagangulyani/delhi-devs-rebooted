-- Seed data for community_members
-- Run this after applying the migration to populate initial profiles.

INSERT INTO community_members (slug, name, title, bio, location, github_username, linkedin_url, twitter_handle, portfolio_url, skills, open_to, featured)
VALUES
  (
    'gagan-deep-singh',
    'Gagan Deep Singh',
    'Founder & Full-Stack Developer',
    'Building Delhi Devs Rebooted to connect passionate developers across Delhi NCR. Loves open source, community building, and shipping products that matter.',
    'Delhi, India',
    'gagangulyani',
    'https://linkedin.com/in/gagan-gulyani',
    'GaganGulyani',
    'https://gagangulyani.com',
    ARRAY['React', 'Node.js', 'TypeScript', 'Python', 'Community Building'],
    ARRAY['collaboration', 'mentorship'],
    true
  ),
  (
    'priya-sharma',
    'Priya Sharma',
    'Senior Frontend Engineer',
    'Frontend engineer at a Series B startup. Passionate about web performance, design systems, and making the web accessible to everyone.',
    'Gurugram, India',
    'torvalds',
    'https://linkedin.com/in/torvalds',
    NULL,
    NULL,
    ARRAY['React', 'Next.js', 'CSS', 'Web Performance', 'Accessibility'],
    ARRAY['mentorship', 'collaboration'],
    true
  ),
  (
    'arjun-mehta',
    'Arjun Mehta',
    'Backend & DevOps Engineer',
    'Building scalable backend systems and developer tooling. Currently working on distributed systems at a fintech company. Speaker at local meetups.',
    'Noida, India',
    'antirez',
    'https://linkedin.com/in/antirez',
    NULL,
    NULL,
    ARRAY['Go', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
    ARRAY['collaboration', 'full-time'],
    true
  ),
  (
    'divya-kapoor',
    'Divya Kapoor',
    'Mobile Developer',
    'React Native and Flutter developer with 4+ years building mobile apps. Published 3 apps on Play Store with 50k+ combined downloads.',
    'Delhi, India',
    'sindresorhus',
    NULL,
    'sindresorhus',
    NULL,
    ARRAY['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    ARRAY['freelance', 'collaboration'],
    false
  ),
  (
    'rohan-gupta',
    'Rohan Gupta',
    'ML Engineer',
    'Machine learning engineer working on NLP and recommendation systems. MSc Computer Science from IIT Delhi. Open-source contributor to HuggingFace.',
    'Delhi, India',
    'gaearon',
    'https://linkedin.com/in/gaearon',
    NULL,
    NULL,
    ARRAY['Python', 'PyTorch', 'NLP', 'MLOps', 'FastAPI'],
    ARRAY['collaboration', 'mentorship'],
    false
  ),
  (
    'sneha-nair',
    'Sneha Nair',
    'Full-Stack Developer & OSS Contributor',
    'Loves building tools that improve developer productivity. Contributor to several open-source projects. Organiser of the Delhi JavaScript Meetup.',
    'Faridabad, India',
    'yyx990803',
    NULL,
    'youyuxi',
    'https://delhidevs.com',
    ARRAY['Vue.js', 'TypeScript', 'Rust', 'PostgreSQL', 'OSS'],
    ARRAY['full-time', 'mentorship'],
    false
  ),
  (
    'karan-verma',
    'Karan Verma',
    'Security Engineer',
    'Application security engineer, bug bounty hunter, and CTF player. Helping startups build secure systems from the ground up.',
    'Ghaziabad, India',
    'nicowillis',
    NULL,
    NULL,
    NULL,
    ARRAY['AppSec', 'Pentesting', 'Python', 'Burp Suite', 'AWS Security'],
    ARRAY['freelance', 'collaboration'],
    false
  ),
  (
    'anjali-singh',
    'Anjali Singh',
    'Product Engineer',
    'Product-minded engineer who cares deeply about user experience. Building at the intersection of design and engineering. Part-time design mentor.',
    'Delhi, India',
    'kentcdodds',
    NULL,
    'kentcdodds',
    'https://delhidevs.com',
    ARRAY['React', 'Figma', 'Product Thinking', 'TypeScript', 'Testing'],
    ARRAY['mentorship', 'collaboration'],
    false
  )
ON CONFLICT (slug) DO NOTHING;
