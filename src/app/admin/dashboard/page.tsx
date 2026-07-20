'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { getSessionSync, destroySession, AdminSession } from '@/lib/adminAuth';
import { quizQuestions } from '@/data/quizQuestions';
import { QuizQuestion, Difficulty, QuestionCategory } from '@/data/quizTypes';
import { 
  loadQuestions, 
  saveCustomQuestion, 
  deleteQuestion, 
  getQuestionAnalytics, 
  resetQuestions 
} from '@/lib/quizService';
import { docsSections } from '@/lib/docsConfig';
import {
  StoredFile,
  Bucket,
  BUCKETS,
  BUCKET_LABELS,
  getFiles,
  saveFileAsync,
  deleteFile,
  subscribeStorage,
  fileTypeLabel,
  formatBytes,
} from '@/lib/storage';
import {
  CertificateSettings,
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
  | 'lessons'
  | 'quizAdmin';

export default function AdminDashboardPage() {
  const [admin] = useState<AdminSession | null>(() => getSessionSync());
  const [tab, setTab] = useState<Tab>('overview');
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    if (!admin) window.location.replace('/admin');
  }, [admin]);

  useEffect(() => {
    const load = () => setFileCount(getFiles().length);
    load();
    return subscribeStorage(load);
  }, []);

  const handleLogout = () => {
    destroySession();
    window.location.replace('/admin');
  };

  if (!admin) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingSpinner}>
          <span className={styles.spinner}></span>
          <p>Verifying accessâ€¦</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>âš¡</div>
          <span className={styles.logoText}>EE Workshop Admin</span>
        </div>
        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${tab === 'overview' ? styles.activeNav : ''}`} onClick={() => setTab('overview')}>
            ðŸ“Š Overview
          </button>
          <button className={`${styles.navItem} ${tab === 'upload' ? styles.activeNav : ''}`} onClick={() => setTab('upload')}>
            â¬† Upload Resource
          </button>
          <button className={`${styles.navItem} ${tab === 'storage' ? styles.activeNav : ''}`} onClick={() => setTab('storage')}>
            ðŸ—‚ Storage ({fileCount})
          </button>
          <button className={`${styles.navItem} ${tab === 'certificate' ? styles.activeNav : ''}`} onClick={() => setTab('certificate')}>
            ðŸŽ– Certificate
          </button>
          <button className={`${styles.navItem} ${tab === 'quizAdmin' ? styles.activeNav : ''}`} onClick={() => setTab('quizAdmin')}>
            ðŸ“  Quiz Admin
          </button>
          <button className={`${styles.navItem} ${tab === 'analytics' ? styles.activeNav : ''}`} onClick={() => setTab('analytics')}>
            ðŸ“ˆ Analytics
          </button>
          <button className={`${styles.navItem} ${tab === 'lessons' ? styles.activeNav : ''}`} onClick={() => setTab('lessons')}>
            ðŸ“  Edit Lessons
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
            âŽ‹ Sign Out
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
            {tab === 'quizAdmin' && 'Quiz Database Admin'}
            {tab === 'analytics' && 'Analytics'}
            {tab === 'lessons' && 'Edit Lesson Content'}
          </h1>
          <p className={styles.pageSubtitle}>
            {tab === 'upload' && 'Files are auto-organized into buckets by type with full metadata.'}
            {tab === 'storage' && 'All uploads live in structured storage with metadata and usage tracking.'}
            {tab === 'certificate' && 'Set workshop name, instructor, logos, signature, and generate certificates.'}
            {tab === 'quizAdmin' && 'Manage the quiz questions bank, upload question sets, and view detailed analytics.'}
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
          {tab === 'quizAdmin' && <QuizAdminManager />}
          {tab === 'analytics' && <AnalyticsDashboard />}
          {tab === 'lessons' && <LessonEditor />}
        </div>
      </main>
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
            <span className={styles.actionIcon}>â¬†</span>
            Upload Resource
          </button>
          <button className={styles.actionCard} onClick={() => onGo('certificate')}>
            <span className={styles.actionIcon}>ðŸŽ–</span>
            Certificates
          </button>
          <button className={styles.actionCard} onClick={() => onGo('analytics')}>
            <span className={styles.actionIcon}>ðŸ“ˆ</span>
            Analytics
          </button>
          <button className={styles.actionCard} onClick={() => onGo('lessons')}>
            <span className={styles.actionIcon}>ðŸ“</span>
            Edit Lessons
          </button>
            <a className={styles.actionCard} href="/">
            <span className={styles.actionIcon}>ðŸŒ</span>
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
            <p>Browser localStorage â€” no backend. All uploads organized into structured buckets.</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StorageUploadForm({ onSaved }: { onSaved: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Document');
  const [bucket, setBucket] = useState<Bucket | ''>('');
  const [version, setVersion] = useState('v1.0');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [lessonSlug, setLessonSlug] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTitle(''); setDescription(''); setCategory('Document'); setBucket('');
    setVersion('v1.0'); setTags(''); setVisibility('public'); setLessonSlug(''); setDisplayOrder(0);
    setFile(null); setThumbnail(null);
    if (fileRef.current) fileRef.current.value = '';
    if (thumbRef.current) thumbRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !description.trim()) { setError('Title and description are required.'); return; }
    if (!file) { setError('Please choose a file to upload.'); return; }
    const ALLOWED = ['pdf', 'pptx', 'docx', 'zip', 'png', 'jpg', 'jpeg', 'txt', 'csv', 'md'];
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED.includes(ext)) {
      setError(`Unsupported format. Allowed: ${ALLOWED.join(', ').toUpperCase()}`);
      return;
    }

    setSaving(true);
    try {
      const thumbData = thumbnail ? await settingsFileToDataUrl(thumbnail) : undefined;
      const record = await saveFileAsync({
        file,
        title: title.trim(),
        bucket: bucket || undefined,
        category,
        description: description.trim(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        version: version.trim() || 'v1.0',
        visibility,
        lessonSlug: lessonSlug || undefined,
        displayOrder: Number(displayOrder) || 0,
        thumbnail: thumbData,
      });
      void record;
      reset();
      onSaved();
    } catch {
      setError('Storage failed â€” the file may be too large for this browser (limit ~5 MB).');
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
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Document, Code, Templateâ€¦" />
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
          <span>Display Order</span>
          <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} placeholder="0" />
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
          <input ref={fileRef} type="file" accept=".pdf,.pptx,.docx,.zip,.png,.jpg,.jpeg,.txt,.csv,.md" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
          {file && <span className={styles.fileHint}>{file.name} Â· {formatBytes(file.size)}</span>}
        </label>

        <label className={styles.field}>
          <span>Thumbnail (optional, PNG/JPG)</span>
          <input ref={thumbRef} type="file" accept=".png,.jpg,.jpeg" onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)} />
          {thumbnail && <span className={styles.fileHint}>{thumbnail.name}</span>}
        </label>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={saving}>
        {saving ? 'Savingâ€¦' : 'Upload & Organize'}
      </button>
    </form>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
          Storage used: <strong>{formatBytes(usage.total)}</strong> Â· {files.length} files
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
              {BUCKET_LABELS[b]} Â· {formatBytes(usage.byBucket[b] ?? 0)}
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
                <td>{f.lessonSlug || 'â€”'}</td>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
      flash('Image loaded â€” click Preview to see it.');
    } catch {
      flash('Could not read image.');
    }
  };

  const handleSave = () => {
    saveSettings(s);
    flash('Saved âœ“');
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
            <span>Body Text (use â†µ for new line)</span>
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
          <button className={styles.smallBtn} onClick={handleDownloadPng}>â¬‡ PNG</button>
        </div>
      </section>

      <section className={styles.certSection}>
        <h2>Generate PDF Certificates</h2>
        <p className={styles.sectionDesc}>
          Enter one participant name per line. A PDF is generated automatically â€” one
          certificate per name (multi-page when more than one).
        </p>
        <textarea className={styles.namesArea} value={names} onChange={(e) => setNames(e.target.value)} placeholder={'Robin R G\nAlice Thomas\nBob Martin'} rows={6} />
        <button className={styles.submitBtn} onClick={handleGenerate} disabled={generating}>
          {generating ? 'Generatingâ€¦' : 'âš™ Generate PDF Certificates'}
        </button>
      </section>

      <div className={styles.certActions}>
        <button className={styles.submitBtn} onClick={handleSave}>ðŸ’¾ Save Settings</button>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className={styles.imgThumb} />
          <button className={styles.delLink} onClick={onClear}>Remove</button>
        </div>
      ) : (
        <input ref={ref} type="file" accept=".png,.jpg,.jpeg" onChange={(e) => onPick(e.target.files?.[0] ?? null)} />
      )}
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
                <span className={styles.upMeta}>{BUCKET_LABELS[f.bucket]} Â· {fileTypeLabel(f)} Â· {formatBytes(f.size)}</span>
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
              {BUCKET_LABELS[b]} Â· {formatBytes(summary.storage.byBucket[b] ?? 0)}
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
  const insertMedia = (id: string, title: string) => {
    insert(`![${title}](store://${id})\n`);
  };

  const sampleInteractive = '```interactive\n' + JSON.stringify({ type: 'reveal', question: 'What is Ohmâ€™s Law?', answer: 'V = I Ã— R' }, null, 2) + '\n```\n';

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
                if (f) insertMedia(f.id, f.originalName);
                e.target.value = '';
              }}
            >
              <option value="">Choose image/videoâ€¦</option>
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
            ðŸ’¾ Save Version
          </button>
          <button className={styles.cancelBtn} onClick={() => { resetLesson(slug); load(slug); }}>
            Reset to Default
          </button>
          {savedHint && <span className={styles.statusMsg}>{savedHint}</span>}
        </div>

        <div className={styles.historyBox}>
          <h3>Version History ({history.length})</h3>
          {history.length === 0 ? (
            <p className={styles.empty}>No versions yet â€” start editing.</p>
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

/* ── Quiz Database Admin Tab ────────────────────────────────────────── */
function QuizAdminManager() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [analytics, setAnalytics] = useState<ReturnType<typeof getQuestionAnalytics>>({
    mostDifficultQuestions: [],
    mostIncorrectTopics: [],
    averageScore: 0,
    categoryPopularity: []
  });

  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [id, setId] = useState('');
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [explanation, setExplanation] = useState('');
  const [relatedLesson, setRelatedLesson] = useState('');
  const [tags, setTags] = useState('');
  const [topic, setTopic] = useState('Embedded Systems');
  const [category, setCategory] = useState<QuestionCategory>('concept-understanding');
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');

  const [importJson, setImportJson] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const reload = async () => {
    const list = await loadQuestions(quizQuestions);
    setQuestions(list);
    setAnalytics(getQuestionAnalytics(list));
  };

  useEffect(() => {
    reload();
    const handler = () => reload();
    window.addEventListener('questions-updated', handler);
    return () => window.removeEventListener('questions-updated', handler);
  }, []);

  const handleEdit = (q: QuizQuestion) => {
    setEditingId(q.id);
    setId(q.id);
    setQuestion(q.question);
    setOptionA(q.options[0] || '');
    setOptionB(q.options[1] || '');
    setOptionC(q.options[2] || '');
    setOptionD(q.options[3] || '');
    
    const correctIdx = q.options.indexOf(q.correctAnswer);
    if (correctIdx === 0) setCorrectOption('A');
    else if (correctIdx === 1) setCorrectOption('B');
    else if (correctIdx === 2) setCorrectOption('C');
    else if (correctIdx === 3) setCorrectOption('D');
    
    setExplanation(q.explanation);
    setRelatedLesson(q.relatedLesson);
    setTags(q.tags.join(', '));
    setTopic(q.topic || 'Embedded Systems');
    setCategory(q.category);
    setDifficulty(q.difficulty);
    
    setSuccessMsg(`Loaded question ${q.id} for editing.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (qId: string) => {
    if (confirm(`Are you sure you want to delete question ${qId}?`)) {
      deleteQuestion(qId);
      setSuccessMsg('Question deleted.');
      reload();
    }
  };

  const handleFormReset = () => {
    setEditingId(null);
    setId('');
    setQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOption('A');
    setExplanation('');
    setRelatedLesson('');
    setTags('');
    setTopic('Embedded Systems');
    setCategory('concept-understanding');
    setDifficulty('Intermediate');
    setErrorMsg('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!question.trim() || !optionA.trim() || !optionB.trim()) {
      setErrorMsg('Question text and at least Options A and B are required.');
      return;
    }

    const opts = [
      optionA.trim(),
      optionB.trim(),
      optionC.trim(),
      optionD.trim()
    ].filter(Boolean);

    let correctText = '';
    if (correctOption === 'A') correctText = optionA.trim();
    else if (correctOption === 'B') correctText = optionB.trim();
    else if (correctOption === 'C') correctText = optionC.trim();
    else if (correctOption === 'D') correctText = optionD.trim();

    if (!correctText) {
      setErrorMsg('Correct option must map to a non-empty option field.');
      return;
    }

    const qId = editingId || id.trim() || `custom-${Date.now()}`;
    const newQuestion: QuizQuestion = {
      id: qId,
      category,
      difficulty,
      question: question.trim(),
      options: opts,
      correctAnswer: correctText,
      explanation: explanation.trim(),
      relatedLesson: relatedLesson.trim() || 'quiz',
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      topic: topic.trim() || 'Embedded Systems'
    };

    saveCustomQuestion(newQuestion);
    setSuccessMsg(editingId ? 'Question updated successfully!' : 'Question added successfully!');
    handleFormReset();
    reload();
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const parsed = JSON.parse(importJson);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      
      list.forEach((q: any) => {
        if (!q.id || !q.question || !q.options || !q.correctAnswer) {
          throw new Error(`Invalid question format: missing required fields in ${JSON.stringify(q)}`);
        }
        saveCustomQuestion({
          id: q.id,
          category: q.category || 'concept-understanding',
          difficulty: q.difficulty || 'Intermediate',
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || 'No explanation provided.',
          relatedLesson: q.relatedLesson || 'quiz',
          tags: q.tags || [],
          topic: q.topic || 'General'
        });
      });
      
      setSuccessMsg(`Successfully imported ${list.length} questions.`);
      setImportJson('');
      reload();
    } catch (err: any) {
      setErrorMsg(`Import failed: ${err.message}`);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "workshop_quiz_questions_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDb = () => {
    if (confirm('Are you sure you want to restore default questions? This will wipe out all custom questions and deletions!')) {
      resetQuestions();
      setSuccessMsg('Database reset to defaults.');
      reload();
    }
  };

  const topicsList = useMemo(() => {
    const list = new Set<string>();
    questions.forEach(q => {
      if (q.topic) list.add(q.topic);
    });
    return Array.from(list);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchTopic = filterTopic === 'all' || q.topic === filterTopic;
      const matchDiff = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
      return matchTopic && matchDiff;
    });
  }, [questions, filterTopic, filterDifficulty]);

  return (
    <div className={styles.certGrid}>
      {/* LEFT COLUMN: Input Form and Import/Export */}
      <div className={styles.certLeftCol}>
        <section className={styles.certSection}>
          <h2>{editingId ? '✍️ Edit Question' : '➕ Add Quiz Question'}</h2>
          {errorMsg && <div className={styles.errorBox} style={{ color: 'var(--color-error)', background: 'rgba(248,113,113,0.08)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>{errorMsg}</div>}
          {successMsg && <div className={styles.successBox} style={{ color: 'var(--color-success)', background: 'rgba(52,211,153,0.08)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>{successMsg}</div>}

          <form onSubmit={handleFormSubmit} className={styles.formGrid}>
            <label className={styles.field}>
              <span>Question ID (Auto-generated if blank)</span>
              <input value={id} onChange={(e) => setId(e.target.value)} disabled={!!editingId} placeholder="e.g. custom-q1" />
            </label>

            <label className={styles.field}>
              <span>Topic Category</span>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Embedded Systems, PCB Design, AI" required />
            </label>

            <label className={styles.field}>
              <span>Difficulty</span>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Evaluation Mode</span>
              <select value={category} onChange={(e) => setCategory(e.target.value as QuestionCategory)}>
                <option value="concept-understanding">Concept Understanding</option>
                <option value="practical-application">Practical Application</option>
                <option value="debugging-scenarios">Debugging Scenarios</option>
                <option value="circuit-reasoning">Circuit Reasoning</option>
                <option value="engineering-decisions">Engineering Decisions</option>
                <option value="real-world-situations">Real-world Situations</option>
                <option value="interview-style">Interview-style</option>
                <option value="industry-oriented">Industry-oriented</option>
              </select>
            </label>

            <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
              <span>Question Text *</span>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} placeholder="Ask a technical engineering question..." required />
            </label>

            <label className={styles.field}>
              <span>Option A *</span>
              <input value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Choice A text" required />
            </label>

            <label className={styles.field}>
              <span>Option B *</span>
              <input value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Choice B text" required />
            </label>

            <label className={styles.field}>
              <span>Option C (Optional)</span>
              <input value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Choice C text" />
            </label>

            <label className={styles.field}>
              <span>Option D (Optional)</span>
              <input value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Choice D text" />
            </label>

            <label className={styles.field}>
              <span>Correct Option</span>
              <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value as any)}>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </label>

            <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
              <span>Technical Explanation *</span>
              <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} rows={3} placeholder="Provide engineering context why the correct answer is right..." required />
            </label>

            <label className={styles.field}>
              <span>Related Lesson Slug</span>
              <input value={relatedLesson} onChange={(e) => setRelatedLesson(e.target.value)} placeholder="e.g. electronics-lab" />
            </label>

            <label className={styles.field}>
              <span>Tags (comma-separated)</span>
              <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. rtos, timing, stm32" />
            </label>

            <div className={styles.certActions} style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <button type="submit" className={styles.submitBtn}>
                {editingId ? '💾 Save Question' : '➕ Add to Database'}
              </button>
              {editingId && (
                <button type="button" className={styles.cancelBtn} onClick={handleFormReset}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className={styles.certSection}>
          <h2>📤 Bulk Import / Export JSON</h2>
          <form onSubmit={handleImport} className={styles.formGrid}>
            <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
              <span>Paste JSON Questions Array</span>
              <textarea 
                value={importJson} 
                onChange={(e) => setImportJson(e.target.value)} 
                rows={4} 
                placeholder='[{"id":"q-1","question":"Text","options":["A","B"],"correctAnswer":"A"}]'
              />
            </label>
            <div className={styles.certActions} style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className={styles.submitBtn}>⚡ Import JSON</button>
              <button type="button" className={styles.cancelBtn} onClick={handleExport}>📥 Export Current JSON</button>
            </div>
          </form>
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
            <button type="button" className={styles.cancelBtn} style={{ color: 'var(--color-error)', borderColor: 'rgba(248,113,113,0.3)' }} onClick={handleResetDb}>
              ⚠️ Wipe custom questions & Restore defaults
            </button>
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN: Analytics and Question Bank Table */}
      <div className={styles.certRightCol}>
        {/* Analytics Summary */}
        <section className={styles.certSection}>
          <h2>📊 Local Question Performance</h2>
          <div className={styles.statsGrid} style={{ marginBottom: '1.5rem' }}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{questions.length}</span>
              <span className={styles.statLabel}>Active Pool Size</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {analytics.averageScore > 0 ? `${analytics.averageScore}%` : 'N/A'}
              </span>
              <span className={styles.statLabel}>Avg Correct Rate</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Most Difficult Questions</h3>
              {analytics.mostDifficultQuestions.length === 0 ? (
                <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>No statistics collected yet.</p>
              ) : (
                <ol style={{ fontSize: '0.8rem', paddingLeft: '1.2rem', margin: 0, color: 'var(--color-text-secondary)' }}>
                  {analytics.mostDifficultQuestions.map((item, index) => (
                    <li key={index} style={{ marginBottom: '0.4rem' }}>
                      <span style={{ display: 'block', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }} title={item.question}>
                        {item.question}
                      </span>
                      <span style={{ color: 'var(--color-error)' }}>Error rate: {item.errorRate}%</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Category Popularity</h3>
              {analytics.categoryPopularity.length === 0 ? (
                <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>No attempts recorded.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  {analytics.categoryPopularity.map((item, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span>{item.topic}</span>
                      <strong>{item.attempts} trials</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Question Bank Table */}
        <section className={styles.certSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2>📋 Question Repository ({filteredQuestions.length})</h2>
            
            {/* Filters Row */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select 
                value={filterTopic} 
                onChange={(e) => setFilterTopic(e.target.value)} 
                style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-secondary)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
              >
                <option value="all">All Topics</option>
                {topicsList.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select 
                value={filterDifficulty} 
                onChange={(e) => setFilterDifficulty(e.target.value)} 
                style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-secondary)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className={styles.tableContainer} style={{ maxHeight: '420px', overflowY: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '8%' }}>ID</th>
                  <th style={{ width: '15%' }}>Topic</th>
                  <th style={{ width: '15%' }}>Diff</th>
                  <th style={{ width: '45%' }}>Question</th>
                  <th style={{ width: '17%' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q) => (
                  <tr key={q.id}>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-cyan)' }}>{q.id}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{q.topic || 'General'}</span>
                    </td>
                    <td>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '1px 5px', 
                        borderRadius: '3px',
                        background: q.difficulty === 'Beginner' ? 'rgba(52,211,153,0.1)' : q.difficulty === 'Intermediate' ? 'rgba(251,191,36,0.1)' : q.difficulty === 'Advanced' ? 'rgba(248,113,113,0.1)' : 'rgba(167,139,250,0.1)',
                        color: q.difficulty === 'Beginner' ? 'var(--color-success)' : q.difficulty === 'Intermediate' ? 'var(--color-warning)' : q.difficulty === 'Advanced' ? 'var(--color-error)' : '#c084fc',
                        fontWeight: 600
                      }}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td>
                      <div 
                        style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem' }}
                        title={q.question}
                      >
                        {q.question}
                      </div>
                    </td>
                    <td>
                      <button className={styles.delLink} onClick={() => handleEdit(q)} style={{ color: 'var(--color-cyan)', marginRight: '0.5rem' }}>
                        Edit
                      </button>
                      <button className={styles.delLink} onClick={() => handleDelete(q.id)} style={{ color: 'var(--color-error)' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredQuestions.length === 0 && (
                  <tr>
                    <td colSpan={5} className={styles.empty}>No questions match the current filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
