import type { ReactNode } from "react";
import { BottleIcon } from "./BottleIcon";
import { BottleRating } from "./BottleRating";
import { GlossaryText } from "./GlossaryText";
import type { Wine } from "@/lib/wine-types";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

function CompareField({ label, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

function EmptyValue() {
  return <span className="italic text-muted-foreground/70">—</span>;
}

export function WineComparePanel({ wine, side }: { wine: Wine; side: "left" | "right" }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-5 rounded-md border border-border/50 bg-card/30 p-4 md:p-6",
        side === "left" ? "md:rounded-r-none md:border-r-0" : "md:rounded-l-none",
      )}
    >
      <div className="flex justify-center">
        {wine.imageDataUrl ? (
          <img
            src={wine.imageDataUrl}
            alt={wine.name}
            className="max-h-48 w-auto max-w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          />
        ) : (
          <BottleIcon
            filled
            className="h-40 w-auto text-wine drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
          />
        )}
      </div>

      <CompareField label="Nome">
        <h3 className="font-serif text-xl leading-tight md:text-2xl">{wine.name}</h3>
      </CompareField>

      <CompareField label="Vinícola">
        {wine.winery ? (
          <span className="italic">{wine.winery}</span>
        ) : (
          <EmptyValue />
        )}
      </CompareField>

      <CompareField label="Notas">
        <BottleRating value={wine.rating} readOnly size={18} />
      </CompareField>

      <CompareField label="Valor pago">
        {wine.price != null ? (
          <span className="font-serif text-lg text-gold">
            {wine.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        ) : (
          <EmptyValue />
        )}
      </CompareField>

      <CompareField label="Companhia">
        {wine.company ?? <EmptyValue />}
      </CompareField>

      <CompareField label="Acompanhamento">
        {wine.pairing ?? <EmptyValue />}
      </CompareField>

      <CompareField label="Observações">
        {wine.notes ? (
          <GlossaryText
            text={wine.notes}
            className="text-sm italic leading-relaxed text-foreground/90 whitespace-pre-wrap block"
          />
        ) : (
          <EmptyValue />
        )}
      </CompareField>
    </article>
  );
}
