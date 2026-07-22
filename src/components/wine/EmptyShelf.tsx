export function EmptyShelf() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <svg
        viewBox="0 0 120 160"
        width="120"
        height="160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/60"
      >
        <path d="M35 15 h50 l-4 40 a26 26 0 0 1 -21 25 v45" strokeLinecap="round" />
        <path d="M35 15 l4 40 a26 26 0 0 0 21 25" strokeLinecap="round" />
        <line x1="40" y1="145" x2="80" y2="145" strokeLinecap="round" />
        <line x1="60" y1="125" x2="60" y2="145" />
      </svg>
      <h2 className="mt-8 text-2xl md:text-3xl text-foreground/90">
        Sua adega está esperando a primeira garrafa
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-sm">
        Toque no botão dourado abaixo para registrar seu primeiro vinho e começar sua jornada.
      </p>
    </div>
  );
}
