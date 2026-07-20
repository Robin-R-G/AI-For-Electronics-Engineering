'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { quizQuestions } from '@/data/quizQuestions';
import { QuizQuestion, Difficulty } from '@/data/quizTypes';
import { generateQuizSession } from '@/lib/quizRandomizer';
import CertificateModal from '@/components/quiz/CertificateModal';
import { loadQuestions, recordQuestionAnswer, getQuestionOfTheDay } from '@/lib/quizService';
import { useProgress } from '@/context/ProgressContext';
import styles from './quiz.module.css';

const HISTORY_KEY = 'workshop_quiz_history_v2';
const HISTORY_LIMIT = 15;

function readHistory(): string[][] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[][]) : [];
  } catch {
    return [];
  }
}

function writeHistory(history: string[][]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, HISTORY_LIMIT)));
  } catch {
    // Ignore storage issues
  }
}

export type QuizMode = 'Quick' | 'Topic' | 'Exam' | 'Practice';

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export const QuizContent = () => {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<QuizMode | null>(null);
  
  // Setup parameters
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('Embedded Systems');
  const [questionsPerAttempt, setQuestionsPerAttempt] = useState<number>(10);
  
  // Adaptive Mode states
  const [adaptiveMode, setAdaptiveMode] = useState(false);
  const [currentDifficultyTarget, setCurrentDifficultyTarget] = useState<Difficulty>('Intermediate');
  const [batchCorrect, setBatchCorrect] = useState(0);
  const [batchTotal, setBatchTotal] = useState(0);
  const [batchNumber, setBatchNumber] = useState(0);
  
  // Mid-batch Transition states
  const [showTransition, setShowTransition] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');
  const [transitionDifficultyChange, setTransitionDifficultyChange] = useState<Difficulty>('Intermediate');
  const [attemptedQuestionsList, setAttemptedQuestionsList] = useState<QuizQuestion[]>([]);
  
  // Session state
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Timer & answers tracking (userAnswers keys by question ID)
  const [timeRemaining, setTimeRemaining] = useState<number>(50 * 60); // seconds
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  
  // Practice mode stats
  const [practiceAttempts, setPracticeAttempts] = useState(0);
  const [practiceCorrect, setPracticeCorrect] = useState(0);

  // Share result feedback
  const [shareLabel, setShareLabel] = useState('Share Result');

  // Available topics loaded from the merged questions
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  useEffect(() => {
    loadQuestions(quizQuestions).then(all => {
      const topics = new Set<string>();
      all.forEach(q => { if (q.topic) topics.add(q.topic); });
      setAvailableTopics(Array.from(topics).sort());
    });
  }, []);

  const { saveQuizScore } = useProgress();

  useEffect(() => {
    if (completed && mode && mode !== 'Practice' && selectedTopic) {
      saveQuizScore(`${mode} · ${selectedTopic}`, scorePercentage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  const currentQuestion = sessionQuestions[currentIdx];

  // Timer Effect for Exam Mode
  useEffect(() => {
    if (!started || completed || mode !== 'Exam') return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed, mode]);

  // General Timer for tracking time spent in other modes
  useEffect(() => {
    if (!started || completed || mode === 'Exam' || showTransition) return;
    
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed, mode, showTransition]);

  const handleStart = async (selectedMode: QuizMode) => {
    const allAvailable = await loadQuestions(quizQuestions);
    let pool = allAvailable;

    if (selectedMode === 'Topic') {
      pool = pool.filter(q => q.topic === selectedTopic);
    }

    // Set initial difficulty target
    let initialDiff = currentDifficultyTarget;
    if (!adaptiveMode) {
      if (difficultyFilter !== 'All') {
        initialDiff = difficultyFilter;
      } else {
        initialDiff = 'Intermediate';
      }
    }
    setCurrentDifficultyTarget(initialDiff);

    // Filter by difficulty (skip if Exam mode or adaptive mode)
    if (selectedMode !== 'Exam' && !adaptiveMode && difficultyFilter !== 'All') {
      pool = pool.filter(q => q.difficulty === difficultyFilter);
    } else if (adaptiveMode) {
      pool = pool.filter(q => q.difficulty === initialDiff);
    }

    if (pool.length === 0) {
      pool = allAvailable; 
    }

    // Determine target session size
    let size = questionsPerAttempt;
    if (selectedMode === 'Quick') size = 5;
    else if (selectedMode === 'Exam') size = 50;
    else if (adaptiveMode) size = 5; // Adaptive batches are 5 questions each
    else if (selectedMode === 'Practice') size = 15;

    const history = readHistory();
    const session = generateQuizSession(pool, {
      sessionSize: Math.min(size, pool.length),
      recentSessions: history,
    });

    setMode(selectedMode);
    setSessionQuestions(session);
    setAttemptedQuestionsList(session);
    setStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setCompleted(false);
    setSelectedAnswer(null);
    setSubmitted(false);
    setUserAnswers({});
    setTimeRemaining(50 * 60);
    setTimeSpent(0);
    setPracticeAttempts(0);
    setPracticeCorrect(0);

    // Reset adaptive states
    setBatchCorrect(0);
    setBatchTotal(0);
    setBatchNumber(0);
    setShowTransition(false);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    setSubmitted(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Save answer to tracking state, key by question ID
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));

    // Record dynamic performance analytics
    recordQuestionAnswer(currentQuestion.id, currentQuestion.topic || 'General', isCorrect);

    if (adaptiveMode) {
      setBatchCorrect(prev => prev + (isCorrect ? 1 : 0));
      setBatchTotal(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (mode === 'Exam') {
      if (selectedAnswer) {
        setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        if (isCorrect) {
          setScore(prev => prev + 1);
        }
        recordQuestionAnswer(currentQuestion.id, currentQuestion.topic || 'General', isCorrect);
      }
      
      if (currentIdx + 1 < sessionQuestions.length) {
        setCurrentIdx(prev => prev + 1);
        setSelectedAnswer(userAnswers[sessionQuestions[currentIdx + 1]?.id] || null); 
        setSubmitted(false);
      } else {
        setCompleted(true);
        const history = readHistory();
        writeHistory([sessionQuestions.map(q => q.id), ...history]);
      }
    } else if (adaptiveMode) {
      // Adaptive Mode flow
      if (currentIdx + 1 < sessionQuestions.length) {
        setCurrentIdx(prev => prev + 1);
        setSelectedAnswer(null);
        setSubmitted(false);
      } else {
        // Evaluate batch performance and shift difficulty target
        const accuracy = batchCorrect / batchTotal;
        let nextDiff = currentDifficultyTarget;
        let changeText = 'Difficulty remains unchanged.';

        if (accuracy >= 0.8) {
          if (currentDifficultyTarget === 'Beginner') {
            nextDiff = 'Intermediate';
            changeText = '🚀 Performance is high! Upgrading difficulty to Intermediate.';
          } else if (currentDifficultyTarget === 'Intermediate') {
            nextDiff = 'Advanced';
            changeText = '🚀 Performance is high! Upgrading difficulty to Advanced.';
          } else if (currentDifficultyTarget === 'Advanced') {
            nextDiff = 'Expert';
            changeText = '🔥 Outstanding! Upgrading difficulty to Expert level.';
          } else {
            changeText = '🏆 You are at the maximum Expert level!';
          }
        } else if (accuracy <= 0.4) {
          if (currentDifficultyTarget === 'Expert') {
            nextDiff = 'Advanced';
            changeText = '📉 Struggles detected. Scaling difficulty down to Advanced.';
          } else if (currentDifficultyTarget === 'Advanced') {
            nextDiff = 'Intermediate';
            changeText = '📉 Struggles detected. Scaling difficulty down to Intermediate.';
          } else if (currentDifficultyTarget === 'Intermediate') {
            nextDiff = 'Beginner';
            changeText = '📉 Struggles detected. Scaling difficulty down to Beginner.';
          } else {
            changeText = '💪 Keep trying! You are at the Beginner level.';
          }
        } else {
          changeText = `📊 Stable performance. Difficulty remains at ${currentDifficultyTarget}.`;
        }

        setTransitionMessage(changeText);
        setTransitionDifficultyChange(nextDiff);
        setShowTransition(true);
      }
    } else if (mode === 'Practice') {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setPracticeAttempts(prev => prev + 1);
      if (isCorrect) setPracticeCorrect(prev => prev + 1);

      if (currentIdx + 1 >= sessionQuestions.length) {
        loadQuestions(quizQuestions).then(allAvailable => {
          const activeIds = new Set(sessionQuestions.map(q => q.id));
          let pool = allAvailable.filter(q => !activeIds.has(q.id));
          if (difficultyFilter !== 'All') {
            pool = pool.filter(q => q.difficulty === difficultyFilter);
          }
          if (pool.length === 0) pool = allAvailable;

          const nextBatch = generateQuizSession(pool, { sessionSize: 10 });
          setSessionQuestions(prev => [...prev, ...nextBatch]);
        });
      }

      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      // Quick & Topic Modes
      if (currentIdx + 1 < sessionQuestions.length) {
        setCurrentIdx(prev => prev + 1);
        setSelectedAnswer(null);
        setSubmitted(false);
      } else {
        setCompleted(true);
        const history = readHistory();
        writeHistory([sessionQuestions.map(q => q.id), ...history]);
      }
    }
  };

  const handleNextBatch = async () => {
    const allAvailable = await loadQuestions(quizQuestions);
    let pool = allAvailable;

    if (mode === 'Topic') {
      pool = pool.filter(q => q.topic === selectedTopic);
    }

    pool = pool.filter(q => q.difficulty === transitionDifficultyChange);

    if (pool.length === 0) {
      pool = allAvailable;
      if (mode === 'Topic') {
        pool = pool.filter(q => q.topic === selectedTopic);
      }
    }

    // Exclude previously answered questions in this attempt
    const activeIds = new Set(attemptedQuestionsList.map(q => q.id));
    let finalPool = pool.filter(q => !activeIds.has(q.id));
    if (finalPool.length === 0) {
      finalPool = pool; 
    }

    const history = readHistory();
    const nextBatch = generateQuizSession(finalPool, {
      sessionSize: Math.min(5, finalPool.length),
      recentSessions: history,
    });

    setSessionQuestions(nextBatch);
    setAttemptedQuestionsList(prev => [...prev, ...nextBatch]);
    setCurrentDifficultyTarget(transitionDifficultyChange);
    setBatchNumber(prev => prev + 1);
    setBatchCorrect(0);
    setBatchTotal(0);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setShowTransition(false);
  };

  const handleFinishAdaptiveQuiz = () => {
    setCompleted(true);
    setShowTransition(false);
    
    // Save history
    const history = readHistory();
    writeHistory([attemptedQuestionsList.map(q => q.id), ...history]);
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setSelectedAnswer(userAnswers[sessionQuestions[currentIdx - 1]?.id] || null);
      setSubmitted(mode !== 'Exam'); 
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCompleted(false);
    setMode(null);
    setShowCertificate(false);
    setAdaptiveMode(false);
  };

  const handleShare = async () => {
    const label = adaptiveMode ? 'Adaptive' : (mode ?? 'Engineering');
    const text = `I scored ${scorePercentage}% on the ${label} Engineering Quiz — AI for Electronics Engineers.`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'AI for Electronics — Quiz', text });
        return;
      } catch {
        /* user dismissed share sheet */
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareLabel('Copied to clipboard!');
    } catch {
      setShareLabel('Copy failed');
    }
    setTimeout(() => setShareLabel('Share Result'), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculations for score and percent
  const scorePercentage = useMemo(() => {
    const total = mode === 'Practice' 
      ? practiceAttempts 
      : (adaptiveMode ? attemptedQuestionsList.length : sessionQuestions.length);
    const correct = mode === 'Practice' 
      ? practiceCorrect 
      : score;
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  }, [score, sessionQuestions, mode, practiceAttempts, practiceCorrect, adaptiveMode, attemptedQuestionsList]);

  const canClaimCertificate = scorePercentage >= 80 && mode !== 'Practice';

  // Animated progress bar: how far through the current attempt
  const progressPercent = useMemo(() => {
    const total = sessionQuestions.length || 1;
    const done = submitted ? currentIdx + 1 : currentIdx;
    return Math.min(100, Math.round((done / total) * 100));
  }, [currentIdx, submitted, sessionQuestions.length]);

  const animatedScore = useCountUp(scorePercentage);

  // Categories/Topics breakdown
  const categoryPerformance = useMemo(() => {
    const list = adaptiveMode ? attemptedQuestionsList : sessionQuestions;
    const stats: Record<string, { total: number; correct: number }> = {};
    list.forEach((q) => {
      const topic = q.topic || 'General';
      if (!stats[topic]) {
        stats[topic] = { total: 0, correct: 0 };
      }
      stats[topic].total += 1;
      
      const userAnswer = userAnswers[q.id];
      if (userAnswer === q.correctAnswer) {
        stats[topic].correct += 1;
      }
    });
    return Object.entries(stats).map(([name, val]) => ({
      name,
      total: val.total,
      correct: val.correct,
      percent: Math.round((val.correct / val.total) * 100),
    }));
  }, [sessionQuestions, attemptedQuestionsList, userAnswers, adaptiveMode]);

  // Related lessons study recommendations
  const recommendedLessons = useMemo(() => {
    if (mode === 'Practice') return [];
    const list = adaptiveMode ? attemptedQuestionsList : sessionQuestions;
    if (list.length === 0) return [];

    const stats: Record<string, { total: number; correct: number }> = {};
    list.forEach((q) => {
      const lesson = q.relatedLesson;
      if (!lesson) return;
      if (!stats[lesson]) {
        stats[lesson] = { total: 0, correct: 0 };
      }
      stats[lesson].total += 1;
      
      const ans = userAnswers[q.id];
      if (ans === q.correctAnswer) {
        stats[lesson].correct += 1;
      }
    });

    return Object.entries(stats)
      .map(([lesson, val]) => ({
        lesson,
        accuracy: val.correct / val.total
      }))
      .filter(item => item.accuracy < 0.6) // Suggest if accuracy is below 60%
      .sort((a, b) => a.accuracy - b.accuracy)
      .map(item => item.lesson);
  }, [sessionQuestions, attemptedQuestionsList, userAnswers, mode, adaptiveMode]);

  return (
    <div className={styles.container}>
      {/* 1. Setup Card */}
      {!started && (
        <div className={styles.startCard}>
          <h2>Engineering Quiz Center 🧠</h2>
          <p>
            Choose a training mode to test your knowledge of TinyML, PCB design, 
            communication protocols, STM32 registers, RTOS, and AI prompt engineering.
          </p>

          {/* Mode Selector Grid */}
          <div className={styles.modeSelectorGrid}>
            <div 
              className={`${styles.modeOptionCard} ${mode === 'Quick' ? styles.activeModeCard : ''}`}
              onClick={() => { setMode('Quick'); setQuestionsPerAttempt(5); }}
            >
              <div className={styles.modeIcon}>⚡</div>
              <h4>Quick Quiz</h4>
              <p>5 random questions across all subjects for fast learning.</p>
            </div>

            <div 
              className={`${styles.modeOptionCard} ${mode === 'Topic' ? styles.activeModeCard : ''}`}
              onClick={() => setMode('Topic')}
            >
              <div className={styles.modeIcon}>📚</div>
              <h4>Topic Quiz</h4>
              <p>Choose a focus topic to target specific engineering competencies.</p>
            </div>

            <div 
              className={`${styles.modeOptionCard} ${mode === 'Exam' ? styles.activeModeCard : ''}`}
              onClick={() => { setMode('Exam'); setQuestionsPerAttempt(50); setAdaptiveMode(false); }}
            >
              <div className={styles.modeIcon}>⏱️</div>
              <h4>Exam Mode</h4>
              <p>50 questions, 50-minute timer. Explanations shown only at the end.</p>
            </div>

            <div 
              className={`${styles.modeOptionCard} ${mode === 'Practice' ? styles.activeModeCard : ''}`}
              onClick={() => setMode('Practice')}
            >
              <div className={styles.modeIcon}>🛠️</div>
              <h4>Practice Mode</h4>
              <p>Unlimited questions with instant feedback and related lesson links.</p>
            </div>
          </div>

          {/* Contextual Options */}
          {mode && (
            <div className={styles.optionsTransitionPanel}>
              {mode === 'Topic' && (
                <div className={styles.setupRow}>
                  <h3>Select Topic:</h3>
                  <div className={styles.buttonFlexRow}>
                    {availableTopics.map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`${styles.setupChoiceBtn} ${selectedTopic === t ? styles.activeChoice : ''}`}
                        onClick={() => setSelectedTopic(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mode !== 'Exam' && (
                <div className={styles.setupRow}>
                  <h3>Select Difficulty:</h3>
                  
                  {/* Adaptive Mode Toggle */}
                  <div className={styles.adaptiveToggleContainer} style={{ marginBottom: '1rem' }}>
                    <label className={styles.adaptiveLabel}>
                      <input 
                        type="checkbox" 
                        checked={adaptiveMode} 
                        onChange={(e) => {
                          setAdaptiveMode(e.target.checked);
                          if (e.target.checked && difficultyFilter === 'All') {
                            setDifficultyFilter('Intermediate');
                          }
                        }} 
                      />
                      <span>🧠 Enable Adaptive Mode (Auto-scales difficulty based on performance)</span>
                    </label>
                  </div>

                  <div className={styles.buttonFlexRow}>
                    {(['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'] as const)
                      .filter(diff => !adaptiveMode || diff !== 'All') // Hide 'All' option in adaptive mode
                      .map(diff => (
                        <button
                          key={diff}
                          type="button"
                          className={`${styles.setupChoiceBtn} ${
                            (adaptiveMode ? currentDifficultyTarget : difficultyFilter) === diff ? styles.activeChoice : ''
                          }`}
                          onClick={() => {
                            if (adaptiveMode) {
                              setCurrentDifficultyTarget(diff as Difficulty);
                            } else {
                              setDifficultyFilter(diff);
                            }
                          }}
                        >
                          {diff}
                        </button>
                      ))}
                  </div>
                  {adaptiveMode && (
                    <p className={styles.adaptiveHint} style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-cyan)', fontStyle: 'italic' }}>
                      ⚡ System will start at <strong>{currentDifficultyTarget}</strong> level and adjust difficulty in batches of 5 questions.
                    </p>
                  )}
                </div>
              )}

              {mode !== 'Quick' && mode !== 'Exam' && mode !== 'Practice' && !adaptiveMode && (
                <div className={styles.setupRow}>
                  <h3>Questions per Attempt:</h3>
                  <div className={styles.buttonFlexRow}>
                    {[10, 15, 20, 30].map(n => (
                      <button
                        key={n}
                        type="button"
                        className={`${styles.setupChoiceBtn} ${questionsPerAttempt === n ? styles.activeChoice : ''}`}
                        onClick={() => setQuestionsPerAttempt(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => handleStart(mode)} 
                className={`${styles.startBtn} ${styles.glowingStart}`}
              >
                Start {adaptiveMode ? 'Adaptive' : mode} Quiz {(!adaptiveMode && mode !== 'Practice') && `(${mode === 'Quick' ? 5 : mode === 'Exam' ? 50 : questionsPerAttempt} Questions)`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Active Question View */}
      {started && !completed && !showTransition && currentQuestion && (
        <div className={styles.quizCard}>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>

          {/* Header Area */}
          <div className={styles.quizHeader}>
            <span className={styles.progressText}>
              {mode === 'Practice' 
                ? `Practice Question ${currentIdx + 1}`
                : `Question ${currentIdx + 1} of ${sessionQuestions.length}`}
            </span>

            {/* Adaptive Level Status Display */}
            {adaptiveMode && (
              <span className={styles.adaptiveStatusTag} style={{ fontSize: '0.85rem', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--color-cyan)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                🧠 Adaptive: Batch {batchNumber + 1} • {currentDifficultyTarget}
              </span>
            )}

            {/* Timer Banner for Exam Mode */}
            {mode === 'Exam' && (
              <span className={`${styles.timerBanner} ${timeRemaining < 300 ? styles.timerWarning : ''}`}>
                ⏱️ {formatTime(timeRemaining)}
              </span>
            )}

            <span className={`${styles.difficultyBadge} ${
              currentQuestion.difficulty === 'Beginner' ? styles.badgeEasy :
              currentQuestion.difficulty === 'Intermediate' ? styles.badgeMedium :
              currentQuestion.difficulty === 'Advanced' ? styles.badgeHard : styles.badgeExpert
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Meta Tags */}
          <div key={currentIdx} className={styles.questionPane}>
          <div className={styles.metaRow}>
            <span className={styles.topicBadge}>
              {currentQuestion.topic || 'General'}
            </span>
            <span className={`${styles.categoryBadge} ${
              currentQuestion.category === 'concept-understanding' ? styles.catConcept :
              currentQuestion.category === 'practical-application' ? styles.catPractical :
              currentQuestion.category === 'debugging-scenarios' ? styles.catDebug :
              currentQuestion.category === 'circuit-reasoning' ? styles.catCircuit :
              currentQuestion.category === 'engineering-decisions' ? styles.catDecision :
              currentQuestion.category === 'real-world-situations' ? styles.catReal :
              currentQuestion.category === 'interview-style' ? styles.catInterview :
              styles.catIndustry
            }`}>
              {currentQuestion.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </span>
            {currentQuestion.relatedLesson && (
              <span className={styles.lessonTag}>
                📖 {currentQuestion.relatedLesson.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            )}
          </div>

          {/* Question Text */}
          <h3 className={styles.questionText}>{currentQuestion.question}</h3>

          {/* Reference Image */}
          {currentQuestion.imageUrl && (
            <div className={styles.imageContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentQuestion.imageUrl} alt="Reference layout" className={styles.quizImage} />
            </div>
          )}

          {/* Code Snippet */}
          {currentQuestion.codeSnippet && (
            <pre className={styles.codeSnippet}>
              <code>{currentQuestion.codeSnippet}</code>
            </pre>
          )}

          {/* Options List */}
          <div className={styles.optionsList}>
            {currentQuestion.options.map((option) => {
              let btnClass = styles.optionBtn;
              const isSelected = selectedAnswer === option;
              const isCorrectOpt = option === currentQuestion.correctAnswer;
              
              if (isSelected) {
                btnClass += ` ${styles.selectedOption}`;
              }
              
              if (mode !== 'Exam' && submitted) {
                if (isCorrectOpt) {
                  btnClass += ` ${styles.correctOption}`;
                } else if (isSelected) {
                  btnClass += ` ${styles.incorrectOption}`;
                }
                btnClass += ` ${styles.disabledOption}`;
              }

              return (
                <button
                  key={option}
                  className={btnClass}
                  onClick={() => !submitted && setSelectedAnswer(option)}
                  disabled={mode !== 'Exam' && submitted}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Navigation & Action Controls */}
          <div className={styles.navActionRow}>
            {mode === 'Exam' && currentIdx > 0 && (
              <button onClick={handleBack} className={styles.backBtn}>
                ← Previous
              </button>
            )}

            {mode === 'Exam' ? (
              <button 
                onClick={handleNext} 
                disabled={!selectedAnswer} 
                className={styles.nextBtn}
              >
                {currentIdx + 1 === sessionQuestions.length ? 'Finish Exam 🏁' : 'Next Question →'}
              </button>
            ) : !submitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={styles.submitBtn}
              >
                Submit Answer
              </button>
            ) : (
              <div className={styles.flowRightGroup}>
                {mode === 'Practice' && (
                  <button 
                    onClick={() => setCompleted(true)} 
                    className={styles.finishPracticeBtn}
                  >
                    Finish Practice 🏁
                  </button>
                )}
                <button onClick={handleNext} className={styles.nextBtn}>
                  Next Question →
                </button>
              </div>
            )}
          </div>

          {/* Explanation Box */}
          {mode !== 'Exam' && submitted && (
            <div className={styles.explanationBox}>
              <h4>{selectedAnswer === currentQuestion.correctAnswer ? '🟢 Correct!' : '🔴 Incorrect'}</h4>
              <p>{currentQuestion.explanation}</p>
              {currentQuestion.tags && currentQuestion.tags.length > 0 && (
                <div className={styles.tagRow}>
                  {currentQuestion.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag.replace(/-/g, ' ')}</span>
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      )}

      {/* 3. Mid-batch Transition Screen for Adaptive Mode */}
      {started && showTransition && (
        <div className={styles.resultsCard}>
          <h2>Batch {batchNumber + 1} Complete! 📊</h2>
          <div className={styles.scoreCircle} style={{ borderColor: 'var(--color-warning)', boxShadow: '0 0 20px rgba(255, 215, 0, 0.15)' }}>
            <span className={styles.percentage} style={{ color: 'var(--color-warning)' }}>
              {Math.round((batchCorrect / batchTotal) * 100)}%
            </span>
            <span className={styles.scoreText}>{batchCorrect} / {batchTotal} Correct</span>
          </div>

          <p className={styles.resultsDesc} style={{ fontSize: '1.2rem', color: 'var(--color-white)', fontWeight: 600 }}>
            {transitionMessage}
          </p>

          <p className={styles.resultsDesc}>
            Would you like to continue to the next batch at <strong>{transitionDifficultyChange}</strong> level, or end the quiz now to view your performance report?
          </p>

          <div className={styles.resultsActions}>
            <button onClick={handleNextBatch} className={styles.certClaimBtn}>
              🚀 Continue to Next Batch ({transitionDifficultyChange})
            </button>
            <button onClick={handleFinishAdaptiveQuiz} className={styles.restartBtn}>
              🏁 Finish Quiz & View Report
            </button>
          </div>
        </div>
      )}

      {/* 4. Completed Results & Performance Report */}
      {started && completed && (
        <div className={styles.resultsReportContainer}>
          <div className={styles.resultsHeaderCard}>
            <h2>Quiz Completed! 🎉</h2>
            <div className={styles.scoreRow}>
              <div className={styles.scoreCircle}>
                <span className={styles.percentage}>{animatedScore}%</span>
                <span className={styles.scoreText}>
                  {mode === 'Practice'
                    ? `${practiceCorrect} / ${practiceAttempts}`
                    : adaptiveMode
                    ? `${score} / ${attemptedQuestionsList.length}`
                    : `${score} / ${sessionQuestions.length}`} Correct
                </span>
              </div>
              <div className={styles.summaryStatsBox}>
                <div className={styles.statLine}>
                  <strong>Mode:</strong> <span>{adaptiveMode ? 'Adaptive' : mode} Mode</span>
                </div>
                <div className={styles.statLine}>
                  <strong>Time Elapsed:</strong> <span>{formatTime(timeSpent)}</span>
                </div>
                {mode === 'Exam' && (
                  <div className={styles.statLine}>
                    <strong>Time Remaining:</strong> <span>{formatTime(timeRemaining)}</span>
                  </div>
                )}
                {adaptiveMode && (
                  <div className={styles.statLine}>
                    <strong>Batches Completed:</strong> <span>{batchNumber + 1}</span>
                  </div>
                )}
                <div className={styles.statLine}>
                  <strong>Status:</strong> 
                  <span className={scorePercentage >= 80 ? styles.statusPass : styles.statusFail}>
                    {scorePercentage >= 80 ? 'Passed (>=80%)' : 'Failed (<80%)'}
                  </span>
                </div>
              </div>
            </div>

            <p className={styles.resultsDesc}>
              {canClaimCertificate
                ? 'Outstanding performance! You have displayed structural mastery over the electronics topics. Claim your certificate of achievement below.'
                : mode === 'Practice'
                ? 'Practice is the key to engineering mastery. Keep testing your knowledge to refine your edge deployment skills.'
                : 'Keep practicing! Review the learning platform chapters, try topic-specific quizzes, and test again to unlock your certificate.'}
            </p>

            <div className={styles.resultsActions}>
              {canClaimCertificate && (
                <button onClick={() => setShowCertificate(true)} className={styles.certClaimBtn}>
                  🏆 Claim Certificate
                </button>
              )}
              <button onClick={handleRestart} className={styles.restartBtn}>
                Choose Another Mode
              </button>
              <button onClick={handleShare} className={styles.shareBtn}>
                {shareLabel}
              </button>
            </div>
          </div>

          {/* study recommendations based on performance */}
          {recommendedLessons.length > 0 && (
            <div className={styles.performanceBreakdownSection}>
              <h3 style={{ color: 'var(--color-warning)' }}>🎯 Recommended Review Chapters</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                Based on your quiz attempts, we suggest reviewing these lessons to reinforce your understanding of these concepts:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recommendedLessons.map(slug => (
                  <a 
                    key={slug} 
                    href={`/learn/${slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '1rem 1.25rem',
                      borderRadius: '10px',
                      color: 'var(--color-cyan)',
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
                  >
                    <span>📖 Review: {slug.replace(/-/g, ' ').toUpperCase()}</span>
                    <span>→</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Performance Report by Topic */}
          {mode !== 'Practice' && categoryPerformance.length > 0 && (
            <div className={styles.performanceBreakdownSection}>
              <h3>Topic performance analysis</h3>
              <div className={styles.categoryReportGrid}>
                {categoryPerformance.map(cat => (
                  <div key={cat.name} className={styles.categoryReportCard}>
                    <div className={styles.catReportMeta}>
                      <span className={styles.catReportName}>{cat.name}</span>
                      <span className={styles.catReportScore}>{cat.correct} / {cat.total} ({cat.percent}%)</span>
                    </div>
                    <div className={styles.catProgressTrack}>
                      <div 
                        className={styles.catProgressBar} 
                        style={{ 
                          width: `${cat.percent}%`,
                          backgroundColor: cat.percent >= 80 ? 'var(--color-success)' : cat.percent >= 50 ? 'var(--color-warning)' : 'var(--color-error)' 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Review List */}
          {mode !== 'Practice' && (adaptiveMode ? attemptedQuestionsList : sessionQuestions).length > 0 && (
            <div className={styles.questionReviewContainer}>
              <h3>Detailed Question Review</h3>
              <div className={styles.reviewList}>
                {(adaptiveMode ? attemptedQuestionsList : sessionQuestions).map((q, idx) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <div 
                      key={q.id} 
                      className={`${styles.reviewCard} ${isCorrect ? styles.reviewCorrect : styles.reviewIncorrect}`}
                    >
                      <div className={styles.reviewQuestionHeader}>
                        <span className={styles.reviewNumber}>Q{idx + 1}</span>
                        <span className={`${styles.reviewStatusBadge} ${isCorrect ? styles.statusBadgeCorrect : styles.statusBadgeIncorrect}`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        <span className={styles.reviewTopicTag}>{q.topic}</span>
                      </div>
                      <p className={styles.reviewQuestionText}>{q.question}</p>
                      
                      <div className={styles.reviewAnswersRow}>
                        <div className={styles.answerBlock}>
                          <strong>Your Answer:</strong> 
                          <span className={userAnswer ? (isCorrect ? styles.textCorrect : styles.textIncorrect) : styles.textMuted}>
                            {userAnswer || 'Skipped'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className={styles.answerBlock}>
                            <strong>Correct Answer:</strong> 
                            <span className={styles.textCorrect}>{q.correctAnswer}</span>
                          </div>
                        )}
                      </div>

                      <div className={styles.reviewExplanationBox}>
                        <strong>Explanation:</strong>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {showCertificate && (
        <CertificateModal
          score={mode === 'Practice' ? practiceCorrect : score}
          total={mode === 'Practice' ? practiceAttempts : (adaptiveMode ? attemptedQuestionsList.length : sessionQuestions.length)}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default QuizContent;
