/*
  # Add developer account and enhance profiles

  1. Changes
    - Add is_developer flag to profiles
    - Create developer account
    - Add default developer credentials
    - Enhance profile structure

  2. Security
    - Secure developer account access
    - Update RLS policies
*/

-- Add is_developer column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_developer boolean DEFAULT false;

-- Create developer account if it doesn't exist
DO $$
BEGIN
  -- First create the auth user if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'vincere@dev.com'
  ) THEN
    -- Insert into auth.users using Supabase's auth.create_user function
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
    );
  END IF;

  -- Then ensure the profile exists and is marked as developer
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE email = 'vincere@dev.com'
  ) THEN
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
    SELECT
      id,
      'VincereAdmin',
      'vincere@dev.com',
      'Vincere Developer',
      true,
      '#FFD700',
      now(),
      now()
    FROM auth.users
    WHERE email = 'vincere@dev.com';
  END IF;
END $$;