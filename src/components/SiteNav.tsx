import { Link } from "@tanstack/react-router";
import { BarChart3, BookOpen, Users, Wine, Lightbulb } from "lucide-react";

export function SiteNav() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-center gap-1 px-2 pt-6 sm:px-4">
      <div className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur sm:gap-1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-to-b data-[status=active]:from-gold/20 data-[status=active]:to-transparent data-[status=active]:text-gold sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.25em]"
        >
          <Wine className="h-3.5 w-3.5" />
          Estante
        </Link>
        <Link
          to="/notes"
          className="group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-to-b data-[status=active]:from-gold/20 data-[status=active]:to-transparent data-[status=active]:text-gold sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.25em]"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Anotações
        </Link>
        <Link
          to="/stats"
          className="group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-to-b data-[status=active]:from-gold/20 data-[status=active]:to-transparent data-[status=active]:text-gold sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.25em]"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          Estatísticas
        </Link>
        <Link
          to="/social"
          className="group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-to-b data-[status=active]:from-gold/20 data-[status=active]:to-transparent data-[status=active]:text-gold sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.25em]"
        >
          <Users className="h-3.5 w-3.5" />
          Amizades
        </Link>
        <Link
          to="/sugestoes"
          className="group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-to-b data-[status=active]:from-gold/20 data-[status=active]:to-transparent data-[status=active]:text-gold sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.25em]"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          Sugestões
        </Link>
      </div>
    </nav>
  );
}
