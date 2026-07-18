'use client';
import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
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
  const printRef = useRef<HTMLDivElement | null>(null);

  const percentage = Math.round((score / total) * 100);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const verificationUrl = `https://robin-r-g.github.io/AI-For-Electronics-Engineering/learn/introduction`;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>

        {!generated ? (
          <div className={styles.setupView}>
            <h2>Congratulations! 🎉</h2>
            <p>You scored <strong>{percentage}%</strong> ({score}/{total}) and passed the quiz!</p>
            <p>Enter your full name to generate your custom Workshop Certificate.</p>
            
            <input
              type="text"
              placeholder="Your Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={styles.nameInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && studentName.trim()) setGenerated(true);
              }}
            />

            <button
              onClick={() => {
                if (studentName.trim()) setGenerated(true);
              }}
              disabled={!studentName.trim()}
              className={styles.generateBtn}
            >
              Generate Certificate
            </button>
          </div>
        ) : (
          <div className={styles.certificateView}>
            {/* The Certificate Layout */}
            <div ref={printRef} className={styles.certificate} id="certificate-print-area">
              <div className={styles.borderOuter}>
                <div className={styles.borderInner}>
                  {/* Watermark */}
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

                  {/* QR Code + Digital Stamp */}
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

                  {/* Footer */}
                  <div className={styles.certFooter}>
                    <p>Designed and Developed with &#9829; by <strong>Robin R G</strong></p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={handlePrint} className={styles.printBtn}>
                🖨 Print / Save PDF
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
