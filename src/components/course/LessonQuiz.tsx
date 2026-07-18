'use client';

import React, { useState } from 'react';
import { lessonQuizQuestions } from '@/data/lessonQuizQuestions';
import { useProgress } from '@/context/ProgressContext';
import CertificateModal from '@/components/quiz/CertificateModal';
import styles from './LessonQuiz.module.css';

interface LessonQuizProps {
  slug: string;
  lessonTitle: string;
}

export default function LessonQuiz({ slug, lessonTitle }: LessonQuizProps) {
  const questions = lessonQuizQuestions[slug];
  const { quizScores, saveQuizScore } = useProgress();

  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const existingScore = quizScores[slug];
  const passed = existingScore !== undefined && existingScore >= 70;

  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[currentIdx];
  const percentage = completed ? Math.round((score / questions.length) * 100) : 0;

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = score + (isCorrect ? 1 : 0);

    if (currentIdx + 1 < questions.length) {
      setScore(newScore);
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      const finalPct = Math.round((newScore / questions.length) * 100);
      setScore(newScore);
      setCompleted(true);
      saveQuizScore(slug, finalPct);
    }
  };

  const handleStart = () => {
    setStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setCompleted(false);
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const handleRetry = () => {
    setStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setCompleted(false);
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  if (!started && !completed) {
    return (
      <div className={styles.container}>
        <div className={styles.startCard}>
          <div className={styles.icon}>📝</div>
          <h3 className={styles.title}>Lesson Quiz</h3>
          <p className={styles.subtitle}>
            Test your understanding of <strong>{lessonTitle}</strong>
          </p>
          <p className={styles.meta}>
            {questions.length} questions · 70% to pass
            {passed && <span className={styles.existingBadge}>✓ Previously passed</span>}
          </p>
          <button className={styles.startBtn} onClick={handleStart}>
            {passed ? 'Retake Quiz' : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    const passedNow = percentage >= 70;
    return (
      <>
        <div className={styles.container}>
          <div className={styles.resultCard}>
            <div className={passedNow ? styles.resultIconPass : styles.resultIconFail}>
              {passedNow ? '🎉' : '📋'}
            </div>
            <h3 className={styles.title}>
              {passedNow ? 'Quiz Passed!' : 'Keep Learning'}
            </h3>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreNumber}>{percentage}%</span>
              <span className={styles.scoreDetail}>{score}/{questions.length} correct</span>
            </div>
            <p className={styles.resultText}>
              {passedNow
                ? 'Great work! You have a solid understanding of this lesson.'
                : 'Review the material above and try again. You need 70% to pass.'}
            </p>
            <div className={styles.resultActions}>
              {passedNow && (
                <button className={styles.certBtn} onClick={() => setShowCertificate(true)}>
                  🎓 Download Certificate
                </button>
              )}
              <button className={styles.retryBtn} onClick={handleRetry}>
                {passedNow ? 'Retake Quiz' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
        {showCertificate && (
          <CertificateModal
            score={score}
            total={questions.length}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizCard}>
        <div className={styles.progress}>
          <div className={styles.progressText}>
            Question {currentIdx + 1} of {questions.length}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <p className={styles.question}>{currentQuestion.question}</p>

        <div className={styles.options}>
          {currentQuestion.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isCorrect = opt === currentQuestion.correctAnswer;
            const isSelected = opt === selectedAnswer;
            return (
              <button
                key={i}
                disabled={submitted}
                className={`${styles.optionBtn} ${
                  isSelected ? styles.selected : ''
                } ${submitted && isCorrect ? styles.correct : ''} ${
                  submitted && isSelected && !isCorrect ? styles.incorrect : ''
                }`}
                onClick={() => setSelectedAnswer(opt)}
              >
                <span className={styles.optionLetter}>{letter}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <button
            className={styles.submitBtn}
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
          >
            Check Answer
          </button>
        ) : (
          <div className={styles.feedback}>
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <>
                <div className={styles.feedbackCorrect}>
                  <span className={styles.feedbackIcon}>✓</span>
                  <strong>Correct Answer</strong>
                </div>
                <div className={styles.feedbackSection}>
                  <p className={styles.feedbackHeading}>Why this is correct</p>
                  <p className={styles.explanation}>{currentQuestion.explanation}</p>
                </div>
                <div className={styles.feedbackSection}>
                  <p className={styles.feedbackHeading}>Practical engineering usage</p>
                  <p className={styles.explanation}>{currentQuestion.practicalUse}</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.feedbackWrong}>
                  <span className={styles.feedbackIcon}>✗</span>
                  <strong>Incorrect Answer</strong>
                </div>
                <div className={styles.feedbackSection}>
                  <p className={styles.feedbackHeading}>
                    Correct Answer: <span className={styles.correctAnswerText}>{currentQuestion.correctAnswer}</span>
                  </p>
                </div>
                <div className={styles.feedbackSection}>
                  <p className={styles.feedbackHeading}>Why your answer is wrong</p>
                  <p className={styles.explanation}>{currentQuestion.whyWrong}</p>
                </div>
                <div className={styles.feedbackSection}>
                  <p className={styles.feedbackHeading}>Why the correct answer is right</p>
                  <p className={styles.explanation}>{currentQuestion.explanation}</p>
                </div>
                <div className={styles.feedbackSection}>
                  <p className={styles.feedbackHeading}>Common mistake students make</p>
                  <p className={styles.explanation}>{currentQuestion.commonMistake}</p>
                </div>
                <div className={styles.feedbackSection}>
                  <p className={styles.feedbackHeading}>Related concept to study</p>
                  <p className={styles.explanation}>{currentQuestion.relatedConcept}</p>
                </div>
              </>
            )}
            <button className={styles.nextBtn} onClick={handleNext}>
              {currentIdx + 1 < questions.length ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
