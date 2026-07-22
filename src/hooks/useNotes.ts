import { useCallback, useEffect, useState } from "react";
import type { Note, NoteInput } from "@/lib/note-types";

const STORAGE_KEY = "wine-hub:notes:v1";
const CHANGE_EVENT = "wine-hub:notes:change";

function read(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Note[]) : [];
  } catch {
    return [];
  }
}

function write(notes: Note[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch (err) {
    console.error("Failed to persist notes", err);
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setNotes(read());
    setHydrated(true);
    const sync = () => setNotes(read());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addNote = useCallback((input: NoteInput) => {
    const now = new Date().toISOString();
    const note: Note = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => {
      const next = [note, ...prev];
      write(next);
      return next;
    });
    return note;
  }, []);

  const updateNote = useCallback((id: string, patch: Partial<NoteInput>) => {
    setNotes((prev) => {
      const next = prev.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n,
      );
      write(next);
      return next;
    });
  }, []);

  const removeNote = useCallback((id: string) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      write(next);
      return next;
    });
  }, []);

  return { notes, hydrated, addNote, updateNote, removeNote };
}
