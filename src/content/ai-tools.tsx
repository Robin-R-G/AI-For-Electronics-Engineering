'use client';
import React, { useState } from 'react';
import { aiToolsData, AITool } from '@/data/aiTools';
import ToolCard from '@/components/tools/ToolCard';
import ToolDetailView from '@/components/tools/ToolDetailView';
import ToolComparison from '@/components/tools/ToolComparison';
import styles from './ai-tools.module.css';

const AIToolsContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'compare'>('grid');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        The landscape of AI tools is vast and constantly evolving. As an electronics engineer, 
        selecting the right tool for the job—whether it&apos;s debugging C++ firmware, designing a PCB, 
        or analyzing a datasheet—can save you hundreds of hours.
      </p>

      <div className={styles.controls}>
        <div className={styles.toggleGroup}>
          <button 
            className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            All Tools
          </button>
          <button 
            className={`${styles.toggleBtn} ${viewMode === 'compare' ? styles.active : ''}`}
            onClick={() => setViewMode('compare')}
          >
            Compare Mode
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className={styles.grid}>
          {aiToolsData.map(tool => (
            <ToolCard key={tool.id} tool={tool} onClick={setSelectedTool} />
          ))}
        </div>
      ) : (
        <ToolComparison />
      )}

      {selectedTool && (
        <ToolDetailView tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
};

export default AIToolsContent;
