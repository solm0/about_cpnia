const ITEMS = [
  "/dp_goods_1.jpg",
  "/dp_goods_2.jpg",
  "/dp_screen.jpg",
];

export default function ImageMarquee3() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden pt-21 md:pt-0">
      <div className="flex w-max gap-3 animate-marquee-slower">
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
