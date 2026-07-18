'use client';
import React, { useRef, useCallback } from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  spotlight?: boolean;
  gradientBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  interactive = false, 
  spotlight = false,
  gradientBorder = false,
  className = '',
  ...props 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.setProperty('--spotlight-x', '-200px');
    card.style.setProperty('--spotlight-y', '-200px');
  }, []);

  const classes = [
    styles.card,
    interactive ? styles.interactive : '',
    spotlight ? styles.spotlight : '',
    gradientBorder ? styles.gradientBorder : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={cardRef}
      className={classes}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      {...props}
    >
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
};
