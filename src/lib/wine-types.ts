export type WineStatus = "drunk" | "cellar" | "wishlist";

export const WINE_STATUS_LABELS: Record<WineStatus, string> = {
  drunk: "Já Bebi",
  cellar: "Na Adega",
  wishlist: "Wishlist",
};

export type WineRating = 0 | 1 | 2 | 3 | 4 | 5;

export interface Wine {
  id: string;
  imageDataUrl?: string;
  name: string;
  winery: string;
  consumedAt?: string;
  price?: number;
  purchasePlace?: string;
  company?: string;
  pairing?: string;
  rating: WineRating;
  notes?: string;
  status: WineStatus;
  tags: string[];
  createdAt: string;
}

export type WineInput = Omit<Wine, "id" | "createdAt">;
