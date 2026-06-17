import { useMemo, useState } from "react";

const ITEMS = [
  { image: "/screenshot-9-25.png", date: "2025.9.25" },
  { image: "/screenshot-9-27.png", date: "2025.9.27" },
  { image: "/screenshot-9-29.png", date: "2025.9.29" },
  { image: "/screenshot-10-1.png", date: "2025.10.1" },
  { image: "/screenshot-10-5.png", date: "2025.10.5" },
  { image: "/screenshot-10-20.png", date: "2025.10.20" },
  { image: "/screenshot-11-4.png", date: "2025.11.4" },
];

function wrap(index, length) {
  return (index + length) % length;
}

export default function BehindCarousel() {
  const [current, setCurrent] = useState(0);
  const slides = useMemo(() => {
    const prev = ITEMS[wrap(current - 1, ITEMS.length)];
    const active = ITEMS[current];
    const next = ITEMS[wrap(current + 1, ITEMS.length)];

    return { prev, active, next };
  }, [current]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col gap-21">
        <div className="flex justify-end gap-7 font-bold">
          <button
            type="button"
            onClick={() => setCurrent((value) => wrap(value - 1, ITEMS.length))}
            className="text-2xl text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 flex justify-center items-center"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setCurrent((value) => wrap(value + 1, ITEMS.length))}
            className="text-2xl text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 flex justify-center items-center"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        <div className="grid items-center gap-4 grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,0.8fr)] py-14 md:py-21">
          {[slides.prev, slides.active, slides.next].map((item, index) => {
            const isActive = index === 1;
            return (
              <button
                key={`${item.image}-${item.date}`}
                type="button"
                onClick={() => {
                  if (index === 0) setCurrent((value) => wrap(value - 1, ITEMS.length));
                  if (index === 2) setCurrent((value) => wrap(value + 1, ITEMS.length));
                }}
                className={`transition-all duration-500 ${
                  isActive ? "scale-200 md:scale-150 opacity-100 z-20" : "scale-90 opacity-40 hover:opacity-70"
                }`}
              >
                <div className="overflow-visible md:shadow-lg border border-zinc-900/5 rounded-md md:rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.date}
                    className={`w-full rounded-md md:rounded-2xl object-cover`}
                  />
                </div>
                <p className="mt-1 text-center text-[6px] md:text-xs text-zinc-500">{item.date}</p>
              </button>
            );
          })}
        </div>
      </div>

      
    </div>
  );
}
