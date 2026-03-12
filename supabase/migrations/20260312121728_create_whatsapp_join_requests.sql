create table whatsapp_join_requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  mobile text not null,
  linkedin text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table whatsapp_join_requests enable row level security;

-- Allow anyone (anon) to insert a row
create policy "allow public insert"
  on whatsapp_join_requests
  for insert
  to anon
  with check (true);
