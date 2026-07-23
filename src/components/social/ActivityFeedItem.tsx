import { BottleRating } from "@/components/wine/BottleRating";
import { SOCIAL_ACTIVITY_LABELS, type SocialActivity } from "@/lib/social-types";
import { cn } from "@/lib/utils";

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)} min atrás`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  return `${days}d atrás`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ActivityFeedItem({
  activity,
  isLast,
}: {
  activity: SocialActivity;
  isLast?: boolean;
}) {
  const action = SOCIAL_ACTIVITY_LABELS[activity.type];

  return (
    <li className="relative flex gap-4 pb-8">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[19px] top-10 bottom-0 w-px bg-border/60"
        />
      )}

      <div
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          "border border-gold/30 bg-card/80 font-serif text-sm text-gold",
        )}
        aria-hidden
      >
        {initials(activity.friendName)}
      </div>

      <article className="min-w-0 flex-1 space-y-3">
        <div>
          <p className="text-sm leading-relaxed text-foreground">
            <span className="font-serif text-base text-gold">{activity.friendName}</span>{" "}
            <span className="text-muted-foreground">{action}:</span>{" "}
            <span className="font-serif italic">{activity.wineName}</span>
          </p>
          {activity.winery && (
            <p className="mt-0.5 text-xs italic text-muted-foreground">{activity.winery}</p>
          )}
          <time
            dateTime={activity.timestamp}
            className="mt-1 block text-[10px] uppercase tracking-widest text-muted-foreground/80"
          >
            {formatRelativeTime(activity.timestamp)}
          </time>
        </div>

        {(activity.rating != null || activity.reviewExcerpt) && (
          <div className="rounded-md border border-border/50 bg-card/40 p-4 backdrop-blur">
            {activity.rating != null && (
              <div className="mb-2">
                <BottleRating value={activity.rating} readOnly size={14} />
              </div>
            )}
            {activity.reviewExcerpt && (
              <blockquote className="border-l-2 border-gold/30 pl-3 text-sm italic leading-relaxed text-foreground/90">
                “{activity.reviewExcerpt}”
              </blockquote>
            )}
          </div>
        )}
      </article>
    </li>
  );
}
