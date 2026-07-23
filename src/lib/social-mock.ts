import type { SocialActivity } from "@/lib/social-types";

export const MOCK_SOCIAL_ACTIVITIES: SocialActivity[] = [
  {
    id: "1",
    friendName: "Erik",
    type: "added_wine",
    wineName: "Malbec Argentino",
    winery: "Bodega Catena Zapata",
    rating: 4,
    reviewExcerpt:
      "Taninos macios, fruta negra intensa e um final longo. Perfeito para uma noite fria com queijo curado.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "2",
    friendName: "Marina",
    type: "reviewed_wine",
    wineName: "Chianti Classico Riserva",
    winery: "Castello di Volpaia",
    rating: 5,
    reviewExcerpt:
      "Cereja seca, especiarias e aquele toque terroso que só a Toscana entrega. Garrafa para guardar.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "3",
    friendName: "Lucas",
    type: "rated_wine",
    wineName: "Pinot Noir",
    winery: "Domaine de la Romanée",
    rating: 3,
    reviewExcerpt: "Elegante, porém um pouco jovem ainda. Acredito que vai evoluir bem na adega.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
  {
    id: "4",
    friendName: "Camila",
    type: "added_wine",
    wineName: "Touriga Nacional",
    winery: "Quinta do Vallado",
    rating: 5,
    reviewExcerpt:
      "Notas de ameixa, violeta e cacau amargo. Harmonizou lindamente com cordeiro assado.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
  },
];
