import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SuggestionCard, useSuggestionWishlist } from "@/components/suggestions/SuggestionCard";
import { MOCK_SUGGESTIONS } from "@/lib/suggestions-mock";

export const Route = createFileRoute("/sugestoes")({
  head: () => ({
    meta: [
      { title: "Sugestões — Wine Hub" },
      {
        name: "description",
        content:
          "Rótulos recomendados pela inteligência artificial com base no seu perfil enológico e preferências.",
      },
      { property: "og:title", content: "Sugestões — Wine Hub" },
      {
        property: "og:description",
        content: "Descubra vinhos selecionados para o seu paladar.",
      },
    ],
  }),
  component: SugestoesPage,
});

function SugestoesPage() {
  const { addToWishlist, isInWishlist } = useSuggestionWishlist();

  return (
    <div className="min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, oklch(0.42 0.11 350 / 0.14), transparent 55%), radial-gradient(ellipse at 20% 100%, oklch(0.46 0.07 55 / 0.12), transparent 55%)",
        }}
      />

      <SiteNav />

      <header className="mx-auto max-w-3xl px-5 pt-6 pb-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold/80">Motor de IA</p>
        <h1 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">Sugestões</h1>
        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="mt-3 text-sm italic text-muted-foreground">
          Rótulos recomendados com base no seu perfil enológico
        </p>
      </header>

      <main className="mx-auto max-w-3xl space-y-5 px-4 pb-24">
        {MOCK_SUGGESTIONS.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            added={isInWishlist(suggestion)}
            onAdd={() => addToWishlist(suggestion)}
          />
        ))}
      </main>
    </div>
  );
}
