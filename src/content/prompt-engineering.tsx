'use client';
import React, { useState, useMemo } from 'react';
import { promptLibraryData } from '@/data/promptLibrary';
import PromptFilters from '@/components/prompts/PromptFilters';
import PromptCard from '@/components/prompts/PromptCard';
import { useFavorites } from '@/hooks/useFavorites';
import styles from './prompt-engineering.module.css';

const PromptEngineeringContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return promptLibraryData.filter(prompt => {
      const searchable = [prompt.title, prompt.objective, prompt.role, prompt.category, ...prompt.requirements].join(' ').toLowerCase();
      const matchesSearch = !q || searchable.includes(q);
      const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
      const matchesDifficulty = difficultyFilter === null || prompt.difficulty === difficultyFilter;
      const matchesFav = !showFavoritesOnly || isFavorite(prompt.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFav;
    });
  }, [searchQuery, selectedCategory, difficultyFilter, showFavoritesOnly, isFavorite]);

  if (!isLoaded) return null; // Prevent hydration mismatch with localStorage

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Welcome to the Prompt Library. As an electronics engineer, communicating effectively with AI 
        can drastically speed up your workflow. Browse, filter, and save these tested prompts to your favorites.
      </p>

      <PromptFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <div className={styles.resultsHeader}>
        Showing {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
      </div>

      <div className={styles.list}>
        {filteredPrompts.map(prompt => (
          <PromptCard 
            key={prompt.id} 
            prompt={prompt} 
            isFavorite={isFavorite(prompt.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
        {filteredPrompts.length === 0 && (
          <div className={styles.noResults}>
            No prompts found matching your criteria. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptEngineeringContent;
