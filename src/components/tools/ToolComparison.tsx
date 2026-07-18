'use client';
import React, { useState } from 'react';
import { aiToolsData } from '@/data/aiTools';
import styles from './ToolComparison.module.css';

export const ToolComparison: React.FC = () => {
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);

  const toggleTool = (id: string) => {
    if (selectedToolIds.includes(id)) {
      setSelectedToolIds(prev => prev.filter(tId => tId !== id));
    } else {
      if (selectedToolIds.length < 3) {
        setSelectedToolIds(prev => [...prev, id]);
      } else {
        alert("You can only compare up to 3 tools at once.");
      }
    }
  };

  const selectedTools = aiToolsData.filter(t => selectedToolIds.includes(t.id));

  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        <h3>Select tools to compare (Max 3)</h3>
        <div className={styles.badges}>
          {aiToolsData.map(tool => (
            <button
              key={tool.id}
              className={`${styles.badge} ${selectedToolIds.includes(tool.id) ? styles.selected : ''}`}
              onClick={() => toggleTool(tool.id)}
            >
              {tool.logo} {tool.name}
            </button>
          ))}
        </div>
      </div>

      {selectedTools.length > 0 && (
        <div className={styles.comparisonGrid} style={{ gridTemplateColumns: `repeat(${selectedTools.length}, 1fr)` }}>
          {selectedTools.map(tool => (
            <div key={tool.id} className={styles.column}>
              <div className={styles.colHeader}>
                <div className={styles.logo}>{tool.logo}</div>
                <h4>{tool.name}</h4>
                <div className={styles.pricing}>{tool.pricing}</div>
              </div>
              
              <div className={styles.section}>
                <h5>Best For</h5>
                <p>{tool.bestFor}</p>
              </div>

              <div className={styles.section}>
                <h5 className={styles.green}>Strengths</h5>
                <ul>
                  {tool.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className={styles.section}>
                <h5 className={styles.red}>Weaknesses</h5>
                <ul>
                  {tool.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolComparison;
