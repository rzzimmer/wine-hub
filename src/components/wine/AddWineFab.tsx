import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function AddWineFab({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label="Adicionar vinho"
      className={cn(
        "fixed right-5 bottom-6 z-40 h-16 w-16 rounded-full",
        "bg-gradient-to-br from-gold via-primary to-oak",
        "text-primary-foreground shadow-lg shadow-black/40",
        "flex items-center justify-center",
        "transition-transform hover:scale-110 active:scale-95",
        "ring-1 ring-gold/40",
        className,
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <Plus className="h-7 w-7" strokeWidth={1.5} />
    </button>
  );
}
