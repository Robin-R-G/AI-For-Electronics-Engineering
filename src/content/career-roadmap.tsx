'use client';
import React from 'react';
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';
import styles from './career-roadmap.module.css';

const CareerRoadmapContent = () => {
  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        The journey from a beginner to a highly sought-after AI/Electronics Engineer is long but rewarding. 
        Follow this roadmap to build your foundational skills, master modern toolchains, and land your dream job.
        Click on any node to reveal the recommended projects and resources.
      </p>

      <RoadmapTimeline />
    </div>
  );
};

export default CareerRoadmapContent;
