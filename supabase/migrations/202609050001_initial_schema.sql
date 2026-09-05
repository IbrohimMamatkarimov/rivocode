-- RivoCode's first application tables.
-- Run this in Supabase Dashboard -> SQL Editor -> New query.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  editor_code text,
  last_opened_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  daily_reminders boolean not null default true,
  weekly_summary boolean not null default true,
  product_updates boolean not null default false,
  daily_goal_reminders boolean not null default true,
  auto_run_code boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.user_settings enable row level security;

create policy "profiles are readable by their owner"
  on public.profiles for select using ((select auth.uid()) = id);
create policy "profiles are editable by their owner"
  on public.profiles for update using ((select auth.uid()) = id);

create policy "progress is readable by its owner"
  on public.lesson_progress for select using ((select auth.uid()) = user_id);
create policy "progress is created by its owner"
  on public.lesson_progress for insert with check ((select auth.uid()) = user_id);
create policy "progress is editable by its owner"
  on public.lesson_progress for update using ((select auth.uid()) = user_id);
create policy "progress is removable by its owner"
  on public.lesson_progress for delete using ((select auth.uid()) = user_id);

create policy "settings are readable by their owner"
  on public.user_settings for select using ((select auth.uid()) = user_id);
create policy "settings are created by their owner"
  on public.user_settings for insert with check ((select auth.uid()) = user_id);
create policy "settings are editable by their owner"
  on public.user_settings for update using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  );
  insert into public.user_settings (user_id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists settings_set_updated_at on public.user_settings;
create trigger settings_set_updated_at
  before update on public.user_settings
  for each row execute procedure public.set_updated_at();
