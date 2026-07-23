import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Wine, WineInput, WineRating, WineStatus } from "@/lib/wine-types";

type WineRow = {
  id: string;
  user_id: string;
  image_url: string | null;
  name: string;
  winery: string;
  consumed_at: string | null;
  price: number | string | null;
  purchase_place: string | null;
  company: string | null;
  pairing: string | null;
  rating: number;
  notes: string | null;
  status: string;
  tags: string[] | null;
  created_at: string;
};

function fromRow(r: WineRow): Wine {
  return {
    id: r.id,
    imageDataUrl: r.image_url ?? undefined,
    name: r.name,
    winery: r.winery,
    consumedAt: r.consumed_at ?? undefined,
    price: r.price == null ? undefined : Number(r.price),
    purchasePlace: r.purchase_place ?? undefined,
    company: r.company ?? undefined,
    pairing: r.pairing ?? undefined,
    rating: (r.rating as WineRating) ?? 0,
    notes: r.notes ?? undefined,
    status: (r.status as WineStatus) ?? "cellar",
    tags: r.tags ?? [],
    createdAt: r.created_at,
  };
}

function toPayload(input: WineInput) {
  return {
    image_url: input.imageDataUrl ?? null,
    name: input.name,
    winery: input.winery,
    consumed_at: input.consumedAt ? input.consumedAt : null,
    price: input.price ?? null,
    purchase_place: input.purchasePlace ?? null,
    company: input.company ?? null,
    pairing: input.pairing ?? null,
    rating: input.rating,
    notes: input.notes ?? null,
    status: input.status,
    tags: input.tags ?? [],
  };
}

export function useWines() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("wines")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("load wines", error);
      setWines([]);
    } else {
      setWines((data as WineRow[]).map(fromRow));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addWine = useCallback(async (input: WineInput) => {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) throw new Error("not authenticated");
    const { data, error } = await supabase
      .from("wines")
      .insert({ ...toPayload(input), user_id: uid })
      .select()
      .single();
    if (error) throw error;
    const wine = fromRow(data as WineRow);
    setWines((prev) => [wine, ...prev]);
    return wine;
  }, []);

  const updateWine = useCallback(async (id: string, patch: Partial<WineInput>) => {
    const payload: Record<string, unknown> = {};
    const full = toPayload({ ...({} as WineInput), ...(patch as WineInput) });
    for (const k of Object.keys(patch) as (keyof WineInput)[]) {
      const mapKey: Record<string, string> = {
        imageDataUrl: "image_url",
        consumedAt: "consumed_at",
        purchasePlace: "purchase_place",
      };
      const dbKey = mapKey[k as string] ?? (k as string);
      payload[dbKey] = (full as Record<string, unknown>)[dbKey];
    }
    const { data, error } = await supabase
      .from("wines")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    const wine = fromRow(data as WineRow);
    setWines((prev) => prev.map((w) => (w.id === id ? wine : w)));
  }, []);

  const removeWine = useCallback(async (id: string) => {
    const { error } = await supabase.from("wines").delete().eq("id", id);
    if (error) throw error;
    setWines((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return { wines, hydrated, addWine, updateWine, removeWine };
}
