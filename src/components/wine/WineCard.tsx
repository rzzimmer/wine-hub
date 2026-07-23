import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BottleIcon } from "./BottleIcon";
import { BottleRating } from "./BottleRating";
import { WINE_STATUS_LABELS, type Wine } from "@/lib/wine-types";

interface WineCardProps {
  wine: Wine;
  onClick: () => void;
  compareMode?: boolean;
  selected?: boolean;
  selectionDisabled?: boolean;
}

export function WineCard({
  wine,
  onClick,
  compareMode = false,
  selected = false,
  selectionDisabled = false,
}: WineCardProps) {
  const isPerfect = wine.rating === 5;
  return (
    <button
      onClick={onClick}
      disabled={compareMode && selectionDisabled}
      aria-pressed={compareMode ? selected : undefined}
      className={cn(
        "shelf-item group relative flex flex-col items-center rounded-md",
        "bg-gradient-to-b from-card/80 to-card/40 backdrop-blur",
        "border border-border/60 p-4 text-left w-full",
        "hover:border-gold/50",
        isPerfect && !compareMode && "ring-1 ring-gold/40 gold-pulse",
        compareMode && selected && "border-gold/60 ring-2 ring-gold/40",
        compareMode && selectionDisabled && "cursor-not-allowed opacity-40 hover:border-border/60",
      )}
    >
      {compareMode && selected && (
        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-primary-foreground">
          <Check className="h-3.5 w-3.5" aria-hidden />
        </span>
      )}
      <div className="relative flex h-40 w-full items-end justify-center pb-2">
        {wine.imageDataUrl ? (
          <img
            src={wine.imageDataUrl}
            alt={wine.name}
            className="h-40 w-auto max-w-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          />
        ) : (
          <BottleIcon
            filled
            className="h-36 w-auto text-wine drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
          />
        )}
      </div>
      <div className="mt-3 w-full space-y-1">
        <h3 className="font-serif text-lg leading-tight text-foreground line-clamp-2">
          {wine.name}
        </h3>
        <p className="text-xs text-muted-foreground italic line-clamp-1">{wine.winery}</p>
        <div className="flex items-center justify-between pt-2">
          <BottleRating value={wine.rating} readOnly size={12} />
          <span className="text-[10px] uppercase tracking-widest text-gold/80">
            {WINE_STATUS_LABELS[wine.status]}
          </span>
        </div>
      </div>
    </button>
  );
}
