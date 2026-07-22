## Wine Hub — Fase 1 (MVP)

App web responsivo mobile-first para registrar e gerenciar uma coleção pessoal de vinhos, com estética de adega de luxo europeia.

### Escopo desta sprint
- Design system dark (adega vintage)
- Tela "Estante" com grid de garrafas + empty state
- FAB "Adicionar Vinho"
- Formulário modal completo com todos os campos
- Persistência local (localStorage) — sem backend nesta fase
- Detalhe/edição/exclusão de garrafa

Fora de escopo: autenticação, sync em nuvem, filtros avançados, busca, estatísticas, wishlist inteligente, harmonização IA.

### 1. Design System (src/styles.css)
Tokens dark mode como default (aplicar `.dark` no `<html>`):
- `--background`: azul-marinho profundo (`oklch(0.18 0.03 260)`)
- `--card`: cinza-chumbo levemente mais claro
- `--primary`: dourado queimado (`oklch(0.75 0.13 75)`) — CTAs
- `--accent`: roxo-vinho profundo (`oklch(0.42 0.12 350)`)
- `--wine-oak`: marrom carvalho (`oklch(0.45 0.06 55)`)
- `--wine-gold-glow`: gradiente dourado para nota 5
- Bordas: 1px, `--border` sutil translúcido
- Fontes via `<link>` no `__root.tsx`:
  - Títulos: **Cormorant Garamond** (serif elegante vintage)
  - Corpo: **Lora** (serif legível)
- Radius pequeno (`0.375rem`), sombras suaves

### 2. Modelo de Dados
```ts
type WineStatus = "drunk" | "cellar" | "wishlist";
type Wine = {
  id: string;
  imageDataUrl?: string;   // upload → base64 no localStorage
  name: string;
  winery: string;
  consumedAt?: string;     // ISO date
  price?: number;
  purchasePlace?: string;
  company?: string;
  pairing?: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  notes?: string;
  status: WineStatus;
  tags: string[];
  createdAt: string;
};
```
Persistência: hook `useWines()` sobre `localStorage` key `wine-hub:wines:v1`.

### 3. Rotas e componentes
- `src/routes/index.tsx` — **A Estante** (substitui placeholder)
- Componentes em `src/components/wine/`:
  - `WineShelf.tsx` — grid responsivo (2 col mobile, 3-4 tablet, 5-6 desktop) com hover-lift + blur nas demais
  - `WineCard.tsx` — ilustração/foto da garrafa, nome, vinícola, rating em ícones de garrafa; brilho dourado se rating=5
  - `BottleRating.tsx` — 5 ícones SVG de garrafa (preenchidos vs contorno)
  - `EmptyShelf.tsx` — SVG line-art de taça + copy "Sua adega está esperando a primeira garrafa"
  - `AddWineFab.tsx` — FAB fixo bottom-right, safe-area mobile
  - `WineFormDialog.tsx` — shadcn Dialog (fullscreen no mobile) com todos os campos, upload de imagem, seletor de status, input de tags múltiplas, seletor de rating
  - `WineDetailDialog.tsx` — visualização + editar/excluir
- Hooks: `src/hooks/useWines.ts`, `src/hooks/useLocalStorage.ts`
- Ícone garrafa: SVG custom em `src/components/wine/BottleIcon.tsx`

### 4. Interações
- Hover no card: `scale(1.05)` + z-index; irmãos ganham `opacity-60 blur-[1px]` via grupo CSS (`.shelf:hover .card:not(:hover)`)
- Rating 5 ao salvar: toast de sucesso + animação `animate-[wine-glow_1.2s_ease-out]` (keyframe custom no styles.css: box-shadow dourado pulsante)
- FAB: `fixed bottom-6 right-6`, com `pb-[env(safe-area-inset-bottom)]`
- Form responsivo: dialog vira sheet fullscreen em mobile

### 5. SEO / head
Atualizar `__root.tsx` head: título "Wine Hub — Sua adega pessoal", description em pt-BR, `lang="pt-BR"`.

### Detalhes técnicos
- Sem Lovable Cloud nesta fase (dados locais)
- shadcn: Dialog, Button, Input, Textarea, Select, Label, Badge (tags), Toast (sonner)
- Upload de imagem: `<input type="file" accept="image/*">` → `FileReader.readAsDataURL` → salva base64 (aviso: limite ~5MB localStorage; comprimir com canvas para max 800px)
- Tags: input com Enter/vírgula para adicionar, Badge removível
- Zod + react-hook-form para validação do formulário
- Data: `date-fns` (já disponível via shadcn) + input `type="date"`

### Estrutura de arquivos
```text
src/
  routes/index.tsx                    (Estante)
  components/wine/
    WineShelf.tsx
    WineCard.tsx
    BottleRating.tsx
    BottleIcon.tsx
    EmptyShelf.tsx
    AddWineFab.tsx
    WineFormDialog.tsx
    WineDetailDialog.tsx
  hooks/
    useWines.ts
    useLocalStorage.ts
  lib/wine-types.ts
  styles.css                          (tokens + keyframe wine-glow)
  routes/__root.tsx                   (fontes, dark class, head pt-BR)
```
