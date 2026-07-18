// ponytail: client-side auth for GitHub Pages static export.
// Credentials hashed with SHA-256 via Web Crypto API — no server, no Node.js crypto.

const SESSION_KEY = 'admin_session';
const RATE_KEY = 'admin_rate';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes

// ── Admin credentials (hashed) ─────────────────────────────────────
// Only ONE admin: Robin R G
// Password hash generated with: SHA-256("Admin@2026!")
// This is inherently visible in client bundle for static sites — acceptable for
// a single-admin educational platform, not for multi-user SaaS.
const ADMIN_EMAIL = 'robin@ai-ee-workshop.com';
const ADMIN_PASSWORD_HASH = 'f0ce0e86206541c60bc47be815f83eba98004f63c883e6d71ff5cc929cb5f9ca';

// ── SHA-256 hashing via Web Crypto API ─────────────────────────────
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── HMAC-SHA256 for token signing ──────────────────────────────────
const TOKEN_SECRET = 'ee-workshop-admin-2026-hmac';

async function hmacSign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(TOKEN_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Rate limiting ──────────────────────────────────────────────────
interface RateData {
  attempts: number;
  lockedUntil: number;
}

function getRateData(): RateData {
  try {
    const raw = sessionStorage.getItem(RATE_KEY);
    if (!raw) return { attempts: 0, lockedUntil: 0 };
    const data = JSON.parse(raw);
    if (Date.now() > data.lockedUntil) return { attempts: 0, lockedUntil: 0 };
    return data;
  } catch {
    return { attempts: 0, lockedUntil: 0 };
  }
}

function recordFailedAttempt(): { allowed: boolean; remaining: number; lockoutSeconds: number } {
  const data = getRateData();
  data.attempts += 1;
  if (data.attempts >= MAX_ATTEMPTS) {
    data.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  sessionStorage.setItem(RATE_KEY, JSON.stringify(data));
  const locked = Date.now() < data.lockedUntil;
  return {
    allowed: !locked,
    remaining: Math.max(0, MAX_ATTEMPTS - data.attempts),
    lockoutSeconds: locked ? Math.ceil((data.lockedUntil - Date.now()) / 1000) : 0,
  };
}

function clearRateLimit(): void {
  sessionStorage.removeItem(RATE_KEY);
}

// ── Session management ─────────────────────────────────────────────
export interface AdminSession {
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
  sig: string;
}

function createSessionPayload(email: string) {
  const now = Date.now();
  return {
    email,
    role: 'admin' as const,
    iat: now,
    exp: now + 24 * 60 * 60 * 1000, // 24 hours
  };
}

export async function createSession(email: string): Promise<string> {
  const payload = createSessionPayload(email);
  const data = btoa(JSON.stringify(payload));
  const sig = await hmacSign(data);
  const session: AdminSession = { ...payload, sig };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return JSON.stringify(session);
}

export async function verifySession(): Promise<AdminSession | null> {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    if (Date.now() > session.exp) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    // Verify HMAC signature
    const data = btoa(JSON.stringify({
      email: session.email,
      role: session.role,
      iat: session.iat,
      exp: session.exp,
    }));
    const expectedSig = await hmacSign(data);
    if (session.sig !== expectedSig) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function destroySession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

// ── Login ──────────────────────────────────────────────────────────
export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; lockoutSeconds?: number }> {
  // Rate limit check
  const rate = getRateData();
  if (Date.now() < rate.lockedUntil) {
    const lockoutSeconds = Math.ceil((rate.lockedUntil - Date.now()) / 1000);
    return { success: false, error: 'Too many attempts. Try again later.', lockoutSeconds };
  }

  const passwordHash = await sha256(password);

  if (email !== ADMIN_EMAIL || passwordHash !== ADMIN_PASSWORD_HASH) {
    const result = recordFailedAttempt();
    if (!result.allowed) {
      return { success: false, error: 'Too many failed attempts. Locked for 5 minutes.', lockoutSeconds: result.lockoutSeconds };
    }
    return { success: false, error: `Invalid credentials. ${result.remaining} attempts remaining.` };
  }

  clearRateLimit();
  await createSession(email);
  return { success: true };
}

// ── Get session (sync, for UI) ─────────────────────────────────────
export function getSessionSync(): AdminSession | null {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    if (Date.now() > session.exp) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}
