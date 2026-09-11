/*
# Create profiles table for user accounts

1. New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users) — one row per auth user
  - `full_name` (text, nullable) — user's display name
  - `email` (text, not null) — copied from auth email at signup
  - `phone` (text, nullable) — user's phone number
  - `avatar_url` (text, nullable) — profile photo URL
  - `created_at` (timestamptz, defaults to now)
  - `updated_at` (timestamptz, defaults to now)

2. Security
- RLS enabled on `profiles`.
- Users can only read, insert, update their own profile row (auth.uid() = id).
- No DELETE policy — profiles are tied to auth accounts and should not be deletable from the client.

3. Notes
- The `id` column matches `auth.users.id` so each profile is 1:1 with an auth account.
- On signup, the frontend inserts a profile row; the RLS INSERT policy ensures users can only create their own profile.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text NOT NULL,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
ON profiles FOR SELECT
TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile"
ON profiles FOR INSERT
TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
ON profiles FOR UPDATE
TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
