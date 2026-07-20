'use client';
import React, { useState, useRef, useEffect } from 'react';
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

const ROLE_SHORT: Record<string, string> = {
  'Act as a Senior Embedded Systems Engineer teaching firmware state machines.': 'Embedded Systems Engineer',
  'Act as a Senior Embedded Systems Engineer specializing in FreeRTOS on ESP32.': 'FreeRTOS / ESP32 Specialist',
  'Act as a Senior Firmware Engineer with 15 years of experience in motor control and STM32 HAL.': 'STM32 HAL Expert',
  'Act as a Professional PCB Design Engineer with expertise in KiCad automation.': 'PCB Design Engineer',
  'Act as a MATLAB Application Engineer specializing in signal processing and control systems.': 'MATLAB Engineer',
  'Act as a Senior Hardware Design Engineer specializing in low-power IoT sensor design.': 'Hardware Design Engineer',
  'Act as a Senior Technical Recruiter at a robotics/automation company who reviews 200+ embedded systems resumes per week.': 'Technical Recruiter',
  'Act as a DevOps Engineer specializing in embedded systems CI/CD pipelines.': 'DevOps Engineer',
  'Act as a Technical Content Strategist who specializes in engineering career development.': 'Content Strategist',
  'Act as a University Physics Professor who has graded thousands of lab reports.': 'Physics Professor',
  'Act as an Analog Circuit Design Engineer with deep expertise in active filter design.': 'Analog Circuit Engineer',
};

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, isFavorite, onToggleFavorite }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

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

  const roleLabel = ROLE_SHORT[prompt.role] || prompt.role.split(' ').slice(0, 4).join(' ');
  const preview = prompt.objective.length > 140 ? prompt.objective.slice(0, 140) + '...' : prompt.objective;

  return (
    <div className={`${styles.card} ${expanded ? styles.cardExpanded : ''}`}>
      <div className={styles.header} onClick={() => setExpanded(!expanded)}>
        <div className={styles.headerTop}>
          <div className={styles.badges}>
            <span className={styles.categoryBadge}>{prompt.category}</span>
            <span className={styles.roleBadge}>{roleLabel}</span>
          </div>
          <div className={styles.headerActions}>
            <span className={`${styles.difficulty} ${diffClass}`}>{prompt.difficulty}</span>
            <span className={styles.timeBadge}>⏱ {prompt.estimatedTime}</span>
            <button
              className={`${styles.favoriteBtn} ${isFavorite ? styles.isFav : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(prompt.id); }}
              title="Toggle Favorite"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          </div>
        </div>
        <h3 className={styles.title}>{prompt.title}</h3>
        <p className={styles.preview}>{preview}</p>
        <div className={styles.headerBottom}>
          <button
            className={`${styles.copyBtn}`}
            onClick={handleCopy}
          >
            {copied ? (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg> Copied!</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg> Copy</>
            )}
          </button>
          <span className={`${styles.chevron} ${expanded ? styles.chevronUp : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </div>
      </div>

      <div
        className={styles.contentWrapper}
        style={{ maxHeight: expanded ? `${contentHeight}px` : '0px' }}
      >
        <div ref={contentRef} className={styles.expandedContent}>
          <div className={styles.promptBlock}>
            <div className={styles.promptBlockHeader}>
              <span className={styles.promptBlockLabel}>Structured Prompt</span>
              <button className={styles.copyBtnSmall} onClick={handleCopy}>
                {copied ? '✓ Copied' : 'Copy Full Prompt'}
              </button>
            </div>
            <div className={styles.codeBlock}>
              <div className={styles.codeSection}>
                <span className={styles.codeKey}>Role</span>
                <span className={styles.codeValue}>{prompt.role}</span>
              </div>
              <div className={styles.codeSection}>
                <span className={styles.codeKey}>Objective</span>
                <span className={styles.codeValue}>{prompt.objective}</span>
              </div>
              {prompt.background && (
                <div className={styles.codeSection}>
                  <span className={styles.codeKey}>Background</span>
                  <span className={styles.codeValue}>{prompt.background}</span>
                </div>
              )}
              <div className={styles.codeSection}>
                <span className={styles.codeKey}>Requirements</span>
                <ol className={styles.codeList}>
                  {prompt.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ol>
              </div>
              {prompt.constraints?.length ? (
                <div className={styles.codeSection}>
                  <span className={styles.codeKey}>Constraints</span>
                  <ul className={styles.codeList}>
                    {prompt.constraints.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.outputBlock}>
            <div className={styles.outputBlockHeader}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
              <span>Example Output</span>
            </div>
            <pre className={styles.outputCode}>
              <code>{prompt.expectedOutput}</code>
            </pre>
          </div>

          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipHeader}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                <span>Usage Tips</span>
              </div>
              <p className={styles.tipText}>{prompt.usageTips}</p>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipHeader}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <span>AI Quality</span>
              </div>
              <div className={styles.qualityRow}>
                <span>{stars}</span>
                <span className={styles.qualityLabel}>{prompt.aiResponseQuality}</span>
              </div>
            </div>
          </div>

          {prompt.bestPractices?.length ? (
            <div className={styles.tipCardFull}>
              <div className={styles.tipHeader}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                <span>Best Practices</span>
              </div>
              <ul className={styles.tipList}>
                {prompt.bestPractices.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          ) : null}

          {prompt.commonMistakes?.length ? (
            <div className={styles.tipCardFull}>
              <div className={styles.tipHeader}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                <span>Common Mistakes</span>
              </div>
              <ul className={styles.tipList}>
                {prompt.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
