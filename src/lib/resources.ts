// ponytail: server-backed resource store. Resources persist to the project
// folder (src/data/resources.json) via /api/admin/resources (Node server).
// A client cache + listeners keep useSyncExternalStore live across tabs.

export const RESOURCE_CATEGORIES = ['Document', 'Code', 'Template', 'Presentation'] as const;

export const SUPPORTED_FORMATS = [
  'pdf', 'pptx', 'docx', 'zip', 'png', 'jpg', 'jpeg', 'txt', 'csv', 'md',
] as const;

export type ResourceVisibility = 'public' | 'private';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  version: string;
  tags: string[];
  visibility: ResourceVisibility;
  displayOrder: number;
  associatedLesson: string; // docs slug, '' = none
  thumbnail: string; // data URL, '' = none
  fileName: string;
  fileType: string; // extension, uppercase
  fileSize: string; // human readable
  fileData: string; // base64 data URL
  uploadedAt: string; // ISO date
}

export function isSupportedFile(name: string): boolean {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return (SUPPORTED_FORMATS as readonly string[]).includes(ext);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let size = bytes / 1024;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[i]}`;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// ── Client cache + live updates ──────────────────────────────────
let cache: Resource[] = [];
let sortedCache: Resource[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach(l => l());
}

function setCache(items: Resource[]): void {
  cache = items;
  sortedCache = [...items].sort(
    (a, b) => a.displayOrder - b.displayOrder || a.uploadedAt.localeCompare(b.uploadedAt)
  );
}

setCache([]);

export function getResources(): Resource[] {
  return sortedCache;
}

export function getResourcesByLesson(slug: string): Resource[] {
  return sortedCache.filter(
    r => r.associatedLesson === slug && r.visibility === 'public'
  );
}

export async function refreshResources(): Promise<void> {
  try {
    const res = await fetch('/api/admin/resources', { cache: 'no-store' });
    if (res.ok) {
      setCache((await res.json()) as Resource[]);
      loaded = true;
      emit();
    }
  } catch {
    // server unreachable — keep existing cache
  }
}

export function subscribeResources(cb: () => void): () => void {
  listeners.add(cb);
  if (!loaded) refreshResources();
  return () => {
    listeners.delete(cb);
  };
}

function authHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem('admin_session');
    if (!raw) return {};
    return { Authorization: `Bearer ${raw}` };
  } catch {
    return {};
  }
}

export async function saveResource(resource: Resource): Promise<void> {
  try {
    await fetch('/api/admin/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(resource),
    });
    await refreshResources();
  } catch {
    // surface via UI refresh; store unchanged
  }
}

export async function deleteResource(id: string): Promise<void> {
  try {
    await fetch(`/api/admin/resources?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeader(),
    });
    await refreshResources();
  } catch {
    // surface via UI refresh; store unchanged
  }
}
