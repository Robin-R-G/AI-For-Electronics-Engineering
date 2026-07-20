'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { docsSections } from '@/lib/docsConfig';
import { loadAllProjects, type LabProject } from '@/lib/labService';
import { useProgress } from '@/context/ProgressContext';
import styles from './page.module.css';

const DOWNLOADS = [
  { name: 'Workshop Slide Deck', meta: 'PDF · 11 modules', href: '/learn/downloads' },
  { name: 'Completion Certificate', meta: 'PDF · branded', href: '/learn/downloads' },
  { name: 'Lab Source Code & Schematics', meta: 'Per-project', href: '/learn/electronics-lab' },
  { name: 'AI Prompt Pack', meta: 'Curated library', href: '/learn/prompt-engineering' },
  { name: 'Interview Question Bank', meta: 'Practice sets', href: '/learn/interview-prep' },
];

const RECENT_UPDATES = [
  { id: 'u1', date: 'Jul 18, 2026', title: 'New STM32 motor-control lab', text: 'Added a field-oriented-control project with working firmware and decoding guide.' },
  { id: 'u2', date: 'Jul 11, 2026', title: 'Quiz analytics upgraded', text: 'Per-topic score breakdown now persists to your dashboard after every attempt.' },
  { id: 'u3', date: 'Jun 30, 2026', title: 'ESP32 TinyML module', text: 'New lesson on quantizing models for the ESP32-S3 with live code samples.' },
  { id: 'u4', date: 'Jun 22, 2026', title: 'Bookmark any lesson', text: 'Star lessons from the header to build your personal study list.' },
];

