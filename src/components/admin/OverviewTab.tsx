'use client';
import React from 'react';
import { docsSections } from '@/lib/docsConfig';
import styles from './AdminStyles.module.css';

const BASE = '/AI-For-Electronics-Engineering';

type Tab = 'overview' | 'upload' | 'storage' | 'certificate' | 'analytics' | 'lessons' | 'quizAdmin' | 'labs' | 'media' | 'settings';

export default function OverviewTab({ fileCount, onGo }: { fileCount: number; onGo: (t: Tab) => void }) {
  return (
    <>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{docsSections.length}</span>
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
            Upload Resource
          </button>
          <button className={styles.actionCard} onClick={() => onGo('certificate')}>
            Certificates
          </button>
          <button className={styles.actionCard} onClick={() => onGo('analytics')}>
            Analytics
          </button>
          <button className={styles.actionCard} onClick={() => onGo('lessons')}>
            Edit Lessons
          </button>
          <a className={styles.actionCard} href={BASE + '/'}>
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
            <p>Browser localStorage - no backend. All uploads organized into structured buckets.</p>
          </div>
        </div>
      </div>
    </>
  );
}