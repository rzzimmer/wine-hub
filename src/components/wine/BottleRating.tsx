import { BottleIcon } from "./BottleIcon";
import { cn } from "@/lib/utils";
import type { WineRating } from "@/lib/wine-types";

interface Props {
  value: WineRating;
  onChange?: (value: WineRating) => void;
  size?: number;
  className?: string;
  readOnly?: boolean;
}

export function BottleRating({ value, onChange, size = 22, className, readOnly }: Props) {
  const interactive = !readOnly && !!onChange;
  return (
    <div className={cn("flex items-center gap-1", className)} role="radiogroup" aria-label="Classificação">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(n as WineRating)}
            className={cn(
              "transition-all",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
              active ? "text-gold" : "text-muted-foreground/50",
            )}
            aria-label={`${n} garrafa${n > 1 ? "s" : ""}`}
            aria-checked={active}
            role="radio"
          >
            <BottleIcon filled={active} width={size} height={size} />
          </button>
        );
      })}
    </div>
  );
}
