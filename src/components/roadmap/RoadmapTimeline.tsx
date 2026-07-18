'use client';
import React from 'react';
import { roadmapData } from '@/data/roadmapData';
import RoadmapNode from './RoadmapNode';
import styles from './RoadmapTimeline.module.css';

export const RoadmapTimeline = () => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.centralLine}>
        <div className={styles.glowingPulse}></div>
      </div>
      
      {roadmapData.map((node, index) => (
        <RoadmapNode key={node.id} node={node} index={index} />
      ))}
    </div>
  );
};

export default RoadmapTimeline;
