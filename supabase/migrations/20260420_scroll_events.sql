create table if not exists public.scroll_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.visitor_sessions(id) on delete cascade,
  page_path text not null,
  scroll_depth int not null check (scroll_depth between 0 and 100),
  occurred_at timestamptz not null default now()
);

create index if not exists idx_scroll_events_occurred_at on public.scroll_events(occurred_at desc);
create index if not exists idx_scroll_events_session_id on public.scroll_events(session_id);
create index if not exists idx_scroll_events_page_path on public.scroll_events(page_path);

alter table public.scroll_events enable row level security;

drop policy if exists "Anyone can insert scroll events" on public.scroll_events;
create policy "Anyone can insert scroll events" on public.scroll_events for insert with check (true);

drop policy if exists "Admins can read scroll events" on public.scroll_events;
create policy "Admins can read scroll events" on public.scroll_events for select using (true);