create table if not exists public.project_views (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.visitor_sessions(id) on delete cascade,
  project_id bigint not null references public.projects(id) on delete cascade,
  page_path text not null,
  duration_seconds int,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create index if not exists idx_project_views_project_id on public.project_views(project_id);
create index if not exists idx_project_views_session_id on public.project_views(session_id);
create index if not exists idx_project_views_started_at on public.project_views(started_at desc);

alter table public.project_views enable row level security;

drop policy if exists "Anyone can insert project views" on public.project_views;
create policy "Anyone can insert project views" on public.project_views for insert with check (true);

drop policy if exists "Admins can read project views" on public.project_views;
create policy "Admins can read project views" on public.project_views for select using (true);