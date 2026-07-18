'use client';
import React, { useState } from 'react';
import { LiveDemo } from '@/data/liveDemos';
import styles from './DemoView.module.css';

interface DemoViewProps {
  demo: LiveDemo;
}

export const DemoView: React.FC<DemoViewProps> = ({ demo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(demo.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div key={demo.id} className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{demo.title}</h2>
        <div className={styles.metaRow}>
          <span className={styles.metaBadge}>⏱ {demo.estimatedTime}</span>
          <span className={styles.metaBadge}>🔧 Hardware Required</span>
        </div>
        <div className={styles.hardwareList}>
          {demo.hardwareNeeded.map((hw, i) => (
            <span key={i} className={styles.hwItem}>{hw}</span>
          ))}
        </div>
      </header>

      <div className={styles.content}>
        {/* Section 1 */}
        <section className={`${styles.section} ${styles.delay1}`}>
          <h3>Problem Statement</h3>
          <p className={styles.prose}>{demo.problemStatement}</p>
        </section>

        {/* Section 2 */}
        <section className={`${styles.section} ${styles.delay2}`}>
          <div className={styles.promptHeader}>
            <h3>AI Prompt</h3>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? '✓ Copied' : '📋 Copy Prompt'}
            </button>
          </div>
          <div className={styles.promptBox}>
            <code>{demo.prompt}</code>
          </div>
        </section>

        {/* Section 3 */}
        <section className={`${styles.section} ${styles.delay3}`}>
          <h3>Expected AI Response</h3>
          <p className={styles.prose}>{demo.expectedResponse}</p>
        </section>

        {/* Section 4 */}
        <section className={`${styles.section} ${styles.delay4}`}>
          <h3>Common Mistakes</h3>
          <ul className={styles.mistakeList}>
            {demo.commonMistakes.map((mistake, i) => (
              <li key={i}>❌ {mistake}</li>
            ))}
          </ul>
        </section>

        {/* Split Section 5 */}
        <div className={`${styles.splitSection} ${styles.delay5}`}>
          <div className={`${styles.callout} ${styles.instructorNote}`}>
            <h4>👨‍🏫 Instructor Notes</h4>
            <p>{demo.instructorNotes}</p>
          </div>

          <div className={`${styles.callout} ${styles.studentActivity}`}>
            <h4>💻 Student Activity</h4>
            <p>{demo.studentActivity}</p>
          </div>
        </div>

        {/* Section 6 */}
        {demo.downloadUrl && (
          <section className={`${styles.section} ${styles.delay6} ${styles.downloadSection}`}>
            <a href={demo.downloadUrl} className={styles.downloadBtn}>
              ⬇ Download Code & Assets
            </a>
          </section>
        )}
      </div>
    </div>
  );
};

export default DemoView;
