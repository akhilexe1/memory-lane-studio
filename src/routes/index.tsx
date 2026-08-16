import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { FloatingHearts } from "@/components/FloatingHearts";
import { CursorHearts } from "@/components/CursorHearts";
import { DoodleHeart, Sparkle } from "@/components/Doodles";
import { Polaroid } from "@/components/Polaroid";
import { CamcorderClip } from "@/components/CamcorderClip";

import memory6 from "@/assets/memory-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Our Love Journey — A Private World of Memories" },
      { name: "description", content: "A private digital scrapbook for our favourite memories, photos, letters, milestones, and little moments." },
      { property: "og:title", content: "Our Love Journey — A Private World of Memories" },
      { property: "og:description", content: "Some memories are meant to stay between us." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Memory = { id: string; src: string; caption: string; date: string; rotate: number; tape: "left" | "right" | "both" | "none"; alt: string; w: number; h: number };

const seed: Memory[] = [
  { id: "1", src: "/memory1.jpg", caption: "the way you look at me", date: "", rotate: -2.5, tape: "left", alt: "A couple smiling at each other surrounded by lush green plants", w: 1153, h: 2048 },
  { id: "2", src: "/memory2.jpg", caption: "lost in her hair , found in her presence ", date: "", rotate: 1.8, tape: "both", alt: "A couple together among lush greenery", w: 1153, h: 2048 },
  { id: "3", src: "/memory3.jpg", caption: "the world feels right when i'm with you ♡", date: "", rotate: -1.2, tape: "right", alt: "A couple posing together in a lush tropical garden", w: 1152, h: 2048 },
  { id: "4", src: "/memory4.jpg", caption: "you're the safest place", date: "", rotate: 2.4, tape: "left", alt: "A couple together outdoors wearing matching white and black clothing", w: 1152, h: 2048 },
  { id: "5", src: "/memory5.jpg", caption: "us under the trees", date: "", rotate: -2, tape: "both", alt: "A couple standing together under green tree branches", w: 1153, h: 2048 },
  { id: "7", src: "/memory7.jpg", caption: "the day we met for the first time", date: "", rotate: 1.6, tape: "right", alt: "A couple taking a selfie together indoors", w: 1024, h: 577 },
];

const SECRET_PIN = "0108";

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [memories, setMemories] = useState<Memory[]>(seed);
  const [caption, setCaption] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [videoSessionActive, setVideoSessionActive] = useState(false);
  const resumeMusicAfterVideoRef = useRef(false);
  const videoSessionActiveRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const urlsRef = useRef<string[]>([]);

  const unlock = () => {
    if (pin === SECRET_PIN) {
      setPinError("");
      setUnlocking(true);
      window.setTimeout(() => {
        setUnlocked(true);
        setUnlocking(false);
      }, 700);
      return;
    }
    setPinError("Hmm… that isn't our secret code ❤️ Try again.");
    setShaking(true);
    setPin("");
    window.setTimeout(() => setShaking(false), 450);
  };

  useEffect(() => {
    if (!unlocked) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    const startMusic = async () => {
      if (videoSessionActiveRef.current || !audio.paused) return;
      try {
        await audio.play();
        if (!videoSessionActiveRef.current) setMusicPlaying(true);
        else audio.pause();
      } catch { setMusicPlaying(false); }
    };
    startMusic();
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((event) => window.addEventListener(event, startMusic, { once: true, passive: true }));
    return () => {
      events.forEach((event) => window.removeEventListener(event, startMusic));
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [unlocked]);

  const handleVideoPlay = () => {
    const audio = audioRef.current;
    videoSessionActiveRef.current = true;
    setVideoSessionActive(true);
    if (!audio) return;
    resumeMusicAfterVideoRef.current = !audio.paused;
    audio.pause();
    setMusicPlaying(false);
  };
  const handleVideoPause = () => setMusicPlaying(false);
  const handleVideoEnded = async () => {
    const shouldResume = resumeMusicAfterVideoRef.current;
    resumeMusicAfterVideoRef.current = false;
    videoSessionActiveRef.current = false;
    setVideoSessionActive(false);
    const audio = audioRef.current;
    if (!audio || !shouldResume) return;
    try { await audio.play(); setMusicPlaying(true); } catch { setMusicPlaying(false); }
  };
  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || videoSessionActiveRef.current) return;
    if (audio.paused) {
      try { await audio.play(); setMusicPlaying(true); } catch { setMusicPlaying(false); }
    } else { audio.pause(); setMusicPlaying(false); }
  };
  const onFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const added = Array.from(files).map((file, i) => {
      const url = URL.createObjectURL(file);
      urlsRef.current.push(url);
      return { id: `${Date.now()}-${i}`, src: url, caption: caption.trim() || "inkaa memories create chedhamaaaa???", date: new Date().toLocaleDateString("en-GB", { month: "short", year: "2-digit" }), rotate: [-2.6, 1.7, -1.4, 2.2][i % 4] ?? -2, tape: (["left", "both", "right"] as const)[i % 3] ?? "left", alt: caption.trim() || "Uploaded memory photo", w: 800, h: 1000 } satisfies Memory;
    });
    setMemories((m) => [...added, ...m]);
    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
  };

  if (!unlocked) {
    return (
      <main className={`relative min-h-screen overflow-hidden bg-[#f8eee8] text-[#5b1c31] ${shaking ? "animate-pulse" : ""}`}>
        <CursorHearts />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.75),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(184,79,109,0.12),transparent_30%),linear-gradient(135deg,#fbf3ee,#f4dfe2)]" />
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-[10%] top-[18%] animate-bounce text-xl text-[#9d6b73]">✦</div>
          <div className="absolute right-[15%] top-[24%] animate-pulse text-2xl text-[#b7a06f]">♡</div>
          <div className="absolute left-[18%] bottom-[22%] animate-pulse text-lg text-[#b7a06f]">✧</div>
          <div className="absolute right-[12%] bottom-[18%] animate-bounce text-xl text-[#9d6b73]">♡</div>
        </div>
        <section className={`relative z-10 flex min-h-screen items-center justify-center px-6 py-10 ${unlocking ? "opacity-0 transition-opacity duration-700" : "opacity-100"}`}>
          <div className={`w-full max-w-md rounded-[2rem] border border-[#b7a06f]/25 bg-[#fffaf7]/80 px-7 py-10 text-center shadow-[0_20px_80px_rgba(91,28,49,0.16)] backdrop-blur-md sm:px-10 ${shaking ? "animate-[wiggle_0.45s_ease-in-out]" : ""}`}>
            <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-[#b7a06f]/35 bg-[#f7dde1] text-4xl shadow-inner">♥</div>
            <p className="mt-5 font-hand text-xl text-[#9d6b73]">a little place for us</p>
            <h1 className="mt-1 font-display text-4xl font-black tracking-tight text-[#5b1c31] sm:text-5xl">Our Little World ❤️</h1>
            <p className="mx-auto mt-4 max-w-sm font-hand text-xl leading-relaxed text-[#7d4958]">Some memories are meant to stay between us.</p>
            <div className={`mx-auto mt-7 ${shaking ? "animate-[wiggle_0.45s_ease-in-out]" : ""}`}>
              <label className="sr-only" htmlFor="secret-pin">Our secret PIN</label>
              <input id="secret-pin" type="password" inputMode="numeric" autoComplete="off" maxLength={6} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setPinError(""); }} onKeyDown={(e) => { if (e.key === "Enter") unlock(); }} placeholder="••••" className="mx-auto block w-full max-w-xs rounded-2xl border border-[#b7a06f]/35 bg-white/80 px-5 py-3 text-center text-2xl tracking-[0.55em] text-[#5b1c31] outline-none ring-[#b05a72]/20 transition focus:ring-4" aria-describedby={pinError ? "pin-error" : undefined} />
              {pinError && <p id="pin-error" className="mt-3 font-hand text-base text-[#9a304f]">{pinError}</p>}
            </div>
            <button type="button" onClick={unlock} className="mt-6 w-full rounded-full bg-[#7a263f] px-6 py-3.5 text-sm font-semibold tracking-[0.18em] text-white uppercase shadow-lg shadow-[#7a263f]/20 transition hover:-translate-y-0.5 hover:bg-[#682036]">Enter into our world!!</button>
            <p className="mt-5 text-xs tracking-[0.2em] text-[#8d6b74] uppercase">Only we know the way in.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="grain relative min-h-screen overflow-hidden bg-background">
      <CursorHearts />
      <audio ref={audioRef} src="/Adiye-MassTamilan.fm.mp3" loop preload="auto" aria-label="Background music" />
      <button type="button" onClick={toggleMusic} aria-label={musicPlaying ? "Pause music" : "Play music"} title={videoSessionActive ? "Music resumes when the video finishes" : musicPlaying ? "Pause music" : "Play music"} className="fixed right-5 bottom-5 z-50 flex size-12 items-center justify-center rounded-full border border-primary/20 bg-card/95 text-xl shadow-lg backdrop-blur transition-transform hover:scale-110 disabled:cursor-not-allowed">{musicPlaying ? "♫" : "▶"}</button>
      <FloatingHearts />
      <DoodleHeart className="pointer-events-none absolute top-40 left-[4%] hidden size-12 text-primary/35 md:block" />
      <Sparkle className="animate-twinkle pointer-events-none absolute top-24 right-[8%] size-6 text-cherry/50" />
      <Sparkle className="animate-twinkle pointer-events-none absolute top-[52%] left-[3%] size-4 text-cherry/40" style={{ animationDelay: "1.2s" }} />
      <DoodleHeart className="pointer-events-none absolute top-[70%] right-[5%] hidden size-16 text-primary/25 md:block" />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24">
        <header className="relative pt-20 pb-14 text-center"><p className="font-hand text-2xl text-primary">est. a lifetime ago</p><h1 className="font-display mt-1 text-6xl leading-[0.95] font-black tracking-tight text-foreground sm:text-7xl md:text-8xl">YOU ,ME<span className="block text-primary italic">A LIFETIME OF MEMORIES</span></h1><div className="mx-auto mt-6 flex max-w-md items-center gap-3"><span className="h-px flex-1 bg-border" /><DoodleHeart className="size-5 text-primary" /><span className="h-px flex-1 bg-border" /></div><p className="font-hand mx-auto mt-5 max-w-lg text-2xl text-muted-foreground">Ammuluuuuu - A chapter I'd Relive Forever.......</p></header>
        <section className="relative mx-auto mb-16 max-w-xl"><div className="paper relative rounded-[3px] bg-card px-6 py-7" style={{ transform: "rotate(-0.8deg)" }}><span className="washi absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 -rotate-3" /><h2 className="font-display text-2xl font-bold text-foreground">Pin a new memory</h2><p className="font-hand mt-1 text-xl text-muted-foreground">write a little note, then stick your photo on the board</p><input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="inkaa memories create chedhamaaaa???" className="font-hand mt-4 w-full border-0 border-b border-border bg-transparent pb-2 text-xl text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary" /><input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} /><button type="button" onClick={() => fileRef.current?.click()} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold tracking-wide text-primary-foreground uppercase transition-transform duration-200 hover:scale-105"><DoodleHeart className="size-4" /> Add photo</button></div></section>
        <section className="columns-1 gap-8 sm:columns-2 lg:columns-3">{memories.slice(0, 3).map((m) => <Polaroid key={m.id} src={m.src} alt={m.alt} caption={m.caption} date={m.date} rotate={m.rotate} tape={m.tape} width={m.w} height={m.h} />)}<CamcorderClip poster={memory6} alt="Sunset sky seen from a car window on a road trip" caption="she won't" timestamp="08 12 1999" onVideoPlay={handleVideoPlay} onVideoPause={handleVideoPause} onVideoEnded={handleVideoEnded} />{memories.slice(3).map((m) => <Polaroid key={m.id} src={m.src} alt={m.alt} caption={m.caption} date={m.date} rotate={m.rotate} tape={m.tape} width={m.w} height={m.h} />)}<div className="paper relative mb-8 break-inside-avoid rounded-[3px] bg-beige px-6 py-8" style={{ transform: "rotate(1.6deg)" }}><span className="washi absolute -top-3 right-6 h-6 w-20 rotate-6" /><p className="font-hand text-2xl leading-snug text-foreground">"if I could keep one thing forever, it would be youuuuu and your memories....."</p><div className="mt-4 flex items-center gap-2"><DoodleHeart className="size-5 text-primary" /><Sparkle className="animate-twinkle size-4 text-cherry" /></div></div></section>
        <footer className="relative mt-16 text-center"><DoodleHeart className="mx-auto size-7 text-primary/60" /><p className="font-hand mt-2 text-xl text-muted-foreground">kept with love, always</p></footer>
      </main>
    </div>
  );
}
