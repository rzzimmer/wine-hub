import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { isAuthenticated } from "@/lib/auth";

export function AuthGate({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const isLogin = pathname === "/login";

  useEffect(() => {
    const authed = isAuthenticated();

    if (isLogin) {
      if (authed) {
        navigate({ to: "/", replace: true });
        return;
      }
      setReady(true);
      return;
    }

    if (!authed) {
      navigate({ to: "/login", replace: true });
      return;
    }

    setReady(true);
  }, [isLogin, navigate, pathname]);

  if (!ready) return null;
  return <>{children}</>;
}

export function ProtectedOutlet() {
  return (
    <AuthGate>
      <Outlet />
    </AuthGate>
  );
}
