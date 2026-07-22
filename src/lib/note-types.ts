export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type NoteInput = Omit<Note, "id" | "createdAt" | "updatedAt">;
