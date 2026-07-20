'use client';
import React, { useEffect, useState } from 'react';
import {
  summarize,
  clearAnalytics,
  subscribeAnalytics,
} from '@/lib/analytics';
import {
  BUCKETS,
  BUCKET_LABELS,
  subscribeStorage,
  fileTypeLabel,
  formatBytes,
} from '@/lib/storage';
import styles from './AdminStyles.module.css';

export default function AnalyticsDashboard() {
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
                <span className={styles.upMeta}>{BUCKET_LABELS[f.bucket]} - {fileTypeLabel(f)} - {formatBytes(f.size)}</span>
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
              <div key={b} className={styles.usageSeg} style={{ width: pct + '%' }} title={BUCKET_LABELS[b] + ': ' + formatBytes(summary.storage.byBucket[b] ?? 0)} />
            );
          })}
        </div>
        <div className={styles.usageLegend}>
          {BUCKETS.map((b) => (
            <span key={b} className={styles.usageChip}>
              {BUCKET_LABELS[b]} - {formatBytes(summary.storage.byBucket[b] ?? 0)}
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