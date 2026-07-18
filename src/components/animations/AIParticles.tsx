'use client';
import React, { useState } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import styles from './AIParticles.module.css';

type Particle = { id: number; left: string; top: string; duration: string; delay: string };

const generateParticles = (): Particle[] =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${Math.random() * 5 + 3}s`,
    delay: `${Math.random() * 5}s`,
  }));

export const AIParticles = () => {
  const isClient = useIsClient();
  const [particles] = useState<Particle[]>(generateParticles);

  if (!isClient) return null;

  return (
    <div className={styles.particleContainer}>
      {particles.map((p) => (
        <div 
          key={p.id} 
          className={styles.particle}
          style={{
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay
          }}
        />
      ))}
    </div>
  );
};

export default AIParticles;
