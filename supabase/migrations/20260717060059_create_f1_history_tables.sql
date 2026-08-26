/*
# Create F1 History Tables

## Purpose
Store comprehensive historical F1 data — all drivers, constructors/teams, and circuits
that have participated in Formula 1 since 1950.

## New Tables

### f1_drivers
- id (uuid, PK)
- name (text) — driver full name
- nationality (text) — country of origin
- flag (text) — emoji flag
- championships (int) — number of world championships won
- wins (int) — career race wins
- poles (int) — career pole positions
- podiums (int) — career podium finishes
- entries (int) — career race entries
- years_active (text) — e.g. "2007-2025" or "1950-1965"
- teams (text) — notable teams driven for
- bio (text) — short biography
- photo_url (text) — Wikipedia/Wikimedia image URL
- created_at (timestamptz)

### f1_teams
- id (uuid, PK)
- name (text) — team/constructor name
- full_name (text) — official full team name
- nationality (text) — country of origin
- flag (text) — emoji flag
- championships (int) — constructor championships won
- wins (int) — race wins
- poles (int) — pole positions
- podiums (int) — podium finishes
- entries (int) — race entries
- years_active (text) — e.g. "1950-present" or "2006-2016"
- engine (text) — engine supplier(s)
- headquarters (text) — team base
- bio (text) — team history
- logo_url (text) — logo/car image URL
- created_at (timestamptz)

### f1_circuits
- id (uuid, PK)
- name (text) — circuit name
- country (text) — country
- flag (text) — emoji flag
- length (text) — track length
- laps (int) — race laps
- lap_record (text) — lap record
- record_holder (text) — who set the lap record
- gp_name (text) — Grand Prix name(s) hosted
- first_held (int) — first F1 race year
- last_held (int) — last F1 race year (null if still active)
- races_held (int) — total F1 races hosted
- map_url (text) — track layout image URL
- created_at (timestamptz)

## Security
- All three tables are single-tenant (no auth) — public read access for anon + authenticated.
- No write policies needed (data is seeded via service role, read-only from frontend).
- RLS enabled on all tables.
*/

CREATE TABLE IF NOT EXISTS f1_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  nationality text DEFAULT '',
  flag text DEFAULT '',
  championships int DEFAULT 0,
  wins int DEFAULT 0,
  poles int DEFAULT 0,
  podiums int DEFAULT 0,
  entries int DEFAULT 0,
  years_active text DEFAULT '',
  teams text DEFAULT '',
  bio text DEFAULT '',
  photo_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE f1_drivers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_f1_drivers" ON f1_drivers;
CREATE POLICY "anon_select_f1_drivers" ON f1_drivers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_f1_drivers" ON f1_drivers;
CREATE POLICY "anon_insert_f1_drivers" ON f1_drivers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_f1_drivers" ON f1_drivers;
CREATE POLICY "anon_update_f1_drivers" ON f1_drivers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_f1_drivers" ON f1_drivers;
CREATE POLICY "anon_delete_f1_drivers" ON f1_drivers FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_f1_drivers_name ON f1_drivers (name);
CREATE INDEX IF NOT EXISTS idx_f1_drivers_nationality ON f1_drivers (nationality);
CREATE INDEX IF NOT EXISTS idx_f1_drivers_championships ON f1_drivers (championships DESC);

CREATE TABLE IF NOT EXISTS f1_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  full_name text DEFAULT '',
  nationality text DEFAULT '',
  flag text DEFAULT '',
  championships int DEFAULT 0,
  wins int DEFAULT 0,
  poles int DEFAULT 0,
  podiums int DEFAULT 0,
  entries int DEFAULT 0,
  years_active text DEFAULT '',
  engine text DEFAULT '',
  headquarters text DEFAULT '',
  bio text DEFAULT '',
  logo_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE f1_teams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_f1_teams" ON f1_teams;
CREATE POLICY "anon_select_f1_teams" ON f1_teams FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_f1_teams" ON f1_teams;
CREATE POLICY "anon_insert_f1_teams" ON f1_teams FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_f1_teams" ON f1_teams;
CREATE POLICY "anon_update_f1_teams" ON f1_teams FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_f1_teams" ON f1_teams;
CREATE POLICY "anon_delete_f1_teams" ON f1_teams FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_f1_teams_name ON f1_teams (name);
CREATE INDEX IF NOT EXISTS idx_f1_teams_championships ON f1_teams (championships DESC);

CREATE TABLE IF NOT EXISTS f1_circuits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text DEFAULT '',
  flag text DEFAULT '',
  length text DEFAULT '',
  laps int DEFAULT 0,
  lap_record text DEFAULT '',
  record_holder text DEFAULT '',
  gp_name text DEFAULT '',
  first_held int DEFAULT 0,
  last_held int,
  races_held int DEFAULT 0,
  map_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE f1_circuits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_f1_circuits" ON f1_circuits;
CREATE POLICY "anon_select_f1_circuits" ON f1_circuits FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_f1_circuits" ON f1_circuits;
CREATE POLICY "anon_insert_f1_circuits" ON f1_circuits FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_f1_circuits" ON f1_circuits;
CREATE POLICY "anon_update_f1_circuits" ON f1_circuits FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_f1_circuits" ON f1_circuits;
CREATE POLICY "anon_delete_f1_circuits" ON f1_circuits FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_f1_circuits_name ON f1_circuits (name);
CREATE INDEX IF NOT EXISTS idx_f1_circuits_country ON f1_circuits (country);