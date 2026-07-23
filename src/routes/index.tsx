import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GitCompare, X } from "lucide-react";
import { toast } from "sonner";
import { useWines } from "@/hooks/useWines";
import { WineShelf } from "@/components/wine/WineShelf";
import { EmptyShelf } from "@/components/wine/EmptyShelf";
import { AddWineFab } from "@/components/wine/AddWineFab";
import { WineFormDialog } from "@/components/wine/WineFormDialog";
import { WineDetailDialog } from "@/components/wine/WineDetailDialog";
import { WineCompareDialog } from "@/components/wine/WineCompareDialog";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import type { Wine, WineInput } from "@/lib/wine-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wine Hub — Sua adega pessoal" },
      {
        name: "description",
        content:
          "Registre, avalie e explore sua jornada pelos vinhos. Uma adega digital com estética vintage para colecionadores e curiosos.",
      },
      { property: "og:title", content: "Wine Hub — Sua adega pessoal" },
      {
        property: "og:description",
        content: "Registre, avalie e explore sua jornada pelos vinhos. Uma adega digital com estética vintage para colecionadores e curiosos.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { wines, hydrated, addWine, updateWine, removeWine } = useWines();
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Wine | null>(null);
  const [editing, setEditing] = useState<Wine | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const compareWines = useMemo(() => {
    if (compareIds.length !== 2) return null;
    const first = wines.find((w) => w.id === compareIds[0]);
    const second = wines.find((w) => w.id === compareIds[1]);
    if (!first || !second) return null;
    return [first, second] as [Wine, Wine];
  }, [compareIds, wines]);

  function exitCompareMode() {
    setCompareMode(false);
    setCompareIds([]);
    setCompareOpen(false);
  }

  function startCompareMode() {
    if (wines.length < 2) {
      toast("Adicione pelo menos dois vinhos para comparar");
      return;
    }
    setCompareMode(true);
    setCompareIds([]);
    setSelected(null);
  }

  function toggleCompareSelection(wine: Wine) {
    if (!compareMode) {
      setSelected(wine);
      return;
    }

    setCompareIds((prev) => {
      if (prev.includes(wine.id)) return prev.filter((id) => id !== wine.id);
      if (prev.length >= 2) return prev;
      return [...prev, wine.id];
    });
  }

  function openCompareDialog() {
    if (compareIds.length !== 2) return;
    setCompareOpen(true);
  }

  function handleSubmit(data: WineInput) {
    if (editing) {
      updateWine(editing.id, data);
      toast.success("Vinho atualizado");
    } else {
      addWine(data);
      if (data.rating === 5) {
        toast.success("Uma joia entrou na sua adega ✨", {
          className: "animate-wine-glow",
        });
      } else {
        toast.success("Vinho adicionado à adega");
      }
    }
    setFormOpen(false);
    setEditing(null);
    setSelected(null);
  }

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit() {
    if (!selected) return;
    setEditing(selected);
    setSelected(null);
    setFormOpen(true);
  }

  function handleDelete() {
    if (!selected) return;
    removeWine(selected.id);
    toast("Garrafa removida da adega");
    setSelected(null);
  }

  return (
    <div className="min-h-screen">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, oklch(0.42 0.11 350 / 0.15), transparent 50%), radial-gradient(ellipse at 80% 100%, oklch(0.46 0.07 55 / 0.15), transparent 50%)",
        }}
      />

      <SiteNav />

      <header className="mx-auto max-w-6xl px-5 pt-6 pb-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold/80">Wine Hub</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-foreground">
          A sua adega
        </h1>
        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        {hydrated && wines.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground italic">
            {wines.length} {wines.length === 1 ? "garrafa registrada" : "garrafas registradas"}
          </p>
        )}
        {hydrated && wines.length >= 2 && !compareMode && (
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={startCompareMode}
              className="gap-1.5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-gold"
            >
              <GitCompare className="h-3.5 w-3.5" />
              Comparar Vinhos
            </Button>
          </div>
        )}
      </header>

      {compareMode && (
        <div className="sticky top-0 z-20 border-b border-gold/20 bg-background/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gold/90">
              Selecione 2 vinhos · {compareIds.length}/2
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={openCompareDialog}
                disabled={compareIds.length !== 2}
                className="text-[11px] uppercase tracking-wider"
              >
                Comparar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={exitCompareMode}
                aria-label="Cancelar comparação"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-32">
        {!hydrated ? null : wines.length === 0 ? (
          <EmptyShelf />
        ) : (
          <WineShelf
            wines={wines}
            onSelect={toggleCompareSelection}
            compareMode={compareMode}
            selectedIds={compareIds}
          />
        )}
      </main>

      <AddWineFab onClick={openNew} />

      <WineFormDialog
        open={formOpen}
        onOpenChange={(o) => {
          setFormOpen(o);
          if (!o) setEditing(null);
        }}
        onSubmit={handleSubmit}
        initial={editing}
      />

      <WineDetailDialog
        wine={compareMode ? null : selected}
        onOpenChange={(o) => !o && setSelected(null)}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <WineCompareDialog
        wines={compareWines}
        open={compareOpen}
        onOpenChange={(open) => {
          setCompareOpen(open);
          if (!open) exitCompareMode();
        }}
      />
    </div>
  );
}
