create type public.process_role as enum ('Admin', 'Author', 'Reviewer', 'Approver', 'Viewer');
create type public.process_status as enum ('Draft', 'In review', 'Approved', 'Archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role public.process_role not null default 'Viewer',
  region text check (region in ('Austria', 'Spain', 'Singapore', 'Global')) default 'Global',
  created_at timestamptz not null default now()
);

create table public.processes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  owner_team text not null,
  region text check (region in ('Austria', 'Spain', 'Singapore', 'Global')) default 'Global',
  status public.process_status not null default 'Draft',
  current_version_id uuid,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.process_versions (
  id uuid primary key default gen_random_uuid(),
  process_id uuid not null references public.processes(id) on delete cascade,
  version_label text not null,
  status public.process_status not null default 'Draft',
  sections jsonb not null,
  mermaid_chart text,
  ai_generated boolean not null default false,
  created_by uuid not null references public.profiles(id),
  reviewed_by uuid references public.profiles(id),
  approved_by uuid references public.profiles(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (process_id, version_label)
);

create table public.attachments (
  id uuid primary key default gen_random_uuid(),
  process_version_id uuid not null references public.process_versions(id) on delete cascade,
  file_name text not null,
  file_type text not null,
  storage_path text,
  external_url text,
  uploaded_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  check ((storage_path is not null) or (external_url is not null))
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  process_id uuid references public.processes(id),
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.processes enable row level security;
alter table public.process_versions enable row level security;
alter table public.attachments enable row level security;
alter table public.audit_events enable row level security;

create policy "internal users can read approved processes" on public.processes
  for select using (status = 'Approved' or auth.uid() = created_by);

create policy "authors can create processes" on public.processes
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('Admin', 'Author'))
  );

create policy "approved versions are readable" on public.process_versions
  for select using (status = 'Approved' or auth.uid() = created_by);

create policy "approvers can approve versions" on public.process_versions
  for update using (
    status <> 'Approved'
    and exists (select 1 from public.profiles where id = auth.uid() and role in ('Admin', 'Approver'))
  );
