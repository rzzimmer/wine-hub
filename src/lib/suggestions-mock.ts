import type { WineSuggestion } from "@/lib/suggestion-types";

export const MOCK_SUGGESTIONS: WineSuggestion[] = [
  {
    id: "sug-1",
    name: "Merlot Reserva",
    winery: "Viña Santa Rita",
    reason: "Baseado no seu gosto por #jantar-pesado e vinhos da uva Merlot.",
    tags: ["merlot", "jantar-pesado", "wishlist-ia"],
  },
  {
    id: "sug-2",
    name: "Chianti Classico",
    winery: "Castello di Brolio",
    reason: "Você avaliou bem rótulos italianos com #tanino-suave e harmonização com massas.",
    tags: ["italiano", "tanino-suave", "massas"],
  },
  {
    id: "sug-3",
    name: "Malbec Gran Reserva",
    winery: "Catena Zapata",
    reason: "Combina com suas garrafas nota 5 de #malbec e preferência por vinhos encorpados.",
    tags: ["malbec", "encorpado", "argentina"],
  },
  {
    id: "sug-4",
    name: "Pinot Noir",
    winery: "Domaine Serene",
    reason: "Sugerido por afinidade com #vinho-leve e registros recentes de harmonização com peixes.",
    tags: ["pinot-noir", "vinho-leve", "peixes"],
  },
];
