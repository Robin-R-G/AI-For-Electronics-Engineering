'use client';
import React, { useState, useRef, useCallback } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import styles from './FloatingQR.module.css';

export const FloatingQR = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  const workshopUrl = window.location.origin + '/AI-For-Electronics-Engineering/';

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(workshopUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [workshopUrl]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI for Electronics Engineers — Workshop',
          text: 'Join the AI for Electronics Engineers live workshop!',
          url: workshopUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // User cancelled share or not supported
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  }, [workshopUrl, handleCopyLink]);

  const handleDownloadQR = useCallback(() => {
    // Find the canvas rendered by qrcode.react
    const canvas = qrContainerRef.current?.querySelector('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'ai-workshop-qr.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className={`${styles.floatingBtn} ${isOpen ? styles.floatingBtnActive : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open QR Code"
        title="Share Workshop"
      >
        <span className={styles.qrIcon}>
          {isOpen ? '✕' : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="3" height="3" />
              <rect x="19" y="14" width="2" height="2" />
              <rect x="14" y="19" width="2" height="2" />
              <rect x="18" y="18" width="3" height="3" />
            </svg>
          )}
        </span>
        <span className={styles.btnPulse}></span>
      </button>

      {/* QR Modal Panel */}
      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3>Share Workshop</h3>
              <p>Scan to access instantly on any device</p>
            </div>

            {/* QR Code */}
            <div ref={qrContainerRef} className={styles.qrWrapper}>
              <div className={styles.qrGlow}></div>
              {/* SVG for display */}
              <QRCodeSVG
                value={workshopUrl}
                size={200}
                bgColor="transparent"
                fgColor="#00e5ff"
                level="H"
                includeMargin={false}
              />
              {/* Hidden canvas for download */}
              <div style={{ display: 'none' }}>
                <QRCodeCanvas
                  value={workshopUrl}
                  size={400}
                  bgColor="#0b0f19"
                  fgColor="#00e5ff"
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            <div className={styles.urlChip}>
              <span>🌐</span>
              <span className={styles.urlText}>{workshopUrl}</span>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button
                className={`${styles.actionBtn} ${copied ? styles.actionDone : ''}`}
                onClick={handleCopyLink}
              >
                <span>{copied ? '✓' : '📋'}</span>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>

              <button
                className={`${styles.actionBtn} ${shared ? styles.actionDone : ''}`}
                onClick={handleShare}
              >
                <span>{shared ? '✓' : '↗'}</span>
                {shared ? 'Shared!' : 'Share'}
              </button>

              <button
                className={styles.actionBtn}
                onClick={handleDownloadQR}
              >
                <span>⬇</span>
                Download QR
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingQR;
