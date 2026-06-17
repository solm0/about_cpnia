import { useEffect, useRef, useState } from "react";

export default function LazyVideo({
  src,
  className = "",
  loop = true,
  autoPlay = true,
  muted = true,
  playsInline = true,
  poster,
  onEnded,
}) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {active ? (
        <video
          className="h-full w-full object-cover md:rounded-3xl md:shadow-lg"
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          poster={poster}
          onEnded={onEnded}
        >
          <source src={src} />
        </video>
      ) : (
        <div className="h-full w-full animate-pulse bg-zinc-200 rounded-lg" />
      )}
    </div>
  );
}
