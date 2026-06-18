import { useEffect, useRef, useState } from "react";
import VideoSkeleton from "./VideoSkeleton";
import { ensureVideoPreload } from "./videoPreload";
import { HERO_SHUFFLE_SOURCES } from "./videoSources";

function shuffle(list) {
  const clone = [...list];

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }

  return clone;
}

export default function HeroVideoShuffle() {
  const sources = HERO_SHUFFLE_SOURCES;
  const [slots, setSlots] = useState(() => [
    { src: sources[0] ?? "", ready: false },
    { src: sources[1] ?? sources[0] ?? "", ready: false },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = [useRef(null), useRef(null)];
  const slotsRef = useRef(slots);
  const activeIndexRef = useRef(activeIndex);
  const deckRef = useRef(shuffle(sources));

  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getNextSource = (exclude = []) => {
    const exclusionSet = new Set(exclude.filter(Boolean));
    let attempts = deckRef.current.length + sources.length;

    while (attempts > 0) {
      if (!deckRef.current.length) {
        deckRef.current = shuffle(sources);
      }

      const candidate = deckRef.current.shift();
      if (candidate && !exclusionSet.has(candidate)) {
        return candidate;
      }

      attempts -= 1;
    }

    return sources.find((source) => !exclusionSet.has(source)) ?? sources[0] ?? "";
  };

  const assignSlot = (slotIndex, src) => {
    if (!src) return;

    setSlots((prev) =>
      prev.map((slot, index) =>
        index === slotIndex ? { src, ready: false } : slot,
      ),
    );

    void ensureVideoPreload(src).catch(() => {});
  };

  const primeSlot = (slotIndex) => {
    const currentSlots = slotsRef.current;
    const nextSrc = getNextSource(currentSlots.map((slot) => slot.src));
    assignSlot(slotIndex, nextSrc);
  };

  useEffect(() => {
    sources.forEach((src) => {
      void ensureVideoPreload(src).catch(() => {});
    });
  }, [sources]);

  useEffect(() => {
    slots.forEach((slot, index) => {
      if (!slot.ready || index !== activeIndex) return;
      const video = videoRefs[index].current;
      if (!video) return;
      void video.play().catch(() => {});
    });
  }, [activeIndex, slots, videoRefs]);

  const handleLoaded = (slotIndex) => {
    setSlots((prev) =>
      prev.map((slot, index) =>
        index === slotIndex ? { ...slot, ready: true } : slot,
      ),
    );
  };

  const replayCurrent = () => {
    const currentVideo = videoRefs[activeIndexRef.current].current;
    if (!currentVideo) return;
    currentVideo.currentTime = 0;
    void currentVideo.play().catch(() => {});
  };

  const playNext = () => {
    const nextIndex = activeIndexRef.current === 0 ? 1 : 0;
    const nextSlot = slotsRef.current[nextIndex];

    if (!nextSlot?.ready) {
      primeSlot(nextIndex);
      replayCurrent();
      return;
    }

    setActiveIndex(nextIndex);
    primeSlot(activeIndexRef.current);
  };

  const activeSlot = slots[activeIndex];
  const isReady = activeSlot?.ready;

  return (
    <div className="relative flex w-full flex-col gap-2 overflow-hidden">
      <div className="relative aspect-video min-h-[18rem] w-full overflow-hidden md:min-h-[28rem] lg:rounded-4xl">
        {slots.map((slot, index) => {
          const isActive = index === activeIndex;

          return (
            <video
              key={`${index}-${slot.src}`}
              ref={videoRefs[index]}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out lg:rounded-4xl md:shadow-lg ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              autoPlay={isActive}
              muted
              playsInline
              preload="auto"
              onLoadedData={() => handleLoaded(index)}
              onCanPlay={() => handleLoaded(index)}
              onEnded={isActive ? playNext : undefined}
            >
              <source src={slot.src} />
            </video>
          );
        })}
        {!isReady && <VideoSkeleton roundedClassName="lg:rounded-4xl" />}
      </div>
    </div>
  );
}
