'use client';

import React, { useState } from 'react';
import styles from './ThinkLikeAnEngineer.module.css';

interface ThinkLikeAnEngineerProps {
  problem: string;
  context?: string;
  hints?: string[];
  explanation: string;
  aiPrompt?: string;
}

const ThinkLikeAnEngineer: React.FC<ThinkLikeAnEngineerProps> = ({
  problem,
  context,
  hints = [],
  explanation,
  aiPrompt,
}) => {
  const [showHints, setShowHints] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = async () => {
    if (!aiPrompt) return;
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = aiPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Think Like an Engineer</span>
      </div>

      <div className={styles.problemBox}>
        <h3 className={styles.problemTitle}>Real Engineering Problem</h3>
        <p className={styles.problemText}>{problem}</p>
        {context && <p className={styles.context}>{context}</p>}
      </div>

      <div className={styles.thinkBox}>
        <h4>Pause & Think</h4>
        <p>Before reading on, consider: how would you approach this problem? What constraints matter most? What trade-offs would you make?</p>
      </div>

      {hints.length > 0 && (
        <div className={styles.hintsSection}>
          <button
            className={styles.hintToggle}
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
          {showHints && (
            <ul className={styles.hintsList}>
              {hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className={styles.explanationSection}>
        <button
          className={styles.revealBtn}
          onClick={() => setShowExplanation(!showExplanation)}
        >
          {showExplanation ? 'Hide Explanation' : 'Reveal Explanation'}
        </button>
        {showExplanation && (
          <div className={styles.explanationBox}>
            <h4>Engineering Explanation</h4>
            <p>{explanation}</p>
          </div>
        )}
      </div>

      {aiPrompt && (
        <div className={styles.aiPromptSection}>
          <h4>Explore Further with AI</h4>
          <div className={styles.promptBox}>
            <code className={styles.promptText}>{aiPrompt}</code>
            <button
              className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
              onClick={handleCopyPrompt}
            >
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThinkLikeAnEngineer;
