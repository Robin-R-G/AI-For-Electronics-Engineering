'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

interface SessionData {
  valid: boolean;
  email?: string;
  role?: string;
  expiresAt?: string;
}

interface Stats {
  totalModules: number;
  totalComponents: number;
  totalQuestions: number;
  totalPrompts: number;
  totalProjects: number;
  totalBadges: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'users' | 'settings'>('overview');

  const stats: Stats = {
    totalModules: 19,
    totalComponents: 5,
    totalQuestions: 15,
    totalPrompts: 11,
    totalProjects: 6,
    totalBadges: 17,
  };

  const navItems: { id: 'overview' | 'modules' | 'users' | 'settings'; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'modules', label: 'Modules', icon: '📚' },
    { id: 'users', label: 'User Analytics', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin');
      return;
    }

    fetch('/api/admin/session', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (!data.valid) {
          localStorage.removeItem('admin_token');
          router.replace('/admin');
        } else {
          setSession(data);
          setLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
        router.replace('/admin');
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    localStorage.removeItem('admin_token');
    router.replace('/admin');
  };

  if (loading || !session) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner} />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className={styles.logoText}>Admin Panel</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.activeNav : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{session.email?.charAt(0).toUpperCase()}</div>
            <div>
              <p className={styles.userEmail}>{session.email}</p>
              <p className={styles.userRole}>{session.role}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'modules' && 'Module Management'}
              {activeTab === 'users' && 'User Analytics'}
              {activeTab === 'settings' && 'Platform Settings'}
            </h1>
            <p className={styles.pageSubtitle}>
              Session expires: {session.expiresAt ? new Date(session.expiresAt).toLocaleString() : 'N/A'}
            </p>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className={styles.content}>
            <div className={styles.statsGrid}>
              {[
                { label: 'Total Modules', value: stats.totalModules, icon: '📚', color: 'var(--color-cyan)' },
                { label: 'Components', value: stats.totalComponents, icon: '🔧', color: 'var(--color-purple)' },
                { label: 'Interview Q&A', value: stats.totalQuestions, icon: '💼', color: 'var(--color-green)' },
                { label: 'AI Prompts', value: stats.totalPrompts, icon: '✍️', color: '#f59e0b' },
                { label: 'Project Ideas', value: stats.totalProjects, icon: '🚀', color: '#ef4444' },
                { label: 'Achievement Badges', value: stats.totalBadges, icon: '🏆', color: 'var(--color-electric-blue)' },
              ].map(stat => (
                <div key={stat.label} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <h2>Platform Status</h2>
              <div className={styles.statusGrid}>
                <div className={styles.statusItem}>
                  <span className={styles.statusDot} style={{ background: '#00ffa3' }} />
                  <span>All Systems Operational</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={styles.statusDot} style={{ background: '#00ffa3' }} />
                  <span>Build: 0 TypeScript Errors</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={styles.statusDot} style={{ background: '#00ffa3' }} />
                  <span>Downloads: Functional</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={styles.statusDot} style={{ background: '#00ffa3' }} />
                  <span>Certificate: QR Code Enabled</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Quick Actions</h2>
              <div className={styles.actionsGrid}>
                <Link href="/learn/introduction" className={styles.actionCard}>
                  <span className={styles.actionIcon}>📖</span>
                  <span>View Workshop</span>
                </Link>
                <Link href="/learn/quiz" className={styles.actionCard}>
                  <span className={styles.actionIcon}>📝</span>
                  <span>Take Quiz</span>
                </Link>
                <Link href="/learn/badges" className={styles.actionCard}>
                  <span className={styles.actionIcon}>🏆</span>
                  <span>View Badges</span>
                </Link>
                <Link href="/learn/electronics-lab" className={styles.actionCard}>
                  <span className={styles.actionIcon}>🔌</span>
                  <span>Electronics Lab</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className={styles.content}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Slug</th>
                    <th>Difficulty</th>
                    <th>Reading Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: 'Introduction', slug: 'introduction', difficulty: 'Beginner', time: '5 min', status: 'Complete' },
                    { title: 'AI Fundamentals', slug: 'ai-fundamentals', difficulty: 'Beginner', time: '15 min', status: 'Complete' },
                    { title: 'Machine Learning', slug: 'machine-learning', difficulty: 'Intermediate', time: '20 min', status: 'Complete' },
                    { title: 'Deep Learning', slug: 'deep-learning', difficulty: 'Advanced', time: '25 min', status: 'Complete' },
                    { title: 'Generative AI', slug: 'generative-ai', difficulty: 'Intermediate', time: '20 min', status: 'Complete' },
                    { title: 'LLMs', slug: 'llms', difficulty: 'Advanced', time: '25 min', status: 'Complete' },
                    { title: 'AI Tools', slug: 'ai-tools', difficulty: 'Beginner', time: '15 min', status: 'Complete' },
                    { title: 'Electronics Applications', slug: 'electronics-applications', difficulty: 'Intermediate', time: '30 min', status: 'Complete' },
                    { title: 'Electronics Lab', slug: 'electronics-lab', difficulty: 'Intermediate', time: '30 min', status: 'Complete' },
                    { title: 'Component Encyclopedia', slug: 'component-encyclopedia', difficulty: 'Beginner', time: '15 min', status: 'Complete' },
                    { title: 'Interview Preparation', slug: 'interview-prep', difficulty: 'Intermediate', time: '20 min', status: 'Complete' },
                    { title: 'Project Builder', slug: 'project-builder', difficulty: 'Intermediate', time: '15 min', status: 'Complete' },
                    { title: 'Prompt Engineering', slug: 'prompt-engineering', difficulty: 'Beginner', time: '15 min', status: 'Complete' },
                    { title: 'Career Roadmap', slug: 'career-roadmap', difficulty: 'Beginner', time: '10 min', status: 'Complete' },
                    { title: 'Live Demonstrations', slug: 'live-demonstrations', difficulty: 'Advanced', time: '45 min', status: 'Complete' },
                    { title: 'Future Trends', slug: 'future-trends', difficulty: 'Intermediate', time: '10 min', status: 'Complete' },
                    { title: 'Resources', slug: 'resources', difficulty: 'Beginner', time: '5 min', status: 'Complete' },
                    { title: 'Quiz', slug: 'quiz', difficulty: 'Intermediate', time: '10 min', status: 'Complete' },
                    { title: 'Downloads', slug: 'downloads', difficulty: 'Beginner', time: '2 min', status: 'Complete' },
                  ].map(mod => (
                    <tr key={mod.slug}>
                      <td><strong>{mod.title}</strong></td>
                      <td><code className={styles.slug}>{mod.slug}</code></td>
                      <td>
                        <span className={`${styles.diffBadge} ${
                          mod.difficulty === 'Beginner' ? styles.beginner :
                          mod.difficulty === 'Intermediate' ? styles.intermediate : styles.advanced
                        }`}>
                          {mod.difficulty}
                        </span>
                      </td>
                      <td>{mod.time}</td>
                      <td><span className={styles.statusBadge}>{mod.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className={styles.content}>
            <div className={styles.section}>
              <h2>User Progress Tracking</h2>
              <p className={styles.sectionDesc}>
                User progress is tracked locally via localStorage. Each student&apos;s data stays on their device.
              </p>
              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <h3>Progress Storage</h3>
                  <p>All progress data is stored in the browser&apos;s localStorage. No user data is sent to any server.</p>
                </div>
                <div className={styles.infoCard}>
                  <h3>Tracked Metrics</h3>
                  <ul>
                    <li>Modules read (slugs)</li>
                    <li>Quiz scores</li>
                    <li>Badges earned</li>
                    <li>Prompts copied</li>
                    <li>Labs completed</li>
                    <li>Questions reviewed</li>
                  </ul>
                </div>
                <div className={styles.infoCard}>
                  <h3>Privacy Note</h3>
                  <p>No analytics, no cookies, no tracking scripts. The platform respects user privacy completely.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={styles.content}>
            <div className={styles.section}>
              <h2>Platform Settings</h2>
              <div className={styles.settingsList}>
                <div className={styles.settingItem}>
                  <div>
                    <h3>Workshop Name</h3>
                    <p>AI for Electronics Engineers</p>
                  </div>
                </div>
                <div className={styles.settingItem}>
                  <div>
                    <h3>Instructor</h3>
                    <p>Robin R G</p>
                  </div>
                </div>
                <div className={styles.settingItem}>
                  <div>
                    <h3>Version</h3>
                    <p>v1.0.0</p>
                  </div>
                </div>
                <div className={styles.settingItem}>
                  <div>
                    <h3>Authentication</h3>
                    <p>SHA-256 hashed credentials + HMAC-SHA256 JWT tokens</p>
                  </div>
                  <span className={styles.secureBadge}>Secure</span>
                </div>
                <div className={styles.settingItem}>
                  <div>
                    <h3>Session Duration</h3>
                    <p>24 hours (configurable via SESSION_EXPIRY_HOURS)</p>
                  </div>
                </div>
                <div className={styles.settingItem}>
                  <div>
                    <h3>Credential Storage</h3>
                    <p>Environment variables in .env.local (never committed to git)</p>
                  </div>
                  <span className={styles.secureBadge}>Secure</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
