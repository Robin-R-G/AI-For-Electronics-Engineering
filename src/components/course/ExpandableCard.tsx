'use client';

import React, { useState } from 'react';
import styles from './ExpandableCard.module.css';

interface ExpandableCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'tip' | 'warning' | 'info';
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={styles.headerLeft}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <h4 className={styles.title}>{title}</h4>
        </div>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};

export default ExpandableCard;
