'use client';
import React, { useState } from 'react';
import { ElectronicsCategory } from '@/data/electronicsExplorer';
import styles from './ExplorerDetailView.module.css';

interface ExplorerDetailViewProps {
  category: ElectronicsCategory;
  onClose: () => void;
}

type TabType = 'theory' | 'applications' | 'ai' | 'prompts' | 'projects' | 'resources' | 'roadmap';

export const ExplorerDetailView: React.FC<ExplorerDetailViewProps> = ({ category, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('theory');

  const tabs: { id: TabType, label: string }[] = [
    { id: 'theory', label: 'Theory & Architecture' },
    { id: 'applications', label: 'Applications' },
    { id: 'ai', label: 'AI Integration' },
    { id: 'prompts', label: 'Prompt Examples' },
    { id: 'projects', label: 'Real Projects' },
    { id: 'resources', label: 'Resources & Datasheets' },
    { id: 'roadmap', label: 'Learning Roadmap' }
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        
        <div className={styles.layout}>
          {/* Sidebar Nav */}
          <nav className={styles.sidebar}>
            <div className={styles.header}>
              <span className={styles.icon}>{category.icon}</span>
              <h2>{category.name}</h2>
            </div>
            
            <ul className={styles.navMenu}>
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`${styles.navBtn} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Area */}
          <main className={styles.contentArea}>
            <div className={styles.scrollContainer}>
              
              {activeTab === 'theory' && (
                <div className={styles.panel}>
                  <h3>Theory & Architecture</h3>
                  <p className={styles.prose}>{category.theory}</p>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className={styles.panel}>
                  <h3>Core Applications</h3>
                  <ul className={styles.appList}>
                    {category.applications.map((app, i) => (
                      <li key={i}><span className={styles.bullet}>⚡</span> {app}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className={styles.panel}>
                  <h3>AI Integration</h3>
                  <p className={styles.prose}>{category.aiUsage}</p>
                </div>
              )}

              {activeTab === 'prompts' && (
                <div className={styles.panel}>
                  <h3>Example Prompts</h3>
                  <div className={styles.promptsGrid}>
                    {category.promptExamples.map((prompt, i) => (
                      <div key={i} className={styles.promptBox}>
                        <code>{prompt}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className={styles.panel}>
                  <h3>Real-World Projects</h3>
                  <div className={styles.projectsGrid}>
                    {category.realProjects.map((project, i) => (
                      <div key={i} className={styles.projectCard}>
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className={styles.panel}>
                  <h3>Datasheets & Repositories</h3>
                  
                  {category.datasheets.length > 0 && (
                    <>
                      <h4 className={styles.subHeading}>Datasheets</h4>
                      <ul className={styles.resourceList}>
                        {category.datasheets.map((ds, i) => (
                          <li key={i}><a href={ds.url} target="_blank" rel="noreferrer">📄 {ds.name}</a></li>
                        ))}
                      </ul>
                    </>
                  )}

                  {category.githubRepos.length > 0 && (
                    <>
                      <h4 className={styles.subHeading}>GitHub Repositories</h4>
                      <ul className={styles.resourceList}>
                        {category.githubRepos.map((repo, i) => (
                          <li key={i}><a href={repo.url} target="_blank" rel="noreferrer">🐙 {repo.name}</a></li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'roadmap' && (
                <div className={styles.panel}>
                  <h3>Learning Roadmap</h3>
                  <div className={styles.roadmapSteps}>
                    {category.roadmap.map((step, i) => (
                      <div key={i} className={styles.step}>
                        <div className={styles.stepNum}>{i + 1}</div>
                        <div className={styles.stepText}>{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExplorerDetailView;
