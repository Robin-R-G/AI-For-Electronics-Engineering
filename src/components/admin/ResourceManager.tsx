'use client';
import React, { useEffect, useState, useRef } from 'react';
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
import { fileToDataUrl as settingsFileToDataUrl } from '@/lib/settings';
import styles from './AdminStyles.module.css';

export function StorageUploadForm({ onSaved }: { onSaved: () => void }) {
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
      setError('Unsupported format. Allowed: ' + ALLOWED.join(', ').toUpperCase());
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
      setError('Storage failed - the file may be too large for this browser (limit ~5 MB).');
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
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Document, Code, Template..." />
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
          {file && <span className={styles.fileHint}>{file.name} - {formatBytes(file.size)}</span>}
        </label>

        <label className={styles.field}>
          <span>Thumbnail (optional, PNG/JPG)</span>
          <input ref={thumbRef} type="file" accept=".png,.jpg,.jpeg" onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)} />
          {thumbnail && <span className={styles.fileHint}>{thumbnail.name}</span>}
        </label>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={saving}>
        {saving ? 'Saving...' : 'Upload & Organize'}
      </button>
    </form>
  );
}

export function StorageManager() {
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
          Storage used: <strong>{formatBytes(usage.total)}</strong> - {files.length} files
        </div>
        <div className={styles.usageTrack}>
          {BUCKETS.map((b) => {
            const pct = usage.total ? ((usage.byBucket[b] ?? 0) / usage.total) * 100 : 0;
            return (
              <div
                key={b}
                className={styles.usageSeg}
                style={{ width: pct + '%' }}
                title={BUCKET_LABELS[b] + ': ' + formatBytes(usage.byBucket[b] ?? 0)}
              />
            );
          })}
        </div>
        <div className={styles.usageLegend}>
          {BUCKETS.map((b) => (
            <span key={b} className={styles.usageChip}>
              {BUCKET_LABELS[b]} - {formatBytes(usage.byBucket[b] ?? 0)}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.filterBar} style={{ marginTop: '1.5rem' }}>
        <button className={styles.filterBtn + ' ' + (bucket === 'all' ? styles.activeFilter : '')} onClick={() => setBucket('all')}>All</button>
        {BUCKETS.map((b) => (
          <button key={b} className={styles.filterBtn + ' ' + (bucket === b ? styles.activeFilter : '')} onClick={() => setBucket(b)}>
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
                  <span className={styles.statusBadge + ' ' + (f.visibility === 'private' ? styles.privateBadge : '')}>
                    {f.visibility}
                  </span>
                </td>
                <td>{f.lessonSlug || '-'}</td>
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