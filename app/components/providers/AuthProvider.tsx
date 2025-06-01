"use client";

import type { Session } from "@supabase/supabase-js";

interface AuthProviderProps {
  children: React.ReactNode;
  initialSession: Session | null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>;
} 