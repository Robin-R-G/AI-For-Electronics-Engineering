'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  StoredFile,
  Bucket,
  BUCKETS,
  BUCKET_LABELS,
  getFiles,
  deleteFile,
  subscribeStorage,
  fileTypeLabel,
  formatBytes,
} from '@/lib/storage';
import styles from './AdminStyles.module.css';

type FilterType = 'all' | 'images' | 'videos' | 'documents' | 'code';

const MIME_FILTERS: Record<FilterType, (f: StoredFile) => boolean> = {
  all: () => true,
  images: (f) => f.mimeType.startsWith('image/'),
  videos: (f) => f.mimeType.startsWith('video/'),
  documents: (f) => /^(application\/pdf|application\/msword|application\/vnd|text\/plain|text\/csv|text\/markdown)/.test(f.mimeType),
  code: (f) => /^(application\/zip|text\/plain|text\/csv|text\/markdown)/.test(f.mimeType),
};

export default function MediaLibrary() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const load = () => setFiles([...getFiles()].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)));
    load();
    return subscribeStorage(load);
  }, []);

  const filtered = useMemo(() => {
    return files
      .filter(MIME_FILTERS[typeFilter])
      .filter((f) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          f.originalName.toLowerCase().includes(q) ||
          f.title.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [files, typeFilter, search]);

  const counts = useMemo(() => ({
    all: files.length,
    images: files.filter(MIME_FILTERS.images).length,
    videos: files.filter(MIME_FILTERS.videos).length,
    documents: files.filter(MIME_FILTERS.documents).length,
    code: files.filter(MIME_FILTERS.code).length,
  }), [files]);

  const remove = (id: string) => {
    deleteFile(id);
    setConfirmId(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, title, category, or tags..."
          style={{
            flex: '1 1 250px',
            padding: '0.5rem 0.75rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-primary)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-sans)',
          }}
        />
      </div>

      <div className={styles.filterBar} style={{ marginBottom: '1.5rem' }}>
        {(['all', 'images', 'videos', 'documents', 'code'] as FilterType[]).map((t) => (
          <button
            key={t}
            className={styles.filterBtn + ' ' + (typeFilter === t ? styles.activeFilter : '')}
            onClick={() => setTypeFilter(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} ({counts[t]})
          </button>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '5%' }}></th>
              <th style={{ width: '25%' }}>Name</th>
              <th style={{ width: '12%' }}>Bucket</th>
              <th style={{ width: '12%' }}>Type</th>
              <th style={{ width: '10%' }}>Size</th>
              <th style={{ width: '10%' }}>Visibility</th>
              <th style={{ width: '12%' }}>Uploaded</th>
              <th style={{ width: '14%' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id}>
                <td>
                  {f.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.thumbnail} alt="" style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '1.2rem' }}>
                      {f.mimeType.startsWith('image/') ? '[img]' : f.mimeType.startsWith('video/') ? '[vid]' : '[doc]'}
                    </span>
                  )}
                </td>
                <td>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block' }}>{f.title || f.originalName}</span>
                    {f.tags.length > 0 && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                        {f.tags.slice(0, 3).join(', ')}{f.tags.length > 3 ? '...' : ''}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem' }}>{BUCKET_LABELS[f.bucket]}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem' }}>{fileTypeLabel(f)}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem' }}>{formatBytes(f.size)}</span>
                </td>
                <td>
                  <span className={styles.statusBadge + ' ' + (f.visibility === 'private' ? styles.privateBadge : '')}>
                    {f.visibility}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {new Date(f.uploadedAt).toLocaleDateString()}
                  </span>
                </td>
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.empty}>
                  {search ? 'No files match your search.' : 'No files in this category yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}