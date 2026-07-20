'use client';

import React, { useState, useMemo } from 'react';
import { interviewQuestions, interviewCategories } from '@/data/interviewQuestions';

const InterviewPrepContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = interviewQuestions;
    if (selectedCategory !== 'All') {
      result = result.filter(q => q.category === selectedCategory);
    }
    if (selectedDifficulty !== 'All') {
      result = result.filter(q => q.difficulty === selectedDifficulty);
    }
    return result;
  }, [selectedCategory, selectedDifficulty]);

  const difficultyColors: Record<string, string> = {
    Easy: 'var(--color-success)',
    Medium: 'var(--color-warning)',
    Hard: 'var(--color-error)',
  };

  return (
    <>
      <p>
        Topic-wise embedded systems, PCB, C programming, and electronics interview questions
        with detailed explanations. Prepare for technical interviews at semiconductor companies,
        embedded systems firms, and IoT startups.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {interviewCategories.map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setShowAnswer(null); }}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: `1px solid ${selectedCategory === cat ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
              background: selectedCategory === cat ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: selectedCategory === cat ? 'var(--color-cyan)' : 'rgba(200,210,235,0.75)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => { setSelectedDifficulty(diff); setShowAnswer(null); }}
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              border: `1px solid ${selectedDifficulty === diff ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
              background: selectedDifficulty === diff ? 'rgba(0,229,255,0.1)' : 'transparent',
              color: selectedDifficulty === diff ? 'var(--color-cyan)' : 'rgba(160,175,210,0.5)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {diff}
          </button>
        ))}
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: 'auto', alignSelf: 'center' }}>
          {filtered.length} question{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(q => (
          <div
            key={q.id}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}
            >
              <span style={{
                padding: '0.3rem 0.6rem',
                background: `${difficultyColors[q.difficulty]}15`,
                color: difficultyColors[q.difficulty],
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {q.difficulty}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                  {q.question}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                  {q.category}
                </p>
              </div>
              <span style={{
                color: 'var(--color-text-muted)',
                transform: expandedId === q.id ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s',
                fontSize: '1.2rem',
              }}>
                &#8964;
              </span>
            </div>

            {expandedId === q.id && (
              <div style={{ padding: '0 1.25rem 1.25rem' }}>
                {showAnswer !== q.id ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowAnswer(q.id); }}
                    style={{
                      padding: '0.5rem 1.5rem',
                      background: 'linear-gradient(135deg, rgba(0,82,255,0.2), rgba(0,229,255,0.2))',
                      border: '1px solid rgba(0,229,255,0.3)',
                      borderRadius: '9999px',
                      color: 'var(--color-cyan)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Reveal Answer
                  </button>
                ) : (
                  <div>
                    <div style={{
                      padding: '1rem',
                      background: 'rgba(0,229,255,0.03)',
                      borderRadius: '12px',
                      borderLeft: '3px solid var(--color-cyan)',
                      marginBottom: q.followUp ? '1rem' : 0,
                    }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                        {q.answer}
                      </p>
                    </div>
                    {q.followUp && (
                      <div style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(245,158,11,0.05)',
                        borderRadius: '8px',
                        borderLeft: '3px solid var(--color-warning)',
                      }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-warning)', marginBottom: '0.25rem' }}>
                          Follow-up question:
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                          {q.followUp}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default InterviewPrepContent;
