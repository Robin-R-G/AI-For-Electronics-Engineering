'use client';

import React, { useState } from 'react';
import styles from './AIChallenge.module.css';

interface AIChallengeProps {
  title: string;
  role: string;
  objective: string;
  background: string;
  requirements: string[];
  expectedOutput: string;
  bestPractices?: string[];
  furtherImprovements?: string[];
}

const AIChallenge: React.FC<AIChallengeProps> = ({
  title,
  role,
  objective,
  background,
  requirements,
  expectedOutput,
  bestPractices = [],
  furtherImprovements = [],
}) => {
  const [copied, setCopied] = useState(false);

  const fullPrompt = `${role}

Objective: ${objective}

Background: ${background}

Requirements:
${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Expected Output: ${expectedOutput}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = fullPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>AI Prompt Challenge</span>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.promptBox}>
        <div className={styles.promptHeader}>
          <span className={styles.promptLabel}>Production Prompt</span>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>
        <div className={styles.promptContent}>
          <div className={styles.promptRole}>{role}</div>
          <div className={styles.promptSection}>
            <strong>Objective:</strong> {objective}
          </div>
          <div className={styles.promptSection}>
            <strong>Background:</strong> {background}
          </div>
          <div className={styles.promptSection}>
            <strong>Requirements:</strong>
            <ol>
              {requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
          </div>
          <div className={styles.promptSection}>
            <strong>Expected Output:</strong> {expectedOutput}
          </div>
        </div>
      </div>

      {bestPractices.length > 0 && (
        <div className={styles.section}>
          <h4>Best Practices</h4>
          <ul>
            {bestPractices.map((bp, i) => (
              <li key={i}>{bp}</li>
            ))}
          </ul>
        </div>
      )}

      {furtherImprovements.length > 0 && (
        <div className={styles.section}>
          <h4>Further Improvements</h4>
          <ul>
            {furtherImprovements.map((fi, i) => (
              <li key={i}>{fi}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIChallenge;
