const hearts = [
  { left: "6%", size: 22, delay: 0, dur: 22, o: 0.35 },
  { left: "18%", size: 14, delay: 6, dur: 28, o: 0.28 },
  { left: "31%", size: 30, delay: 12, dur: 25, o: 0.22 },
  { left: "47%", size: 16, delay: 3, dur: 30, o: 0.3 },
  { left: "62%", size: 26, delay: 9, dur: 24, o: 0.25 },
  { left: "76%", size: 18, delay: 15, dur: 27, o: 0.32 },
  { left: "89%", size: 24, delay: 5, dur: 21, o: 0.24 },
];

export function FloatingHearts() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={h.size}
          height={h.size}
          className="animate-float-heart absolute bottom-0 text-primary"
          style={{
            left: h.left,
            opacity: h.o,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <path
            fill="currentColor"
            d="M12 21s-7.5-4.7-9.3-9.2C1.3 8.2 3.3 5 6.6 5c2 0 3.4 1.1 4.2 2.3l.6.9.6-.9C12.8 6.1 14.2 5 16.2 5c3.3 0 5.3 3.2 3.9 6.8C19.5 16.3 12 21 12 21z"
          />
        </svg>
      ))}
    </div>
  );
}
