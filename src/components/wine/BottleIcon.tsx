import type { SVGProps } from "react";

export function BottleIcon({
  filled = false,
  ...props
}: SVGProps<SVGSVGElement> & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M10 2h4v3.2c0 .6.2 1.2.6 1.7l1.4 1.7c.6.8 1 1.8 1 2.8V20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8.6c0-1 .4-2 1-2.8l1.4-1.7c.4-.5.6-1.1.6-1.7V2Z"
        fill={filled ? "currentColor" : "none"}
      />
      {filled && <path d="M8 14h8" stroke="oklch(0.19 0.025 260)" strokeWidth={0.8} opacity="0.4" />}
    </svg>
  );
}
