'use client';
import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'promptFavorites';

type Listener = () => void;
let listeners: Listener[] = [];
let cached: string[] = [];
let initialized = false;

function init() {
  if (initialized || typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cached = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    cached = [];
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
  return [];
}

export const useFavorites = () => {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleFavorite = useCallback((id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fId) => fId !== id)
      : [...favorites, id];
    cached = updated;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore write failures
    }
    emit();
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded: true };
};
