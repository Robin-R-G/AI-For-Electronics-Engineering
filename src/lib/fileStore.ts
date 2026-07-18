import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const AUDIT_LOG = path.join(process.cwd(), 'src', 'data', 'audit.jsonl');
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'ee-workshop-admin-2026-hmac';

// ── Allowed extensions → MIME types ─────────────────────────────────
const ALLOWED: Record<string, string[]> = {
  pdf: ['application/pdf'],
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  zip: ['application/zip'],
  txt: ['text/plain'],
  csv: ['text/csv'],
  md: ['text/markdown'],
};

// ── Magic bytes for content validation ──────────────────────────────
// ponytail: only checking the most commonly spoofed types
const MAGIC: Record<string, RegExp> = {
  pdf: /^%PDF/,
  png: /^\x89PNG\r\n\x1a\n/,
  jpg: /^\xff\xd8\xff/,
  jpeg: /^\xff\xd8\xff/,
  zip: /^PK\x03\x04/,
};

// ── Filename sanitization ───────────────────────────────────────────
export function sanitizeFilename(name: string): string {
  let s = name.replace(/[\x00-\x1f\x7f]/g, '');       // strip control chars
  s = s.replace(/[<>:"/\\|?*]/g, '_');                   // replace FS unsafe chars
  s = s.replace(/^\.+/, '');                             // strip leading dots
  s = s.replace(/\s+/g, '_');                            // spaces → underscores
  s = s.replace(/\.{2,}/g, '.');                         // collapse runs of dots
  s = s.replace(/[^a-zA-Z0-9._-]/g, '_');                // whitelist safe chars
  return s.substring(0, 255);                            // cap length
}

export function generateUniqueName(ext: string): string {
  const uuid = crypto.randomUUID();
  return `${uuid}.${ext.replace(/^\./, '')}`;
}

// ── File validation ─────────────────────────────────────────────────
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateExtension(filename: string): ValidationResult {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  if (!ext) return { valid: false, error: 'File has no extension' };
  if (!(ext in ALLOWED)) return { valid: false, error: `Extension .${ext} is not allowed` };
  return { valid: true };
}

export function validateContentType(filename: string, mimeType: string): ValidationResult {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  const allowedTypes = ALLOWED[ext];
  if (!allowedTypes) return { valid: false, error: 'Unknown extension' };
  if (!allowedTypes.includes(mimeType)) {
    return { valid: false, error: `MIME type "${mimeType}" does not match extension .${ext}` };
  }
  return { valid: true };
}

export function validateFileSize(size: number): ValidationResult {
  if (size <= 0) return { valid: false, error: 'File is empty' };
  if (size > MAX_FILE_SIZE) {
    return { valid: false, error: `File exceeds ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)} MB limit` };
  }
  return { valid: true };
}

export function validateMagicBytes(filename: string, buffer: Buffer): ValidationResult {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  const signature = MAGIC[ext];
  if (!signature) return { valid: true }; // no magic check for this type
  const header = buffer.subarray(0, Math.max(16, signature.source.length));
  if (!signature.test(header)) {
    return { valid: false, error: `Content does not match expected format for .${ext}` };
  }
  return { valid: true };
}

// ponytail: rejects scripts/configs/executables disguised with safe extensions
const DANGEROUS_PATTERNS = [
  /<script[\s>]/i,
  /\?php/i,
  /<%=\s*/,
  /powershell/i,
  /eval\s*\(/i,
];

export function validateContent(buffer: Buffer): ValidationResult {
  const text = buffer.toString('utf-8').substring(0, 4096);
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(text)) {
      return { valid: false, error: 'File content appears malicious' };
    }
  }
  return { valid: true };
}

export function validateFile(
  filename: string,
  mimeType: string,
  size: number,
  buffer: Buffer
): ValidationResult {
  const checks = [
    validateExtension(filename),
    validateContentType(filename, mimeType),
    validateFileSize(size),
    validateMagicBytes(filename, buffer),
    validateContent(buffer),
  ];
  for (const check of checks) {
    if (!check.valid) return check;
  }
  return { valid: true };
}

// ── Auth ────────────────────────────────────────────────────────────
export interface AdminSession {
  email: string;
  role: string;
  iat: number;
  exp: number;
  sig: string;
}

export function verifySession(authHeader: string | null): AdminSession | null {
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    const session = JSON.parse(authHeader.slice(7)) as AdminSession;
    if (Date.now() > session.exp) return null;
    const data = Buffer.from(
      JSON.stringify({ email: session.email, role: session.role, iat: session.iat, exp: session.exp })
    ).toString('base64');
    const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(data).digest('hex');
    if (expected !== session.sig) return null;
    return session;
  } catch {
    return null;
  }
}

