import { useCallback, useEffect, useState } from "react";
import type { Wine, WineInput } from "@/lib/wine-types";

const STORAGE_KEY = "wine-hub:wines:v1";

function read(): Wine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Wine[]) : [];
  } catch {
    return [];
  }
}

function write(wines: Wine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wines));
  } catch (err) {
    console.error("Failed to persist wines", err);
  }
}

export function useWines() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWines(read());
    setHydrated(true);
  }, []);

  const addWine = useCallback((input: WineInput) => {
    const wine: Wine = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setWines((prev) => {
      const next = [wine, ...prev];
      write(next);
      return next;
    });
    return wine;
  }, []);

  const updateWine = useCallback((id: string, patch: Partial<WineInput>) => {
    setWines((prev) => {
      const next = prev.map((w) => (w.id === id ? { ...w, ...patch } : w));
      write(next);
      return next;
    });
  }, []);

  const removeWine = useCallback((id: string) => {
    setWines((prev) => {
      const next = prev.filter((w) => w.id !== id);
      write(next);
      return next;
    });
  }, []);

  return { wines, hydrated, addWine, updateWine, removeWine };
}
