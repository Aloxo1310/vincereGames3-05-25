import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string, username: string) {
  try {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      return { error: new Error('Username already taken') };
    }

    // Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: username
        }
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    // Wait for profile creation
    if (data.user) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify profile was created
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        throw new Error('Error creating user profile');
      }
      
      return { data: { ...data, profile }, error: null };
    }

    return { data, error: null };
  } catch (error) {
    return { error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    // Update last login time and fetch profile
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id)
        .select()
        .single();

      if (profileError) {
        throw profileError;
      }

      return { data: { ...data, profile }, error: null };
    }

    return { data, error: null };
  } catch (error) {
    return { error };
  }
}

export async function getProfile() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw userError || new Error('No authenticated user');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error) {
    return { error };
  }
}

export async function updateProfile(updates: {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  email?: string;
  name_color?: string;
}) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw userError || new Error('No authenticated user');
    }

    // Check if username is being updated and is unique
    if (updates.username) {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', updates.username)
        .neq('id', user.id)
        .single();

      if (existingUser) {
        throw new Error('Username already taken');
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }

    // Update auth metadata if username or email is changed
    if (updates.username || updates.email) {
      const { error: updateError } = await supabase.auth.updateUser({
        email: updates.email,
        data: updates.username ? { username: updates.username } : undefined
      });

      if (updateError) {
        throw updateError;
      }
    }
    
    return { data, error: null };
  } catch (error) {
    return { error };
  }
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function uploadAvatar(file: File) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw userError || new Error('No authenticated user');
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    
    return { data: urlData.publicUrl, error: null };
  } catch (error) {
    return { error };
  }
}

export async function changePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      throw error;
    }

    return { data: null, error: null };
  } catch (error) {
    return { error };
  }
}

export async function createWikiArticle(title: string, content: string, category: string) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { error: userError || new Error('User not found') };
    }

    const { data, error } = await supabase
      .from('wiki_articles')
      .insert([
        {
          title,
          content,
          category,
          author_id: user.id
        }
      ])
      .select()
      .single();

    return { data, error };
  } catch (error) {
    return { error };
  }
}