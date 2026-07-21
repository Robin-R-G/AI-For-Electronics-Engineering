'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { renderCertificate, canvasToPdfBlob, downloadBlob } from '@/lib/certificate';
import { getSettings } from '@/lib/settings';
import styles from './CertificateModal.module.css';

interface CertificateModalProps {
  score: number;
  total: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ score, total, onClose }) => {
  const [studentName, setStudentName] = useState('');
  const [generated, setGenerated] = useState(false);
  const [credentialId] = useState(() => `EE-AI-${Math.floor(100000 + Math.random() * 900000)}`);
  const [zoom, setZoom] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastTouchDistance = useRef<number>(0);
  const lastTouchMidpoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const percentage = Math.round((score / total) * 100);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const verificationUrl = (typeof window !== 'undefined' ? window.location.origin : '') + '/AI-For-Electronics-Engineering/learn/quiz';

  // ── Zoom ───────────────────────────────────────────────────────
  const MIN_ZOOM = 0.3;
  const MAX_ZOOM = 3;
  const clamp = (v: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v));

  const handleZoomIn = () => setZoom(z => clamp(z + 0.2));
  const handleZoomOut = () => setZoom(z => clamp(z - 0.2));
  const handleZoomReset = () => setZoom(1);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom(z => clamp(z - e.deltaY * 0.005));
    }
  }, []);

  // ── Touch pinch zoom ──────────────────────────────────────────
  const getDistance = (t1: React.Touch, t2: React.Touch) =>
    Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastTouchDistance.current = getDistance(e.touches[0], e.touches[1]);
      lastTouchMidpoint.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = getDistance(e.touches[0], e.touches[1]);
      const scale = dist / lastTouchDistance.current;
      lastTouchDistance.current = dist;
      setZoom(z => clamp(z * scale));
    }
  }, []);

  // ── Download PNG ──────────────────────────────────────────────
  const handleDownloadPng = async () => {
    if (!certRef.current || !studentName.trim()) return;
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      await renderCertificate(canvas, getSettings(), studentName.trim());
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `certificate-${studentName.trim().replace(/\s+/g, '-')}.png`);
      }, 'image/png');
    } catch { /* silent */ }
    setDownloading(false);
  };

  // ── Download PDF ──────────────────────────────────────────────
  const handleDownloadPdf = async () => {
    if (!certRef.current || !studentName.trim()) return;
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      await renderCertificate(canvas, getSettings(), studentName.trim());
      const blob = await canvasToPdfBlob(canvas);
      downloadBlob(blob, `certificate-${studentName.trim().replace(/\s+/g, '-')}.pdf`);
    } catch { /* silent */ }
    setDownloading(false);
  };

  // ── Print ─────────────────────────────────────────────────────
  const handlePrint = () => window.print();

  // ── Accessibility ─────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div 
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close certificate modal">×</button>

        {!generated ? (
          <div className={styles.setupView}>
            <h2 id="cert-modal-title">Congratulations! 🎉</h2>
            <p>You scored <strong>{percentage}%</strong> ({score}/{total}) and passed the quiz!</p>
            <p>Enter your full name to generate your custom Workshop Certificate.</p>

            <label htmlFor="student-name-input" className="sr-only">Your Full Name</label>
            <input
              id="student-name-input"
              type="text"
              placeholder="Your Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={styles.nameInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && studentName.trim()) setGenerated(true);
              }}
              autoFocus
            />

            <button
              onClick={() => { if (studentName.trim()) setGenerated(true); }}
              disabled={!studentName.trim()}
              className={styles.generateBtn}
            >
              Generate Certificate
            </button>
          </div>
        ) : (
          <div className={styles.certificateView}>
            <h2 id="cert-modal-title" className="sr-only">Your Generated Certificate</h2>
            {/* Zoom Controls */}
            <div className={styles.zoomBar}>
              <button onClick={handleZoomOut} className={styles.zoomBtn} aria-label="Zoom out">−</button>
              <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} className={styles.zoomBtn} aria-label="Zoom in">+</button>
              <button onClick={handleZoomReset} className={styles.zoomBtn} aria-label="Reset zoom">Reset</button>
            </div>

            {/* Certificate Preview */}
            <div
              ref={containerRef}
              className={styles.previewContainer}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div
                ref={certRef}
                className={styles.certificate}
                id="certificate-print-area"
                style={{ zoom: `${zoom * 100}%` }}
              >
                <div className={styles.borderOuter}>
                  <div className={styles.borderInner}>
                    <div className={styles.watermark}>AI EE</div>

                    <div className={styles.certHeader}>
                      <span className={styles.badgeIcon}>🎖️</span>
                      <h3>CERTIFICATE OF COMPLETION</h3>
                      <p className={styles.workshopTitle}>AI for Electronics Engineers Workshop</p>
                    </div>

                    <p className={styles.subText}>This is proudly presented to</p>

                    <h1 className={styles.recipientName}>{studentName}</h1>

                    <div className={styles.dividerLine} />

                    <p className={styles.certBody}>
                      for successfully demonstrating mastery of Artificial Intelligence applications for
                      Electronics Engineering by passing the interactive examination with a score of
                      <strong> {percentage}%</strong>.
                    </p>

                    <div className={styles.detailsRow}>
                      <div className={styles.detailBox}>
                        <span className={styles.detailTitle}>DATE</span>
                        <span className={styles.detailValue}>{today}</span>
                      </div>
                      <div className={styles.detailBox}>
                        <span className={styles.detailTitle}>INSTRUCTOR</span>
                        <span className={styles.detailValue}>Robin R G</span>
                      </div>
                      <div className={styles.detailBox}>
                        <span className={styles.detailTitle}>CREDENTIAL ID</span>
                        <span className={styles.detailValue}>{credentialId}</span>
                      </div>
                    </div>

                    <div className={styles.bottomRow}>
                      <div className={styles.qrBox}>
                        <QRCodeSVG
                          value={verificationUrl}
                          size={70}
                          bgColor="transparent"
                          fgColor="#00e5ff"
                          level="M"
                        />
                        <span className={styles.qrLabel}>Scan to verify</span>
                      </div>

                      <div className={styles.stampBox}>
                        <div className={styles.stamp}>
                          <span>AI FOR EE</span>
                          <span>VERIFIED</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.certFooter}>
                      <p>Designed and Developed with &#9829; by <strong>Robin R G</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button onClick={handleDownloadPng} disabled={downloading} className={styles.downloadBtn}>
                📥 Download PNG
              </button>
              <button onClick={handleDownloadPdf} disabled={downloading} className={styles.downloadBtn}>
                📄 Download PDF
              </button>
              <button onClick={handlePrint} className={styles.printBtn}>
                🖨 Print
              </button>
              <button onClick={() => setGenerated(false)} className={styles.editBtn}>
                ✏️ Edit Name
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateModal;
