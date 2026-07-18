'use client';
import React, { useState } from 'react';
import { PromptEntry } from '@/data/promptLibrary';
import styles from './PromptCard.module.css';

interface PromptCardProps {
  prompt: PromptEntry;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function buildFullPrompt(p: PromptEntry): string {
  let s = `Role: ${p.role}\n\nObjective: ${p.objective}\n`;
  if (p.background) s += `\nBackground: ${p.background}\n`;
  if (p.requirements.length) s += `\nRequirements:\n${p.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n`;
  if (p.constraints?.length) s += `\nConstraints:\n${p.constraints.map(c => `- ${c}`).join('\n')}\n`;
  return s.trim();
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, isFavorite, onToggleFavorite }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(buildFullPrompt(prompt));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diffClass = prompt.difficulty === 'Beginner' ? styles.diffGreen
    : prompt.difficulty === 'Intermediate' ? styles.diffYellow
    : styles.diffRed;

  const stars = prompt.aiResponseQuality === 'Excellent' ? '⭐⭐⭐'
    : prompt.aiResponseQuality === 'Good' ? '⭐⭐'
    : '⭐';

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setExpanded(!expanded)}>
        <div className={styles.titleRow}>
          <span className={styles.categoryBadge}>{prompt.category}</span>
          <h3 className={styles.title}>{prompt.title}</h3>
        </div>
        <div className={styles.actions}>
          <span className={`${styles.difficulty} ${diffClass}`}>{prompt.difficulty}</span>
          <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.isFav : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(prompt.id); }}
            title="Toggle Favorite"
          >
            ★
          </button>
          <span className={`${styles.chevron} ${expanded ? styles.chevronUp : ''}`}>▼</span>
        </div>
      </div>

      {expanded && (
        <div className={styles.expandedContent}>
          <div className={styles.promptWrapper}>
            <div className={styles.promptHeader}>
              <span className={styles.promptLabel}>Structured Prompt</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? '✓ Copied' : '📋 Copy Full Prompt'}
              </button>
            </div>
            <div className={styles.promptText}>
              <div className={styles.promptSection}>
                <span className={styles.promptFieldLabel}>Role</span>
                <p>{prompt.role}</p>
              </div>
              <div className={styles.promptSection}>
                <span className={styles.promptFieldLabel}>Objective</span>
                <p>{prompt.objective}</p>
              </div>
              {prompt.background && (
                <div className={styles.promptSection}>
                  <span className={styles.promptFieldLabel}>Background</span>
                  <p>{prompt.background}</p>
                </div>
              )}
              <div className={styles.promptSection}>
                <span className={styles.promptFieldLabel}>Requirements</span>
                <ol className={styles.reqList}>
                  {prompt.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ol>
              </div>
              {prompt.constraints?.length ? (
                <div className={styles.promptSection}>
                  <span className={styles.promptFieldLabel}>Constraints</span>
                  <ul className={styles.reqList}>
                    {prompt.constraints.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.metadataGrid}>
            <div className={styles.metaBox}>
              <h4>Expected Output</h4>
              <p>{prompt.expectedOutput}</p>
            </div>
            <div className={styles.metaBox}>
              <h4>Usage Tips</h4>
              <p>{prompt.usageTips}</p>
            </div>
            <div className={styles.metaBox}>
              <h4>AI Quality</h4>
              <div className={styles.qualityRating}>
                <span>{stars}</span>
                <span className={styles.qualityText}>{prompt.aiResponseQuality}</span>
              </div>
            </div>
          </div>

          {prompt.bestPractices?.length ? (
            <div className={styles.tipBox}>
              <h4>Best Practices</h4>
              <ul className={styles.tipList}>
                {prompt.bestPractices.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          ) : null}
          {prompt.commonMistakes?.length ? (
            <div className={styles.tipBox}>
              <h4>Common Mistakes</h4>
              <ul className={styles.tipList}>
                {prompt.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PromptCard;
