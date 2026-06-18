const preloadRegistry = new Map();

function createPreloader(src) {
  if (typeof document === "undefined") {
    return { status: "idle", promise: Promise.resolve(src) };
  }

  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  video.src = src;

  let resolvePromise;
  let rejectPromise;

  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  const entry = {
    promise,
    status: "loading",
    video,
  };

  const markReady = () => {
    entry.status = "ready";
    resolvePromise(src);
  };

  const markError = () => {
    entry.status = "error";
    rejectPromise(new Error(`Failed to preload video: ${src}`));
  };

  video.addEventListener("loadeddata", markReady, { once: true });
  video.addEventListener("canplaythrough", markReady, { once: true });
  video.addEventListener("error", markError, { once: true });
  video.load();

  return entry;
}

export function ensureVideoPreload(src) {
  if (!src) return Promise.resolve("");

  const existing = preloadRegistry.get(src);
  if (existing) return existing.promise;

  const entry = createPreloader(src);
  preloadRegistry.set(src, entry);
  return entry.promise;
}

export function warmVideoCache(sources) {
  sources.forEach((src) => {
    void ensureVideoPreload(src).catch(() => {});
  });
}

export function isVideoReady(src) {
  return preloadRegistry.get(src)?.status === "ready";
}
