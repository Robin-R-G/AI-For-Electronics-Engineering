'use client';
import React, { useState } from 'react';
import { liveDemosData } from '@/data/liveDemos';
import DemoView from '@/components/demos/DemoView';
import styles from './live-demonstrations.module.css';

const LiveDemonstrationsContent = () => {
  const [selectedDemoId, setSelectedDemoId] = useState<string>(liveDemosData[0].id);

  const selectedDemo = liveDemosData.find(d => d.id === selectedDemoId) || liveDemosData[0];

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Welcome to the Live Demonstrations lab. Select a scenario from the sidebar to load the 
        interactive workshop environment. Follow the Instructor Notes and complete the Student Activities.
      </p>

      <div className={styles.layout}>
        {/* Master Sidebar */}
        <div className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Available Demos</h3>
          <div className={styles.demoList}>
            {liveDemosData.map(demo => (
              <button
                key={demo.id}
                className={`${styles.demoBtn} ${selectedDemoId === demo.id ? styles.activeBtn : ''}`}
                onClick={() => setSelectedDemoId(demo.id)}
              >
                <div className={styles.demoBtnTitle}>{demo.title}</div>
                <div className={styles.demoBtnTime}>⏱ {demo.estimatedTime}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail View */}
        <div className={styles.mainContent}>
          <DemoView demo={selectedDemo} />
        </div>
      </div>
    </div>
  );
};

export default LiveDemonstrationsContent;
