'use client';
import { useIsClient } from '@/hooks/useIsClient';
import styles from './PCBBackground.module.css';

const PCBBackground = () => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className={styles.pcbContainer}>
      {/* SVG Grid and Traces */}
      <svg className={styles.pcbSvg} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pcb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(0,229,255,0.2)" />
          </pattern>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 229, 255, 0.6)" />
            <stop offset="50%" stopColor="rgba(0, 82, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(112, 0, 255, 0.1)" />
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#pcb-grid)" />
        
        {/* Animated Traces */}
        <g className={styles.traces}>
          <path d="M 10 100 L 150 100 L 200 150 L 500 150" fill="none" stroke="url(#glow)" strokeWidth="2" className={styles.traceLine1} />
          <path d="M 100 800 L 150 800 L 250 700 L 600 700" fill="none" stroke="url(#glow)" strokeWidth="2" className={styles.traceLine2} />
          <path d="M 800 100 L 850 150 L 900 150 L 1100 350" fill="none" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1.5" className={styles.traceLine3} />
          <path d="M 900 600 L 950 550 L 1050 550 L 1200 400" fill="none" stroke="rgba(112, 0, 255, 0.4)" strokeWidth="1.5" className={styles.traceLine4} />
        </g>
        
        {/* Connection Pads */}
        <circle cx="10" cy="100" r="4" fill="#00e5ff" className={styles.padGlow} />
        <circle cx="500" cy="150" r="4" fill="#00e5ff" className={styles.padGlow} />
        
        <circle cx="100" cy="800" r="4" fill="#00e5ff" className={styles.padGlow} />
        <circle cx="600" cy="700" r="4" fill="#00e5ff" className={styles.padGlow} />
        
        <circle cx="800" cy="100" r="3" fill="#7000ff" />
        <circle cx="1100" cy="350" r="3" fill="#7000ff" />
        
        <circle cx="900" cy="600" r="3" fill="#7000ff" />
        <circle cx="1200" cy="400" r="3" fill="#7000ff" />
      </svg>
    </div>
  );
};

export default PCBBackground;
