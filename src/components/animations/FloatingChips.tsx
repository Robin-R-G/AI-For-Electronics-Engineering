import React from 'react';
import styles from './FloatingChips.module.css';

export const FloatingChips = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.chip} ${styles.chip1}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#0b0f19" stroke="#0052ff" strokeWidth="2"/>
          <path d="M10 30h10M10 50h10M10 70h10M90 30H80M90 50H80M90 70H80M30 10v10M50 10v10M70 10v10M30 90V80M50 90V80M70 90V80" stroke="#00e5ff" strokeWidth="2"/>
          <circle cx="50" cy="50" r="15" fill="rgba(0, 229, 255, 0.2)" stroke="#00e5ff" strokeWidth="1"/>
        </svg>
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="4" fill="#0b0f19" stroke="#7000ff" strokeWidth="2"/>
          <path d="M10 30h10M10 50h10M10 70h10M90 30H80M90 50H80M90 70H80M30 10v10M50 10v10M70 10v10M30 90V80M50 90V80M70 90V80" stroke="#7000ff" strokeWidth="2"/>
          <rect x="40" y="40" width="20" height="20" fill="rgba(112, 0, 255, 0.4)"/>
        </svg>
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="25" width="50" height="50" rx="2" fill="#0b0f19" stroke="#00e5ff" strokeWidth="1.5"/>
          <path d="M15 35h10M15 50h10M15 65h10M85 35H75M85 50H75M85 65H75M35 15v10M50 15v10M65 15v10M35 85V75M50 85V75M65 85V75" stroke="#0052ff" strokeWidth="1.5"/>
          <path d="M40 40L60 60M60 40L40 60" stroke="rgba(0, 82, 255, 0.6)" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
};

export default FloatingChips;