// ── Storage ─────────────────────────────────────────────────────────
export interface StoredFile {
  url: string;          // public URL path
  fileName: string;     // original name
  uniqueName: string;   // stored name
  fileType: string;     // extension
  fileSize: number;     // bytes
  uploadedBy: string;   // admin email
  uploadedAt: string;   // ISO
}

export async function storeFile(
  buffer: Buffer,
  originalName: string,
  adminEmail: string
): Promise<StoredFile> {
  const ext = originalName.split('.').pop()?.toLowerCase() ?? '';
  const safeName = sanitizeFilename(originalName);
  const uniqueName = generateUniqueName(ext);
  const urlPath = `/uploads/${uniqueName}`;

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, uniqueName), buffer);

  const file: StoredFile = {
    url: urlPath,
    fileName: safeName,
    uniqueName,
    fileType: ext.toUpperCase(),
    fileSize: buffer.length,
    uploadedBy: adminEmail,
    uploadedAt: new Date().toISOString(),
  };

  await appendAudit({ action: 'UPLOAD', ...file });
  return file;
}

export async function deleteStoredFile(url: string, adminEmail: string): Promise<boolean> {
  const uniqueName = path.basename(url);
  const filePath = path.join(UPLOAD_DIR, uniqueName);

  try {
    await fs.unlink(filePath);
    await appendAudit({ action: 'DELETE', url, uniqueName, deletedBy: adminEmail, deletedAt: new Date().toISOString() });
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw err;
  }
}

// ── Audit log ───────────────────────────────────────────────────────
// ponytail: append-only JSONL, no indexing. Rotate or db when it hits 100k lines.
export async function appendAudit(entry: Record<string, unknown>): Promise<void> {
  await fs.mkdir(path.dirname(AUDIT_LOG), { recursive: true });
  await fs.appendFile(AUDIT_LOG, JSON.stringify(entry) + '\n', 'utf8');
}

export interface AuditEntry {
  action: 'UPLOAD' | 'DELETE';
  url?: string;
  fileName?: string;
  uniqueName?: string;
  fileType?: string;
  fileSize?: number;
  uploadedBy?: string;
  uploadedAt?: string;
  deletedBy?: string;
  deletedAt?: string;
  timestamp?: string;
}

export async function getAuditLog(limit = 100): Promise<AuditEntry[]> {
  try {
    const raw = await fs.readFile(AUDIT_LOG, 'utf8');
    const lines = raw.trim().split('\n').filter(Boolean);
    const entries = lines.map(l => JSON.parse(l) as AuditEntry);
    // ponytail: server-side only, small dataset, reverse in memory is fine
    return entries.reverse().slice(0, limit);
  } catch {
    return [];
  }
}

// ── List stored files ───────────────────────────────────────────────
export async function listStoredFiles(): Promise<StoredFile[]> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const entries = await fs.readdir(UPLOAD_DIR, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter(e => e.isFile())
      .map(async e => {
        const stat = await fs.stat(path.join(UPLOAD_DIR, e.name));
        return {
          url: `/uploads/${e.name}`,
          fileName: e.name,
          uniqueName: e.name,
          fileType: e.name.split('.').pop()?.toUpperCase() ?? '',
          fileSize: stat.size,
          uploadedAt: stat.mtime.toISOString(),
        } as StoredFile;
      })
  );
  return files.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}
