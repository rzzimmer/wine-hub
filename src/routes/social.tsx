import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { ActivityFeedItem } from "@/components/social/ActivityFeedItem";
import { SocialEmptyState } from "@/components/social/SocialEmptyState";
import { MOCK_SOCIAL_ACTIVITIES } from "@/lib/social-mock";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Amizades — Wine Hub" },
      {
        name: "description",
        content:
          "Acompanhe a jornada enológica dos seus amigos: novas garrafas, avaliações e resenhas na adega.",
      },
      { property: "og:title", content: "Amizades — Wine Hub" },
      {
        property: "og:description",
        content: "Feed social da sua adega — descubra o que seus amigos estão degustando.",
      },
    ],
  }),
  component: SocialPage,
});

function SocialPage() {
  const activities = MOCK_SOCIAL_ACTIVITIES;

  return (
    <div className="min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, oklch(0.42 0.11 350 / 0.14), transparent 55%), radial-gradient(ellipse at 85% 100%, oklch(0.46 0.07 55 / 0.12), transparent 55%)",
        }}
      />

      <SiteNav />

      <header className="mx-auto max-w-2xl px-5 pt-6 pb-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold/80">Módulo Social</p>
        <h1 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">Amizades</h1>
        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="mt-3 text-sm italic text-muted-foreground">
          Atividades recentes da sua rede enológica
        </p>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-24">
        {activities.length === 0 ? (
          <SocialEmptyState />
        ) : (
          <ul className="pt-2">
            {activities.map((activity, index) => (
              <ActivityFeedItem
                key={activity.id}
                activity={activity}
                isLast={index === activities.length - 1}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
