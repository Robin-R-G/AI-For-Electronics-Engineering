'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { badges, Badge } from '@/data/badges';

type ProgressContextType = {
  readSlugs: string[];
  markAsRead: (slug: string) => void;
  quizScores: Record<string, number>;
  saveQuizScore: (quizId: string, score: number) => void;
  earnedBadges: string[];
  earnBadge: (badgeId: string) => void;
  totalPoints: number;
  promptsCopied: number;
  incrementPromptsCopied: () => void;
  labsCompleted: string[];
  completeLab: (labId: string) => void;
  questionsViewed: number;
  incrementQuestionsViewed: () => void;
};

const ProgressContext = createContext<ProgressContextType>({
  readSlugs: [],
  markAsRead: () => {},
  quizScores: {},
  saveQuizScore: () => {},
  earnedBadges: [],
  earnBadge: () => {},
  totalPoints: 0,
  promptsCopied: 0,
  incrementPromptsCopied: () => {},
  labsCompleted: [],
  completeLab: () => {},
  questionsViewed: 0,
  incrementQuestionsViewed: () => {},
});

const STORAGE_KEY = 'ai-workshop-progress';
const BADGES_KEY = 'ai-workshop-badges';

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [promptsCopied, setPromptsCopied] = useState(0);
  const [labsCompleted, setLabsCompleted] = useState<string[]>([]);
  const [questionsViewed, setQuestionsViewed] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setReadSlugs(data.readSlugs || []);
        setQuizScores(data.quizScores || {});
        setPromptsCopied(data.promptsCopied || 0);
        setLabsCompleted(data.labsCompleted || []);
        setQuestionsViewed(data.questionsViewed || 0);
      }
      const savedBadges = localStorage.getItem(BADGES_KEY);
      if (savedBadges) {
        setEarnedBadges(JSON.parse(savedBadges));
      }
    } catch {
      console.error('Failed to parse progress from localStorage');
    }
  }, []);

  const persistProgress = useCallback((data: Partial<ReturnType<typeof getProgressData>>) => {
    try {
      const current = getProgressData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...data }));
    } catch { /* ignore */ }
  }, []);

  const getProgressData = () => ({
    readSlugs,
    quizScores,
    promptsCopied,
    labsCompleted,
    questionsViewed,
  });

  const markAsRead = (slug: string) => {
    setReadSlugs(prev => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug];
      persistProgress({ readSlugs: next });
      return next;
    });
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setQuizScores(prev => {
      const next = { ...prev, [quizId]: Math.max(prev[quizId] || 0, score) };
      persistProgress({ quizScores: next });
      return next;
    });
  };

  const earnBadge = (badgeId: string) => {
    setEarnedBadges(prev => {
      if (prev.includes(badgeId)) return prev;
      const next = [...prev, badgeId];
      localStorage.setItem(BADGES_KEY, JSON.stringify(next));
      return next;
    });
  };

  const incrementPromptsCopied = () => {
    setPromptsCopied(prev => {
      const next = prev + 1;
      persistProgress({ promptsCopied: next });
      return next;
    });
  };

  const completeLab = (labId: string) => {
    setLabsCompleted(prev => {
      if (prev.includes(labId)) return prev;
      const next = [...prev, labId];
      persistProgress({ labsCompleted: next });
      return next;
    });
  };

  const incrementQuestionsViewed = () => {
    setQuestionsViewed(prev => {
      const next = prev + 1;
      persistProgress({ questionsViewed: next });
      return next;
    });
  };

  const totalPoints = earnedBadges.reduce((sum, badgeId) => {
    const badge = badges.find(b => b.id === badgeId);
    return sum + (badge?.points || 0);
  }, 0);

  return (
    <ProgressContext.Provider value={{
      readSlugs,
      markAsRead,
      quizScores,
      saveQuizScore,
      earnedBadges,
      earnBadge,
      totalPoints,
      promptsCopied,
      incrementPromptsCopied,
      labsCompleted,
      completeLab,
      questionsViewed,
      incrementQuestionsViewed,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
