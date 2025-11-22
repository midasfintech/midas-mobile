import { Session } from "@supabase/supabase-js";
import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";

export type AuthContextData = {
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({
  session: null,
  isLoading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const authContext: AuthContextData = useMemo(
    () => ({
      session,
      isLoading,
      signOut,
    }),
    [session, isLoading, signOut],
  );

  return <AuthContext value={authContext}>{children}</AuthContext>;
}

export const useAuthContext = () => use(AuthContext);