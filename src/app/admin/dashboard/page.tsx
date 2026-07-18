'use client';
import React, { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import { getSessionSync, destroySession, AdminSession } from '@/lib/adminAuth';
import { docsSections } from '@/lib/docsConfig';
import {
  Resource,
  RESOURCE_CATEGORIES,
  SUPPORTED_FORMATS,
  isSupportedFile,
  formatBytes,
  fileToDataUrl,
  getResources,
  saveResource,
  deleteResource,
  subscribeResources,
} from '@/lib/resources';
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
import styles from './page.module.css';

type Tab = 'overview' | 'upload' | 'resources' | 'certificate' | 'files';

export default function AdminDashboardPage() {
  const admin = useSyncExternalStore(
    () => () => {},
    () => getSessionSync(),
    () => null
  );
  const [tab, setTab] = useState<Tab>('overview');
  const resources = useSyncExternalStore(subscribeResources, () => getResources(), () => []);

  useEffect(() => {
    if (!admin) window.location.replace('/AI-For-Electronics-Engineering/admin/login');
  }, [admin]);

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
          <button className={`${styles.navItem} ${tab === 'resources' ? styles.activeNav : ''}`} onClick={() => setTab('resources')}>
            🗂 Manage ({resources.length})
          </button>
          <button className={`${styles.navItem} ${tab === 'certificate' ? styles.activeNav : ''}`} onClick={() => setTab('certificate')}>
            🎖 Certificate
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
            {tab === 'resources' && 'Manage Resources'}
            {tab === 'certificate' && 'Certificate & Branding'}
          </h1>
          <p className={styles.pageSubtitle}>
            {tab === 'upload' && 'Add a document that appears instantly on the public site.'}
            {tab === 'resources' && 'Resources are stored in this browser and shown live to visitors.'}
            {tab === 'overview' && 'AI for Electronics Engineers — Workshop'}
            {tab === 'certificate' && 'Set workshop name, instructor, logos, signature, and generate certificates.'}
          </p>
        </div>

        <div className={styles.content}>
          {tab === 'overview' && (
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
                  <span className={styles.statValue}>{resources.length}</span>
                  <span className={styles.statLabel}>Uploaded</span>
                </div>
              </div>

              <div className={styles.section}>
                <h2>Quick Actions</h2>
                <div className={styles.actionsGrid}>
                  <button className={styles.actionCard} onClick={() => setTab('upload')}>
                    <span className={styles.actionIcon}>⬆</span>
                    Upload Resource
                  </button>
                  <a className={styles.actionCard} href="/AI-For-Electronics-Engineering/">
                    <span className={styles.actionIcon}>🌐</span>
                    View Site
                  </a>
                  <a className={styles.actionCard} href="/AI-For-Electronics-Engineering/learn/introduction">
                    <span className={styles.actionIcon}>📚</span>
                    View Lessons
                  </a>
                </div>
              </div>

              <div className={styles.section}>
                <h2>Session Info</h2>
                <div className={styles.infoCards}>
                  <div className={styles.infoCard}>
                    <h3>Role</h3>
                    <p>{admin.role}</p>
                  </div>
                  <div className={styles.infoCard}>
                    <h3>Session Expires</h3>
                    <p>{sessionExpires}</p>
                  </div>
                  <div className={styles.infoCard}>
                    <h3>Storage</h3>
                    <p>Browser localStorage — no backend. Uploads appear live on the public site.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'upload' && (
            <UploadForm
              onSaved={() => setTab('resources')}
            />
          )}

          {tab === 'resources' && (
            <ResourceManager resources={resources} />
          )}

          {tab === 'certificate' && (
            <CertificateManager />
          )}
        </div>
      </main>
    </div>
  );
}

function UploadForm({ onSaved }: { onSaved: (r: Resource) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(RESOURCE_CATEGORIES[0]);
  const [version, setVersion] = useState('v1.0');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [associatedLesson, setAssociatedLesson] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTitle(''); setDescription(''); setCategory(RESOURCE_CATEGORIES[0]);
    setVersion('v1.0'); setTags(''); setVisibility('public'); setDisplayOrder(0);
    setAssociatedLesson(''); setFile(null); setThumbnail(null);
    if (fileRef.current) fileRef.current.value = '';
    if (thumbRef.current) thumbRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !description.trim()) { setError('Title and description are required.'); return; }
    if (!file) { setError('Please choose a file to upload.'); return; }
    if (!isSupportedFile(file.name)) {
      setError(`Unsupported format. Allowed: ${SUPPORTED_FORMATS.join(', ').toUpperCase()}`);
      return;
    }
    if (thumbnail && !['png', 'jpg', 'jpeg'].includes(thumbnail.name.split('.').pop()?.toLowerCase() ?? '')) {
      setError('Thumbnail must be a PNG or JPG image.'); return;
    }

    setSaving(true);
    try {
      const fileData = await fileToDataUrl(file);
      const thumbData = thumbnail ? await fileToDataUrl(thumbnail) : '';
      const ext = (file.name.split('.').pop() ?? '').toUpperCase();
      const resource: Resource = {
        id: `res-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        category,
        version: version.trim() || 'v1.0',
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        visibility,
        displayOrder: Number(displayOrder) || 0,
        associatedLesson,
        thumbnail: thumbData,
        fileName: file.name,
        fileType: ext,
        fileSize: formatBytes(file.size),
        fileData,
        uploadedAt: new Date().toISOString(),
      };
      saveResource(resource);
      reset();
      onSaved(resource);
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
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Workshop Cheat Sheet" required />
        </label>

        <label className={styles.field}>
          <span>Category *</span>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {RESOURCE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className={styles.field}>
          <span>Version</span>
          <input value={version} onChange={e => setVersion(e.target.value)} placeholder="v1.0" />
        </label>

        <label className={styles.field}>
          <span>Display Order</span>
          <input type="number" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} />
        </label>

        <label className={styles.field}>
          <span>Visibility</span>
          <select value={visibility} onChange={e => setVisibility(e.target.value as 'public' | 'private')}>
            <option value="public">Public (visible on site)</option>
            <option value="private">Private (hidden)</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Associated Lesson</span>
          <select value={associatedLesson} onChange={e => setAssociatedLesson(e.target.value)}>
            <option value="">None</option>
            {docsSections.map(s => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
        </label>

        <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
          <span>Tags (comma separated)</span>
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="notes, beginner, lab" />
        </label>

        <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
          <span>Description *</span>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="What is this resource about?" required />
        </label>

        <label className={styles.field}>
          <span>File * ({SUPPORTED_FORMATS.join(', ').toUpperCase()})</span>
          <input ref={fileRef} type="file"
            accept={SUPPORTED_FORMATS.map(f => '.' + f).join(',')}
            onChange={e => setFile(e.target.files?.[0] ?? null)} required />
          {file && <span className={styles.fileHint}>{file.name} · {formatBytes(file.size)}</span>}
        </label>

        <label className={styles.field}>
          <span>Thumbnail (optional, PNG/JPG)</span>
          <input ref={thumbRef} type="file" accept=".png,.jpg,.jpeg"
            onChange={e => setThumbnail(e.target.files?.[0] ?? null)} />
          {thumbnail && <span className={styles.fileHint}>{thumbnail.name}</span>}
        </label>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={saving}>
        {saving ? 'Saving…' : 'Upload & Publish'}
      </button>
    </form>
  );
}

function ResourceManager({ resources }: { resources: Resource[] }) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const remove = (id: string) => {
    deleteResource(id);
    setConfirmId(null);
  };

  if (resources.length === 0) {
    return <p className={styles.empty}>No resources uploaded yet. Use the Upload tab to add one.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th><th>Category</th><th>Version</th><th>Visibility</th><th>Order</th><th>Lesson</th><th></th>
          </tr>
        </thead>
        <tbody>
          {resources.map(r => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.category}</td>
              <td>{r.version}</td>
              <td>
                <span className={`${styles.statusBadge} ${r.visibility === 'private' ? styles.privateBadge : ''}`}>
                  {r.visibility}
                </span>
              </td>
              <td>{r.displayOrder}</td>
              <td>{r.associatedLesson || '—'}</td>
              <td>
                {confirmId === r.id ? (
                  <span>
                    <button className={styles.delBtn} onClick={() => remove(r.id)}>Confirm</button>
                    <button className={styles.cancelBtn} onClick={() => setConfirmId(null)}>Cancel</button>
                  </span>
                ) : (
                  <button className={styles.delLink} onClick={() => setConfirmId(r.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CertificateManager() {
  const [s, setS] = useState<CertificateSettings>(() => getSettings());
  const [status, setStatus] = useState('');
  const [generating, setGenerating] = useState(false);
  const [previewName, setPreviewName] = useState('Sample Participant');
  const [names, setNames] = useState('');
  const previewRef = useRef<HTMLCanvasElement>(null);

  const update = (patch: Partial<CertificateSettings>) => setS(prev => ({ ...prev, ...patch }));

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
    const list = names.split('\n').map(n => n.trim()).filter(Boolean);
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
      {/* ── Branding ─────────────────────── */}
      <section className={styles.certSection}>
        <h2>Workshop &amp; Instructor</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Workshop Name</span>
            <input value={s.workshopName} onChange={e => update({ workshopName: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Instructor Name</span>
            <input value={s.instructorName} onChange={e => update({ instructorName: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Instructor Title / Role</span>
            <input value={s.instructorTitle} onChange={e => update({ instructorTitle: e.target.value })} />
          </label>
        </div>
      </section>

      {/* ── Certificate template ─────────── */}
      <section className={styles.certSection}>
        <h2>Certificate Template</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Certificate Title</span>
            <input value={s.certTitle} onChange={e => update({ certTitle: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Subtitle</span>
            <input value={s.certSubtitle} onChange={e => update({ certSubtitle: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Body Text (use ↵ for new line)</span>
            <textarea value={s.bodyText} rows={3} onChange={e => update({ bodyText: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Details Line</span>
            <input value={s.detailsLine} onChange={e => update({ detailsLine: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Date Label</span>
            <input value={s.dateLabel} onChange={e => update({ dateLabel: e.target.value })} />
          </label>
        </div>
      </section>

      {/* ── Images / branding upload ─────── */}
      <section className={styles.certSection}>
        <h2>Logos &amp; Signature</h2>
        <p className={styles.sectionDesc}>
          Upload images to place on the certificate. Institution logo sits top-left,
          IEEE logo (optional) top-right, signature bottom-center above the instructor name.
        </p>
        <div className={styles.imgUploadRow}>
          <ImageField
            label="Institution Logo"
            hint="top-left"
            value={s.institutionLogo}
            onPick={(f) => handleImage(f, 'institutionLogo')}
            onClear={() => update({ institutionLogo: '' })}
          />
          <ImageField
            label="Signature Image"
            hint="under instructor name"
            value={s.signatureImage}
            onPick={(f) => handleImage(f, 'signatureImage')}
            onClear={() => update({ signatureImage: '' })}
          />
        </div>
        <div className={styles.checkboxRow}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={s.ieeeEnabled}
              onChange={e => update({ ieeeEnabled: e.target.checked })}
            />
            <span>Show IEEE logo (when applicable)</span>
          </label>
        </div>
        {s.ieeeEnabled && (
          <div className={styles.imgUploadRow}>
            <ImageField
              label="IEEE Logo"
              hint="top-right"
              value={s.ieeeLogo}
              onPick={(f) => handleImage(f, 'ieeeLogo')}
              onClear={() => update({ ieeeLogo: '' })}
            />
          </div>
        )}
      </section>

      {/* ── Live preview ─────────────────── */}
      <section className={styles.certSection}>
        <h2>Live Preview</h2>
        <div className={styles.previewWrap}>
          <canvas ref={previewRef} className={styles.previewCanvas} />
        </div>
        <div className={styles.previewControls}>
          <input
            className={styles.nameInput}
            value={previewName}
            onChange={e => setPreviewName(e.target.value)}
            placeholder="Preview name"
          />
          <button className={styles.smallBtn} onClick={handlePreview}>Update Preview</button>
          <button className={styles.smallBtn} onClick={handleDownloadPng}>⬇ PNG</button>
        </div>
      </section>

      {/* ── Bulk generate ────────────────── */}
      <section className={styles.certSection}>
        <h2>Generate PDF Certificates</h2>
        <p className={styles.sectionDesc}>
          Enter one participant name per line. A PDF is generated automatically — one
          certificate per name (multi-page when more than one).
        </p>
        <textarea
          className={styles.namesArea}
          value={names}
          onChange={e => setNames(e.target.value)}
          placeholder={'Robin R G\nAlice Thomas\nBob Martin'}
          rows={6}
        />
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
        <input ref={ref} type="file" accept=".png,.jpg,.jpeg" onChange={e => onPick(e.target.files?.[0] ?? null)} />
      )}
    </div>
  );
}
