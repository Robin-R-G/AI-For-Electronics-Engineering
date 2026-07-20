'use client';

import React, { createContext, useContext, useCallback, useSyncExternalStore } from 'react';
import { badges } from '@/data/badges';

type ProgressData = {
  readSlugs: string[];
  quizScores: Record<string, number>;
  promptsCopied: number;
  labsCompleted: string[];
  questionsViewed: number;
  earnedBadges: string[];
  bookmarks: string[];
};

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
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
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
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

const STORAGE_KEY = 'ai-workshop-progress';
const EMPTY: ProgressData = {
  readSlugs: [],
  quizScores: {},
  promptsCopied: 0,
  labsCompleted: [],
  questionsViewed: 0,
  earnedBadges: [],
  bookmarks: [],
};

type Listener = () => void;
let listeners: Listener[] = [];
let cached: ProgressData = EMPTY;
let initialized = false;

function init() {
  if (initialized || typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cached = raw
      ? {
          readSlugs: (JSON.parse(raw) as Partial<ProgressData>).readSlugs || [],
          quizScores: (JSON.parse(raw) as Partial<ProgressData>).quizScores || {},
          promptsCopied: (JSON.parse(raw) as Partial<ProgressData>).promptsCopied || 0,
          labsCompleted: (JSON.parse(raw) as Partial<ProgressData>).labsCompleted || [],
          questionsViewed: (JSON.parse(raw) as Partial<ProgressData>).questionsViewed || 0,
          earnedBadges: (JSON.parse(raw) as Partial<ProgressData>).earnedBadges || [],
          bookmarks: (JSON.parse(raw) as Partial<ProgressData>).bookmarks || [],
        }
      : EMPTY;
  } catch {
    cached = EMPTY;
  }
  initialized = true;
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: Listener) {
  init();
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function getSnapshot() {
  init();
  return cached;
}

function getServerSnapshot() {
  return EMPTY;
}

function setStore(patch: Partial<ProgressData>) {
  const next = { ...getSnapshot(), ...patch };
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write failures
  }
  emit();
}

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const markAsRead = useCallback((slug: string) => {
    if (data.readSlugs.includes(slug)) return;
    setStore({ readSlugs: [...data.readSlugs, slug] });
  }, [data.readSlugs]);

  const saveQuizScore = useCallback((quizId: string, score: number) => {
    setStore({
      quizScores: { ...data.quizScores, [quizId]: Math.max(data.quizScores[quizId] || 0, score) },
    });
  }, [data.quizScores]);

  const earnBadge = useCallback((badgeId: string) => {
    if (data.earnedBadges.includes(badgeId)) return;
    setStore({ earnedBadges: [...data.earnedBadges, badgeId] });
  }, [data.earnedBadges]);

  const incrementPromptsCopied = useCallback(() => {
    setStore({ promptsCopied: data.promptsCopied + 1 });
  }, [data.promptsCopied]);

  const completeLab = useCallback((labId: string) => {
    if (data.labsCompleted.includes(labId)) return;
    setStore({ labsCompleted: [...data.labsCompleted, labId] });
  }, [data.labsCompleted]);

  const incrementQuestionsViewed = useCallback(() => {
    setStore({ questionsViewed: data.questionsViewed + 1 });
  }, [data.questionsViewed]);

  const toggleBookmark = useCallback((slug: string) => {
    setStore({
      bookmarks: data.bookmarks.includes(slug)
        ? data.bookmarks.filter((b) => b !== slug)
        : [...data.bookmarks, slug],
    });
  }, [data.bookmarks]);

  const isBookmarked = useCallback((slug: string) => data.bookmarks.includes(slug), [data.bookmarks]);

  const totalPoints = data.earnedBadges.reduce((sum, badgeId) => {
    const badge = badges.find((b) => b.id === badgeId);
    return sum + (badge?.points || 0);
  }, 0);

  return (
    <ProgressContext.Provider value={{
      readSlugs: data.readSlugs,
      markAsRead,
      quizScores: data.quizScores,
      saveQuizScore,
      earnedBadges: data.earnedBadges,
      earnBadge,
      totalPoints,
      promptsCopied: data.promptsCopied,
      incrementPromptsCopied,
      labsCompleted: data.labsCompleted,
      completeLab,
      questionsViewed: data.questionsViewed,
      incrementQuestionsViewed,
      bookmarks: data.bookmarks,
      toggleBookmark,
      isBookmarked,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
