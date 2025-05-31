import { useSessionContext } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import type { User, Session } from "@supabase/supabase-js";

interface UseUserReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export function useUser(): UseUserReturn {
  const { session, isLoading: sessionLoading } = useSessionContext();
  
  // Use SWR to cache and sync the user/session state
  const { data: sessionData, isLoading: swrLoading } = useSWR(
    'session',
    () => session,
    {
      fallbackData: session,
      revalidateOnFocus: false,
    }
  );

  return {
    user: sessionData?.user ?? null,
    session: sessionData,
    isLoading: sessionLoading || swrLoading,
  };
} 