function ProgressBar({ value, tone = 'brand' }: { value: number; tone?: 'brand' | 'cyan' | 'success' }) {
  return (
    <div className={styles.bar}>
      <div className={`${styles.barFill} ${styles[tone]}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export default function DashboardPage() {
  const {
    readSlugs, markAsRead, quizScores, labsCompleted,
    bookmarks, toggleBookmark, earnedBadges,
  } = useProgress();

  const lessonMap = useMemo(() => Object.fromEntries(docsSections.map((s) => [s.slug, s])), []);
  const [allLabs, setAllLabs] = useState<LabProject[]>([]);

  useEffect(() => {
    loadAllProjects().then(setAllLabs);
  }, []);

  const [dismissed, setDismissed] = useState<string[]>([]);

  const readSet = useMemo(() => new Set(readSlugs), [readSlugs]);
  const totalLessons = docsSections.length;
  const completedCount = readSlugs.length;
  const lessonPct = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  const recentLessons = useMemo(
    () => [...readSlugs].reverse().map((s) => lessonMap[s]).filter(Boolean).slice(0, 6),
    [readSlugs, lessonMap]
  );

  const unread = useMemo(() => docsSections.filter((s) => !readSet.has(s.slug)), [readSet]);
  const continueLesson = unread[0] ?? docsSections[0];
  const recommended = unread.slice(1, 5);

  const totalLabs = allLabs.length;
  const labDone = labsCompleted.length;
  const labPct = totalLabs ? Math.round((labDone / totalLabs) * 100) : 0;

  const quizEntries = useMemo(() => Object.entries(quizScores), [quizScores]);

  const bookmarkedLessons = useMemo(
    () => bookmarks.map((s) => lessonMap[s]).filter(Boolean),
    [bookmarks, lessonMap]
  );

  const updates = RECENT_UPDATES.filter((u) => !dismissed.includes(u.id));

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Your Learning Hub</p>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Track lessons, labs, quizzes, and bookmarks — all in one place.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroNum}>{completedCount}</span>
            <span className={styles.heroLbl}>Lessons read</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroNum}>{labDone}</span>
            <span className={styles.heroLbl}>Labs built</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroNum}>{earnedBadges.length}</span>
            <span className={styles.heroLbl}>Badges</span>
          </div>
        </div>
      </header>

      {/* ── Continue Learning ───────────────────── */}
      <section className={styles.continue}>
        <div className={styles.continueText}>
          <span className={styles.kicker}>Continue Learning</span>
          <h2>{continueLesson.title}</h2>
          <p>{continueLesson.description}</p>
          <div className={styles.continueMeta}>
            <span>{continueLesson.readingTime}</span>
            <span className={styles.dot}>·</span>
            <span>{continueLesson.difficulty}</span>
          </div>
        </div>
        <div className={styles.continueActions}>
          <Link href={`/learn/${continueLesson.slug}`} className={styles.primaryBtn}>
            {unread.length ? 'Resume Lesson' : 'Review Lesson'} →
          </Link>
          <button
            className={styles.ghostBtn}
            onClick={() => markAsRead(continueLesson.slug)}
            disabled={readSet.has(continueLesson.slug)}
          >
            {readSet.has(continueLesson.slug) ? '✓ Completed' : 'Mark complete'}
          </button>
        </div>
      </section>

      {/* ── Progress overview ───────────────────── */}
      <section className={styles.grid2}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h3>Learning Progress</h3>
            <span className={styles.cardNum}>{lessonPct}%</span>
          </div>
          <ProgressBar value={lessonPct} tone="brand" />
          <p className={styles.cardFoot}>
            {completedCount} of {totalLessons} lessons completed
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h3>Project Progress</h3>
            <span className={styles.cardNum}>{labPct}%</span>
          </div>
          <ProgressBar value={labPct} tone="success" />
          <p className={styles.cardFoot}>
            {labDone} of {totalLabs} electronics labs completed
          </p>
        </div>
      </section>

      {/* ── Recent + Completed ──────────────────── */}
      <section className={styles.grid2}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h3>Recent Lessons</h3>
            <Link href="/learn/introduction" className={styles.cardLink}>All →</Link>
          </div>
          {recentLessons.length ? (
            <ul className={styles.linkList}>
              {recentLessons.map((s) => (
                <li key={s.slug}>
                  <Link href={`/learn/${s.slug}`} className={styles.linkRow}>
                    <span className={styles.linkTitle}>{s.title}</span>
                    <span className={styles.linkMeta}>{s.difficulty}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyHint}>
              <p>No lessons read yet.</p>
              <Link href="/learn/introduction" className={styles.ghostBtn}>Start with Introduction</Link>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h3>Completed Lessons</h3>
            <span className={styles.cardNum}>{completedCount}</span>
          </div>
          {completedCount ? (
            <div className={styles.chipWrap}>
              {readSlugs.map((slug) => {
                const s = lessonMap[slug];
                if (!s) return null;
                return (
                  <Link key={slug} href={`/learn/${slug}`} className={styles.chip}>
                    ✓ {s.title}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyHint}>
              <p>Finish a lesson to see it here.</p>
              <Link href="/learn/introduction" className={styles.ghostBtn}>Begin a lesson</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Recommended ─────────────────────────── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h3>Recommended Lessons</h3>
        </div>
        {recommended.length ? (
          <div className={styles.recoGrid}>
            {recommended.map((s) => (
              <Link key={s.slug} href={`/learn/${s.slug}`} className={styles.recoCard}>
                <span className={styles.recoTitle}>{s.title}</span>
                <span className={styles.recoMeta}>{s.readingTime} · {s.difficulty}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyHint}>
            <p>You&apos;re all caught up — every lesson is on your completed list.</p>
            <Link href="/learn/quiz" className={styles.ghostBtn}>Test your skills</Link>
          </div>
        )}
      </section>

      {/* ── Quiz Performance ────────────────────── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h3>Quiz Performance</h3>
          <Link href="/learn/quiz" className={styles.cardLink}>Take a quiz →</Link>
        </div>
        {quizEntries.length ? (
          <ul className={styles.quizList}>
            {quizEntries.map(([id, score]) => (
              <li key={id} className={styles.quizRow}>
                <div className={styles.quizInfo}>
                  <span className={styles.quizName}>{id}</span>
                  <ProgressBar value={score} tone={score >= 80 ? 'success' : 'cyan'} />
                </div>
                <div className={styles.quizScore}>
                  <span className={score >= 80 ? styles.pass : styles.fail}>{score}%</span>
                  <Link href="/learn/quiz" className={styles.retake}>Retake</Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyHint}>
            <p>No quiz attempts yet — your scores will appear here.</p>
            <Link href="/learn/quiz" className={styles.ghostBtn}>Start a quiz</Link>
          </div>
        )}
      </section>

      {/* ── Downloads ───────────────────────────── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h3>Downloads</h3>
          <Link href="/learn/downloads" className={styles.cardLink}>All resources →</Link>
        </div>
        <ul className={styles.linkList}>
          {DOWNLOADS.map((d) => (
            <li key={d.name}>
              <Link href={d.href} className={styles.linkRow}>
                <span className={styles.linkTitle}>⬇ {d.name}</span>
                <span className={styles.linkMeta}>{d.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Bookmarks ───────────────────────────── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h3>Bookmarks</h3>
        </div>
        {bookmarkedLessons.length ? (
          <ul className={styles.linkList}>
            {bookmarkedLessons.map((s) => (
              <li key={s.slug} className={styles.bookmarkRow}>
                <Link href={`/learn/${s.slug}`} className={styles.linkRow}>
                  <span className={styles.linkTitle}>★ {s.title}</span>
                  <span className={styles.linkMeta}>{s.difficulty}</span>
                </Link>
                <button
                  className={styles.removeBtn}
                  onClick={() => toggleBookmark(s.slug)}
                  aria-label={`Remove bookmark ${s.title}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyHint}>
            <p>No bookmarks yet. Use the ☆ button on any lesson to save it here.</p>
            <Link href="/learn/introduction" className={styles.ghostBtn}>Open a lesson</Link>
          </div>
        )}
      </section>

      {/* ── Recent Updates ──────────────────────── */}
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h3>Recent Updates</h3>
        </div>
        {updates.length ? (
          <ul className={styles.updateList}>
            {updates.map((u) => (
              <li key={u.id} className={styles.updateRow}>
                <div className={styles.updateBody}>
                  <div className={styles.updateTop}>
                    <span className={styles.updateTitle}>{u.title}</span>
                    <span className={styles.updateDate}>{u.date}</span>
                  </div>
                  <p className={styles.updateText}>{u.text}</p>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => setDismissed((d) => [...d, u.id])}
                  aria-label={`Dismiss ${u.title}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyHint}>
            <p>You&apos;re all caught up on updates.</p>
          </div>
        )}
      </section>
    </div>
  );
}
