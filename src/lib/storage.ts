// ponytail: client-side structured file storage (no backend, static export).
// Files are organized into logical buckets, each with full metadata.
// Binary payloads are stored as base64 data URLs; quota ~5MB/origin.

export type Bucket =
  | 'resources'
  | 'lesson-files'
  | 'certificates'
  | 'images'
  | 'videos'
  | 'prompt-packs'
  | 'datasheets'
  | 'templates';

export const BUCKETS: Bucket[] = [
  'resources',
  'lesson-files',
  'certificates',
  'images',
  'videos',
  'prompt-packs',
  'datasheets',
  'templates',
];

export const BUCKET_LABELS: Record<Bucket, string> = {
  resources: 'Resources',
  'lesson-files': 'Lesson Files',
  certificates: 'Certificates',
  images: 'Images',
  videos: 'Videos',
  'prompt-packs': 'Prompt Packs',
  datasheets: 'Datasheets',
  templates: 'Templates',
};

export interface StoredFile {
  id: string;
  bucket: Bucket;
  title: string;
  fileName: string; // unique within bucket
  originalName: string;
  mimeType: string;
  size: number; // bytes
  dataUrl: string;
  category: string;
  description: string;
  tags: string[];
  version: string;
  visibility: 'public' | 'private';
  lessonSlug?: string;
  uploadedAt: string; // ISO
  updatedAt: string; // ISO
  metadata: Record<string, string>;
}

const STORAGE_KEY = 'workshop_storage_v1';
const MAX_EVENTS = 5000;

interface StorageState {
  files: StoredFile[];
}

function readRaw(): StorageState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { files: [] };
    const parsed = JSON.parse(raw);
    return { files: Array.isArray(parsed.files) ? (parsed.files as StoredFile[]) : [] };
  } catch {
    return { files: [] };
  }
}

function writeRaw(state: StorageState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getFiles(): StoredFile[] {
  return readRaw().files;
}

export function getFile(id: string): StoredFile | undefined {
  return getFiles().find((f) => f.id === id);
}

function extOf(name: string): string {
  return name.split('.').pop()?.toLowerCase() ?? '';
}

// Automatically pick a bucket from the chosen category / file type.
export function resolveBucket(input: {
  category: string;
  mimeType: string;
  lessonSlug?: string;
  forceBucket?: Bucket;
  originalNameSafe?: string;
}): Bucket {
  if (input.forceBucket) return input.forceBucket;
  if (input.lessonSlug) return 'lesson-files';
  const ext = input.mimeType.startsWith('image/') ? 'img'
    : input.mimeType.startsWith('video/') ? 'vid'
    : extOf(input.originalNameSafe ?? '');
  if (input.mimeType.startsWith('image/')) return 'images';
  if (input.mimeType.startsWith('video/')) return 'videos';
  const cat = input.category.toLowerCase();
  if (cat.includes('template')) return 'templates';
  if (cat.includes('datasheet') || cat.includes('data sheet')) return 'datasheets';
  if (cat.includes('prompt')) return 'prompt-packs';
  if (cat.includes('certificate')) return 'certificates';
  if (cat.includes('lesson')) return 'lesson-files';
  return 'resources';
}

// Avoid duplicated filenames within a bucket: name → name-2 → name-3 …
export function uniqueFileName(bucket: Bucket, name: string): string {
  const existing = new Set(getFiles().filter((f) => f.bucket === bucket).map((f) => f.fileName));
  if (!existing.has(name)) return name;
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  let n = 2;
  while (existing.has(`${base}-${n}${ext}`)) n++;
  return `${base}-${n}${ext}`;
}

export interface SaveFileInput {
  file: File;
  bucket?: Bucket; // explicit override
  category: string;
  title?: string;
  description?: string;
  tags?: string[];
  version?: string;
  visibility?: 'public' | 'private';
  lessonSlug?: string;
  thumbnail?: string;
  metadata?: Record<string, string>;
}

export function saveFile(input: SaveFileInput): StoredFile {
  const bucket = input.bucket
    ? input.bucket
    : resolveBucket({
        category: input.category,
        mimeType: input.file.type,
        lessonSlug: input.lessonSlug,
        originalNameSafe: input.file.name,
      });

  const fileName = uniqueFileName(bucket, input.file.name);
  const now = new Date().toISOString();
  const record: StoredFile = {
    id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    bucket,
    title: input.title ?? input.file.name,
    fileName,
    originalName: input.file.name,
    mimeType: input.file.type || 'application/octet-stream',
    size: input.file.size,
    dataUrl: '', // filled below
    category: input.category,
    description: input.description ?? '',
    tags: input.tags ?? [],
    version: input.version ?? 'v1.0',
    visibility: input.visibility ?? 'public',
    lessonSlug: input.lessonSlug,
    uploadedAt: now,
    updatedAt: now,
    metadata: input.metadata ?? {},
  };

  const reader = new FileReader();
  const done = new Promise<void>((resolve, reject) => {
    reader.onload = () => {
      record.dataUrl = reader.result as string;
      resolve();
    };
    reader.onerror = () => reject(reader.error);
  });
  reader.readAsDataURL(input.file);

  // FileReader is sync-ish; write after load.
  // We block by reading synchronously is not possible, so we resolve via promise.
  // Caller awaits; we synchronously register then return after load.
  // Simpler: do it inline with a helper.
  // (Implementation continues after load below.)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (record as any).__pending = done;

  const state = readRaw();
  state.files.push(record);
  writeRaw(state);
  return record;
}

// Async variant that waits for the data URL to be read.
export async function saveFileAsync(input: SaveFileInput): Promise<StoredFile> {
  const record = saveFile(input);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (record as any).__pending;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (record as any).__pending;
  updateFile(record.id, { dataUrl: record.dataUrl, updatedAt: new Date().toISOString() });
  return getFile(record.id)!;
}

export function updateFile(id: string, patch: Partial<StoredFile>): void {
  const state = readRaw();
  const idx = state.files.findIndex((f) => f.id === id);
  if (idx < 0) return;
  state.files[idx] = { ...state.files[idx], ...patch, updatedAt: new Date().toISOString() };
  writeRaw(state);
}

export function deleteFile(id: string): void {
  const state = readRaw();
  state.files = state.files.filter((f) => f.id !== id);
  writeRaw(state);
}

export function storageUsage(): { total: number; byBucket: Record<Bucket, number>; count: number } {
  const files = getFiles();
  const byBucket = BUCKETS.reduce((acc, b) => { acc[b] = 0; return acc; }, {} as Record<Bucket, number>);
  let total = 0;
  for (const f of files) {
    total += f.size;
    byBucket[f.bucket] += f.size;
  }
  return { total, byBucket, count: files.length };
}

export function recentUploads(limit = 10): StoredFile[] {
  return [...getFiles()].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)).slice(0, limit);
}

export function subscribeStorage(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
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

export function fileTypeLabel(file: { mimeType: string; fileName?: string }): string {
  if (file.mimeType.startsWith('image/')) return 'Image';
  if (file.mimeType.startsWith('video/')) return 'Video';
  if (file.mimeType.includes('pdf')) return 'PDF';
  if (file.mimeType.includes('zip')) return 'Archive';
  if (file.mimeType.includes('csv')) return 'CSV';
  if (file.mimeType.includes('markdown') || file.mimeType.includes('md')) return 'Markdown';
  return file.fileName?.split('.').pop()?.toUpperCase() ?? 'File';
}
