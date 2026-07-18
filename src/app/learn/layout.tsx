import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { ProgressProvider } from '@/context/ProgressContext';
import styles from './docs.module.css';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider>
      <Navbar />
      <div className={styles.layoutContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </ProgressProvider>
  );
}
