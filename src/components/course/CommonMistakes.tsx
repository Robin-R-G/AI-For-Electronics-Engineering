import React from 'react';
import styles from './CommonMistakes.module.css';

interface Mistake {
  mistake: string;
  why: string;
  fix: string;
}

interface CommonMistakesProps {
  mistakes: Mistake[];
}

const CommonMistakes: React.FC<CommonMistakesProps> = ({ mistakes }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Common Mistakes</h3>
      <div className={styles.list}>
        {mistakes.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.header}>
              <span className={styles.icon}>&#10005;</span>
              <h4 className={styles.mistake}>{item.mistake}</h4>
            </div>
            <div className={styles.body}>
              <div className={styles.why}>
                <span className={styles.label}>Why it fails:</span>
                <p>{item.why}</p>
              </div>
              <div className={styles.fix}>
                <span className={styles.label}>Fix:</span>
                <p>{item.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonMistakes;
