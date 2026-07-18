'use client';
import React, { useState } from 'react';
import styles from './MiniQuiz.module.css';

interface QuizOption {
  id: string;
  text: string;
}

interface MiniQuizProps {
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
}

export const MiniQuiz: React.FC<MiniQuizProps> = ({ question, options, correctAnswerId, explanation }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedId) setSubmitted(true);
  };

  return (
    <div className={styles.quizBox}>
      <div className={styles.header}>Knowledge Check</div>
      <p className={styles.question}>{question}</p>
      
      <div className={styles.options}>
        {options.map((opt) => (
          <button
            key={opt.id}
            disabled={submitted}
            className={`${styles.optionBtn} ${
              selectedId === opt.id ? styles.selected : ''
            } ${
              submitted && opt.id === correctAnswerId ? styles.correct : ''
            } ${
              submitted && selectedId === opt.id && opt.id !== correctAnswerId ? styles.incorrect : ''
            }`}
            onClick={() => setSelectedId(opt.id)}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {!submitted ? (
        <button 
          className={styles.submitBtn} 
          onClick={handleSubmit}
          disabled={!selectedId}
        >
          Check Answer
        </button>
      ) : (
        <div className={`${styles.feedback} ${selectedId === correctAnswerId ? styles.success : styles.error}`}>
          <strong>{selectedId === correctAnswerId ? 'Correct!' : 'Not quite.'}</strong> {explanation}
        </div>
      )}
    </div>
  );
};

export default MiniQuiz;
