/*
  # Improve profiles table structure

  1. Changes
    - Set default values for username and name_color
    - Add email column
    - Add updated_at trigger
    - Improve RLS policies
    - Add performance indexes

  2. Security
    - Enable RLS
    - Update policies for better security
    - Ensure proper access control

  3. Performance
    - Add GIN index for username searches
    - Add updated_at timestamp handling
*/

-- First update any null usernames to a default value
UPDATE profiles 
SET username = 'user_' || substr(id::text, 1, 8)
WHERE username IS NULL;

-- Now we can safely alter the column
ALTER TABLE profiles
  ALTER COLUMN username SET NOT NULL,
  ALTER COLUMN name_color SET DEFAULT '#B45309',
  ADD COLUMN IF NOT EXISTS email text;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_profiles_updated_at'
  ) THEN
    CREATE TRIGGER set_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON profiles;

-- Create better policies
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create index for faster username lookups
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS profiles_username_search_idx ON profiles USING gin (username gin_trgm_ops);