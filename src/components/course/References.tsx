import React from 'react';
import styles from './References.module.css';

interface Reference {
  title: string;
  type: 'book' | 'documentation' | 'tutorial' | 'paper' | 'video' | 'tool';
  url?: string;
  description: string;
}

interface ReferencesProps {
  references: Reference[];
}

const typeIcons: Record<string, string> = {
  book: '📖',
  documentation: '📄',
  tutorial: '🎓',
  paper: '📑',
  video: '🎬',
  tool: '🛠',
};

const References: React.FC<ReferencesProps> = ({ references }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>References &amp; Further Reading</h3>
      <div className={styles.list}>
        {references.map((ref, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.icon}>{typeIcons[ref.type]}</span>
            <div className={styles.content}>
              {ref.url ? (
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {ref.title} &rarr;
                </a>
              ) : (
                <span className={styles.name}>{ref.title}</span>
              )}
              <span className={styles.type}>{ref.type}</span>
              <p className={styles.description}>{ref.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default References;
