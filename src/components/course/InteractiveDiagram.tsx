'use client';
import React, { useState } from 'react';
import styles from './InteractiveDiagram.module.css';

interface DiagramNode {
  id: string;
  label: string;
  description: string;
}

interface InteractiveDiagramProps {
  title: string;
  nodes: DiagramNode[];
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ title, nodes }) => {
  const [activeNode, setActiveNode] = useState<string>(nodes[0]?.id || '');

  const activeContent = nodes.find(n => n.id === activeNode);

  return (
    <div className={styles.diagramBox}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.layout}>
        <div className={styles.visual}>
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <button 
                className={`${styles.nodeBtn} ${activeNode === node.id ? styles.active : ''}`}
                onClick={() => setActiveNode(node.id)}
              >
                {node.label}
              </button>
              {index < nodes.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.arrow}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.infoPanel}>
          {activeContent && (
            <div className={styles.infoContent}>
              <h4>{activeContent.label}</h4>
              <p>{activeContent.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDiagram;
