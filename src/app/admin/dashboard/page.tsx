'use client';
import React, { useEffect, useState } from 'react';
import { getSessionSync, destroySession, AdminSession } from '@/lib/adminAuth';
import { getFiles, subscribeStorage } from '@/lib/storage';
import OverviewTab from '@/components/admin/OverviewTab';
import { StorageUploadForm, StorageManager } from '@/components/admin/ResourceManager';
import CertificateManager from '@/components/admin/CertificateManager';
import QuizManager from '@/components/admin/QuizManager';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import LessonManager from '@/components/admin/LessonManager';
import LabManager from '@/components/admin/LabManager';
import MediaLibrary from '@/components/admin/MediaLibrary';
import AdminSettings from '@/components/admin/AdminSettings';
import styles from './page.module.css';

const BASE = '/AI-For-Electronics-Engineering';

type Tab =
  | 'overview'
  | 'upload'
  | 'storage'
  | 'certificate'
  | 'analytics'
  | 'lessons'
  | 'quizAdmin'
  | 'labs'
  | 'media'
  | 'settings';

const NAV_ITEMS: { tab: Tab; label: string }[] = [
  { tab: 'overview', label: 'Overview' },
  { tab: 'lessons', label: 'Edit Lessons' },
  { tab: 'labs', label: 'Lab Projects' },
  { tab: 'quizAdmin', label: 'Quiz Admin' },
  { tab: 'upload', label: 'Upload Resource' },
  { tab: 'storage', label: 'Storage' },
  { tab: 'media', label: 'Media Library' },
  { tab: 'certificate', label: 'Certificate' },
  { tab: 'analytics', label: 'Analytics' },
  { tab: 'settings', label: 'Settings' },
];

export default function AdminDashboardPage() {
  const [admin] = useState<AdminSession | null>(() => getSessionSync());
  const [tab, setTab] = useState<Tab>('overview');
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    if (!admin) window.location.replace(BASE + '/admin');
  }, [admin]);

  useEffect(() => {
    const load = () => setFileCount(getFiles().length);
    load();
    return subscribeStorage(load);
  }, []);

  const handleLogout = () => {
    destroySession();
    window.location.replace(BASE + '/admin');
  };

  if (!admin) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingSpinner}>
          <span className={styles.spinner}></span>
          <p>Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>EE</div>
          <span className={styles.logoText}>Workshop Admin</span>
        </div>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.tab}
              className={styles.navItem + (tab === item.tab ? ' ' + styles.activeNav : '')}
              onClick={() => setTab(item.tab)}
            >
              {item.label}
              {item.tab === 'storage' && ' (' + fileCount + ')'}
            </button>
          ))}
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
            Sign Out
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
            {tab === 'labs' && 'Lab Projects'}
            {tab === 'media' && 'Media Library'}
            {tab === 'settings' && 'Settings'}
          </h1>
          <p className={styles.pageSubtitle}>
            {tab === 'overview' && 'AI for Electronics Engineers - Workshop'}
            {tab === 'upload' && 'Files are auto-organized into buckets by type with full metadata.'}
            {tab === 'storage' && 'All uploads live in structured storage with metadata and usage tracking.'}
            {tab === 'certificate' && 'Set workshop name, instructor, logos, signature, and generate certificates.'}
            {tab === 'quizAdmin' && 'Manage the quiz questions bank, upload question sets, and view detailed analytics.'}
            {tab === 'analytics' && 'Local activity tracked in this browser and aggregated here.'}
            {tab === 'lessons' && 'Edit any lesson with Markdown, media, math, and version history.'}
            {tab === 'labs' && 'Browse and inspect all electronics lab projects across categories.'}
            {tab === 'media' && 'Search, filter, and manage all uploaded images, videos, and files.'}
            {tab === 'settings' && 'Configure website identity, branding, and certificate defaults.'}
          </p>
        </div>

        <div className={styles.content}>
          {tab === 'overview' && (
            <OverviewTab fileCount={fileCount} onGo={(t) => setTab(t as Tab)} />
          )}
          {tab === 'upload' && <StorageUploadForm onSaved={() => setTab('storage')} />}
          {tab === 'storage' && <StorageManager />}
          {tab === 'certificate' && <CertificateManager />}
          {tab === 'quizAdmin' && <QuizManager />}
          {tab === 'analytics' && <AnalyticsDashboard />}
          {tab === 'lessons' && <LessonManager />}
          {tab === 'labs' && <LabManager />}
          {tab === 'media' && <MediaLibrary />}
          {tab === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
}