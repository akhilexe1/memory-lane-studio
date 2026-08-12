import type { CSSProperties } from "react";

export function DoodleHeart({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 48 44" className={className} style={style} aria-hidden fill="none">
      <path
        d="M24 40C24 40 4 29.5 4 16.5C4 9.6 9.2 5 15 5c4 0 7.3 2.4 9 5.6C25.7 7.4 29 5 33 5c5.8 0 11 4.6 11 11.5C44 29.5 24 40 24 40z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
    </svg>
  );
}

export function Sparkle({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        fill="currentColor"
        d="M12 0c.6 5.8 2.5 9.5 12 12-9.5 2.5-11.4 6.2-12 12-.6-5.8-2.5-9.5-12-12C9.5 9.5 11.4 5.8 12 0z"
      />
    </svg>
  );
}

export function WashiTape({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`washi pointer-events-none absolute h-6 w-24 ${className ?? ""}`}
      style={style}
    />
  );
}
