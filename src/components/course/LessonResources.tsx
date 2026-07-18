'use client';
import React, { useEffect, useState } from 'react';
import { StoredFile, getFiles, subscribeStorage, fileTypeLabel, formatBytes } from '@/lib/storage';
import styles from './LessonResources.module.css';

export default function LessonResources({ slug }: { slug: string }) {
  const [resources, setResources] = useState<StoredFile[]>([]);

  useEffect(() => {
    const load = () => {
      const items = getFiles().filter(
        (f) => f.bucket === 'lesson-files' && f.lessonSlug === slug && f.visibility === 'public'
      );
      items.sort((a, b) => a.uploadedAt.localeCompare(b.uploadedAt));
      setResources(items);
    };
    load();
    return subscribeStorage(load);
  }, [slug]);

  if (resources.length === 0) return null;

  const download = (f: StoredFile) => {
    const a = document.createElement('a');
    a.href = f.dataUrl;
    a.download = f.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span className={styles.icon}>📎</span>
        <h2 className={styles.title}>Lesson Resources</h2>
        <span className={styles.count}>{resources.length}</span>
      </div>
      <p className={styles.subtitle}>Downloadable files attached to this lesson.</p>

      <div className={styles.grid}>
        {resources.map((f) => (
          <div key={f.id} className={styles.card}>
            <div className={styles.top}>
              <span className={styles.fileIcon}>
                {f.mimeType === 'application/pdf' ? '📄' : f.mimeType.includes('zip') ? '🗜️' : '📦'}
              </span>
              <div className={styles.meta}>
                <span className={styles.cat}>{f.category}</span>
                <span className={styles.type}>{fileTypeLabel(f)} · {formatBytes(f.size)}</span>
              </div>
            </div>
            <h3 className={styles.name}>{f.originalName}</h3>
            {f.description && <p className={styles.desc}>{f.description}</p>}
            <button className={styles.btn} onClick={() => download(f)}>
              ⬇ Download {fileTypeLabel(f)}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
