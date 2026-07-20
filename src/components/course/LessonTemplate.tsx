'use client';

import React, { useEffect, useRef, useState } from 'react';
import ChapterHeader from './ChapterHeader';
import LessonResources from './LessonResources';
import LessonQuiz from './LessonQuiz';
import References, { Reference } from './References';
import DocNavigation from '@/components/ui/DocNavigation';
import { useProgress } from '@/context/ProgressContext';
import styles from './LessonTemplate.module.css';

export interface LessonTemplateProps {
  slug: string;
  title: string;
  readingTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives?: string[];
  summary?: string[];
  references?: Reference[];
  children: React.ReactNode;
}

type Heading = { id: string; text: string; level: number };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function LessonTemplate({
  slug,
  title,
  readingTime,
  difficulty,
  objectives,
  summary,
  references,
  children,
}: LessonTemplateProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const { isBookmarked, toggleBookmark } = useProgress();
  const bookmarked = isBookmarked(slug);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLHeadingElement>('h2, h3')
    );
    const seen = new Map<string, number>();
    const items: Heading[] = nodes.map((node) => {
      let id = node.id || slugify(node.textContent || '');
      const count = seen.get(id) || 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      node.id = id;
      return { id, text: node.textContent || '', level: node.tagName === 'H2' ? 2 : 3 };
    });
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [children, slug]);

  useEffect(() => {
    const onScroll = () => {
      const root = contentRef.current;
      if (!root) return;
      const start = root.offsetTop;
      const total = root.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - start;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <div className={styles.readProgress} style={{ width: `${progress}%` }} aria-hidden />

      <div className={styles.headerRow}>
        <ChapterHeader title={title} readingTime={readingTime} difficulty={difficulty} />
        <button
          type="button"
          className={`${styles.bookmarkBtn} ${bookmarked ? styles.bookmarkActive : ''}`}
          onClick={() => toggleBookmark(slug)}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
        >
          {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>

      {objectives && objectives.length > 0 && (
        <section className={styles.objectives}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎯</span> Learning Objectives
          </h2>
          <ul className={styles.objectiveList}>
            {objectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.body}>
        <article ref={contentRef} className={styles.content}>
          {children}
        </article>

        {headings.length > 1 && (
          <aside className={styles.toc} aria-label="On this page">
            <span className={styles.tocLabel}>On this page</span>
            <nav>
              {headings.map((h) => (
                <button
                  key={h.id}
                  className={`${styles.tocLink} ${h.level === 3 ? styles.tocSub : ''} ${
                    activeId === h.id ? styles.tocActive : ''
                  }`}
                  onClick={() => scrollTo(h.id)}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </aside>
        )}
      </div>

      {summary && summary.length > 0 && (
        <section className={styles.summary}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✅</span> Summary
          </h2>
          <ul className={styles.summaryList}>
            {summary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {references && references.length > 0 && <References references={references} />}

      <LessonResources slug={slug} />
      <LessonQuiz slug={slug} lessonTitle={title} />
      <DocNavigation currentSlug={slug} />

      <button
        className={`${styles.backTop} ${showTop ? styles.backTopVisible : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
