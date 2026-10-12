const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

/**
 * Best-effort in-memory rate limit, keyed by IP. Only persists for the
 * lifetime of one warm serverless instance — it does NOT coordinate across
 * concurrent/different instances, so it's not a true distributed rate
 * limit. Still meaningfully slows down a single bad actor hammering the
 * form. For a stronger guarantee, add Vercel's Firewall rate limiting
 * (dashboard-configurable, no code/dependency) or a shared store like
 * Upstash Redis if abuse actually becomes a problem.
 */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_REQUESTS;
}
