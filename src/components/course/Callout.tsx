import React from 'react';
import styles from './Callout.module.css';

interface CalloutProps {
  type?: 'note' | 'warning' | 'important' | 'example';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type = 'note', title, children }) => {
  const getIcon = () => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'important': return '🚨';
      case 'example': return '💡';
      default: return 'ℹ️';
    }
  };

  const defaultTitle = {
    note: 'Note',
    warning: 'Warning',
    important: 'Important',
    example: 'Real-world Example'
  };

  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <div className={styles.header}>
        <span className={styles.icon}>{getIcon()}</span>
        <span className={styles.title}>{title || defaultTitle[type]}</span>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Callout;
