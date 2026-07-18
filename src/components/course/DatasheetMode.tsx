'use client';

import React, { useState } from 'react';
import styles from './DatasheetMode.module.css';

export interface PinInfo {
  name: string;
  number: number;
  type: 'power' | 'input' | 'output' | 'bidirectional' | 'ground' | 'analog';
  description: string;
}

export interface SpecItem {
  label: string;
  value: string;
  unit?: string;
}

interface DatasheetModeProps {
  componentName: string;
  packageType?: string;
  pins: PinInfo[];
  specifications: SpecItem[];
  electricalRatings?: SpecItem[];
  timingInfo?: string;
  exampleCircuit?: string;
  recommendedDesign?: string[];
  commonMistakes?: string[];
  interviewQuestions?: string[];
}

const pinTypeColors: Record<string, string> = {
  power: '#ef4444',
  ground: '#6b7280',
  input: '#3b82f6',
  output: '#10b981',
  bidirectional: '#f59e0b',
  analog: '#8b5cf6',
};

const DatasheetMode: React.FC<DatasheetModeProps> = ({
  componentName,
  packageType = 'DIP-8',
  pins,
  specifications,
  electricalRatings = [],
  timingInfo,
  exampleCircuit,
  recommendedDesign = [],
  commonMistakes = [],
  interviewQuestions = [],
}) => {
  const [activeTab, setActiveTab] = useState<'pinout' | 'specs' | 'electrical' | 'design' | 'interview'>('pinout');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Datasheet Mode</span>
        <h3 className={styles.title}>{componentName}</h3>
        <span className={styles.package}>Package: {packageType}</span>
      </div>

      <div className={styles.tabs}>
        {(['pinout', 'specs', 'electrical', 'design', 'interview'] as const).map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'pinout' && 'Pinout'}
            {tab === 'specs' && 'Specifications'}
            {tab === 'electrical' && 'Electrical'}
            {tab === 'design' && 'Design Tips'}
            {tab === 'interview' && 'Interview Q&A'}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'pinout' && (
          <div className={styles.pinoutGrid}>
            {pins.map(pin => (
              <div key={pin.number} className={styles.pinRow}>
                <span
                  className={styles.pinDot}
                  style={{ background: pinTypeColors[pin.type] }}
                />
                <span className={styles.pinNumber}>Pin {pin.number}</span>
                <span className={styles.pinName}>{pin.name}</span>
                <span className={styles.pinType} style={{ color: pinTypeColors[pin.type] }}>
                  {pin.type}
                </span>
                <span className={styles.pinDesc}>{pin.description}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className={styles.specsGrid}>
            {specifications.map((spec, i) => (
              <div key={i} className={styles.specRow}>
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specValue}>
                  {spec.value}{spec.unit ? ` ${spec.unit}` : ''}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'electrical' && (
          <div>
            {electricalRatings.length > 0 ? (
              <div className={styles.specsGrid}>
                {electricalRatings.map((rating, i) => (
                  <div key={i} className={styles.specRow}>
                    <span className={styles.specLabel}>{rating.label}</span>
                    <span className={styles.specValue}>
                      {rating.value}{rating.unit ? ` ${rating.unit}` : ''}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.placeholder}>No electrical ratings specified.</p>
            )}
            {timingInfo && (
              <div className={styles.timingBox}>
                <h4>Timing Information</h4>
                <p>{timingInfo}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'design' && (
          <div>
            {exampleCircuit && (
              <div className={styles.circuitBox}>
                <h4>Example Circuit</h4>
                <pre className={styles.code}>{exampleCircuit}</pre>
              </div>
            )}
            {recommendedDesign.length > 0 && (
              <div className={styles.designList}>
                <h4>Recommended Design Practices</h4>
                <ul>
                  {recommendedDesign.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {commonMistakes.length > 0 && (
              <div className={styles.mistakesBox}>
                <h4>Common Mistakes</h4>
                <ul>
                  {commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'interview' && (
          <div className={styles.interviewList}>
            {interviewQuestions.length > 0 ? (
              interviewQuestions.map((q, i) => (
                <div key={i} className={styles.interviewItem}>
                  <span className={styles.questionNumber}>Q{i + 1}</span>
                  <p>{q}</p>
                </div>
              ))
            ) : (
              <p className={styles.placeholder}>No interview questions available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasheetMode;
