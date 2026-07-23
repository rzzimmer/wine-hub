export function SocialEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <svg
        viewBox="0 0 200 140"
        width="200"
        height="140"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/50"
        aria-hidden
      >
        {/* Closed barrel */}
        <ellipse cx="42" cy="118" rx="28" ry="6" opacity="0.35" />
        <path d="M18 88 v22 a24 8 0 0 0 48 0 V88" strokeLinecap="round" />
        <path d="M18 88 c0 -8 10 -14 24 -14 s24 6 24 14" strokeLinecap="round" />
        <line x1="18" y1="96" x2="66" y2="96" opacity="0.6" />
        <line x1="18" y1="104" x2="66" y2="104" opacity="0.6" />
        {/* Empty wine glasses */}
        <path d="M108 28 l14 36 a18 10 0 0 1 -28 0 Z" strokeLinejoin="round" />
        <line x1="101" y1="64" x2="101" y2="92" />
        <line x1="94" y1="92" x2="108" y2="92" strokeLinecap="round" />
        <path d="M152 28 l14 36 a18 10 0 0 1 -28 0 Z" strokeLinejoin="round" />
        <line x1="145" y1="64" x2="145" y2="92" />
        <line x1="138" y1="92" x2="152" y2="92" strokeLinecap="round" />
        {/* Subtle decorative lines */}
        <path d="M80 20 h40" opacity="0.25" strokeLinecap="round" />
        <path d="M70 130 h60" opacity="0.2" strokeLinecap="round" />
      </svg>
      <h2 className="mt-8 max-w-sm font-serif text-2xl text-foreground/90 md:text-3xl">
        Nenhum amigo por aqui ainda.
      </h2>
      <p className="mt-3 max-w-md text-sm italic text-muted-foreground">
        Sua adega está esperando companhia.
      </p>
    </div>
  );
}
