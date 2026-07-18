// ponytail: pure quiz randomization — balanced category coverage + recency-aware
// selection + per-attempt shuffle. No DOM/storage here so it stays testable.

export interface QuizItem {
  id: string;
  category?: string;
  difficulty?: string;
}

export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface GenerateSessionOptions {
  sessionSize?: number;
  recentSessions?: string[][]; // most recent first; used to avoid recent repeats
  rng?: () => number;
}

// id -> index of the most recent attempt it appeared in (0 = last attempt)
function buildRecency(recentSessions: string[][]): Map<string, number> {
  const m = new Map<string, number>();
  recentSessions.forEach((ids, idx) => {
    ids.forEach((id) => {
      if (!m.has(id)) m.set(id, idx);
    });
  });
  return m;
}

export function generateQuizSession<T extends QuizItem>(
  bank: T[],
  options: GenerateSessionOptions = {}
): T[] {
  const { sessionSize, recentSessions = [], rng = Math.random } = options;
  const size = sessionSize && sessionSize > 0 ? Math.min(sessionSize, bank.length) : bank.length;
  if (size === 0) return [];

  const recency = buildRecency(recentSessions);

  // Group by category so each category gets fair representation (intelligent balance).
  const buckets = new Map<string, T[]>();
  for (const item of bank) {
    const key = item.category ?? '_uncategorized';
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(item);
  }
  const cats = [...buckets.keys()];

  // Distribute `size` slots across categories as evenly as possible, capped by
  // each category's pool size, topping up round-robin until filled.
  const allocated = new Map<string, number>();
  cats.forEach((c) => allocated.set(c, Math.min(Math.floor(size / cats.length), buckets.get(c)!.length)));
  let filled = [...allocated.values()].reduce((a, b) => a + b, 0);
  let ci = 0;
  while (filled < size) {
    const c = cats[ci % cats.length];
    if (allocated.get(c)! < buckets.get(c)!.length) {
      allocated.set(c, allocated.get(c)! + 1);
      filled++;
    }
    ci++;
    if (ci > cats.length * size + cats.length) break; // safety against infinite loop
  }

  const session: T[] = [];
  for (const c of cats) {
    const take = allocated.get(c)!;
    if (take === 0) continue;
    // Within a category, prefer least-recently-asked. Recently-asked get a
    // higher score so they sort later (deprioritized); most-recent = highest.
    const pool = buckets
      .get(c)!
      .map((item) => ({
        item,
        score: (recency.has(item.id) ? recency.get(item.id)! + 1 : 0) + rng() * 0.5,
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, take)
      .map((x) => x.item);
    session.push(...pool);
  }

  return shuffle(session, rng);
}
