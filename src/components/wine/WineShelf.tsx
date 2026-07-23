import type { Wine } from "@/lib/wine-types";
import { WineCard } from "./WineCard";

interface WineShelfProps {
  wines: Wine[];
  onSelect: (wine: Wine) => void;
  compareMode?: boolean;
  selectedIds?: string[];
  maxSelection?: number;
}

export function WineShelf({
  wines,
  onSelect,
  compareMode = false,
  selectedIds = [],
  maxSelection = 2,
}: WineShelfProps) {
  const atMax = selectedIds.length >= maxSelection;

  return (
    <div
      className={
        compareMode
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          : "shelf-group grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      }
    >
      {wines.map((wine) => {
        const selected = selectedIds.includes(wine.id);
        return (
          <WineCard
            key={wine.id}
            wine={wine}
            compareMode={compareMode}
            selected={selected}
            selectionDisabled={compareMode && atMax && !selected}
            onClick={() => onSelect(wine)}
          />
        );
      })}
    </div>
  );
}
