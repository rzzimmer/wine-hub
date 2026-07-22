import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useWines } from "@/hooks/useWines";
import { WineShelf } from "@/components/wine/WineShelf";
import { EmptyShelf } from "@/components/wine/EmptyShelf";
import { AddWineFab } from "@/components/wine/AddWineFab";
import { WineFormDialog } from "@/components/wine/WineFormDialog";
import { WineDetailDialog } from "@/components/wine/WineDetailDialog";
import { SiteNav } from "@/components/SiteNav";
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
        content: "Sua adega digital: registre garrafas, harmonizações e memórias.",
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

      <header className="mx-auto max-w-6xl px-5 pt-10 pb-6 text-center">
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
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-32">
        {!hydrated ? null : wines.length === 0 ? (
          <EmptyShelf />
        ) : (
          <WineShelf wines={wines} onSelect={setSelected} />
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
        wine={selected}
        onOpenChange={(o) => !o && setSelected(null)}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
