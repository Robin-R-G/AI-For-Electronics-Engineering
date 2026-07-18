// ponytail: client-side analytics (no backend). Events are captured in the
// visitor's own browser and aggregated here for the admin dashboard.
// Note: without a server this reflects local activity only.

import { recentUploads, storageUsage } from './storage';

export type AnalyticsEventType =
  | 'lesson_view'
  | 'resource_download'
  | 'quiz_attempt'
  | 'certificate_generated'
  | 'prompt_used'
  | 'search'
  | 'upload';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  at: string; // ISO timestamp
  payload: Record<string, string | number | boolean>;
}

const KEY = 'workshop_analytics_v1';
const MAX_EVENTS = 5000;

function read(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}

function write(events: AnalyticsEvent[]): void {
  localStorage.setItem(KEY, JSON.stringify(events));
}

export function track(
  type: AnalyticsEventType,
  payload: Record<string, string | number | boolean> = {}
): void {
  const events = read();
  events.push({ type, at: new Date().toISOString(), payload });
  if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
  write(events);
  window.dispatchEvent(new Event('analytics-updated'));
}

export function getEvents(): AnalyticsEvent[] {
  return read();
}

export function clearAnalytics(): void {
  write([]);
  window.dispatchEvent(new Event('analytics-updated'));
}

function topN(
  events: AnalyticsEvent[],
  type: AnalyticsEventType,
  key: string,
  labelKey: string,
  n = 5
): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of events) {
    if (e.type !== type) continue;
    const k = String(e.payload[key] ?? '');
    if (!k) continue;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([k, count]) => ({ label: String(events.find((e) => e.type === type && String(e.payload[key]) === k)?.payload[labelKey] ?? k), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

export interface AnalyticsSummary {
  mostViewedLesson: { label: string; count: number }[];
  mostDownloadedResource: { label: string; count: number }[];
  quizAttempts: number;
  quizCorrect: number;
  certificatesGenerated: number;
  popularPrompts: { label: string; count: number }[];
  searchTerms: { label: string; count: number }[];
  recentUploads: ReturnType<typeof recentUploads>;
  storage: ReturnType<typeof storageUsage>;
}

export function summarize(): AnalyticsSummary {
  const events = read();
  const quiz = events.filter((e) => e.type === 'quiz_attempt');
  const certGenerated = events
    .filter((e) => e.type === 'certificate_generated')
    .reduce((sum, e) => sum + (Number(e.payload.count) || 0), 0);

  return {
    mostViewedLesson: topN(events, 'lesson_view', 'slug', 'title'),
    mostDownloadedResource: topN(events, 'resource_download', 'name', 'name'),
    quizAttempts: quiz.length,
    quizCorrect: quiz.filter((e) => e.payload.correct === true).length,
    certificatesGenerated: certGenerated,
    popularPrompts: topN(events, 'prompt_used', 'title', 'title'),
    searchTerms: topN(events, 'search', 'term', 'term'),
    recentUploads: recentUploads(8),
    storage: storageUsage(),
  };
}

export function subscribeAnalytics(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener('analytics-updated', handler);
  return () => window.removeEventListener('analytics-updated', handler);
}
