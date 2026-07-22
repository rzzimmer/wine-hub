import type { Wine } from "@/lib/wine-types";
import { WineCard } from "./WineCard";

export function WineShelf({
  wines,
  onSelect,
}: {
  wines: Wine[];
  onSelect: (wine: Wine) => void;
}) {
  return (
    <div className="shelf-group grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {wines.map((wine) => (
        <WineCard key={wine.id} wine={wine} onClick={() => onSelect(wine)} />
      ))}
    </div>
  );
}
