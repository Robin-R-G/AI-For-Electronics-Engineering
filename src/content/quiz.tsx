'use client';
import React, { useState, useMemo } from 'react';
import { quizQuestions, Difficulty } from '@/data/quizQuestions';
import { generateQuizSession } from '@/lib/quizRandomizer';
import CertificateModal from '@/components/quiz/CertificateModal';
import styles from './quiz.module.css';

const HISTORY_KEY = 'workshop_quiz_history_v1';
const HISTORY_LIMIT = 12;

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
    /* storage full / unavailable — randomization still works for this attempt */
  }
}

export const QuizContent = () => {
  const [started, setStarted] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  const [questionsPerAttempt, setQuestionsPerAttempt] = useState<number>(10);
  const [sessionQuestions, setSessionQuestions] = useState(quizQuestions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Filter questions based on selected difficulty
  const activeQuestions = useMemo(() => {
    if (difficultyFilter === 'All') return quizQuestions;
    return quizQuestions.filter(q => q.difficulty === difficultyFilter);
  }, [difficultyFilter]);

  const plannedCount = Math.min(questionsPerAttempt, activeQuestions.length);
  const currentQuestion = sessionQuestions[currentIdx];

  const handleStart = () => {
    // ponytail: fresh randomized set per attempt, avoids recent repeats for this user.
    const history = readHistory();
    const session = generateQuizSession(activeQuestions, {
      sessionSize: plannedCount,
      recentSessions: history,
    });
    setSessionQuestions(session);
    writeHistory([session.map((q) => q.id), ...history]);
    setStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setCompleted(false);
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < sessionQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCompleted(false);
    setShowCertificate(false);
  };

  const scorePercentage = useMemo(() => {
    if (sessionQuestions.length === 0) return 0;
    return Math.round((score / sessionQuestions.length) * 100);
  }, [score, sessionQuestions]);

  const canClaimCertificate = scorePercentage >= 80;

  return (
    <div className={styles.container}>
      {!started && (
        <div className={styles.startCard}>
          <h2>Test Your Knowledge 🧠</h2>
          <p>
            Assess your understanding of AI integration across embedded engineering, RTOS multitasking, 
            schematics, and hardware protocols.
          </p>

          <div className={styles.difficultySelection}>
            <h3>Select Difficulty Level:</h3>
            <div className={styles.difficultyGrid}>
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  className={`${styles.diffBtn} ${difficultyFilter === diff ? styles.activeDiff : ''}`}
                  onClick={() => setDifficultyFilter(diff)}
                >
                  {diff === 'All' ? 'Full Workshop Exam' : `${diff} Mode`}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.difficultySelection}>
            <h3>Questions per Attempt:</h3>
            <div className={styles.difficultyGrid}>
              {[10, 15, 20, activeQuestions.length].filter((v, i, a) => a.indexOf(v) === i).map((n) => (
                <button
                  key={n}
                  className={`${styles.diffBtn} ${questionsPerAttempt === n ? styles.activeDiff : ''}`}
                  onClick={() => setQuestionsPerAttempt(n)}
                >
                  {n >= activeQuestions.length ? 'All' : `${n}`}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleStart} className={styles.startBtn}>
            Start Quiz ({plannedCount} Questions)
          </button>
        </div>
      )}

      {started && !completed && currentQuestion && (
        <div className={styles.quizCard}>
          <div className={styles.quizHeader}>
            <span className={styles.progressText}>
              Question {currentIdx + 1} of {sessionQuestions.length}
            </span>
            <span className={`${styles.difficultyBadge} ${
              currentQuestion.difficulty === 'Easy' ? styles.badgeEasy :
              currentQuestion.difficulty === 'Medium' ? styles.badgeMedium : styles.badgeHard
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          <div className={styles.metaRow}>
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
              <span className={styles.lessonTag}>📖 {currentQuestion.relatedLesson.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
            )}
          </div>

          <h3 className={styles.questionText}>{currentQuestion.question}</h3>

          {currentQuestion.imageUrl && (
            <div className={styles.imageContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentQuestion.imageUrl} alt="Question reference image" className={styles.quizImage} />
            </div>
          )}

          {currentQuestion.codeSnippet && (
            <pre className={styles.codeSnippet}>
              <code>{currentQuestion.codeSnippet}</code>
            </pre>
          )}

          {/* Options List */}
          <div className={styles.optionsList}>
            {currentQuestion.options.map((option) => {
              let btnClass = styles.optionBtn;
              if (selectedAnswer === option) {
                btnClass += ` ${styles.selectedOption}`;
              }
              if (submitted) {
                if (option === currentQuestion.correctAnswer) {
                  btnClass += ` ${styles.correctOption}`;
                } else if (selectedAnswer === option) {
                  btnClass += ` ${styles.incorrectOption}`;
                }
                btnClass += ` ${styles.disabledOption}`;
              }

              return (
                <button
                  key={option}
                  className={btnClass}
                  onClick={() => !submitted && setSelectedAnswer(option)}
                  disabled={submitted}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className={styles.actionRow}>
            {!submitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={styles.submitBtn}
              >
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNext} className={styles.nextBtn}>
                {currentIdx + 1 < sessionQuestions.length ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>

          {/* Explanation reveal */}
          {submitted && (
            <div className={styles.explanationBox}>
              <h4>{selectedAnswer === currentQuestion.correctAnswer ? '🟢 Correct!' : '🔴 Incorrect'}</h4>
              <p>{currentQuestion.explanation}</p>
              <div className={styles.tagRow}>
                {currentQuestion.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag.replace(/-/g, ' ')}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {started && completed && (
        <div className={styles.resultsCard}>
          <h2>Quiz Completed! 🎉</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.percentage}>{scorePercentage}%</span>
            <span className={styles.scoreText}>{score} / {sessionQuestions.length} Correct</span>
          </div>

          <p className={styles.resultsDesc}>
            {canClaimCertificate
              ? 'Excellent job! You demonstrated strong capability and have unlocked your certificate.'
              : 'Keep practicing! Review the learning platform chapters and retake the quiz to unlock the certificate.'}
          </p>

          <div className={styles.resultsActions}>
            {canClaimCertificate && (
              <button onClick={() => setShowCertificate(true)} className={styles.certClaimBtn}>
                🏆 Claim Certificate
              </button>
            )}
            <button onClick={handleRestart} className={styles.restartBtn}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      {showCertificate && (
        <CertificateModal
          score={score}
          total={sessionQuestions.length}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default QuizContent;
