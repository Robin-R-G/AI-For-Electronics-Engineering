import React from 'react';
import styles from './EngineeringChallenge.module.css';

interface Step {
  step: string;
  hint?: string;
}

interface EngineeringChallengeProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: Step[];
  expectedOutcome: string;
}

const EngineeringChallenge: React.FC<EngineeringChallengeProps> = ({
  title,
  description,
  difficulty,
  steps,
  expectedOutcome,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Engineering Challenge</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={`${styles.difficulty} ${
          difficulty === 'Beginner' ? styles.beginner :
          difficulty === 'Intermediate' ? styles.intermediate : styles.advanced
        }`}>
          {difficulty}
        </span>
      </div>

      <div className={styles.steps}>
        <h4>Steps</h4>
        <ol className={styles.stepList}>
          {steps.map((s, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <div className={styles.stepContent}>
                <p className={styles.stepText}>{s.step}</p>
                {s.hint && <p className={styles.hint}>Hint: {s.hint}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.outcome}>
        <h4>Expected Outcome</h4>
        <p>{expectedOutcome}</p>
      </div>
    </div>
  );
};

export default EngineeringChallenge;
