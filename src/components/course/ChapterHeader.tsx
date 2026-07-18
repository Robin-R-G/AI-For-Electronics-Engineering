import React from 'react';
import styles from './ChapterHeader.module.css';

interface ChapterHeaderProps {
  title: string;
  readingTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({ title, readingTime, difficulty }) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner': return styles.beginner;
      case 'Intermediate': return styles.intermediate;
      case 'Advanced': return styles.advanced;
      default: return '';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.metadata}>
        <span className={styles.readingTime}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {readingTime}
        </span>
        <span className={`${styles.badge} ${getDifficultyColor()}`}>
          {difficulty}
        </span>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.divider} />
    </header>
  );
};

export default ChapterHeader;
