import React from 'react';
import { AITool } from '@/data/aiTools';
import styles from './ToolCard.module.css';

interface ToolCardProps {
  tool: AITool;
  onClick: (tool: AITool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(tool)}>
      <div className={styles.header}>
        <div className={styles.logo}>{tool.logo}</div>
        <h3 className={styles.name}>{tool.name}</h3>
      </div>
      <p className={styles.purpose}>{tool.purpose}</p>
      <div className={styles.footer}>
        <span className={styles.pricing}>{tool.pricing}</span>
        <span className={styles.action}>View Details &rarr;</span>
      </div>
    </div>
  );
};

export default ToolCard;
