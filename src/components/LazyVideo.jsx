import { useEffect, useRef, useState } from "react";
import VideoSkeleton from "./VideoSkeleton";
import { prefersLiteMediaLoad } from "./videoPreload";

export default function LazyVideo({
  src,
  className = "",
  loop = true,
  autoPlay = true,
  muted = true,
  playsInline = true,
  poster,
  onEnded,
  placeholderClassName = "aspect-video min-h-[14rem] md:min-h-[20rem]",
  roundedClassName = "rounded-3xl",
}) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const preloadMode = prefersLiteMediaLoad() ? "metadata" : "none";

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
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {active ? (
        <>
          <video
            className={`h-full w-full object-cover transition-opacity duration-500 ease-out md:shadow-lg ${roundedClassName} ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload={preloadMode}
            poster={poster}
            onLoadedData={() => setLoaded(true)}
            onCanPlay={() => setLoaded(true)}
            onEnded={onEnded}
          >
            <source src={src} />
          </video>
          {!loaded && <VideoSkeleton roundedClassName={roundedClassName} />}
        </>
      ) : (
        <div className={`relative w-full ${placeholderClassName}`}>
          <VideoSkeleton roundedClassName={roundedClassName} />
        </div>
      )}
    </div>
  );
}
