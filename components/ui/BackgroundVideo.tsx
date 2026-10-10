"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type NetworkInformation = { saveData?: boolean };

function getReduceMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReduceMotionServer(): boolean {
  return false;
}
function subscribeReduceMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSaveData(): boolean {
  const nav = navigator as Navigator & { connection?: NetworkInformation };
  return nav.connection?.saveData === true;
}
function getSaveDataServer(): boolean {
  return false;
}
function subscribeSaveData(callback: () => void) {
  const nav = navigator as Navigator & { connection?: EventTarget };
  nav.connection?.addEventListener?.("change", callback);
  return () => nav.connection?.removeEventListener?.("change", callback);
}

const MOBILE_QUERY = "(max-width: 767px)";

function getIsMobileViewport(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}
function getIsMobileViewportServer(): boolean {
  return false;
}
function subscribeViewport(callback: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

type BackgroundVideoProps = {
  /** Desktop/default source. */
  srcMp4: string;
  /** Smaller source served at <=767px viewport width, or under save-data
   * (falls back to `srcMp4` for both if omitted). */
  srcMp4Mobile?: string;
  poster: string;
  /** Alt text used for the poster image. */
  alt: string;
  priority?: boolean;
};

/**
 * Full-bleed autoplay/loop/muted background video. The poster is always
 * rendered as a real `next/image` (so it gets Next's LCP preload treatment
 * regardless of which branch below is active) and the video — once a
 * source is actually chosen — fades in on top only once it reports
 * `onPlaying`, so there's never a blank/black flash while it buffers; the
 * poster stays the visible/paintable layer the whole time.
 *
 * Skips the video entirely under `prefers-reduced-motion: reduce` or
 * `navigator.connection.saveData` (poster-only). Otherwise picks the
 * smaller `srcMp4Mobile` at <=767px viewport width or under save-data, the
 * full `srcMp4` otherwise. Includes a pause/play control (WCAG 2.2.2).
 *
 * All three checks use `useSyncExternalStore` with a server snapshot that
 * always matches the client's first paint, so there's no hydration
 * mismatch — these only update to their real values on a normal
 * post-hydration re-render.
 */
export function BackgroundVideo({ srcMp4, srcMp4Mobile, poster, alt, priority }: BackgroundVideoProps) {
  const reduceMotion = useSyncExternalStore(subscribeReduceMotion, getReduceMotion, getReduceMotionServer);
  const saveData = useSyncExternalStore(subscribeSaveData, getSaveData, getSaveDataServer);
  const isMobileViewport = useSyncExternalStore(subscribeViewport, getIsMobileViewport, getIsMobileViewportServer);

  const shouldPlay = !reduceMotion && !saveData;
  const useMobileSource = isMobileViewport || saveData;
  const activeSrc = (useMobileSource && srcMp4Mobile) || srcMp4;

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // If the active source changes (e.g. resizing across the mobile
  // breakpoint while already playing), reset the "ready to reveal" state
  // for the new <video> element instead of immediately showing it at full
  // opacity before it can actually play. Adjusting state during render
  // (rather than in an effect) per the source-changed-from-last-render
  // comparison below is the React-documented way to do this safely.
  const [trackedSrc, setTrackedSrc] = useState(activeSrc);
  if (activeSrc !== trackedSrc) {
    setTrackedSrc(activeSrc);
    setVideoPlaying(false);
  }

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

  // Attached natively (not via React's onPlaying prop) because with a tiny
  // local/cached video file, playback can start fast enough that the
  // "playing" event fires before this effect's listener is attached on a
  // fresh mount — so we also check the already-playing case directly,
  // rather than relying on catching the event itself.
  useEffect(() => {
    const video = videoRef.current;
    if (!shouldPlay || !video) return;

    function reveal() {
      setVideoPlaying(true);
    }

    if (!video.paused && video.readyState >= 3) {
      reveal();
    }
    video.addEventListener("playing", reveal);
    return () => video.removeEventListener("playing", reveal);
  }, [shouldPlay, activeSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src={poster} alt={alt} fill priority={priority} className="object-cover" />

      {shouldPlay && (
        <video
          key={activeSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoPlaying ? 1 : 0 }}
        >
          <source src={activeSrc} type="video/mp4" />
        </video>
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
