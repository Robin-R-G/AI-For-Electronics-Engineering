'use client';
import { useRef } from 'react';
import styles from './LabToolbar.module.css';

export type SortKey = 'title' | 'difficulty' | 'time';
export type ViewMode = 'grid' | 'list';

interface LabToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (diff: string) => void;
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalResults: number;
}

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const LabToolbar = ({
  searchQuery, onSearchChange,
  categories, selectedCategory, onCategoryChange,
  selectedDifficulty, onDifficultyChange,
  sortKey, onSortChange,
  viewMode, onViewModeChange,
  totalResults,
}: LabToolbarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.toolbar}>
      <div className={styles.topRow}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className={styles.clearBtn} onClick={() => { onSearchChange(''); inputRef.current?.focus(); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        <div className={styles.controls}>
          <select
            className={styles.sortSelect}
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
          >
            <option value="title">Name</option>
            <option value="difficulty">Difficulty</option>
            <option value="time">Time</option>
          </select>

          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewActive : ''}`}
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewActive : ''}`}
              onClick={() => onViewModeChange('list')}
              aria-label="List view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.pill} ${selectedCategory === cat ? styles.pillActive : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.filterGroup}>
          {DIFFICULTIES.map(diff => (
            <button
              key={diff}
              className={`${styles.pill} ${styles.pillSm} ${selectedDifficulty === diff ? styles.pillActive : ''}`}
              onClick={() => onDifficultyChange(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.count}>{totalResults} project{totalResults !== 1 ? 's' : ''}</div>
    </div>
  );
};

export default LabToolbar;
