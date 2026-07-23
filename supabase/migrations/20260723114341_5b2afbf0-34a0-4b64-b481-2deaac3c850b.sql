
CREATE TABLE public.wines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT,
  name TEXT NOT NULL,
  winery TEXT NOT NULL,
  consumed_at DATE,
  price NUMERIC(10,2),
  purchase_place TEXT,
  company TEXT,
  pairing TEXT,
  rating SMALLINT NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'cellar',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wines TO authenticated;
GRANT ALL ON public.wines TO service_role;
ALTER TABLE public.wines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wines_owner_all" ON public.wines FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX wines_user_created_idx ON public.wines (user_id, created_at DESC);

CREATE TABLE public.wine_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wine_notes TO authenticated;
GRANT ALL ON public.wine_notes TO service_role;
ALTER TABLE public.wine_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wine_notes_owner_all" ON public.wine_notes FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX wine_notes_user_updated_idx ON public.wine_notes (user_id, updated_at DESC);

CREATE TRIGGER wines_set_updated_at BEFORE UPDATE ON public.wines
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER wine_notes_set_updated_at BEFORE UPDATE ON public.wine_notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
