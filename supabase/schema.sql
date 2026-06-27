-- ============================================================
-- Kaebon Lead Konfigurator — Supabase Schema
-- Ausführen im Supabase SQL Editor
-- ============================================================

create table if not exists boat_models (
  id              text primary key,
  name            text not null,
  short_name      text not null,
  poster_desktop  text,
  poster_mobile   text,
  video_desktop   text,
  video_mobile    text,
  sort_order      int  not null default 0,
  active          boolean not null default true
);

create table if not exists motor_options (
  id          text primary key,
  label       text not null,
  description text,
  image_url   text,
  sort_order  int  not null default 0,
  active      boolean not null default true
);

create table if not exists color_options (
  id          text primary key,
  label       text not null,
  hex         text not null,
  sort_order  int  not null default 0,
  active      boolean not null default true
);

create table if not exists extra_options (
  id                text primary key,
  label             text not null,
  description       text,
  image_url         text,
  requires_extra_id text references extra_options(id),
  sort_order        int  not null default 0,
  active            boolean not null default true
);

create table if not exists polster_options (
  id          text primary key,
  label       text not null,
  sort_order  int  not null default 0,
  active      boolean not null default true
);

create table if not exists polster_farbe_options (
  id          text primary key,
  label       text not null,
  hex         text not null,
  image_url   text,
  sort_order  int  not null default 0,
  active      boolean not null default true
);

-- Public read access (anon key can read)
alter table boat_models          enable row level security;
alter table motor_options        enable row level security;
alter table color_options        enable row level security;
alter table extra_options        enable row level security;
alter table polster_options      enable row level security;
alter table polster_farbe_options enable row level security;

create policy "Public read" on boat_models            for select using (true);
create policy "Public read" on motor_options         for select using (true);
create policy "Public read" on color_options         for select using (true);
create policy "Public read" on extra_options         for select using (true);
create policy "Public read" on polster_options       for select using (true);
create policy "Public read" on polster_farbe_options for select using (true);
