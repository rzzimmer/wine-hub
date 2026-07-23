import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, Cell, Label, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Sparkles } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Estatísticas — Wine Hub" },
      {
        name: "description",
        content:
          "Painel elegante com as métricas da sua adega: uvas favoritas, regiões e investimento em garrafas nota cinco.",
      },
      { property: "og:title", content: "Estatísticas — Wine Hub" },
      {
        property: "og:description",
        content: "Relatório vintage das suas descobertas enológicas.",
      },
    ],
  }),
  component: StatsPage,
});

const grapeData = [
  { grape: "cabernet", label: "Cabernet Sauvignon", count: 8 },
  { grape: "merlot", label: "Merlot", count: 5 },
  { grape: "pinot", label: "Pinot Noir", count: 3 },
];

const regionData = [
  { region: "bordeaux", label: "Bordeaux", value: 35 },
  { region: "tuscany", label: "Toscana", value: 28 },
  { region: "douro", label: "Douro", value: 22 },
  { region: "others", label: "Outras", value: 15 },
];

const grapeChartConfig = {
  count: { label: "Garrafas", color: "oklch(0.82 0.14 82)" },
  cabernet: { label: "Cabernet Sauvignon", color: "oklch(0.82 0.14 82)" },
  merlot: { label: "Merlot", color: "oklch(0.78 0.13 78)" },
  pinot: { label: "Pinot Noir", color: "oklch(0.42 0.11 350)" },
} satisfies ChartConfig;

const regionChartConfig = {
  value: { label: "Participação" },
  bordeaux: { label: "Bordeaux", color: "oklch(0.82 0.14 82)" },
  tuscany: { label: "Toscana", color: "oklch(0.78 0.13 78)" },
  douro: { label: "Douro", color: "oklch(0.42 0.11 350)" },
  others: { label: "Outras", color: "oklch(0.46 0.07 55)" },
} satisfies ChartConfig;

const AVG_PRICE_FIVE_STAR = 189.9;
const TOTAL_FIVE_STAR = 12;

function StatsPage() {
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(
    new Date(),
  );

  return (
    <div className="min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.42 0.11 350 / 0.12), transparent 55%), radial-gradient(ellipse at 20% 100%, oklch(0.46 0.07 55 / 0.12), transparent 55%)",
        }}
      />

      <SiteNav />

      <header className="mx-auto max-w-6xl px-5 pt-6 pb-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold/80">Painel da Adega</p>
        <h1 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">Estatísticas</h1>
        <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="mt-3 text-sm italic text-muted-foreground capitalize">{monthLabel}</p>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 pb-24">
        <GoldMetricCard />

        <div className="grid gap-6 md:grid-cols-2">
          <ReportPanel title="Uva mais bebida este mês" subtitle="Top 3 variedades">
            <ChartContainer
              config={grapeChartConfig}
              className="aspect-auto h-[220px] w-full min-h-[200px] sm:h-[240px]"
            >
              <BarChart
                data={grapeData}
                layout="vertical"
                margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
              >
                <XAxis type="number" hide domain={[0, "dataMax + 1"]} />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={72}
                  tickLine={false}
                  axisLine={false}
                  className="text-[11px] sm:text-xs"
                  tick={{ fill: "oklch(0.72 0.02 85)" }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={22}>
                  {grapeData.map((entry) => (
                    <Cell key={entry.grape} fill={`var(--color-${entry.grape})`} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </ReportPanel>

          <ReportPanel title="Região favorita" subtitle="Distribuição por origem">
            <ChartContainer
              config={regionChartConfig}
              className="mx-auto aspect-square h-[220px] w-full max-w-[280px] sm:h-[240px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="region" />} />
                <Pie
                  data={regionData}
                  dataKey="value"
                  nameKey="region"
                  innerRadius="58%"
                  outerRadius="82%"
                  strokeWidth={2}
                  stroke="oklch(0.23 0.028 260)"
                >
                  {regionData.map((entry) => (
                    <Cell key={entry.region} fill={`var(--color-${entry.region})`} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (!viewBox || !("cx" in viewBox)) return null;
                      const { cx, cy } = viewBox;
                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan
                            x={cx}
                            y={cy}
                            className="fill-gold font-serif text-2xl font-semibold"
                          >
                            {regionData[0].value}%
                          </tspan>
                          <tspan
                            x={cx}
                            y={(cy ?? 0) + 18}
                            className="fill-muted-foreground text-[10px] uppercase tracking-widest"
                          >
                            {regionData[0].label}
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {regionData.map((entry) => (
                <li
                  key={entry.region}
                  className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: `var(--color-${entry.region})` }}
                  />
                  {entry.label}
                </li>
              ))}
            </ul>
          </ReportPanel>
        </div>
      </main>
    </div>
  );
}

function ReportPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-border/60 bg-card/40 p-5 backdrop-blur md:p-6">
      <div className="mb-4 border-b border-border/40 pb-3">
        <h2 className="font-serif text-xl text-foreground md:text-2xl">{title}</h2>
        <p className="mt-0.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}

function GoldMetricCard() {
  return (
    <article className="relative overflow-hidden rounded-md border border-gold/30 bg-gradient-to-br from-gold/10 via-card/60 to-card/40 p-6 backdrop-blur md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-gold/80">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span className="text-[11px] uppercase tracking-[0.35em]">Métrica de ouro</span>
          </div>
          <h2 className="mt-2 max-w-md font-serif text-2xl text-foreground md:text-3xl">
            Preço médio das garrafas nota 5
          </h2>
          <p className="mt-2 text-sm italic text-muted-foreground">
            Joias da adega — avaliações máximas registradas
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-serif text-4xl text-gold md:text-5xl">
            {AVG_PRICE_FIVE_STAR.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
            {TOTAL_FIVE_STAR} garrafas · nota 5
          </p>
        </div>
      </div>
    </article>
  );
}
