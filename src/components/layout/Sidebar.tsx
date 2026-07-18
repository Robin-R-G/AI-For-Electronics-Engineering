'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { docsSections } from '@/lib/docsConfig';
import { useProgress } from '@/context/ProgressContext';

export const Sidebar = () => {
  const pathname = usePathname();
  const { readSlugs } = useProgress();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button 
        className={styles.mobileToggle} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close Menu' : 'Course Modules'}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          <div className={styles.header}>
            <h3>Modules</h3>
            <div className={styles.progressText}>
              {readSlugs.length} / {docsSections.length} Completed
            </div>
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${(readSlugs.length / docsSections.length) * 100}%` }}
              />
            </div>
          </div>
          
          <ul className={styles.menu}>
            {docsSections.map((section) => {
              const href = `/learn/${section.slug}`;
              const isActive = pathname === href;
              const isRead = readSlugs.includes(section.slug);

              return (
                <li key={section.slug} className={styles.menuItem}>
                  <Link 
                    href={href}
                    className={`${styles.link} ${isActive ? styles.active : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.icon}>
                      {isRead ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
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
      </aside>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
