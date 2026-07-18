'use client';
import React, { useEffect, useState, useRef } from 'react';
import { getSessionSync, destroySession, AdminSession } from '@/lib/adminAuth';
import { docsSections } from '@/lib/docsConfig';
import {
  StoredFile,
  Bucket,
  BUCKETS,
  BUCKET_LABELS,
  getFiles,
  saveFile,
  deleteFile,
  subscribeStorage,
  fileTypeLabel,
  formatBytes,
} from '@/lib/storage';
import {
  CertificateSettings,
  DEFAULT_SETTINGS,
  getSettings,
  saveSettings,
  resetSettings,
  fileToDataUrl as settingsFileToDataUrl,
} from '@/lib/settings';
import {
  renderCertificate,
  canvasToPdfBlob,
  canvasesToPdf,
  downloadBlob,
  downloadCanvasPng,
} from '@/lib/certificate';
import {
  summarize,
  track,
  clearAnalytics,
  subscribeAnalytics,
} from '@/lib/analytics';
import {
  getLessonOverride,
  getLessonHistory,
  saveLessonContent,
  restoreVersion,
  resetLesson,
  subscribeLessons,
} from '@/lib/lessonContent';
import MarkdownView from '@/lib/markdown';
import styles from './page.module.css';

type Tab =
  | 'overview'
  | 'upload'
  | 'storage'
  | 'certificate'
  | 'analytics'
  | 'lessons';

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState<AdminSession | null>(() => getSessionSync());
  const [tab, setTab] = useState<Tab>('overview');
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    if (!admin) window.location.replace('/AI-For-Electronics-Engineering/admin/login');
  }, [admin]);

  useEffect(() => {
    const load = () => setFileCount(getFiles().length);
    load();
    return subscribeStorage(load);
  }, []);

  const handleLogout = () => {
    destroySession();
    window.location.replace('/AI-For-Electronics-Engineering/admin/login');
  };

  if (!admin) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingSpinner}>
          <span className={styles.spinner}></span>
          <p>Verifying access…</p>
        </div>
      </div>
    );
  }

  const sessionExpires = new Date(admin.exp).toLocaleString();

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>⚡</div>
          <span className={styles.logoText}>EE Workshop Admin</span>
        </div>
        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${tab === 'overview' ? styles.activeNav : ''}`} onClick={() => setTab('overview')}>
            📊 Overview
          </button>
          <button className={`${styles.navItem} ${tab === 'upload' ? styles.activeNav : ''}`} onClick={() => setTab('upload')}>
            ⬆ Upload Resource
          </button>
          <button className={`${styles.navItem} ${tab === 'storage' ? styles.activeNav : ''}`} onClick={() => setTab('storage')}>
            🗂 Storage ({fileCount})
          </button>
          <button className={`${styles.navItem} ${tab === 'certificate' ? styles.activeNav : ''}`} onClick={() => setTab('certificate')}>
            🎖 Certificate
          </button>
          <button className={`${styles.navItem} ${tab === 'analytics' ? styles.activeNav : ''}`} onClick={() => setTab('analytics')}>
            📈 Analytics
          </button>
          <button className={`${styles.navItem} ${tab === 'lessons' ? styles.activeNav : ''}`} onClick={() => setTab('lessons')}>
            📝 Edit Lessons
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{(admin.email[0] ?? 'A').toUpperCase()}</div>
            <div>
              <div className={styles.userEmail}>{admin.email}</div>
              <div className={styles.userRole}>{admin.role}</div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            ⎋ Sign Out
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>
            {tab === 'overview' && 'Admin Dashboard'}
            {tab === 'upload' && 'Upload Resource'}
            {tab === 'storage' && 'Structured Storage'}
            {tab === 'certificate' && 'Certificate & Branding'}
            {tab === 'analytics' && 'Analytics'}
            {tab === 'lessons' && 'Edit Lesson Content'}
          </h1>
          <p className={styles.pageSubtitle}>
            {tab === 'upload' && 'Files are auto-organized into buckets by type with full metadata.'}
            {tab === 'storage' && 'All uploads live in structured storage with metadata and usage tracking.'}
            {tab === 'certificate' && 'Set workshop name, instructor, logos, signature, and generate certificates.'}
            {tab === 'analytics' && 'Local activity tracked in this browser and aggregated here.'}
            {tab === 'lessons' && 'Edit any lesson with Markdown, media, math, and version history.'}
            {tab === 'overview' && 'AI for Electronics Engineers — Workshop'}
          </p>
        </div>

        <div className={styles.content}>
          {tab === 'overview' && (
            <OverviewTab fileCount={fileCount} onGo={(t) => setTab(t)} />
          )}

          {tab === 'upload' && <StorageUploadForm onSaved={() => setTab('storage')} />}
          {tab === 'storage' && <StorageManager />}
          {tab === 'certificate' && <CertificateManager />}
          {tab === 'analytics' && <AnalyticsDashboard />}
          {tab === 'lessons' && <LessonEditor />}
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────────── */
function OverviewTab({ fileCount, onGo }: { fileCount: number; onGo: (t: Tab) => void }) {
  return (
    <>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>19</span>
          <span className={styles.statLabel}>Lessons</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>11</span>
          <span className={styles.statLabel}>Prompts</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>6</span>
          <span className={styles.statLabel}>Quizzes</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{fileCount}</span>
          <span className={styles.statLabel}>Stored Files</span>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <button className={styles.actionCard} onClick={() => onGo('upload')}>
            <span className={styles.actionIcon}>⬆</span>
            Upload Resource
          </button>
          <button className={styles.actionCard} onClick={() => onGo('certificate')}>
            <span className={styles.actionIcon}>🎖</span>
            Certificates
          </button>
          <button className={styles.actionCard} onClick={() => onGo('analytics')}>
            <span className={styles.actionIcon}>📈</span>
            Analytics
          </button>
          <button className={styles.actionCard} onClick={() => onGo('lessons')}>
            <span className={styles.actionIcon}>📝</span>
            Edit Lessons
          </button>
          <a className={styles.actionCard} href="/AI-For-Electronics-Engineering/">
            <span className={styles.actionIcon}>🌐</span>
            View Site
          </a>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Session Info</h2>
        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <h3>Role</h3>
            <p>admin</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Storage</h3>
            <p>Browser localStorage — no backend. All uploads organized into structured buckets.</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────── */
function StorageUploadForm({ onSaved }: { onSaved: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Document');
  const [bucket, setBucket] = useState<Bucket | ''>('');
  const [version, setVersion] = useState('v1.0');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [lessonSlug, setLessonSlug] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTitle(''); setDescription(''); setCategory('Document'); setBucket('');
    setVersion('v1.0'); setTags(''); setVisibility('public'); setLessonSlug('');
    setFile(null); setThumbnail(null);
    if (fileRef.current) fileRef.current.value = '';
    if (thumbRef.current) thumbRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !description.trim()) { setError('Title and description are required.'); return; }
    if (!file) { setError('Please choose a file to upload.'); return; }

    setSaving(true);
    try {
      const thumbData = thumbnail ? await settingsFileToDataUrl(thumbnail) : undefined;
      const record = await saveFile({
        file,
        title: title.trim(),
        bucket: bucket || undefined,
        category,
        description: description.trim(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        version: version.trim() || 'v1.0',
        visibility,
        lessonSlug: lessonSlug || undefined,
        thumbnail: thumbData,
      });
      void record;
      reset();
      onSaved();
    } catch {
      setError('Storage failed — the file may be too large for this browser (limit ~5 MB).');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={styles.uploadForm} onSubmit={handleSubmit}>
      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span>Title *</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. ESP32 Deep Sleep Code" required />
        </label>

        <label className={styles.field}>
          <span>Category *</span>
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Document, Code, Template…" />
        </label>

        <label className={styles.field}>
          <span>Bucket (auto if blank)</span>
          <select value={bucket} onChange={(e) => setBucket(e.target.value as Bucket | '')}>
            <option value="">Auto by type</option>
            {BUCKETS.map((b) => (
              <option key={b} value={b}>{BUCKET_LABELS[b]}</option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Version</span>
          <input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="v1.0" />
        </label>

        <label className={styles.field}>
          <span>Visibility</span>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}>
            <option value="public">Public (visible on site)</option>
            <option value="private">Private (hidden)</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Attach to Lesson</span>
          <select value={lessonSlug} onChange={(e) => setLessonSlug(e.target.value)}>
            <option value="">None</option>
            {docsSections.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </label>

        <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
          <span>Tags (comma separated)</span>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="esp32, lab, beginner" />
        </label>

        <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
          <span>Description *</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What is this resource about?" required />
        </label>

        <label className={styles.field}>
          <span>File *</span>
          <input ref={fileRef} type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
          {file && <span className={styles.fileHint}>{file.name} · {formatBytes(file.size)}</span>}
        </label>

        <label className={styles.field}>
          <span>Thumbnail (optional, PNG/JPG)</span>
          <input ref={thumbRef} type="file" accept=".png,.jpg,.jpeg" onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)} />
          {thumbnail && <span className={styles.fileHint}>{thumbnail.name}</span>}
        </label>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={saving}>
        {saving ? 'Saving…' : 'Upload & Organize'}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────────── */
function StorageManager() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [bucket, setBucket] = useState<Bucket | 'all'>('all');
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      const all = [...getFiles()].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
      setFiles(all);
    };
    load();
    return subscribeStorage(load);
  }, []);

  const remove = (id: string) => {
    deleteFile(id);
    setConfirmId(null);
  };

  const visible = bucket === 'all' ? files : files.filter((f) => f.bucket === bucket);
  const usage = (() => {
    const byBucket: Record<string, number> = {};
    let total = 0;
    for (const f of files) {
      total += f.size;
      byBucket[f.bucket] = (byBucket[f.bucket] ?? 0) + f.size;
    }
    return { total, byBucket };
  })();

  return (
    <div>
      <div className={styles.usageBar}>
        <div className={styles.usageLabel}>
          Storage used: <strong>{formatBytes(usage.total)}</strong> · {files.length} files
        </div>
        <div className={styles.usageTrack}>
          {BUCKETS.map((b) => {
            const pct = usage.total ? ((usage.byBucket[b] ?? 0) / usage.total) * 100 : 0;
            return (
              <div
                key={b}
                className={styles.usageSeg}
                style={{ width: `${pct}%` }}
                title={`${BUCKET_LABELS[b]}: ${formatBytes(usage.byBucket[b] ?? 0)}`}
              />
            );
          })}
        </div>
        <div className={styles.usageLegend}>
          {BUCKETS.map((b) => (
            <span key={b} className={styles.usageChip}>
              {BUCKET_LABELS[b]} · {formatBytes(usage.byBucket[b] ?? 0)}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.filterBar} style={{ marginTop: '1.5rem' }}>
        <button className={`${styles.filterBtn} ${bucket === 'all' ? styles.activeFilter : ''}`} onClick={() => setBucket('all')}>All</button>
        {BUCKETS.map((b) => (
          <button key={b} className={`${styles.filterBtn} ${bucket === b ? styles.activeFilter : ''}`} onClick={() => setBucket(b)}>
            {BUCKET_LABELS[b]}
          </button>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th><th>Bucket</th><th>Category</th><th>Type</th><th>Size</th><th>Visibility</th><th>Lesson</th><th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((f) => (
              <tr key={f.id}>
                <td>{f.originalName}</td>
                <td>{BUCKET_LABELS[f.bucket]}</td>
                <td>{f.category}</td>
                <td>{fileTypeLabel(f)}</td>
                <td>{formatBytes(f.size)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${f.visibility === 'private' ? styles.privateBadge : ''}`}>
                    {f.visibility}
                  </span>
                </td>
                <td>{f.lessonSlug || '—'}</td>
                <td>
                  {confirmId === f.id ? (
                    <span>
                      <button className={styles.delBtn} onClick={() => remove(f.id)}>Confirm</button>
                      <button className={styles.cancelBtn} onClick={() => setConfirmId(null)}>Cancel</button>
                    </span>
                  ) : (
                    <button className={styles.delLink} onClick={() => setConfirmId(f.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={8} className={styles.empty}>No files in this bucket yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────── */
function CertificateManager() {
  const [s, setS] = useState<CertificateSettings>(() => getSettings());
  const [status, setStatus] = useState('');
  const [generating, setGenerating] = useState(false);
  const [previewName, setPreviewName] = useState('Sample Participant');
  const [names, setNames] = useState('');
  const previewRef = useRef<HTMLCanvasElement>(null);

  const update = (patch: Partial<CertificateSettings>) => setS((prev) => ({ ...prev, ...patch }));

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 2500);
  };

  const handleImage = async (
    file: File | null,
    key: 'signatureImage' | 'institutionLogo' | 'ieeeLogo'
  ) => {
    if (!file) return;
    try {
      update({ [key]: await settingsFileToDataUrl(file) });
      flash('Image loaded — click Preview to see it.');
    } catch {
      flash('Could not read image.');
    }
  };

  const handleSave = () => {
    saveSettings(s);
    flash('Saved ✓');
    if (previewRef.current) renderCertificate(previewRef.current, s, previewName.trim() || 'Sample Participant');
  };

  const handleReset = () => {
    resetSettings();
    setS(getSettings());
    flash('Reset to defaults');
  };

  const handlePreview = async () => {
    if (!previewRef.current) return;
    await renderCertificate(previewRef.current, s, previewName.trim() || 'Sample Participant');
  };

  const handleDownloadPng = async () => {
    const c = document.createElement('canvas');
    await renderCertificate(c, s, previewName.trim() || 'Sample Participant');
    downloadCanvasPng(c, 'certificate.png');
  };

  const handleGenerate = async () => {
    const list = names.split('\n').map((n) => n.trim()).filter(Boolean);
    if (list.length === 0) { flash('Enter at least one name.'); return; }
    setGenerating(true);
    try {
      const canvases = await Promise.all(
        list.map(async (name) => {
          const c = document.createElement('canvas');
          await renderCertificate(c, s, name);
          return c;
        })
      );
      const blob = canvases.length === 1 ? await canvasToPdfBlob(canvases[0]) : await canvasesToPdf(canvases);
      downloadBlob(blob, `certificates_${canvases.length}.pdf`);
      track('certificate_generated', { count: canvases.length });
      flash(`Generated ${canvases.length} certificate(s)`);
    } catch {
      flash('PDF generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (previewRef.current) renderCertificate(previewRef.current, s, previewName.trim() || 'Sample Participant');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.certGrid}>
      <section className={styles.certSection}>
        <h2>Workshop &amp; Instructor</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Workshop Name</span>
            <input value={s.workshopName} onChange={(e) => update({ workshopName: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Instructor Name</span>
            <input value={s.instructorName} onChange={(e) => update({ instructorName: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Instructor Title / Role</span>
            <input value={s.instructorTitle} onChange={(e) => update({ instructorTitle: e.target.value })} />
          </label>
        </div>
      </section>

      <section className={styles.certSection}>
        <h2>Certificate Template</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Certificate Title</span>
            <input value={s.certTitle} onChange={(e) => update({ certTitle: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Subtitle</span>
            <input value={s.certSubtitle} onChange={(e) => update({ certSubtitle: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Body Text (use ↵ for new line)</span>
            <textarea value={s.bodyText} rows={3} onChange={(e) => update({ bodyText: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Details Line</span>
            <input value={s.detailsLine} onChange={(e) => update({ detailsLine: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Date Label</span>
            <input value={s.dateLabel} onChange={(e) => update({ dateLabel: e.target.value })} />
          </label>
        </div>
      </section>

      <section className={styles.certSection}>
        <h2>Logos &amp; Signature</h2>
        <p className={styles.sectionDesc}>
          Upload images to place on the certificate. Institution logo sits top-left,
          IEEE logo (optional) top-right, signature bottom-center above the instructor name.
        </p>
        <div className={styles.imgUploadRow}>
          <ImageField label="Institution Logo" hint="top-left" value={s.institutionLogo} onPick={(f) => handleImage(f, 'institutionLogo')} onClear={() => update({ institutionLogo: '' })} />
          <ImageField label="Signature Image" hint="under instructor name" value={s.signatureImage} onPick={(f) => handleImage(f, 'signatureImage')} onClear={() => update({ signatureImage: '' })} />
        </div>
        <div className={styles.checkboxRow}>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={s.ieeeEnabled} onChange={(e) => update({ ieeeEnabled: e.target.checked })} />
            <span>Show IEEE logo (when applicable)</span>
          </label>
        </div>
        {s.ieeeEnabled && (
          <div className={styles.imgUploadRow}>
            <ImageField label="IEEE Logo" hint="top-right" value={s.ieeeLogo} onPick={(f) => handleImage(f, 'ieeeLogo')} onClear={() => update({ ieeeLogo: '' })} />
          </div>
        )}
      </section>

      <section className={styles.certSection}>
        <h2>Live Preview</h2>
        <div className={styles.previewWrap}>
          <canvas ref={previewRef} className={styles.previewCanvas} />
        </div>
        <div className={styles.previewControls}>
          <input className={styles.nameInput} value={previewName} onChange={(e) => setPreviewName(e.target.value)} placeholder="Preview name" />
          <button className={styles.smallBtn} onClick={handlePreview}>Update Preview</button>
          <button className={styles.smallBtn} onClick={handleDownloadPng}>⬇ PNG</button>
        </div>
      </section>

      <section className={styles.certSection}>
        <h2>Generate PDF Certificates</h2>
        <p className={styles.sectionDesc}>
          Enter one participant name per line. A PDF is generated automatically — one
          certificate per name (multi-page when more than one).
        </p>
        <textarea className={styles.namesArea} value={names} onChange={(e) => setNames(e.target.value)} placeholder={'Robin R G\nAlice Thomas\nBob Martin'} rows={6} />
        <button className={styles.submitBtn} onClick={handleGenerate} disabled={generating}>
          {generating ? 'Generating…' : '⚙ Generate PDF Certificates'}
        </button>
      </section>

      <div className={styles.certActions}>
        <button className={styles.submitBtn} onClick={handleSave}>💾 Save Settings</button>
        <button className={styles.cancelBtn} onClick={handleReset}>Reset to Defaults</button>
        {status && <span className={styles.statusMsg}>{status}</span>}
      </div>
    </div>
  );
}

function ImageField({
  label, hint, value, onPick, onClear,
}: {
  label: string; hint: string;
  value: string;
  onPick: (f: File | null) => void;
  onClear: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.imgField}>
      <span className={styles.imgLabel}>{label} <em>({hint})</em></span>
      {value ? (
        <div className={styles.imgThumbWrap}>
          <img src={value} alt={label} className={styles.imgThumb} />
          <button className={styles.delLink} onClick={onClear}>Remove</button>
        </div>
      ) : (
        <input ref={ref} type="file" accept=".png,.jpg,.jpeg" onChange={(e) => onPick(e.target.files?.[0] ?? null)} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────── */
function AnalyticsDashboard() {
  const [summary, setSummary] = useState(() => summarize());

  useEffect(() => {
    const load = () => setSummary(summarize());
    load();
    const a = subscribeAnalytics(load);
    const s = subscribeStorage(load);
    return () => { a(); s(); };
  }, []);

  const listBlock = (items: { label: string; count: number }[], empty: string) =>
    items.length === 0
      ? <p className={styles.empty}>{empty}</p>
      : (
        <ol className={styles.rankList}>
          {items.map((it, i) => (
            <li key={i}>
              <span className={styles.rankName}>{it.label}</span>
              <span className={styles.rankCount}>{it.count}</span>
            </li>
          ))}
        </ol>
      );

  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{summary.quizAttempts}</span>
        <span className={styles.statLabel}>Quiz Attempts</span>
        <span className={styles.statSub}>{summary.quizCorrect} correct</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{summary.certificatesGenerated}</span>
        <span className={styles.statLabel}>Certificates Generated</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{summary.storage.count}</span>
        <span className={styles.statLabel}>Stored Files</span>
        <span className={styles.statSub}>{formatBytes(summary.storage.total)} used</span>
      </div>

      <section className={styles.analyticBlock}>
        <h2>Most Viewed Lesson</h2>
        {listBlock(summary.mostViewedLesson, 'No lesson views recorded yet.')}
      </section>

      <section className={styles.analyticBlock}>
        <h2>Most Downloaded Resource</h2>
        {listBlock(summary.mostDownloadedResource, 'No downloads recorded yet.')}
      </section>

      <section className={styles.analyticBlock}>
        <h2>Popular AI Prompts</h2>
        {listBlock(summary.popularPrompts, 'No prompt copies recorded yet.')}
      </section>

      <section className={styles.analyticBlock}>
        <h2>Search Terms</h2>
        {listBlock(summary.searchTerms, 'No searches recorded yet.')}
      </section>

      <section className={styles.analyticBlock}>
        <h2>Recent Uploads</h2>
        {summary.recentUploads.length === 0 ? (
          <p className={styles.empty}>No uploads yet.</p>
        ) : (
          <ul className={styles.uploadList}>
            {summary.recentUploads.map((f) => (
              <li key={f.id}>
                <span className={styles.upName}>{f.originalName}</span>
                <span className={styles.upMeta}>{BUCKET_LABELS[f.bucket]} · {fileTypeLabel(f)} · {formatBytes(f.size)}</span>
                <span className={styles.upMeta}>{new Date(f.uploadedAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.analyticBlock}>
        <h2>Storage Usage</h2>
        <div className={styles.usageTrack}>
          {BUCKETS.map((b) => {
            const pct = summary.storage.total ? ((summary.storage.byBucket[b] ?? 0) / summary.storage.total) * 100 : 0;
            return (
              <div key={b} className={styles.usageSeg} style={{ width: `${pct}%` }} title={`${BUCKET_LABELS[b]}: ${formatBytes(summary.storage.byBucket[b] ?? 0)}`} />
            );
          })}
        </div>
        <div className={styles.usageLegend}>
          {BUCKETS.map((b) => (
            <span key={b} className={styles.usageChip}>
              {BUCKET_LABELS[b]} · {formatBytes(summary.storage.byBucket[b] ?? 0)}
            </span>
          ))}
        </div>
      </section>

      <div className={styles.certActions}>
        <button className={styles.cancelBtn} onClick={() => { clearAnalytics(); setSummary(summarize()); }}>
          Clear Analytics Data
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────── */
function LessonEditor() {
  const [slug, setSlug] = useState(docsSections[0].slug);
  const [content, setContent] = useState('');
  const [history, setHistory] = useState(() => getLessonHistory(docsSections[0].slug));
  const [hasOverride, setHasOverride] = useState(false);
  const [preview, setPreview] = useState(false);
  const [savedHint, setSavedHint] = useState('');
  const taRef = useRef<HTMLTextAreaElement>(null);

  const load = (s: string) => {
    setContent(getLessonOverride(s) ?? '');
    setHistory(getLessonHistory(s));
    setHasOverride(getLessonOverride(s) !== null);
  };

  useEffect(() => {
    const onChange = () => load(slug);
    onChange();
    return subscribeLessons(onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Auto-save (debounced 900ms)
  useEffect(() => {
    if (!content) return;
    const t = setTimeout(() => {
      saveLessonContent(slug, content, 'autosave');
      setHasOverride(true);
      setSavedHint('Auto-saved');
      setTimeout(() => setSavedHint(''), 1500);
    }, 900);
    return () => clearTimeout(t);
  }, [content, slug]);

  const insert = (before: string, after = '', placeholder = '') => {
    const ta = taRef.current;
    if (!ta) { setContent((c) => c + before + placeholder + after); return; }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + sel + after + content.slice(end);
    setContent(next);
  };

  const mediaFiles = getFiles().filter(
    (f) => f.mimeType.startsWith('image/') || f.mimeType.startsWith('video/')
  );
  const insertMedia = (id: string, title: string, isVideo: boolean) => {
    insert(`![${title}](store://${id})\n`);
  };

  const sampleInteractive = '```interactive\n' + JSON.stringify({ type: 'reveal', question: 'What is Ohm’s Law?', answer: 'V = I × R' }, null, 2) + '\n```\n';

  return (
    <div className={styles.editorGrid}>
      <div className={styles.editorSide}>
        <label className={styles.field} style={{ marginBottom: '1rem' }}>
          <span>Lesson</span>
          <select value={slug} onChange={(e) => setSlug(e.target.value)}>
            {docsSections.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </label>

        {hasOverride ? (
          <span className={styles.overrideTag}>Overriding default content</span>
        ) : (
          <span className={styles.defaultTag}>Using default content</span>
        )}

        <div className={styles.toolbar}>
          <button onClick={() => insert('## ', '', 'Heading')}>H2</button>
          <button onClick={() => insert('**', '**', 'bold')}>B</button>
          <button onClick={() => insert('*', '*', 'italic')}>I</button>
          <button onClick={() => insert('`', '`', 'code')}>{'</>'}</button>
          <button onClick={() => insert('```\n', '\n```\n', 'code block')}>Code</button>
          <button onClick={() => insert('| Col A | Col B |\n| --- | --- |\n| 1 | 2 |\n')}>Table</button>
          <button onClick={() => insert('> [!NOTE]\n> Your note here\n')}>Callout</button>
          <button onClick={() => insert('$', '$', 'E = mc^2')}>$ Eq</button>
          <button onClick={() => insert('$$\n', '\n$$', '\\int_0^1 x\\,dx')}>$$ Eq</button>
          <button onClick={() => insert('![alt](https://)', '')}>Image</button>
          <button onClick={() => insert('![alt](https://video.mp4)', '')}>Video</button>
          <button onClick={() => insert(sampleInteractive)}>Interactive</button>
        </div>

        {mediaFiles.length > 0 && (
          <div className={styles.mediaPicker}>
            <span className={styles.imgLabel}>Insert from storage:</span>
            <select
              defaultValue=""
              onChange={(e) => {
                const f = mediaFiles.find((m) => m.id === e.target.value);
                if (f) insertMedia(f.id, f.originalName, f.mimeType.startsWith('video/'));
                e.target.value = '';
              }}
            >
              <option value="">Choose image/video…</option>
              {mediaFiles.map((m) => (
                <option key={m.id} value={m.id}>{m.originalName} ({fileTypeLabel(m)})</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.editorActions}>
          <button className={styles.smallBtn} onClick={() => setPreview((p) => !p)}>
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button className={styles.smallBtn} onClick={() => { saveLessonContent(slug, content, 'manual save'); setHasOverride(true); setSavedHint('Saved'); setTimeout(() => setSavedHint(''), 1500); }}>
            💾 Save Version
          </button>
          <button className={styles.cancelBtn} onClick={() => { resetLesson(slug); load(slug); }}>
            Reset to Default
          </button>
          {savedHint && <span className={styles.statusMsg}>{savedHint}</span>}
        </div>

        <div className={styles.historyBox}>
          <h3>Version History ({history.length})</h3>
          {history.length === 0 ? (
            <p className={styles.empty}>No versions yet — start editing.</p>
          ) : (
            <ul className={styles.historyList}>
              {history.map((v) => (
                <li key={v.id}>
                  <span>{new Date(v.at).toLocaleString()}</span>
                  <span className={styles.histNote}>{v.note}</span>
                  <button className={styles.delLink} onClick={() => { const c = restoreVersion(slug, v.id); if (c !== null) { setContent(c); setSavedHint('Loaded'); setTimeout(() => setSavedHint(''), 1500); } }}>
                    Load
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.editorMain}>
        {preview ? (
          <MarkdownView markdown={content} />
        ) : (
          <textarea
            ref={taRef}
            className={styles.editorArea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write lesson content in Markdown. Use the toolbar to insert headings, code, tables, callouts, equations, images, videos, and interactive sections."
          />
        )}
      </div>
    </div>
  );
}
