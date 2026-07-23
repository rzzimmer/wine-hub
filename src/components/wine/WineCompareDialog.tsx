import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WineComparePanel } from "./WineComparePanel";
import type { Wine } from "@/lib/wine-types";
import { Swords } from "lucide-react";

interface Props {
  wines: [Wine, Wine] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WineCompareDialog({ wines, open, onOpenChange }: Props) {
  if (!wines) return null;
  const [left, right] = wines;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] w-[calc(100%-1.5rem)] max-w-5xl gap-0 overflow-y-auto p-0 sm:rounded-lg">
        <DialogHeader className="border-b border-border/40 px-5 py-4 text-center sm:text-left md:px-6">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Swords className="h-4 w-4 text-gold/80" aria-hidden />
            <DialogTitle className="font-serif text-2xl md:text-3xl">Batalha de Vinhos</DialogTitle>
          </div>
          <p className="text-xs italic text-muted-foreground">
            Comparação lado a lado das suas garrafas selecionadas
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2">
          <WineComparePanel wine={left} side="left" />
          <div
            aria-hidden
            className="hidden w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:block"
          />
          <WineComparePanel wine={right} side="right" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
