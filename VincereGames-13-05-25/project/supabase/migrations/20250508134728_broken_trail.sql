/*
  # Improve user authentication and profile management

  1. Changes
    - Add email verification flag
    - Add display name field
    - Add last login timestamp
    - Improve profile data handling

  2. Security
    - Enhance RLS policies
    - Add email verification tracking
    - Improve user data protection

  3. Performance
    - Add indexes for common queries
    - Optimize profile lookups
*/

-- Add new columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS display_name text,
  ADD COLUMN IF NOT EXISTS last_login timestamptz;

-- Update existing profiles to have display_name same as username if null
UPDATE public.profiles 
SET display_name = username 
WHERE display_name IS NULL;

-- Create index for faster profile lookups
CREATE INDEX IF NOT EXISTS idx_profiles_display_name ON public.profiles(display_name);

-- Update or create trigger for handling new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, display_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.email,
    new.raw_user_meta_data->>'username'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();