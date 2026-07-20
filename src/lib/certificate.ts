import { CertificateSettings } from './settings';

// ponytail: client-side certificate rendering + dependency-free PDF generation.
// PDFs are built by embedding each certificate canvas as a DCTDecode (JPEG)
// image XObject — universal viewer support, zero deps.

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image-load-failed'));
    img.src = src;
  });
}

// Draw an image contained within a box (preserve aspect ratio).
function drawContained(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  boxW: number,
  boxH: number
) {
  const ratio = Math.min(boxW / img.width, boxH / img.height);
  const w = img.width * ratio;
  const h = img.height * ratio;
  ctx.drawImage(img, x + (boxW - w) / 2, y + (boxH - h) / 2, w, h);
}

export async function renderCertificate(
  canvas: HTMLCanvasElement,
  s: CertificateSettings,
  name: string
): Promise<void> {
  const W = 1200;
  const H = 850;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.textAlign = 'left';

  // background + border
  ctx.fillStyle = 'var(--color-dark-slate)';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, W - 40, H - 40);
  ctx.strokeStyle = '#f59e0b33';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  // top logos
  if (s.institutionLogo) {
    try {
      const img = await loadImage(s.institutionLogo);
      drawContained(ctx, img, 70, 55, 120, 120);
    } catch { /* skip broken image */ }
  }
  if (s.ieeeEnabled && s.ieeeLogo) {
    try {
      const img = await loadImage(s.ieeeLogo);
      drawContained(ctx, img, W - 190, 55, 120, 120);
    } catch { /* skip broken image */ }
  }

  // top accent label
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#f59e0b');
  grad.addColorStop(1, '#ef4444');
  ctx.fillStyle = grad;
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('★  CERTIFICATE OF COMPLETION  ★', W / 2, 110);

  // title + subtitle
  ctx.fillStyle = '#e6edf3';
  ctx.font = 'bold 52px sans-serif';
  ctx.fillText(s.certTitle, W / 2, 190);
  ctx.fillStyle = '#8b949e';
  ctx.font = '26px sans-serif';
  ctx.fillText(s.certSubtitle, W / 2, 230);

  // divider
  ctx.strokeStyle = '#f59e0b55';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(300, 260);
  ctx.lineTo(W - 300, 260);
  ctx.stroke();

  // body text (supports \n)
  ctx.fillStyle = '#8b949e';
  ctx.font = '22px sans-serif';
  const bodyLines = s.bodyText.split('\n');
  let by = 310;
  for (const line of bodyLines) {
    ctx.fillText(line, W / 2, by);
    by += 32;
  }

  // name box
  ctx.fillStyle = 'rgba(245,158,11,0.08)';
  ctx.beginPath();
  ctx.roundRect(W / 2 - 300, by + 10, 600, 70, 8);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b44';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(W / 2 - 300, by + 10, 600, 70, 8);
  ctx.stroke();
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(name || 'Participant Name', W / 2, by + 53);

  // details line
  ctx.fillStyle = '#8b949e';
  ctx.font = '18px sans-serif';
  ctx.fillText(s.detailsLine, W / 2, by + 130);

  // instructor + signature (left/center)
  const sigY = 600;
  ctx.textAlign = 'center';
  if (s.signatureImage) {
    try {
      const sig = await loadImage(s.signatureImage);
      drawContained(ctx, sig, W / 2 - 200, sigY - 70, 200, 70);
    } catch { /* skip */ }
  }
  ctx.fillStyle = '#e6edf3';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(s.instructorName, W / 2, sigY + 25);
  ctx.fillStyle = '#8b949e';
  ctx.font = '18px sans-serif';
  ctx.fillText(s.instructorTitle, W / 2, sigY + 55);

  // date
  ctx.fillStyle = '#8b949e';
  ctx.font = '16px sans-serif';
  ctx.fillText(s.dateLabel, W / 2, sigY + 110);
  ctx.textAlign = 'left';
}

// ── PDF generation ────────────────────────────────────────────────
function canvasToJpeg(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error('render-failed'));
      blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
    }, 'image/jpeg', 0.92);
  });
}

async function canvasesToPdfBlob(canvases: HTMLCanvasElement[]): Promise<Blob> {
  const jpegs = await Promise.all(canvases.map(canvasToJpeg));

  const enc = (str: string) => new TextEncoder().encode(str);
  const bin = (arr: number[]) => new Uint8Array(arr);

  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let cursor = 0;
  const push = (u: Uint8Array, objNum?: number) => {
    if (objNum !== undefined) offsets[objNum] = cursor;
    parts.push(u);
    cursor += u.length;
  };

  const N = canvases.length;
  const firstPageNum = 3;
  const firstContentNum = 3 + 2 * N;

  push(enc('%PDF-1.3\n'));
  push(bin([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a])); // binary hint

  push(enc('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'), 1);
  push(
    enc(
      `2 0 obj\n<< /Type /Pages /Kids [${canvases
        .map((_, i) => `${firstPageNum + 2 * i} 0 R`)
        .join(' ')}] /Count ${N} >>\nendobj\n`
    ),
    2
  );

  canvases.forEach((canvas, i) => {
    const pageNum = firstPageNum + 2 * i;
    const imgNum = pageNum + 1;
    const contentNum = firstContentNum + i;
    const w = canvas.width;
    const h = canvas.height;
    const jpeg = jpegs[i];
    const content = `q ${w} 0 0 ${h} 0 0 cm /Im0 Do Q`;

    push(
      enc(
        `${pageNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] ` +
          `/Resources << /XObject << /Im0 ${imgNum} 0 R >> >> /Contents ${contentNum} 0 R >>\nendobj\n`
      ),
      pageNum
    );
    push(
      enc(
        `${imgNum} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} ` +
          `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`
      ),
      imgNum
    );
    push(jpeg);
    push(enc('\nendstream\nendobj\n'));
    push(
      enc(`${contentNum} 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`),
      contentNum
    );
  });

  const objCount = 2 + 3 * N;
  const xrefStart = cursor;
  let xref = enc(`xref\n0 ${objCount + 1}\n0000000000 65535 f \n`);
  for (let i = 1; i <= objCount; i++) {
    xref = concatByte(xref, enc(`${offsets[i].toString().padStart(10, '0')} 00000 n \n`));
  }

  const trailer = enc(
    `trailer\n<< /Size ${objCount + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`
  );
  return new Blob([concatAll([...parts, xref, trailer])], { type: 'application/pdf' });
}

function concatByte(a: Uint8Array<ArrayBufferLike>, b: Uint8Array<ArrayBufferLike>) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

function concatAll(arrs: Uint8Array<ArrayBufferLike>[]) {
  let len = 0;
  for (const a of arrs) len += a.length;
  const out = new Uint8Array(len);
  let off = 0;
  for (const a of arrs) {
    out.set(a, off);
    off += a.length;
  }
  return out;
}

export async function canvasToPdfBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return canvasesToPdfBlob([canvas]);
}

export async function canvasesToPdf(canvases: HTMLCanvasElement[]): Promise<Blob> {
  return canvasesToPdfBlob(canvases);
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCanvasPng(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, filename);
  }, 'image/png');
}
