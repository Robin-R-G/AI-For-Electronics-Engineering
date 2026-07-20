'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { docsSections } from '@/lib/docsConfig';
import { useProgress } from '@/context/ProgressContext';

export const Sidebar = () => {
  const pathname = usePathname();
  const { readSlugs } = useProgress();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx > 0 && !isOpen) setIsOpen(true);
      if (dx < 0 && isOpen) setIsOpen(false);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
        </svg>
        {isOpen ? 'Close' : 'Modules'}
      </button>

      <aside ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          <div className={styles.header}>
            <h3>Modules</h3>
            <div className={styles.progressText}>
              {readSlugs.length} / {docsSections.length}
            </div>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: `${(readSlugs.length / docsSections.length) * 100}%` }} />
            </div>
          </div>

          <ul className={styles.menu}>
            {docsSections.map((section) => {
              const href = `/learn/${section.slug}`;
              const active = pathname === href;
              const isRead = readSlugs.includes(section.slug);

              return (
                <li key={section.slug} className={styles.menuItem}>
                  <Link
                    href={href}
                    className={`${styles.link} ${active ? styles.active : ''}`}
                    onClick={() => setIsOpen(false)}
                    prefetch={false}
                  >
                    <span className={styles.icon}>
                      {isRead ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" stroke="var(--color-accent)" />
                        </svg>
                      ) : (
                        <div className={styles.circle} />
                      )}
                    </span>
                    <span className={styles.text}>{section.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.swipeHint} aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18H3M3 6h12M3 12h18"/>
          </svg>
        </div>
      </aside>

      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Sidebar;
