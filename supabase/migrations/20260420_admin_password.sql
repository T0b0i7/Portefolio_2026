drop table if exists public.admin_access cascade;

create table public.admin_access (
  id uuid primary key default gen_random_uuid(),
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_access enable row level security;

drop policy if exists "Anyone can verify admin password" on public.admin_access;
create policy "Anyone can verify admin password" on public.admin_access
  for select using (true);

insert into public.admin_access (password_hash) 
values (crypt('0157002427', gen_salt('bf')));

drop function if exists public.verify_admin_password;
create or replace function public.verify_admin_password(input_password text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 
    from public.admin_access 
    where password_hash = crypt(input_password, password_hash)
  );
$$;