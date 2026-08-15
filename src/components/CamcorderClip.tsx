type Props = {
  poster: string;
  alt: string;
  caption: string;
  timestamp: string;
  rotate?: number;
};

export function CamcorderClip({ poster, alt, caption, timestamp, rotate = 1.5 }: Props) {
  return (
    <figure
      className="paper group relative mb-8 break-inside-avoid bg-foreground/90 p-2 transition-all duration-500 hover:z-20 hover:rotate-0 hover:scale-[1.03] hover:paper-lift"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-[repeating-linear-gradient(180deg,transparent_0_6px,var(--cream)_6px_12px)] opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-[repeating-linear-gradient(180deg,transparent_0_6px,var(--cream)_6px_12px)] opacity-70" />

      <div className="relative mx-2 overflow-hidden">
        <video
          src="/VID_20260726_044954_313.mp4"
          poster={poster}
          aria-label={alt}
          controls
          playsInline
          preload="metadata"
          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "saturate(1.15) contrast(1.05) hue-rotate(-4deg)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_2px,rgba(0,0,0,0.14)_2px_3px)] opacity-60" />
        <div className="pointer-events-none absolute inset-0 p-3 font-mono text-[10px] tracking-widest text-cream">
          <div className="flex items-center gap-1.5">
            <span className="animate-rec inline-block size-2 rounded-full bg-destructive" />
            <span>REC</span>
          </div>
          <div className="absolute bottom-3 left-3">▶ PLAY</div>
          <div className="absolute right-3 bottom-3">{timestamp}</div>
        </div>
      </div>
      <figcaption className="px-3 pt-2 pb-1">
        <p className="font-hand text-xl text-cream">{caption}</p>
      </figcaption>
    </figure>
  );
}
