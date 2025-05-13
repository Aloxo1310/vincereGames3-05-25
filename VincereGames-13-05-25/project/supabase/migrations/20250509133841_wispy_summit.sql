/*
  # Add test user account

  1. Changes
    - Create test user account if it doesn't exist
    - Create or update profile for test user
    - Handle existing profile gracefully

  2. Security
    - Ensure proper user creation
    - Maintain data integrity
*/

DO $$
DECLARE
    test_user_id uuid;
BEGIN
    -- Create test user if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM auth.users WHERE email = 'vincere@gmail.com'
    ) THEN
        -- Create the test user in auth.users
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
            'vincere@gmail.com',
            crypt('vincere1', gen_salt('bf')),
            now(),
            now(),
            now(),
            jsonb_build_object(
                'username', 'vincere_prueba',
                'display_name', 'Vincere Prueba'
            )
        )
        RETURNING id INTO test_user_id;

        -- Create the profile only if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM public.profiles WHERE email = 'vincere@gmail.com'
        ) THEN
            INSERT INTO public.profiles (
                id,
                username,
                email,
                display_name,
                name_color,
                created_at,
                updated_at
            )
            VALUES (
                test_user_id,
                'vincere_prueba',
                'vincere@gmail.com',
                'Vincere Prueba',
                '#B45309',
                now(),
                now()
            );
        END IF;
    END IF;
END $$;