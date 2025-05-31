"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/supabase-js";

interface AuthProviderProps {
  children: React.ReactNode;
  initialSession: Session | null;
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
  const supabase = createClientComponentClient();

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
} 