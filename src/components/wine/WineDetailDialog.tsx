import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottleRating } from "./BottleRating";
import { WINE_STATUS_LABELS, type Wine } from "@/lib/wine-types";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  wine: Wine | null;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function WineDetailDialog({ wine, onOpenChange, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  if (!wine) return null;

  const meta: [string, string | undefined][] = [
    ["Vinícola", wine.winery],
    ["Data", wine.consumedAt],
    ["Valor", wine.price != null ? `R$ ${wine.price.toFixed(2)}` : undefined],
    ["Local", wine.purchasePlace],
    ["Companhia", wine.company],
    ["Harmonização", wine.pairing],
  ];

  return (
    <Dialog open={!!wine} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{wine.name}</DialogTitle>
        </DialogHeader>

        {wine.imageDataUrl && (
          <div className="flex justify-center">
            <img
              src={wine.imageDataUrl}
              alt={wine.name}
              className="max-h-64 rounded-md object-contain"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <BottleRating value={wine.rating} readOnly />
          <span className="text-xs uppercase tracking-widest text-gold">
            {WINE_STATUS_LABELS[wine.status]}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          {meta
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 text-foreground">{v}</dd>
              </div>
            ))}
        </dl>

        {wine.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {wine.tags.map((t) => (
              <Badge key={t} variant="secondary">#{t}</Badge>
            ))}
          </div>
        )}

        {wine.notes && (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Observações
            </p>
            <p className="text-sm italic text-foreground/90 whitespace-pre-wrap">{wine.notes}</p>
          </div>
        )}

        <div className="flex justify-between gap-2 pt-2">
          {confirming ? (
            <div className="flex gap-2 w-full">
              <Button variant="ghost" onClick={() => setConfirming(false)} className="flex-1">
                Cancelar
              </Button>
              <Button variant="destructive" onClick={onDelete} className="flex-1">
                Confirmar exclusão
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setConfirming(true)}>
                <Trash2 className="h-4 w-4 mr-1" /> Excluir
              </Button>
              <Button onClick={onEdit} variant="outline">
                <Pencil className="h-4 w-4 mr-1" /> Editar
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
