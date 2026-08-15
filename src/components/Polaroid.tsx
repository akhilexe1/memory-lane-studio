import { WashiTape } from "./Doodles";

type Props = {
  src: string;
  alt: string;
  caption: string;
  date: string;
  rotate?: number;
  tape?: "left" | "right" | "both" | "none";
  width?: number;
  height?: number;
};

export function Polaroid({
  src,
  alt,
  caption,
  rotate = -2,
  tape = "left",
  width = 800,
  height = 1000,
}: Props) {
  return (
    <figure
      className="paper group relative mb-8 break-inside-avoid rounded-[3px] bg-card p-3 pb-14 transition-all duration-500 ease-out hover:z-20 hover:-translate-y-1 hover:rotate-0 hover:scale-[1.03] hover:paper-lift"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {(tape === "left" || tape === "both") && (
        <WashiTape className="-top-3 left-4 -rotate-6" />
      )}
      {(tape === "right" || tape === "both") && (
        <WashiTape className="-top-3 right-4 rotate-6 w-20" />
      )}
      <div className="overflow-hidden bg-muted">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "sepia(0.12) saturate(1.05) contrast(0.98)" }}
        />
      </div>
      <figcaption className="absolute inset-x-3 bottom-3">
        <p className="font-hand text-xl leading-tight text-foreground">{caption}</p>
      </figcaption>
    </figure>
  );
}
