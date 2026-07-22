import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNotes } from "@/hooks/useNotes";
import type { Note } from "@/lib/note-types";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface Props {
  text: string;
  className?: string;
}

/**
 * Renders text and underlines any word/phrase that matches a note's title.
 * Hover/tap the term to see a tooltip with a short excerpt.
 */
export function GlossaryText({ text, className }: Props) {
  const { notes } = useNotes();

  const { regex, byTerm } = useMemo(() => {
    const map = new Map<string, Note>();
    for (const n of notes) {
      if (n.title.trim()) map.set(n.title.trim().toLowerCase(), n);
    }
    if (map.size === 0) return { regex: null as RegExp | null, byTerm: map };
    const terms = [...map.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegex)
      .join("|");
    // \p{L} for unicode letter boundaries (Portuguese)
    const re = new RegExp(`(?<![\\p{L}\\p{N}])(${terms})(?![\\p{L}\\p{N}])`, "giu");
    return { regex: re, byTerm: map };
  }, [notes]);

  if (!text) return null;

  if (!regex) {
    return <span className={className}>{text}</span>;
  }

  const parts: Array<{ text: string; note?: Note }> = [];
  let last = 0;
  for (const match of text.matchAll(regex)) {
    const idx = match.index ?? 0;
    if (idx > last) parts.push({ text: text.slice(last, idx) });
    const note = byTerm.get(match[0].toLowerCase());
    parts.push({ text: match[0], note });
    last = idx + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });

  return (
    <TooltipProvider delayDuration={150}>
      <span className={className}>
        {parts.map((p, i) =>
          p.note ? (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="underline decoration-gold/70 decoration-dotted underline-offset-4 text-gold-soft hover:text-gold focus:outline-none focus:ring-1 focus:ring-gold/60 rounded-sm"
                >
                  {p.text}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs border border-gold/30 bg-card/95 text-foreground font-body shadow-lg backdrop-blur"
              >
                <p className="font-serif text-base text-gold mb-1">{p.note.title}</p>
                <p className="text-xs italic text-foreground/90 line-clamp-6 whitespace-pre-wrap">
                  {p.note.content.slice(0, 220)}
                  {p.note.content.length > 220 ? "…" : ""}
                </p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </span>
    </TooltipProvider>
  );
}
