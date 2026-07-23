import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Note, NoteInput } from "@/lib/note-types";

type NoteRow = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

function fromRow(r: NoteRow): Note {
  return {
    id: r.id,
    title: r.title,
    content: r.content ?? "",
    tags: r.tags ?? [],
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("wine_notes")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      console.error("load notes", error);
      setNotes([]);
    } else {
      setNotes((data as NoteRow[]).map(fromRow));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addNote = useCallback(async (input: NoteInput) => {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) throw new Error("not authenticated");
    const { data, error } = await supabase
      .from("wine_notes")
      .insert({
        user_id: uid,
        title: input.title,
        content: input.content ?? "",
        tags: input.tags ?? [],
      })
      .select()
      .single();
    if (error) throw error;
    const note = fromRow(data as NoteRow);
    setNotes((prev) => [note, ...prev]);
    return note;
  }, []);

  const updateNote = useCallback(async (id: string, patch: Partial<NoteInput>) => {
    const { data, error } = await supabase
      .from("wine_notes")
      .update({
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.content !== undefined ? { content: patch.content } : {}),
        ...(patch.tags !== undefined ? { tags: patch.tags } : {}),
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    const note = fromRow(data as NoteRow);
    setNotes((prev) => prev.map((n) => (n.id === id ? note : n)));
  }, []);

  const removeNote = useCallback(async (id: string) => {
    const { error } = await supabase.from("wine_notes").delete().eq("id", id);
    if (error) throw error;
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return { notes, hydrated, addNote, updateNote, removeNote };
}
