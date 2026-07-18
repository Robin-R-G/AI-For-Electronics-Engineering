'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { docsSections } from '@/lib/docsConfig';
import { speakerNotes } from '@/data/speakerNotes';
import styles from './PresenterDashboard.module.css';

const TOTAL_SECTIONS = docsSections.length;

export const PresenterDashboard = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [laserMode, setLaserMode] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: -100, y: -100 });
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const currentSection = docsSections[currentIdx];
  const nextSection = docsSections[currentIdx + 1] ?? null;
  const notes = speakerNotes.find(n => n.slug === currentSection.slug);

  // Timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const resetTimer = () => { setTimerSeconds(0); setTimerRunning(false); };

  // Keyboard Shortcuts
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown':
        setCurrentIdx(i => Math.min(i + 1, TOTAL_SECTIONS - 1)); break;
      case 'ArrowLeft': case 'ArrowUp':
        setCurrentIdx(i => Math.max(i - 1, 0)); break;
      case 'l': case 'L':
        setLaserMode(m => !m); break;
      case 't': case 'T':
        setTimerRunning(r => !r); break;
      case 'r': case 'R':
        resetTimer(); break;
      case 'f': case 'F':
        toggleFullscreen(); break;
      case '?':
        setShowShortcuts(s => !s); break;
      case 'Escape':
        setLaserMode(false); setShowShortcuts(false); break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Laser Pointer
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (laserMode) setLaserPos({ x: e.clientX, y: e.clientY });
  }, [laserMode]);

  // Fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      rootRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Audience Questions
  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions(q => [newQuestion.trim(), ...q]);
      setNewQuestion('');
    }
  };

  const estimatedMins = notes?.estimatedMinutes ?? 0;
  const elapsedMins = Math.floor(timerSeconds / 60);
  const timerOverrun = elapsedMins > estimatedMins;

  const diffColor = (diff: string) => {
    if (diff === 'Beginner') return styles.diffGreen;
    if (diff === 'Intermediate') return styles.diffYellow;
    return styles.diffRed;
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${laserMode ? styles.laserCursor : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Laser Pointer Dot */}
      {laserMode && (
        <div
          className={styles.laserDot}
          style={{ left: laserPos.x, top: laserPos.y }}
        />
      )}

      {/* Keyboard Shortcuts Overlay */}
      {showShortcuts && (
        <div className={styles.shortcutsOverlay} onClick={() => setShowShortcuts(false)}>
          <div className={styles.shortcutsPanel} onClick={e => e.stopPropagation()}>
            <h3>Keyboard Shortcuts</h3>
            <table className={styles.shortcutTable}>
              <tbody>
                {[
                  ['→ / ↓', 'Next Section'],
                  ['← / ↑', 'Previous Section'],
                  ['T', 'Start / Pause Timer'],
                  ['R', 'Reset Timer'],
                  ['L', 'Toggle Laser Pointer'],
                  ['F', 'Toggle Fullscreen'],
                  ['?', 'Show / Hide Shortcuts'],
                  ['Esc', 'Close overlays'],
                ].map(([key, desc]) => (
                  <tr key={key}>
                    <td><kbd className={styles.kbd}>{key}</kbd></td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowShortcuts(false)} className={styles.closeShortcuts}>Close</button>
          </div>
        </div>
      )}

      {/* ── Header Bar ─────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.presenterBadge}>🎙 PRESENTER MODE</span>
          <span className={styles.sectionCounter}>
            {currentIdx + 1} / {TOTAL_SECTIONS}
          </span>
        </div>
        <div className={styles.headerCenter}>
          <div className={`${styles.timer} ${timerOverrun ? styles.timerOverrun : ''}`}>
            {formatTime(timerSeconds)}
          </div>
          {estimatedMins > 0 && (
            <span className={styles.estimatedTime}>/ {estimatedMins} min target</span>
          )}
        </div>
        <div className={styles.headerRight}>
          <button
            className={`${styles.headerBtn} ${laserMode ? styles.headerBtnActive : ''}`}
            onClick={() => setLaserMode(m => !m)}
            title="Laser Pointer (L)"
          >🔴 Laser</button>
          <button
            className={`${styles.headerBtn} ${isFullscreen ? styles.headerBtnActive : ''}`}
            onClick={toggleFullscreen}
            title="Fullscreen (F)"
          >{isFullscreen ? '⛶' : '⛶'} Full</button>
          <button
            className={styles.headerBtn}
            onClick={() => setShowShortcuts(s => !s)}
            title="Shortcuts (?)"
          >⌨ Keys</button>
        </div>
      </header>

      {/* ── Main Grid ──────────────────────────────── */}
      <div className={styles.grid}>

        {/* Column 1: Current + Next Section */}
        <div className={styles.col}>

          {/* Current Section */}
          <div className={styles.panel}>
            <div className={styles.panelLabel}>📍 Current Section</div>
            <h2 className={styles.sectionTitle}>{currentSection.title}</h2>
            <p className={styles.sectionDesc}>{currentSection.description}</p>
            <div className={styles.sectionMeta}>
              <span className={`${styles.diffBadge} ${diffColor(currentSection.difficulty)}`}>
                {currentSection.difficulty}
              </span>
              <span className={styles.metaChip}>⏱ {currentSection.readingTime}</span>
            </div>
          </div>

          {/* Next Section Preview */}
          <div className={`${styles.panel} ${styles.panelDim}`}>
            <div className={styles.panelLabel}>⏭ Up Next</div>
            {nextSection ? (
              <>
                <h3 className={styles.nextTitle}>{nextSection.title}</h3>
                <p className={styles.nextDesc}>{nextSection.description}</p>
              </>
            ) : (
              <p className={styles.nextDesc}>This is the final section. 🎉</p>
            )}
          </div>

          {/* Navigation Controls */}
          <div className={styles.navControls}>
            <button
              className={styles.navBtn}
              onClick={() => setCurrentIdx(i => Math.max(i - 1, 0))}
              disabled={currentIdx === 0}
            >← Previous</button>
            <div className={styles.progressDots}>
              {docsSections.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === currentIdx ? styles.dotActive : i < currentIdx ? styles.dotDone : ''}`}
                  onClick={() => setCurrentIdx(i)}
                />
              ))}
            </div>
            <button
              className={styles.navBtn}
              onClick={() => setCurrentIdx(i => Math.min(i + 1, TOTAL_SECTIONS - 1))}
              disabled={currentIdx === TOTAL_SECTIONS - 1}
            >Next →</button>
          </div>
        </div>

        {/* Column 2: Speaker Notes */}
        <div className={styles.col}>
          <div className={`${styles.panel} ${styles.panelTall}`}>
            <div className={styles.panelLabel}>📝 Speaker Notes</div>
            {notes ? (
              <>
                <p className={styles.notesText}>{notes.notes}</p>
                <div className={styles.divider} />
                <div className={styles.talkingPointsLabel}>Talking Points</div>
                <ul className={styles.talkingPoints}>
                  {notes.talkingPoints.map((pt, i) => (
                    <li key={i}><span className={styles.tpNum}>{i + 1}</span>{pt}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className={styles.noNotes}>No notes for this section yet.</p>
            )}
          </div>
        </div>

        {/* Column 3: Timer + Audience Q */}
        <div className={styles.col}>

          {/* Timer Panel */}
          <div className={styles.panel}>
            <div className={styles.panelLabel}>⏱ Presentation Timer</div>
            <div className={`${styles.bigTimer} ${timerOverrun ? styles.timerOverrun : ''}`}>
              {formatTime(timerSeconds)}
            </div>
            <div className={styles.timerBtns}>
              <button
                className={`${styles.timerBtn} ${timerRunning ? styles.timerBtnStop : styles.timerBtnStart}`}
                onClick={() => setTimerRunning(r => !r)}
              >
                {timerRunning ? '⏸ Pause' : '▶ Start'}
              </button>
              <button className={styles.timerBtnReset} onClick={resetTimer}>↺ Reset</button>
            </div>
            {timerOverrun && (
              <div className={styles.overrunAlert}>⚠ Over time by {elapsedMins - estimatedMins} min</div>
            )}
          </div>

          {/* Audience Questions */}
          <div className={`${styles.panel} ${styles.panelFlex}`}>
            <div className={styles.panelLabel}>❓ Audience Questions</div>
            <div className={styles.questionInputRow}>
              <input
                className={styles.questionInput}
                placeholder="Type a question..."
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addQuestion()}
              />
              <button className={styles.addQBtn} onClick={addQuestion}>Add</button>
            </div>
            <div className={styles.questionList}>
              {questions.length === 0 && (
                <p className={styles.noQuestions}>No questions yet.</p>
              )}
              {questions.map((q, i) => (
                <div key={i} className={styles.questionItem}>
                  <span className={styles.qBullet}>Q{questions.length - i}</span>
                  <span>{q}</span>
                  <button
                    className={styles.deleteQBtn}
                    onClick={() => setQuestions(qs => qs.filter((_, qi) => qi !== i))}
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresenterDashboard;
