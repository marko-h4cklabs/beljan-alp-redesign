# Media Guide

Where every image/video lives, what format it should end up in, and whether it's
still a placeholder from the old site or a final asset. Source originals (as crawled
from the live site) are kept in `_inventory/media/` for reference; this guide tracks
the **processed, in-use copies under `/public`**.

To swap in a better photo later: replace the file at the same path with the same
filename, commit, push — Vercel redeploys automatically and `next/image` handles
re-optimizing it. No code changes needed.

## Images

| Page / section | File (`/public/images/...`) | Dimensions (max long edge) | Status |
|---|---|---|---|
| Header & footer (all pages), `/izbornik` (large) | `shared/logo-badge.png` | 1920×1886 (native) | ✅ uploaded |
| `/` work gallery #1 | `home/work-01-rusenje-visokog-stabla.jpg` | 2000px | ⏳ placeholder (inventory copy, not yet re-compressed) |
| `/` work gallery #2 · reused on `/galerija` as "Uklanjanje Stabla" | `home/work-02-rad-na-visini.jpg` | 2000px | ⏳ placeholder |
| `/` work gallery #3 · reused on `/galerija` as "Visinski Rad" | `home/work-03-alpinisticko-rusenje.jpg` | 2000px | ⏳ placeholder |
| `/` work gallery #4 | `home/work-04-rad-u-krosnji.jpg` | 2000px | ⏳ placeholder |
| `/` work gallery #5 | `home/work-05-tehnika-rusenja.png` | 2000px | ⏳ placeholder (currently PNG, will become JPG in step 6) |
| `/` work gallery #6 | `home/work-06-zimsko-orezivanje.png` | 2000px | ⏳ placeholder (currently PNG, will become JPG in step 6) |
| `/` about section | `home/about-alfonz-beljan.png` | 2000px | ⏳ placeholder (currently PNG, will become JPG in step 6) |
| `/galerija` #1 | `gallery/07-rad-s-dizalicom.jpg` | 2000px | ⏳ placeholder |
| `/galerija` #2 | `gallery/08-penjanje-na-smreku.jpg` | 2000px | ⏳ placeholder |
| `/galerija` #3 | `gallery/09-rusenje-breze.jpg` | 2000px | ⏳ placeholder |
| `/galerija` #4 | `gallery/10-rad-u-krosnji.jpg` | 2000px | ⏳ placeholder |

"Placeholder" here means: the raw file downloaded from the live site, not yet
re-encoded to the target spec (JPG quality ~85, capped at 2000px). They're good enough
to build the layout against; a pass to re-compress them is part of step 6
(performance pass) unless you'd rather swap in higher-resolution originals before then.

## Videos

| Page / section | File | Spec | Status |
|---|---|---|---|
| `/` hero background (desktop) | `/public/videos/hero.mp4` | 1280×720, H.264, 30fps, no audio, 10s loop, CRF 30 | ✅ uploaded (1.7 MB) |
| `/` hero background (mobile, ≤767px viewport or save-data) | `/public/videos/hero-mobile.mp4` | 960×540, H.264, 30fps, no audio, 10s loop, CRF 32 | ✅ uploaded (684 KB) |
| `/` hero poster (LCP image; shown immediately, video fades in once playing) | `/public/images/hero-poster.jpg` | 1280×720 | ✅ uploaded (149 KB) — extracted frame from the real video |
| `/` "Zašto odabrati baš nas?" background | `/public/videos/home-why-us-bg.mp4` | ≤ 2.5 MB, 1920×1080, H.264, no audio | ❌ **waiting on you** — not yet provided |
| `/` "Zašto odabrati baš nas?" poster | `/public/videos/home-why-us-poster.jpg` | 1920×1080 | ⏳ placeholder — currently a copy of `work-04-rad-u-krosnji.jpg` |

**Hero video provenance:** the source you pointed me to
(`~/Desktop/beljan-website/hero-video/hero-video.mp4`, 36 MB, 1280×720, 60fps, 18.6s,
with audio) actually contains two different scenes — 0–8s is a cemetery (crane truck
trimming trees between rows of gravestones), 8–18.6s is a worker climbing a bare tree
right next to an apartment building. Per your call, the hero loop uses only the
apartment-building segment (trimmed to the 8.6s–18.6s range, cut mid-transition-blur
on the cemetery side to avoid it). Re-encoded at 30fps (from 60), stripped audio, and
compressed with x264 — all three files are under the 20 MB git threshold by a wide
margin, so no Git LFS/external storage discussion was needed this time.

## Legal

| Item | File | Status |
|---|---|---|
| Privacy policy (download link on `/politika-privatnosti`) | `/public/legal/politika-privatnosti.pdf` | ❌ **waiting on you** — drop the downloaded original in `_inventory/media/politika-privatnosti.pdf`; the HTML page's text also needs to be transcribed from it |

## Favicon / manifest

| Item | File | Status |
|---|---|---|
| Browser tab icon | `app/icon.png` | ⏳ placeholder — using the raw logo file as-is; a proper cropped/padded multi-size favicon set (`icon.png`, `apple-icon.png`, `manifest.ts`) is built in step 6 (SEO pass) |

## OG image

| Item | Status |
|---|---|
| Social share image (`opengraph-image`, 1200×630) | ❌ not started — built programmatically in step 6, replacing Lovable's default |
