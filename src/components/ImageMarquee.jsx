const ITEMS = [
  "/entropy-npc-1.png",
  "/entropy-npc-2.png",
  "/entropy-npc-3.png",
  "/sacrifice-npc-1.png",
  "/sacrifice-npc-2.png",
  "/sacrifice-npc-3.png",
  "/time-npc-1.png",
  "/time-npc-2.png",
  "/time-npc-3.png",
  "/sacrifice-gameportal-1.png",
  "/sacrifice-gameportal-2.png",
];

export default function ImageMarquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden">
      <div className="flex w-max gap-3 animate-marquee-slow py-2">
        {doubled.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt=""
            loading="lazy"
            className="h-38 w-auto rounded-md object-cover md:h-50"
          />
        ))}
      </div>
    </div>
  );
}
