'use client';

import React from 'react';
import { badges } from '@/data/badges';
import { useProgress } from '@/context/ProgressContext';

const BadgesContent = () => {
  const { earnedBadges, totalPoints, readSlugs, quizScores, promptsCopied, labsCompleted, questionsViewed, earnBadge } = useProgress();

  const totalBadges = badges.length;
  const earnedCount = earnedBadges.length;
  const progressPercent = Math.round((earnedCount / totalBadges) * 100);

  // Auto-earn badges based on progress
  React.useEffect(() => {
    const earned = new Set(earnedBadges);

    if (readSlugs.length >= 1 && !earned.has('first-lesson')) earnBadge('first-lesson');
    if (readSlugs.length >= 3 && !earned.has('fundamentals-master')) earnBadge('fundamentals-master');
    if (readSlugs.length >= 6 && !earned.has('deep-diver')) earnBadge('deep-diver');
    if (readSlugs.length >= 9 && !earned.has('tool-user')) earnBadge('tool-user');
    if (readSlugs.length >= 19 && !earned.has('full-graduate')) earnBadge('full-graduate');

    const quizScore = quizScores['main'] || 0;
    if (quizScore >= 100 && !earned.has('quiz-ace')) earnBadge('quiz-ace');
    if (quizScore >= 80 && !earned.has('quiz-pass')) earnBadge('quiz-pass');

    if (promptsCopied >= 5 && !earned.has('prompt-crafter')) earnBadge('prompt-crafter');
    if (labsCompleted.length >= 1 && !earned.has('lab-builder')) earnBadge('lab-builder');
    if (questionsViewed >= 10 && !earned.has('interview-ready')) earnBadge('interview-ready');
  }, [earnedBadges, readSlugs, quizScores, promptsCopied, labsCompleted, questionsViewed, earnBadge]);

  return (
    <>
      <p>
        Track your progress and earn badges as you complete modules, quizzes, challenges, and
        hands-on activities. Every badge earns points — how many can you collect?
      </p>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {[
          { label: 'Badges Earned', value: `${earnedCount}/${totalBadges}`, icon: '🏆' },
          { label: 'Total Points', value: totalPoints.toString(), icon: '⭐' },
          { label: 'Modules Read', value: `${readSlugs.length}/19`, icon: '📚' },
          { label: 'Prompts Copied', value: promptsCopied.toString(), icon: '✍️' },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '1.25rem',
            background: 'var(--glass-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-cyan)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Overall Progress</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-cyan)' }}>{progressPercent}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-electric-blue), var(--color-cyan))',
            borderRadius: '4px',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* Badges Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {badges.map(badge => {
          const isEarned = earnedBadges.includes(badge.id);
          return (
            <div
              key={badge.id}
              style={{
                padding: '1.25rem',
                background: isEarned ? 'rgba(0,229,255,0.05)' : 'var(--glass-bg)',
                border: `1px solid ${isEarned ? 'rgba(0,229,255,0.3)' : 'var(--color-border)'}`,
                borderRadius: '16px',
                opacity: isEarned ? 1 : 0.6,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{badge.icon}</span>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{badge.name}</h3>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-muted)',
                  }}>
                    {badge.category}
                  </span>
                </div>
                {isEarned && (
                  <span style={{
                    marginLeft: 'auto',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(0,255,163,0.15)',
                    borderRadius: '9999px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#00ffa3',
                  }}>
                    EARNED
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>
                {badge.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{badge.requirement}</span>
                <span style={{ fontWeight: 700, color: 'var(--color-cyan)' }}>{badge.points} pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BadgesContent;
