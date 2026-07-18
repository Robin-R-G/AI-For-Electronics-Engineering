'use client';
import React, { useEffect, useState } from 'react';
import { Resource, getResources, subscribeResources, formatBytes } from '@/lib/resources';
import styles from './LessonResources.module.css';

export default function LessonResources({ slug }: { slug: string }) {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const load = () => {
      const items = getResources().filter(
        (r) => r.associatedLesson === slug && r.visibility === 'public'
      );
      items.sort((a, b) => a.displayOrder - b.displayOrder || a.uploadedAt.localeCompare(b.uploadedAt));
      setResources(items);
    };
    load();
    return subscribeResources(load);
  }, [slug]);

  if (resources.length === 0) return null;

  const download = (r: Resource) => {
    const a = document.createElement('a');
    a.href = r.fileData;
    a.download = r.fileName;
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
        {resources.map((r) => (
          <div key={r.id} className={styles.card}>
            <div className={styles.top}>
              <span className={styles.fileIcon}>
                {r.fileType === 'PDF' ? '📄' : r.fileType === 'ZIP' ? '🗜️' : '📦'}
              </span>
              <div className={styles.meta}>
                <span className={styles.cat}>{r.category}</span>
                <span className={styles.type}>{r.fileType} · {r.fileSize}</span>
              </div>
            </div>
            <h3 className={styles.name}>{r.title}</h3>
            <p className={styles.desc}>{r.description}</p>
            <button className={styles.btn} onClick={() => download(r)}>
              ⬇ Download {r.fileType}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
