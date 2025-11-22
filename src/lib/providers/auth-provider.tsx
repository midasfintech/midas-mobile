import { Session } from "@supabase/supabase-js";
import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";

export type AuthContextData = {
  session: Session | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({
  session: null,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  const authContext: AuthContextData = useMemo(
    () => ({
      session,
      signOut,
    }),
    [session, signOut],
  );

  return <AuthContext value={authContext}>{children}</AuthContext>;
}

export const useAuthContext = () => use(AuthContext);