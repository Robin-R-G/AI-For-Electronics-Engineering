'use client';
import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import styles from './DebugMode.module.css';

interface DebugModeProps {
  title: string;
  scenario: string;
  brokenCode: string;
  language?: string;
  filename?: string;
  bugExplanation: string;
  hint: string;
  fixedCode: string;
  lesson: string;
}

export const DebugMode: React.FC<DebugModeProps> = ({
  title,
  scenario,
  brokenCode,
  language = 'c',
  filename,
  bugExplanation,
  hint,
  fixedCode,
  lesson,
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={styles.container}>
        <h3 className={styles.title}>
          <span className={styles.icon}>🔍</span>
          Debug Mode: {title}
        </h3>

      <p className={styles.scenario}>{scenario}</p>

      <div className={styles.phase}>
        <div className={styles.phaseHeader}>
          <span className={`${styles.phaseTag} ${styles.broken}`}>Broken Code</span>
          <span className={styles.phaseInstruction}>Study the code. Can you spot the bug?</span>
        </div>
        <CodeBlock code={brokenCode} language={language} filename={filename} />
      </div>

      <div className={styles.hintBox}>
        <span className={styles.hintIcon}>💡</span>
        <span className={styles.hintText}>{hint}</span>
      </div>

      {!revealed && (
        <button className={styles.revealBtn} onClick={() => setRevealed(true)}>
          Reveal Fix &amp; Explanation
        </button>
      )}

      {revealed && (
        <div className={styles.revealed}>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={`${styles.phaseTag} ${styles.explanation}`}>Bug Explanation</span>
            </div>
            <p className={styles.explanationText}>{bugExplanation}</p>
          </div>

          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={`${styles.phaseTag} ${styles.fixed}`}>Fixed Code</span>
            </div>
            <CodeBlock code={fixedCode} language={language} filename={filename} />
          </div>

          <div className={styles.lessonBox}>
            <span className={styles.lessonLabel}>Lesson:</span>
            <span className={styles.lessonText}>{lesson}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugMode;
