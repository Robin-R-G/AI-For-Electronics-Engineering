// ponytail: client-side lesson content overrides + version history (no backend).

export interface LessonVersion {
  id: string;
  at: string; // ISO
  note: string;
  content: string;
}

export interface LessonEntry {
  slug: string;
  override: string | null; // markdown; null = use default TSX
  history: LessonVersion[];
}

const KEY = 'workshop_lessons_v1';

function read(): Record<string, LessonEntry> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, LessonEntry>) : {};
  } catch {
    return {};
  }
}

function write(data: Record<string, LessonEntry>): void {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getLessonOverride(slug: string): string | null {
  return read()[slug]?.override ?? null;
}

export function getLessonHistory(slug: string): LessonVersion[] {
  return [...(read()[slug]?.history ?? [])].sort((a, b) => b.at.localeCompare(a.at));
}

// Saves as a new version and sets the active override.
export function saveLessonContent(slug: string, content: string, note = 'edit'): void {
  const data = read();
  const entry = data[slug] ?? { slug, override: null, history: [] };
  entry.history.push({
    id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    at: new Date().toISOString(),
    note,
    content,
  });
  // cap history at 30 versions
  if (entry.history.length > 30) entry.history = entry.history.slice(-30);
  entry.override = content;
  data[slug] = entry;
  write(data);
  window.dispatchEvent(new Event('lessons-updated'));
}

export function restoreVersion(slug: string, versionId: string): string | null {
  const entry = read()[slug];
  const v = entry?.history.find((h) => h.id === versionId);
  return v?.content ?? null;
}

export function resetLesson(slug: string): void {
  const data = read();
  if (data[slug]) {
    data[slug].override = null;
    write(data);
    window.dispatchEvent(new Event('lessons-updated'));
  }
}

export function subscribeLessons(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener('lessons-updated', handler);
  return () => window.removeEventListener('lessons-updated', handler);
}
