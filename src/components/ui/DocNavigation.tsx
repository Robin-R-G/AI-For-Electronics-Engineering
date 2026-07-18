'use client';

import React from 'react';
import Link from 'next/link';
import { docsSections } from '@/lib/docsConfig';
import styles from './DocNavigation.module.css';

export const DocNavigation = ({ currentSlug }: { currentSlug: string }) => {
  const currentIndex = docsSections.findIndex(s => s.slug === currentSlug);
  
  const prev = currentIndex > 0 ? docsSections[currentIndex - 1] : null;
  const next = currentIndex < docsSections.length - 1 ? docsSections[currentIndex + 1] : null;

  return (
    <div className={styles.navigation}>
      {prev ? (
        <Link href={`/learn/${prev.slug}`} className={`${styles.card} ${styles.prev}`}>
          <span className={styles.label}>Previous</span>
          <span className={styles.title}>&larr; {prev.title}</span>
        </Link>
      ) : (
        <div /> // Empty div for spacing
      )}
      
      {next ? (
        <Link href={`/learn/${next.slug}`} className={`${styles.card} ${styles.next}`}>
          <span className={styles.label}>Next</span>
          <span className={styles.title}>{next.title} &rarr;</span>
        </Link>
      ) : (
        <div /> // Empty div for spacing
      )}
    </div>
  );
};

export default DocNavigation;
