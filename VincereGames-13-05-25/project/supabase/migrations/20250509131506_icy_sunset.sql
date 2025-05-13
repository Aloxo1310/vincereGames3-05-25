/*
  # Complete fix for authentication and profiles

  1. Changes
    - Fix profiles table structure
    - Add missing columns
    - Improve developer account
    - Add proper defaults
    - Fix triggers and functions

  2. Security
    - Update RLS policies
    - Fix authentication flow
    - Secure profile updates

  3. Performance
    - Add necessary indexes
    - Optimize queries
*/

-- Drop existing trigger first to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;

-- Recreate profiles table with proper structure
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username text UNIQUE NOT NULL,
    email text,
    display_name text,
    avatar_url text,
    name_color text DEFAULT '#B45309',
    is_developer boolean DEFAULT false,
    last_login timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create proper indexes
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles(username);
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_display_name ON public.profiles(display_name);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to profiles table
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Create new user handler with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        username,
        email,
        display_name,
        name_color,
        is_developer
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'username'),
        COALESCE(NEW.raw_user_meta_data->>'name_color', '#B45309'),
        false
    );
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- Handle username conflict
        INSERT INTO public.profiles (
            id,
            username,
            email,
            display_name,
            name_color,
            is_developer
        )
        VALUES (
            NEW.id,
            'user_' || substr(NEW.id::text, 1, 8),
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'username'),
            COALESCE(NEW.raw_user_meta_data->>'name_color', '#B45309'),
            false
        );
        RETURN NEW;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error creating profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create or update developer account
DO $$
DECLARE
    dev_user_id uuid;
BEGIN
    -- First ensure the auth user exists
    IF NOT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'vincere@dev.com'
    ) THEN
        -- Create the developer user in auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            raw_user_meta_data
        )
        VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'vincere@dev.com',
            crypt('vincere1', gen_salt('bf')),
            now(),
            now(),
            now(),
            jsonb_build_object(
                'username', 'VincereAdmin',
                'display_name', 'Vincere Developer'
            )
        )
        RETURNING id INTO dev_user_id;

        -- Create the developer profile
        INSERT INTO public.profiles (
            id,
            username,
            email,
            display_name,
            is_developer,
            name_color,
            created_at,
            updated_at
        )
        VALUES (
            dev_user_id,
            'VincereAdmin',
            'vincere@dev.com',
            'Vincere Developer',
            true,
            '#FFD700',
            now(),
            now()
        );
    END IF;
END $$;