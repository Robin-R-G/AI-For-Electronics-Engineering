import crypto from 'crypto';

// ── Password hashing ──────────────────────────────────────────────
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// ── Simple JWT-like token (HMAC-SHA256) ───────────────────────────
const SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me';
const EXPIRY_HOURS = parseInt(process.env.SESSION_EXPIRY_HOURS || '24', 10);

export interface AdminPayload {
  email: string;
  role: 'admin';
  iat: number; // issued at (epoch ms)
  exp: number; // expiry (epoch ms)
}

export function createToken(email: string): string {
  const now = Date.now();
  const payload: AdminPayload = {
    email,
    role: 'admin',
    iat: now,
    exp: now + EXPIRY_HOURS * 60 * 60 * 1000,
  };

  const data = btoa(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  return `${data}.${sig}`;
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    const [data, sig] = token.split('.');
    if (!data || !sig) return null;

    const expectedSig = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
    if (sig !== expectedSig) return null;

    const payload: AdminPayload = JSON.parse(atob(data));
    if (Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

// ── Credential validation ─────────────────────────────────────────
export function validateCredentials(
  email: string,
  password: string
): boolean {
  const validEmail = process.env.ADMIN_EMAIL;
  const validHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validEmail || !validHash) return false;
  return email === validEmail && verifyPassword(password, validHash);
}
