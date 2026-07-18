import React from 'react';
import { ElectronicsCategory } from '@/data/electronicsExplorer';
import styles from './ExplorerCard.module.css';

interface ExplorerCardProps {
  category: ElectronicsCategory;
  onClick: (category: ElectronicsCategory) => void;
}

export const ExplorerCard: React.FC<ExplorerCardProps> = ({ category, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(category)}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{category.icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{category.name}</h3>
        <p className={styles.description}>{category.shortDesc}</p>
      </div>
      <div className={styles.glow} />
    </div>
  );
};

export default ExplorerCard;
