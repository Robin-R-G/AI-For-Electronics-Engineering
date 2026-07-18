'use client';
import React, { useState } from 'react';
import { RoadmapNodeData } from '@/data/roadmapData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './RoadmapNode.module.css';

interface RoadmapNodeProps {
  node: RoadmapNodeData;
  index: number;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({ node, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver();

  // Determine if it's placed on left or right side of timeline (for desktop)
  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`${styles.nodeWrapper} ${isLeft ? styles.leftNode : styles.rightNode} ${isIntersecting ? styles.visible : ''}`}
    >
      <div className={styles.timelinePoint}></div>
      
      <div className={styles.card} onClick={() => setExpanded(!expanded)}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{node.title}</h3>
            <p className={styles.description}>{node.description}</p>
          </div>
          <div className={styles.meta}>
            <span className={styles.timeBadge}>⏱ {node.estimatedTime}</span>
            <span className={`${styles.chevron} ${expanded ? styles.chevronUp : ''}`}>▼</span>
          </div>
        </div>

        {expanded && (
          <div className={styles.expandedContent}>
            
            <div className={styles.sectionGrid}>
              
              <div className={styles.section}>
                <h4>🚀 Recommended Projects</h4>
                <ul>
                  {node.projects.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div className={styles.section}>
                <h4>📚 Resources & Docs</h4>
                <ul>
                  {node.resources.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div className={styles.section}>
                <h4>🎓 Top Courses</h4>
                <ul>
                  {node.courses.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div className={styles.section}>
                <h4>📺 YouTube Playlists</h4>
                <ul>
                  {node.videos.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

            </div>

            <div className={styles.interviewSection}>
              <h4>💼 Common Interview Questions</h4>
              <ul className={styles.interviewList}>
                {node.interviewQuestions.map((q, i) => (
                  <li key={i}>
                    <span className={styles.qIcon}>Q:</span> {q}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapNode;
