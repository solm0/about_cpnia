import { useEffect, useRef, useState } from "react";

export default function RevealSection({
  children,
  className = "",
  threshold = 0.16,
  rootMargin = "0px 0px -8% 0px",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <section
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className={`reveal-section ${className}`}
    >
      {children}
    </section>
  );
}
