import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Wine Hub" },
      {
        name: "description",
        content: "Acesso à sua adega digital. Entre com e-mail e senha.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setSubmitting(true);
    try {
      if (mode === "signin") {
        await signIn(email.trim(), password);
        navigate({ to: "/", replace: true });
      } else {
        await signUp(email.trim(), password);
        toast.success("Conta criada. Verifique seu e-mail se a confirmação estiver ativa.");
        await signIn(email.trim(), password).catch(() => {});
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha na autenticação";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, oklch(0.42 0.11 350 / 0.18), transparent 55%), radial-gradient(ellipse at 50% 100%, oklch(0.46 0.07 55 / 0.12), transparent 50%), oklch(0.17 0.03 260)",
        }}
      />

      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-gold/70">
            {mode === "signin" ? "Acesso exclusivo" : "Criar conta"}
          </p>
          <h1 className="mt-3 font-serif text-5xl text-foreground md:text-6xl">Wine Hub</h1>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="h-11 border-border/60 bg-card/30 font-body backdrop-blur"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="h-11 border-border/60 bg-card/30 font-body backdrop-blur"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || !email.trim() || !password.trim()}
            className="mt-2 h-11 w-full text-[11px] uppercase tracking-[0.3em]"
          >
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>

          <button
            type="button"
            onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
            className="mx-auto block text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-gold"
          >
            {mode === "signin" ? "Criar uma conta" : "Já tenho conta — entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
