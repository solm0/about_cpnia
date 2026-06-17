const ITEMS = [
  "/screenshot_1.png",
  "/screenshot_2.png",
  "/screenshot_3.png",
  "/screenshot_4.png",
  "/screenshot_5.png",
  "/screenshot_6.png",
  "/screenshot_7.png",
  "/screenshot_8.png",
  "/screenshot_9.png",
  "/screenshot_10.png",
  "/screenshot_11.png",
];

export default function ImageMarquee2() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden">
      <div className="flex w-max gap-3 animate-marquee-slower py-2">
        {doubled.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt=""
            loading="lazy"
            className="h-64 w-auto rounded-md object-cover md:h-96"
          />
        ))}
      </div>
    </div>
  );
}
