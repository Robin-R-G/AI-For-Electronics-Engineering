'use client';
import React, { useState } from 'react';
import { AITool } from '@/data/aiTools';
import styles from './ToolDetailView.module.css';

interface ToolDetailViewProps {
  tool: AITool;
  onClose: () => void;
}

export const ToolDetailView: React.FC<ToolDetailViewProps> = ({ tool, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prompts' | 'resources'>('overview');

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        
        <header className={styles.header}>
          <div className={styles.logo}>{tool.logo}</div>
          <div>
            <h2 className={styles.name}>{tool.name}</h2>
            <div className={styles.pricing}>{tool.pricing}</div>
          </div>
        </header>

        <nav className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'prompts' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('prompts')}
          >
            Example Prompts
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'resources' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </nav>

        <div className={styles.content}>
          {activeTab === 'overview' && (
            <div className={styles.overviewSection}>
              <p className={styles.purpose}>{tool.purpose}</p>
              
              <div className={styles.grid}>
                <div className={styles.box}>
                  <h3>Strengths</h3>
                  <ul>
                    {tool.strengths.map((s, i) => <li key={i}>✓ {s}</li>)}
                  </ul>
                </div>
                <div className={`${styles.box} ${styles.weaknesses}`}>
                  <h3>Weaknesses</h3>
                  <ul>
                    {tool.weaknesses.map((w, i) => <li key={i}>× {w}</li>)}
                  </ul>
                </div>
              </div>

              <div className={styles.bestFor}>
                <h3>Best For</h3>
                <p>{tool.bestFor}</p>
              </div>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div className={styles.promptsSection}>
              <h3>Example Prompts for Engineers</h3>
              <div className={styles.promptList}>
                {tool.examplePrompts.map((prompt, i) => (
                  <div key={i} className={styles.promptBox}>
                    <code>{prompt}</code>
                  </div>
                ))}
              </div>

              <h3 className={styles.mistakesHeader}>Common Mistakes</h3>
              <ul className={styles.mistakesList}>
                {tool.commonMistakes.map((mistake, i) => (
                  <li key={i}>{mistake}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className={styles.resourcesSection}>
              {tool.videoUrl && !tool.videoUrl.includes('placeholder') ? (
                <div className={styles.videoWrap}>
                  <iframe
                    src={tool.videoUrl}
                    title={`${tool.name} tutorial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoFrame}
                  />
                </div>
              ) : (
                <p className={styles.videoNote}>
                  Curated walkthroughs and official documentation are linked below.
                </p>
              )}

              <h3>Useful Links</h3>
              <ul className={styles.linksList}>
                {tool.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label} &rarr;
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolDetailView;
