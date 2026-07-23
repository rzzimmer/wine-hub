import { useMemo } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { BottleIcon } from "@/components/wine/BottleIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWines } from "@/hooks/useWines";
import type { WineSuggestion } from "@/lib/suggestion-types";
import { cn } from "@/lib/utils";

function highlightTags(text: string) {
  const parts = text.split(/(#\S+)/g);
  return parts.map((part, index) =>
    part.startsWith("#") ? (
      <span key={index} className="text-gold/90">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

interface Props {
  suggestion: WineSuggestion;
  added: boolean;
  onAdd: () => void;
}

export function SuggestionCard({ suggestion, added, onAdd }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-border/60 bg-card/40 backdrop-blur sm:flex-row">
      <div className="flex shrink-0 items-end justify-center bg-card/20 px-6 py-5 sm:w-40 md:w-44">
        {suggestion.imageDataUrl ? (
          <img
            src={suggestion.imageDataUrl}
            alt={suggestion.name}
            className="max-h-36 w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
          />
        ) : (
          <BottleIcon
            filled
            className="h-32 w-auto text-wine drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 md:p-6">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-accent-foreground/80">
            <Sparkles className="h-3 w-3 text-gold/80" aria-hidden />
            Rótulo recomendado
          </div>
          <h2 className="font-serif text-2xl leading-tight text-foreground">{suggestion.name}</h2>
          <p className="mt-1 text-sm italic text-muted-foreground">{suggestion.winery}</p>
        </div>

        <div className="rounded-md border border-border/40 bg-background/30 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Por que estamos sugerindo:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {highlightTags(suggestion.reason)}
          </p>
          {suggestion.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {suggestion.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={onAdd}
          disabled={added}
          variant={added ? "secondary" : "default"}
          className={cn(
            "w-full text-[11px] uppercase tracking-[0.25em] sm:w-auto sm:self-start",
            !added && "border border-gold/20 bg-gradient-to-r from-gold/90 to-primary hover:from-gold hover:to-primary/90",
          )}
        >
          {added ? "Na Wishlist" : "Adicionar à Wishlist"}
        </Button>
      </div>
    </article>
  );
}

export function useSuggestionWishlist() {
  const { wines, addWine } = useWines();

  const wishlistNames = useMemo(
    () =>
      new Set(
        wines.filter((w) => w.status === "wishlist").map((w) => `${w.name}::${w.winery}`.toLowerCase()),
      ),
    [wines],
  );

  function addToWishlist(suggestion: WineSuggestion) {
    const key = `${suggestion.name}::${suggestion.winery}`.toLowerCase();
    if (wishlistNames.has(key)) {
      toast("Este rótulo já está na sua Wishlist");
      return false;
    }

    addWine({
      name: suggestion.name,
      winery: suggestion.winery,
      imageDataUrl: suggestion.imageDataUrl,
      status: "wishlist",
      rating: 0,
      tags: [...new Set([...suggestion.tags, "wishlist"])],
    });
    toast.success(`${suggestion.name} adicionado à Wishlist`);
    return true;
  }

  function isInWishlist(suggestion: WineSuggestion) {
    return wishlistNames.has(`${suggestion.name}::${suggestion.winery}`.toLowerCase());
  }

  return { addToWishlist, isInWishlist };
}
