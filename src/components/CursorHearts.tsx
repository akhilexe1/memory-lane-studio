import { useEffect } from "react";

export function CursorHearts() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lastX = -100;
    let lastY = -100;
    let lastSpawn = 0;

    const spawnHeart = (x: number, y: number) => {
      const heart = document.createElement("span");
      heart.textContent = Math.random() > 0.18 ? "♥" : "♡";
      const size = 10 + Math.random() * 10;
      const drift = (Math.random() - 0.5) * 42;
      const duration = 700 + Math.random() * 500;

      heart.setAttribute("aria-hidden", "true");
      heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        z-index: 9999;
        pointer-events: none;
        user-select: none;
        font-size: ${size}px;
        line-height: 1;
        color: ${Math.random() > 0.5 ? "#f06a91" : "#e94f7d"};
        filter: drop-shadow(0 2px 5px rgba(190, 55, 100, 0.2));
        transform: translate(-50%, -50%) scale(0.55) rotate(${(Math.random() - 0.5) * 25}deg);
        opacity: 0.95;
        transition: transform ${duration}ms cubic-bezier(.2,.8,.3,1), opacity ${duration}ms ease-out;
      `;

      document.body.appendChild(heart);
      requestAnimationFrame(() => {
        heart.style.transform = `translate(calc(-50% + ${drift}px), -${35 + Math.random() * 30}px) scale(1) rotate(${(Math.random() - 0.5) * 35}deg)`;
        heart.style.opacity = "0";
      });
      window.setTimeout(() => heart.remove(), duration + 50);
    };

    const onMove = (event: MouseEvent) => {
      const now = performance.now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (now - lastSpawn < 55 || distance < 12) return;
      lastX = event.clientX;
      lastY = event.clientY;
      lastSpawn = now;
      spawnHeart(event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
