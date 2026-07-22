import { cn } from "@/lib/utils";
import { BottleIcon } from "./BottleIcon";
import { BottleRating } from "./BottleRating";
import { WINE_STATUS_LABELS, type Wine } from "@/lib/wine-types";

export function WineCard({ wine, onClick }: { wine: Wine; onClick: () => void }) {
  const isPerfect = wine.rating === 5;
  return (
    <button
      onClick={onClick}
      className={cn(
        "shelf-item group relative flex flex-col items-center rounded-md",
        "bg-gradient-to-b from-card/80 to-card/40 backdrop-blur",
        "border border-border/60 p-4 text-left w-full",
        "hover:border-gold/50",
        isPerfect && "ring-1 ring-gold/40 gold-pulse",
      )}
    >
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
