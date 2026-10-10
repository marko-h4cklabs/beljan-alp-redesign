"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";

type NetworkInformation = { saveData?: boolean };

function getShouldPlaySnapshot(): boolean {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as Navigator & { connection?: NetworkInformation };
  const saveData = nav.connection?.saveData === true;
  return !reduceMotion && !saveData;
}

function getShouldPlayServerSnapshot(): boolean {
  // Unknown on the server — default to the poster (no video request) until
  // the client upgrades this on first paint, matching the "no video on
  // reduced-motion/save-data" rule for the common case where we can't tell.
  return false;
}

function subscribeToMotionPreference(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

type BackgroundVideoProps = {
  srcMp4: string;
  srcWebm?: string;
  poster: string;
  /** Alt text used only for the reduced-motion/save-data image fallback. */
  alt: string;
  priority?: boolean;
};

/**
 * Full-bleed autoplay/loop/muted background video with a poster-image
 * fallback — used for the same effect a missing/not-yet-uploaded video file
 * also produces (the <video> element just shows its poster if the src
 * 404s), so this works correctly before the real .mp4/.webm are dropped in.
 *
 * Skips loading the video entirely under `prefers-reduced-motion: reduce`
 * or `navigator.connection.saveData`, serving the poster as a static image
 * instead. Includes a small pause/play control per WCAG 2.2.2 (auto-playing
 * content should be user-pausable).
 */
export function BackgroundVideo({ srcMp4, srcWebm, poster, alt, priority }: BackgroundVideoProps) {
  const shouldPlay = useSyncExternalStore(
    subscribeToMotionPreference,
    getShouldPlaySnapshot,
    getShouldPlayServerSnapshot,
  );
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePause() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shouldPlay ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="h-full w-full object-cover"
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={srcMp4} type="video/mp4" />
        </video>
      ) : (
        <Image src={poster} alt={alt} fill priority={priority} className="object-cover" />
      )}

      {shouldPlay && (
        <button
          type="button"
          onClick={togglePause}
          aria-label={paused ? "Pokreni video" : "Zaustavi video"}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 text-cream backdrop-blur-sm transition-colors hover:bg-ink/60"
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7Z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 5h4v14H7Zm6 0h4v14h-4Z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
