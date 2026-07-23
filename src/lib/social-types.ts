import type { WineRating } from "@/lib/wine-types";

export type SocialActivityType = "added_wine" | "rated_wine" | "reviewed_wine";

export interface SocialActivity {
  id: string;
  friendName: string;
  type: SocialActivityType;
  wineName: string;
  winery?: string;
  rating?: WineRating;
  reviewExcerpt?: string;
  timestamp: string;
}

export const SOCIAL_ACTIVITY_LABELS: Record<SocialActivityType, string> = {
  added_wine: "adicionou um novo vinho à estante",
  rated_wine: "avaliou um vinho na estante",
  reviewed_wine: "publicou uma resenha sobre",
};
