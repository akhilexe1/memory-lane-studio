import { useEffect } from "react";

export function CursorHearts() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const active = new Set<HTMLSpanElement>();
    let lastX = -100;
    let lastY = -100;
    let lastSpawn = 0;

    const spawn = (x: number, y: number) => {
      if (active.size >= 18) return;

      const heart = document.createElement("span");
      const size = 10 + Math.random() * 9;
      const drift = (Math.random() - 0.5) * 44;
      const rise = 34 + Math.random() * 34;
      const duration = 700 + Math.random() * 450;

      heart.textContent = Math.random() > 0.2 ? "♥" : "♡";
      heart.setAttribute("aria-hidden", "true");
      heart.style.position = "fixed";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.zIndex = "99999";
      heart.style.pointerEvents = "none";
      heart.style.userSelect = "none";
      heart.style.fontSize = `${size}px`;
      heart.style.lineHeight = "1";
      heart.style.color = Math.random() > 0.5 ? "#f06a91" : "#e94f7d";
      heart.style.opacity = "0.95";
      heart.style.transform = "translate(-50%, -50%) scale(.55)";
      heart.style.transition = `transform ${duration}ms cubic-bezier(.2,.8,.3,1), opacity ${duration}ms ease-out`;

      active.add(heart);
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(calc(-50% + ${drift}px), -${rise}px) scale(1) rotate(${(Math.random() - 0.5) * 30}deg)`;
        heart.style.opacity = "0";
      });

      window.setTimeout(() => {
        active.delete(heart);
        heart.remove();
      }, duration + 60);
    };

    const onMove = (event: MouseEvent) => {
      const now = performance.now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (now - lastSpawn < 55 || distance < 10) return;
      lastX = event.clientX;
      lastY = event.clientY;
      lastSpawn = now;
      spawn(event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      active.forEach((heart) => heart.remove());
      active.clear();
    };
  }, []);

  return null;
}
