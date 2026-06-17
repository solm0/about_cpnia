import { useEffect, useRef, useState } from "react";

const CHARS = "CPNIAWORLDVISIT";

export default function ScrambleButton({ text, href }) {
  const [label, setLabel] = useState(text);
  const frameRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const startScramble = () => {
    cancelAnimationFrame(frameRef.current);
    clearTimeout(timeoutRef.current);

    let iteration = 0;
    const target = text.split("");

    const tick = () => {
      const next = target
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setLabel(next);
      iteration += 0.2;

      if (iteration <= target.length) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        timeoutRef.current = setTimeout(() => setLabel(text), 120);
      }
    };

    tick();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={startScramble}
      onFocus={startScramble}
      className="inline-flex items-center justify-center border-2 border-zinc-900 px-8 py-6 font-logo text-5xl uppercase tracking-[0.24em] transition-all duration-300 ease-in-out mt-21 mb-28"
    >
      {label}
    </a>
  );
}
