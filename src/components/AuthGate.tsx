import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export function AuthGate({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const isLogin = pathname === "/login";

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthed(!!data.session);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (isLogin && authed) {
      navigate({ to: "/", replace: true });
    } else if (!isLogin && !authed) {
      navigate({ to: "/login", replace: true });
    }
  }, [ready, authed, isLogin, navigate]);

  if (!ready) return null;
  if (!isLogin && !authed) return null;
  if (isLogin && authed) return null;
  return <>{children}</>;
}

export function ProtectedOutlet() {
  return (
    <AuthGate>
      <Outlet />
    </AuthGate>
  );
}
