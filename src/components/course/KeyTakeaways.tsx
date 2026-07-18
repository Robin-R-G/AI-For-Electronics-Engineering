import React from 'react';
import styles from './KeyTakeaways.module.css';

interface KeyTakeawaysProps {
  points: string[];
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ points }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Key Takeaways</h3>
      <ul className={styles.list}>
        {points.map((point, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.check}>✓</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyTakeaways;
