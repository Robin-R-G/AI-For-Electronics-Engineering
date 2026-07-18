import { NextRequest, NextResponse } from 'next/server';
import {
  validateFile,
  storeFile,
  deleteStoredFile,
  listStoredFiles,
  getAuditLog,
  verifySession,
} from '@/lib/fileStore';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const session = verifySession(req.headers.get('authorization'));
  if (!session) return unauthorized();

  const scope = req.nextUrl.searchParams.get('scope');
  if (scope === 'audit') {
    return NextResponse.json(await getAuditLog());
  }
  return NextResponse.json(await listStoredFiles());
}

export async function POST(req: NextRequest) {
  const session = verifySession(req.headers.get('authorization'));
  if (!session) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const validation = validateFile(file.name, file.type, buffer.length, buffer);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const stored = await storeFile(buffer, file.name, session.email);
    return NextResponse.json(stored, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed', details: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = verifySession(req.headers.get('authorization'));
  if (!session) return unauthorized();

  try {
    const { url } = (await req.json()) as { url: string };
    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }
    const deleted = await deleteStoredFile(url, session.email);
    if (!deleted) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
