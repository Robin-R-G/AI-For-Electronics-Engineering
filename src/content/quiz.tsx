'use client';
import React, { useState, useMemo } from 'react';
import { quizQuestions, Difficulty } from '@/data/quizQuestions';
import CertificateModal from '@/components/quiz/CertificateModal';
import styles from './quiz.module.css';

export const QuizContent = () => {
  const [started, setStarted] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
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

  const currentQuestion = activeQuestions[currentIdx];

  const handleStart = () => {
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
    if (currentIdx + 1 < activeQuestions.length) {
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
    if (activeQuestions.length === 0) return 0;
    return Math.round((score / activeQuestions.length) * 100);
  }, [score, activeQuestions]);

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

          <button onClick={handleStart} className={styles.startBtn}>
            Start Quiz ({activeQuestions.length} Questions)
          </button>
        </div>
      )}

      {started && !completed && currentQuestion && (
        <div className={styles.quizCard}>
          <div className={styles.quizHeader}>
            <span className={styles.progressText}>
              Question {currentIdx + 1} of {activeQuestions.length}
            </span>
            <span className={`${styles.difficultyBadge} ${
              currentQuestion.difficulty === 'Easy' ? styles.badgeEasy :
              currentQuestion.difficulty === 'Medium' ? styles.badgeMedium : styles.badgeHard
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          <h3 className={styles.questionText}>{currentQuestion.questionText}</h3>

          {/* Conditional image for Image ID questions */}
          {currentQuestion.type === 'image-id' && currentQuestion.imageUrl && (
            <div className={styles.imageContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentQuestion.imageUrl} alt="MCU Layout Blueprint" className={styles.quizImage} />
            </div>
          )}

          {/* Conditional code snippet for Coding questions */}
          {currentQuestion.type === 'coding' && currentQuestion.codeSnippet && (
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
                {currentIdx + 1 < activeQuestions.length ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>

          {/* Explanation reveal */}
          {submitted && (
            <div className={styles.explanationBox}>
              <h4>{selectedAnswer === currentQuestion.correctAnswer ? '🟢 Correct!' : '🔴 Incorrect'}</h4>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      {started && completed && (
        <div className={styles.resultsCard}>
          <h2>Quiz Completed! 🎉</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.percentage}>{scorePercentage}%</span>
            <span className={styles.scoreText}>{score} / {activeQuestions.length} Correct</span>
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
          total={activeQuestions.length}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default QuizContent;
