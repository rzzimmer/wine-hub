import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BottleRating } from "./BottleRating";
import { WINE_STATUS_LABELS, type Wine, type WineInput, type WineRating, type WineStatus } from "@/lib/wine-types";
import { toast } from "sonner";

async function compressImage(file: File, maxSize = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no ctx"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const emptyForm: WineInput = {
  name: "",
  winery: "",
  consumedAt: "",
  price: undefined,
  purchasePlace: "",
  company: "",
  pairing: "",
  rating: 0,
  notes: "",
  status: "cellar",
  tags: [],
  imageDataUrl: undefined,
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WineInput) => void;
  initial?: Wine | null;
}

export function WineFormDialog({ open, onOpenChange, onSubmit, initial }: Props) {
  const [form, setForm] = useState<WineInput>(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : emptyForm);
      setTagInput("");
    }
  }, [open, initial]);

  function set<K extends keyof WineInput>(key: K, value: WineInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addTag() {
    const t = tagInput.trim().replace(/^#/, "");
    if (!t) return;
    if (!form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
  }

  function removeTag(t: string) {
    set("tags", form.tags.filter((x) => x !== t));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImage(file);
      set("imageDataUrl", dataUrl);
    } catch {
      toast.error("Não foi possível carregar a imagem");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.winery.trim()) {
      toast.error("Nome e vinícola são obrigatórios");
      return;
    }
    onSubmit(form);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {initial ? "Editar vinho" : "Adicionar vinho"}
          </DialogTitle>
          <DialogDescription>
            Registre os detalhes desta garrafa na sua adega.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image */}
          <div>
            <Label>Rótulo / Garrafa</Label>
            <div className="mt-2 flex items-center gap-3">
              {form.imageDataUrl ? (
                <img
                  src={form.imageDataUrl}
                  alt="preview"
                  className="h-24 w-24 rounded-md object-cover border border-border"
                />
              ) : (
                <div className="h-24 w-24 rounded-md border border-dashed border-border/70 flex items-center justify-center text-xs text-muted-foreground">
                  sem imagem
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
              <div className="flex flex-col gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  Carregar imagem
                </Button>
                {form.imageDataUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => set("imageDataUrl", undefined)}
                  >
                    Remover
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome do vinho *</Label>
              <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="winery">Vinícola *</Label>
              <Input id="winery" value={form.winery} onChange={(e) => set("winery", e.target.value)} />
            </div>

            <div>
              <Label htmlFor="consumedAt">Data do consumo</Label>
              <Input
                id="consumedAt"
                type="date"
                value={form.consumedAt ?? ""}
                onChange={(e) => set("consumedAt", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v as WineStatus)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(WINE_STATUS_LABELS).map(([v, l]) => (
                    <SelectItem key={v} value={v}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Valor pago (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={form.price ?? ""}
                onChange={(e) =>
                  set("price", e.target.value === "" ? undefined : Number(e.target.value))
                }
              />
            </div>
            <div>
              <Label htmlFor="purchasePlace">Local de compra</Label>
              <Input
                id="purchasePlace"
                value={form.purchasePlace ?? ""}
                onChange={(e) => set("purchasePlace", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="company">Companhia</Label>
              <Input
                id="company"
                placeholder="Com quem bebi"
                value={form.company ?? ""}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pairing">Harmonização</Label>
              <Input
                id="pairing"
                placeholder="Comida / acompanhamento"
                value={form.pairing ?? ""}
                onChange={(e) => set("pairing", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Classificação</Label>
            <div className="mt-2">
              <BottleRating
                value={form.rating}
                onChange={(v: WineRating) => set("rating", v)}
                size={28}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="mt-2 flex gap-2">
              <Input
                id="tags"
                placeholder="ex: jantar-pesado"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Adicionar
              </Button>
            </div>
            {form.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1">
                    #{t}
                    <button type="button" onClick={() => removeTag(t)} aria-label={`remover ${t}`}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              rows={4}
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-gold to-primary text-primary-foreground">
              {initial ? "Salvar" : "Adicionar à adega"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
