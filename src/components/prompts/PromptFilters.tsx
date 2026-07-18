import React from 'react';
import { promptCategories } from '@/data/promptLibrary';
import styles from './PromptFilters.module.css';

interface PromptFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  difficultyFilter: string | null;
  setDifficultyFilter: (d: string | null) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (s: boolean) => void;
}

export const PromptFilters: React.FC<PromptFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  difficultyFilter,
  setDifficultyFilter,
  showFavoritesOnly,
  setShowFavoritesOnly
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search prompts by keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <button 
          className={`${styles.favoriteToggle} ${showFavoritesOnly ? styles.activeFav : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          ★ Favorites
        </button>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.categories}>
          {promptCategories.map(cat => (
            <button
              key={cat}
              className={`${styles.pill} ${selectedCategory === cat ? styles.activePill : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.difficulty}>
          {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
            <button
              key={diff}
              className={`${styles.diffBtn} ${difficultyFilter === diff ? styles.activeDiff : ''}`}
              onClick={() => setDifficultyFilter(difficultyFilter === diff ? null : diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptFilters;
