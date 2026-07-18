import React from 'react';
import styles from './HandsOnActivity.module.css';

interface Step {
  instruction: string;
  detail?: string;
  codeSnippet?: string;
  expectedResult?: string;
}

interface HandsOnActivityProps {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  objectives: string[];
  materials?: string[];
  steps: Step[];
  verification?: string;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'var(--color-green)',
  Intermediate: '#f59e0b',
  Advanced: '#ef4444',
};

const HandsOnActivity: React.FC<HandsOnActivityProps> = ({
  title,
  difficulty,
  estimatedTime,
  objectives,
  materials = [],
  steps,
  verification,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Hands-On Activity</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.metaItem} style={{ color: difficultyColors[difficulty] }}>
            {difficulty}
          </span>
          <span className={styles.metaDot}>&middot;</span>
          <span className={styles.metaItem}>{estimatedTime}</span>
        </div>
      </div>

      <div className={styles.objectivesBox}>
        <h4>Learning Objectives</h4>
        <ul>
          {objectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </div>

      {materials.length > 0 && (
        <div className={styles.materialsBox}>
          <h4>What You Need</h4>
          <ul>
            {materials.map((mat, i) => (
              <li key={i}>{mat}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.stepsContainer}>
        <h4>Steps</h4>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNumber}>{i + 1}</div>
            <div className={styles.stepContent}>
              <p className={styles.instruction}>{step.instruction}</p>
              {step.detail && <p className={styles.detail}>{step.detail}</p>}
              {step.codeSnippet && (
                <pre className={styles.codeSnippet}>{step.codeSnippet}</pre>
              )}
              {step.expectedResult && (
                <div className={styles.expected}>
                  <strong>Expected Result:</strong> {step.expectedResult}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {verification && (
        <div className={styles.verificationBox}>
          <h4>Verification</h4>
          <p>{verification}</p>
        </div>
      )}
    </div>
  );
};

export default HandsOnActivity;
