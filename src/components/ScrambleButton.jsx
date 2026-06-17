import { useEffect, useRef, useState } from "react";

const CHARS = ">_CPNIAWORLDVISIT";

export default function ScrambleButton({ text, href }) {
  const [label, setLabel] = useState(text);
  const frameRef = useRef(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

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
      iteration += 0.15;

      if (iteration <= target.length) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        timeoutRef.current = setTimeout(() => setLabel(text), 120);
      }
    };

    tick();
  };

  useEffect(() => {
    intervalRef.current = setInterval(startScramble, 5000);

    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={startScramble}
      onFocus={startScramble}
      className="mt-7 inline-flex items-center justify-center w-[25ch] py-4 md:py-6 font-logo text-3xl md:text-5xl uppercase tracking-[0.24em] transition-all duration-300 ease-in-out mb-21 bg-zinc-400 border-7 border-zinc-900 hover:bg-zinc-300"
    >
      {label}
    </a>
  );
}