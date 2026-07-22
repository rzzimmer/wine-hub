import { Link } from "@tanstack/react-router";
import { BookOpen, Wine } from "lucide-react";

export function SiteNav() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-center gap-1 px-4 pt-6">
      <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="group flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-to-b data-[status=active]:from-gold/20 data-[status=active]:to-transparent data-[status=active]:text-gold"
        >
          <Wine className="h-3.5 w-3.5" />
          Estante
        </Link>
        <Link
          to="/notes"
          className="group flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-to-b data-[status=active]:from-gold/20 data-[status=active]:to-transparent data-[status=active]:text-gold"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Anotações
        </Link>
      </div>
    </nav>
  );
}
