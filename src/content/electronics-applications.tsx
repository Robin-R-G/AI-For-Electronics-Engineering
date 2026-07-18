'use client';
import React, { useState } from 'react';
import { explorerData, ElectronicsCategory } from '@/data/electronicsExplorer';
import ExplorerCard from '@/components/explorer/ExplorerCard';
import ExplorerDetailView from '@/components/explorer/ExplorerDetailView';
import styles from './electronics-applications.module.css';

const ElectronicsApplicationsContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<ElectronicsCategory | null>(null);

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Welcome to the Electronics Explorer. Click on any category below to dive deep into its 
        architecture, real-world applications, AI integration strategies, and comprehensive learning roadmaps.
      </p>

      <div className={styles.grid}>
        {explorerData.map(category => (
          <ExplorerCard 
            key={category.id} 
            category={category} 
            onClick={setSelectedCategory} 
          />
        ))}
      </div>

      {selectedCategory && (
        <ExplorerDetailView 
          category={selectedCategory} 
          onClose={() => setSelectedCategory(null)} 
        />
      )}
    </div>
  );
};

export default ElectronicsApplicationsContent;
