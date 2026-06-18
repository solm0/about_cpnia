export default function VideoSkeleton({
  className = "",
  label = "Loading...",
  roundedClassName = "rounded-3xl",
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-zinc-200/90 text-xs uppercase tracking-[0.35em] text-zinc-500 animate-pulse ${roundedClassName} ${className}`}
    >
      {label}
    </div>
  );
}
