'use client';

import React, { useState } from 'react';
import styles from './DebuggingMode.module.css';
import CodeBlock from './CodeBlock';

export interface DebugStep {
  label: string;
  code?: string;
  explanation: string;
  isFixed?: boolean;
}

interface DebuggingModeProps {
  title: string;
  brokenCode: string;
  fixedCode: string;
  language?: string;
  steps: DebugStep[];
  commonMistakes: string[];
}

const DebuggingMode: React.FC<DebuggingModeProps> = ({
  title,
  brokenCode,
  fixedCode,
  language = 'c',
  steps,
  commonMistakes,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Debug Mode</span>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.brokenSection}>
        <h4>Broken Code</h4>
        <CodeBlock code={brokenCode} language={language} filename="broken.c" />
      </div>

      <div className={styles.stepsSection}>
        <h4>Debugging Walkthrough</h4>
        <div className={styles.stepTabs}>
          {steps.map((step, i) => (
            <button
              key={i}
              className={`${styles.stepTab} ${currentStep === i ? styles.activeStep : ''}`}
              onClick={() => setCurrentStep(i)}
            >
              <span className={styles.stepNumber}>{i + 1}</span>
              <span className={styles.stepLabel}>{step.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.stepContent}>
          <p>{steps[currentStep].explanation}</p>
        </div>
      </div>

      <div className={styles.fixedSection}>
        <h4>Fixed Code</h4>
        <CodeBlock code={fixedCode} language={language} filename="fixed.c" />
      </div>

      <div className={styles.mistakesSection}>
        <h4>Common Beginner Mistakes</h4>
        <ul className={styles.mistakesList}>
          {commonMistakes.map((mistake, i) => (
            <li key={i} className={styles.mistakeItem}>
              <span className={styles.mistakeIcon}>&#10005;</span>
              {mistake}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebuggingMode;
