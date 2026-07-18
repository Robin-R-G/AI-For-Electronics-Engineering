'use client';

import React, { useState } from 'react';
import styles from './FlashCard.module.css';

export interface FlashCardData {
  front: string;
  back: string;
  hint?: string;
}

interface FlashCardProps {
  cards: FlashCardData[];
  title?: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ cards, title = 'Flash Cards' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  const card = cards[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleKnown = () => {
    setKnownCount(prev => prev + 1);
    goNext();
  };

  const handleUnknown = () => {
    setUnknownCount(prev => prev + 1);
    goNext();
  };

  const goNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, 150);
  };

  const reset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setUnknownCount(0);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.stats}>
        <span className={styles.stat}>
          <span className={styles.knownDot}></span> Known: {knownCount}
        </span>
        <span className={styles.stat}>
          <span className={styles.unknownDot}></span> Review: {unknownCount}
        </span>
        <span className={styles.stat}>
          Card {currentIndex + 1} / {cards.length}
        </span>
      </div>

      <div className={styles.cardWrapper} onClick={handleFlip}>
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
          <div className={styles.cardFront}>
            <span className={styles.cardLabel}>QUESTION</span>
            <p className={styles.cardText}>{card.front}</p>
            {card.hint && <p className={styles.hint}>Hint: {card.hint}</p>}
            <span className={styles.flipHint}>Click to reveal answer</span>
          </div>
          <div className={styles.cardBack}>
            <span className={styles.cardLabel}>ANSWER</span>
            <p className={styles.cardText}>{card.back}</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.unknownBtn} onClick={handleUnknown}>
          Need Review
        </button>
        <button className={styles.knownBtn} onClick={handleKnown}>
          Got It
        </button>
      </div>

      {currentIndex === 0 && knownCount + unknownCount > 0 && (
        <button className={styles.resetBtn} onClick={reset}>
          Restart Deck
        </button>
      )}
    </div>
  );
};

export default FlashCard;
