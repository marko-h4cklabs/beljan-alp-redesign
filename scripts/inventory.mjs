import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const BASE = 'https://www.beljan-alp.com';
const ROOT = path.resolve(import.meta.dirname, '..');
const MEDIA_DIR = path.join(ROOT, '_inventory', 'media');
const SCREENSHOT_DIR = path.join(ROOT, '_inventory', 'screenshots');
const DATA_DIR = path.join(ROOT, '_inventory', 'data');

fs.mkdirSync(MEDIA_DIR, { recursive: true });
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(destPath);
        return download(res.headers.location, destPath).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// Mapping: descriptive filename -> source URL, based on manual inventory of the site.
const MEDIA_MAP = [
  // logo
  { file: 'logo-badge.png', url: `${BASE}/assets/logo-new-BwO5iOG9.png`, note: 'Header/footer circular logo (monogram B)' },
  // hero + why-us videos
  { file: 'home-hero-bg.mp4', url: 'https://agzshlajheodpkbpvhfe.supabase.co/storage/v1/object/public/hero-videos/hero-bg.mp4', note: 'Homepage hero background video, autoplay/loop/muted' },
  { file: 'home-why-us-bg.mp4', url: 'https://agzshlajheodpkbpvhfe.supabase.co/storage/v1/object/public/hero-videos/why-us.mp4', note: 'Homepage "Zašto odabrati baš nas?" section background video' },
  // homepage "work" gallery (6 images shown in horizontal scroller) - gallery-1..6
  { file: 'home-work-01-rusenje-visokog-stabla.jpg', url: `${BASE}/assets/gallery-1-BF19jCsE.jpg`, note: 'Naši radovi: Rušenje visokog stabla (RUŠENJE DRVEĆA)' },
  { file: 'home-work-02-rad-na-visini.jpg', url: `${BASE}/assets/gallery-2-iImq91EZ.jpg`, note: 'Naši radovi: Rad na visini (RUŠENJE DRVEĆA)' },
  { file: 'home-work-03-alpinisticko-rusenje.jpg', url: `${BASE}/assets/gallery-3-BrZurbg-.jpg`, note: 'Naši radovi: Alpinističko rušenje (SKRAĆIVANJE KROŠNJE)' },
  { file: 'home-work-04-rad-u-krosnji.jpg', url: `${BASE}/assets/gallery-4-D7HJWbDf.jpg`, note: 'Naši radovi: Rad u krošnji (RUŠENJE DRVEĆA)' },
  { file: 'home-work-05-tehnika-rusenja.png', url: `${BASE}/assets/gallery-5-COkCXLBF.png`, note: 'Naši radovi: Tehnika rušenja (OREZIVANJE DRVEĆA)' },
  { file: 'home-work-06-zimsko-orezivanje.png', url: `${BASE}/assets/gallery-6-BINu3ObA.png`, note: 'Naši radovi: Zimsko orezivanje' },
  // about section photo
  { file: 'about-alfonz-beljan.png', url: `${BASE}/assets/about-worker-CEdicxrv.png`, note: 'O nama: Alfonz Beljan - stručnjak za rušenje drveća' },
  // gallery page images 7-10 (new) + reused 2,3
  { file: 'gallery-07-rad-s-dizalicom.jpg', url: `${BASE}/assets/gallery-7-BeMAy4UG.jpg`, note: 'Galerija: Rad s Dizalicom (RUŠENJE DRVEĆA)' },
  { file: 'gallery-08-penjanje-na-smreku.jpg', url: `${BASE}/assets/gallery-8-DBbT5QLG.jpg`, note: 'Galerija: Penjanje na Smreku (ALPINISTIČKO RUŠENJE)' },
  { file: 'gallery-09-rusenje-breze.jpg', url: `${BASE}/assets/gallery-9-16lXRLlP.jpg`, note: 'Galerija: Rušenje Breze (RUŠENJE DRVEĆA)' },
  { file: 'gallery-10-rad-u-krosnji.jpg', url: `${BASE}/assets/gallery-10-Bdu4z-Su.jpg`, note: 'Galerija: Rad u Krošnji (RUŠENJE DRVEĆA)' },
  // gallery-3 and gallery-2 reused on /galerija with different alt text, already downloaded above as home-work-03 / home-work-02
  // privacy policy PDF
  { file: 'politika-privatnosti.pdf', url: 'https://agzshlajheodpkbpvhfe.supabase.co/storage/v1/object/public/documents/politika-privatnosti.pdf', note: 'Privacy policy PDF linked from footer' },
  { file: 'favicon.ico', url: `${BASE}/favicon.ico`, note: 'Favicon' },
];

console.log('Downloading media files...');
for (const item of MEDIA_MAP) {
  const dest = path.join(MEDIA_DIR, item.file);
  try {
    await download(item.url, dest);
    const stat = fs.statSync(dest);
    console.log(`  OK  ${item.file}  (${(stat.size / 1024).toFixed(0)} KB)  <- ${item.url}`);
  } catch (e) {
    console.log(`  FAIL ${item.file}: ${e.message}`);
  }
}

fs.writeFileSync(path.join(DATA_DIR, 'media-map.json'), JSON.stringify(MEDIA_MAP, null, 2));

// Screenshots
const routes = [
  { route: '/', name: 'home' },
  { route: '/izbornik', name: 'izbornik' },
  { route: '/galerija', name: 'galerija' },
];

const browser = await chromium.launch();

async function scrollThrough(page) {
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 400;
  for (let y = 0; y < scrollHeight; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

for (const { route, name } of routes) {
  // Desktop
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.emulateMedia({ reducedMotion: 'reduce' });
  await desktopPage.goto(BASE + route, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  await scrollThrough(desktopPage);
  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, `${name}-desktop.png`), fullPage: true });
  console.log(`Screenshot: ${name}-desktop.png`);
  await desktopPage.close();

  // Mobile
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobilePage.emulateMedia({ reducedMotion: 'reduce' });
  await mobilePage.goto(BASE + route, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await scrollThrough(mobilePage);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, `${name}-mobile.png`), fullPage: true });
  console.log(`Screenshot: ${name}-mobile.png`);
  await mobilePage.close();
}

await browser.close();
console.log('Done.');
