drop policy if exists "Admins can read visitor sessions" on public.visitor_sessions;
create policy "Anyone can read visitor sessions" on public.visitor_sessions
  for select using (true);

drop policy if exists "Admins can read page views" on public.page_views;
create policy "Anyone can read page views" on public.page_views
  for select using (true);

drop policy if exists "Admins can read click events" on public.click_events;
create policy "Anyone can read click events" on public.click_events
  for select using (true);

drop policy if exists "Admins can read section events" on public.section_events;
create policy "Anyone can read section events" on public.section_events
  for select using (true);
