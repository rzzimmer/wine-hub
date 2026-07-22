import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Focus, X, ChevronLeft, Search } from "lucide-react";
import { useNotes } from "@/hooks/useNotes";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { Note } from "@/lib/note-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Anotações — Wine Hub" },
      {
        name: "description",
        content:
          "Centro de conhecimento: registre termos, uvas e conceitos do universo do vinho. Um bloco de notas serifado, imersivo e conectado à sua adega.",
      },
      { property: "og:title", content: "Anotações — Wine Hub" },
      {
        property: "og:description",
        content: "Seu caderno vintage de estudos sobre vinho.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const { notes, hydrated, addNote, updateNote, removeNote } = useNotes();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [notes, query]);

  const selected = notes.find((n) => n.id === selectedId) ?? null;

  useEffect(() => {
    if (!focus) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFocus(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus]);

  function createNew() {
    const note = addNote({ title: "Nova anotação", content: "", tags: [] });
    setSelectedId(note.id);
    setFocus(false);
  }

  function handleDelete(id: string) {
    removeNote(id);
    if (selectedId === id) setSelectedId(null);
    toast("Anotação removida");
  }

  if (selected && focus) {
    return (
      <FocusEditor
        note={selected}
        onChange={(patch) => updateNote(selected.id, patch)}
        onExit={() => setFocus(false)}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, oklch(0.42 0.11 350 / 0.14), transparent 55%), radial-gradient(ellipse at 10% 100%, oklch(0.46 0.07 55 / 0.14), transparent 55%)",
        }}
      />
      <SiteNav />

      <header className="mx-auto max-w-6xl px-5 pt-6 pb-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold/80">Centro de Conhecimento</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-foreground">
          Suas anotações
        </h1>
        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 pb-24 md:grid-cols-[320px_1fr]">
        <aside className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar termo, tag..."
              className="pl-9 font-body"
            />
          </div>
          <Button onClick={createNew} className="w-full gap-2">
            <Plus className="h-4 w-4" /> Nova anotação
          </Button>

          <ul className="space-y-2">
            {hydrated && filtered.length === 0 && (
              <li className="rounded-md border border-dashed border-border/60 p-6 text-center text-sm italic text-muted-foreground">
                {notes.length === 0
                  ? "Seu caderno está em branco. Comece com um termo — uva, região, tanino..."
                  : "Nenhuma anotação corresponde à busca."}
              </li>
            )}
            {filtered.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setSelectedId(n.id)}
                  className={cn(
                    "group w-full rounded-md border p-3 text-left transition-colors",
                    selectedId === n.id
                      ? "border-gold/50 bg-card/80"
                      : "border-border/60 bg-card/40 hover:border-gold/30 hover:bg-card/60",
                  )}
                >
                  <div className="font-serif text-lg leading-tight text-foreground line-clamp-1">
                    {n.title || "Sem título"}
                  </div>
                  <div className="mt-1 text-xs italic text-muted-foreground line-clamp-2">
                    {n.content || "Vazio"}
                  </div>
                  {n.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {n.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">
                          #{t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section>
          {selected ? (
            <NoteEditor
              note={selected}
              onChange={(patch) => updateNote(selected.id, patch)}
              onDelete={() => handleDelete(selected.id)}
              onFocus={() => setFocus(true)}
            />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-md border border-dashed border-border/60 bg-card/30 p-10 text-center">
              <p className="font-serif text-xl italic text-muted-foreground">
                Selecione uma anotação ou crie uma nova para começar.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

interface EditorProps {
  note: Note;
  onChange: (patch: Partial<Note>) => void;
  onDelete: () => void;
  onFocus: () => void;
}

function NoteEditor({ note, onChange, onDelete, onFocus }: EditorProps) {
  const [tagDraft, setTagDraft] = useState("");

  function commitTag() {
    const t = tagDraft.trim().replace(/^#/, "");
    if (!t) return;
    if (note.tags.includes(t)) {
      setTagDraft("");
      return;
    }
    onChange({ tags: [...note.tags, t] });
    setTagDraft("");
  }

  function removeTag(t: string) {
    onChange({ tags: note.tags.filter((x) => x !== t) });
  }

  return (
    <article className="space-y-4 rounded-md border border-border/60 bg-card/50 p-5 md:p-7 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <Input
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Título do termo"
          className="font-serif text-2xl md:text-3xl h-auto border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
        />
        <div className="flex shrink-0 items-center gap-1">
          <Button size="sm" variant="outline" onClick={onFocus} className="gap-1">
            <Focus className="h-4 w-4" /> Foco
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete} aria-label="Excluir">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {note.tags.map((t) => (
          <Badge
            key={t}
            variant="secondary"
            className="cursor-pointer gap-1"
            onClick={() => removeTag(t)}
          >
            #{t}
            <X className="h-3 w-3" />
          </Badge>
        ))}
        <Input
          value={tagDraft}
          onChange={(e) => setTagDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commitTag();
            }
          }}
          onBlur={commitTag}
          placeholder="+ tag"
          className="h-7 w-28 border-dashed text-xs"
        />
      </div>

      <Textarea
        value={note.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Escreva livremente..."
        className="min-h-[320px] resize-y border-border/40 bg-background/40 font-serif text-lg leading-relaxed"
      />
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
        Salvamento automático · atualizado {new Date(note.updatedAt).toLocaleString("pt-BR")}
      </p>
    </article>
  );
}

function FocusEditor({
  note,
  onChange,
  onExit,
}: {
  note: Note;
  onChange: (patch: Partial<Note>) => void;
  onExit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.46 0.07 55 / 0.10), transparent 60%)",
        }}
      />
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-sm">
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4" /> Sair do foco
        </button>
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold/70">
          Modo Foco
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-2xl px-6 pb-32 pt-8">
        <Input
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Título"
          className="mb-6 h-auto border-0 bg-transparent px-0 text-center font-serif text-4xl md:text-5xl shadow-none focus-visible:ring-0"
        />
        <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <Textarea
          value={note.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Deixe as ideias fluírem..."
          className="min-h-[70vh] resize-none border-0 bg-transparent px-0 font-serif text-xl md:text-2xl leading-[1.8] shadow-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
