import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { Profile } from "@/lib/supabase/types";

interface UseUserReturn {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  canModerate: boolean;
  isAdmin: boolean;
}

export function useUser(): UseUserReturn {
  const [authState, setAuthState] = useState<{
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    isLoading: boolean;
  }>({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
  });

  useEffect(() => {
    // Get initial session
    async function getInitialSession() {
      const { data: { session } } = await supabase.auth.getSession();
      
      let profile: Profile | null = null;
      if (session?.user) {
        // Fetch user profile with role
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        profile = profileData;
      }
      
      setAuthState({
        user: session?.user ?? null,
        session: session,
        profile: profile,
        isLoading: false,
      });
    }
    getInitialSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      let profile: Profile | null = null;
      if (session?.user) {
        // Fetch user profile with role
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        profile = profileData;
      }
      
      setAuthState({
        user: session?.user ?? null,
        session: session,
        profile: profile,
        isLoading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const canModerate = authState.profile?.role === 'moderator' || authState.profile?.role === 'admin';
  const isAdmin = authState.profile?.role === 'admin';

  return {
    user: authState.user,
    session: authState.session,
    profile: authState.profile,
    isLoading: authState.isLoading,
    canModerate,
    isAdmin,
  };
} 