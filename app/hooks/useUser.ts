import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User, Session } from "@supabase/supabase-js";

interface UseUserReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export function useUser(): UseUserReturn {
  const { session, isLoading: sessionLoading } = useSessionContext();
  const [authState, setAuthState] = useState<{
    user: User | null;
    session: Session | null;
  }>({
    user: session?.user ?? null,
    session: session,
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Update state when session context changes
    setAuthState({
      user: session?.user ?? null,
      session: session,
    });
  }, [session]);

  useEffect(() => {
    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session: session,
      });
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return {
    user: authState.user,
    session: authState.session,
    isLoading: sessionLoading,
  };
} 