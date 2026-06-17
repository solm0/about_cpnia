import { useEffect, useMemo, useRef, useState } from "react";

const MOVIE_FILES = [
  "3_ontime_stair.mp4",
  "4_ontime_poker.mp4",
  "5_ontime_slot.mov",
  "6_ontime_slotstage.mov",
  "7_ontime_roulette.mov",
  "8_pizzashoot_npc.mp4",
  "9_pizzashoot_shot.mp4",
  "10_pizzashoot_pizza.mp4",
  "11_pizzashoot_pizzacutter.mp4",
  "12_pizzashoot_seek.mp4",
  "13_entropy_break.mp4",
  "13_entropy_stage2.mp4",
  "14_entropy.mp4",
  "15_entropy_stage3.mp4",
  "16_entropy_run.mov",
];

function pickRandom(list, current) {
  const pool = list.filter((item) => item !== current);
  if (!pool.length) return current ?? list[0];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function HeroVideoShuffle() {
  const sources = useMemo(
    () => MOVIE_FILES.map((file) => `/movies/${file}`),
    [],
  );
  const [loadedSources, setLoadedSources] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentSrc, setCurrentSrc] = useState("");
  const videoRef = useRef(null);
  const seenRef = useRef(new Set());
  const currentRef = useRef("");

  useEffect(() => {
    currentRef.current = currentSrc;
  }, [currentSrc]);

  useEffect(() => {
    const preloaders = sources.map((src) => {
      const preloader = document.createElement("video");
      preloader.preload = "metadata";
      preloader.muted = true;
      preloader.src = src;

      const handleLoaded = () => {
        if (seenRef.current.has(src)) return;
        seenRef.current.add(src);
        setLoadedSources((prev) => [...prev, src]);
        setQueue((prev) =>
          currentRef.current && currentRef.current !== src ? [...prev, src] : prev,
        );
        setCurrentSrc((prev) => prev || src);
      };

      preloader.addEventListener("loadeddata", handleLoaded, { once: true });
      preloader.load();
      return preloader;
    });

    return () => {
      preloaders.forEach((preloader) => {
        preloader.pause();
        preloader.removeAttribute("src");
        preloader.load();
      });
    };
  }, [sources]);

  useEffect(() => {
    if (!currentSrc || !videoRef.current) return;
    videoRef.current.load();
    void videoRef.current.play().catch(() => {});
  }, [currentSrc]);

  const playNext = () => {
    setQueue((prev) => {
      if (prev.length) {
        const [next, ...rest] = prev;
        setCurrentSrc(next);
        return rest;
      }

      setCurrentSrc((prevSrc) => pickRandom(loadedSources, prevSrc));
      return prev;
    });
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col gap-2">
      {currentSrc ? (
        <video
          ref={videoRef}
          key={currentSrc}
          className="h-full w-full object-cover lg:rounded-4xl"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={playNext}
        >
          <source src={currentSrc} />
        </video>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.5em] text-zinc-500">
          Loading video...
        </div>
      )}
      <p className="text-xs text-center opacity-30">동영상이 멈췄다면 새로고침 부탁드립니다.</p>
    </div>
  );
}
