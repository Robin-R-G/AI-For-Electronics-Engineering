'use client';
import { useEffect, useRef } from 'react';
import type { LabProject } from '@/lib/labService';
import styles from './QuickPreview.module.css';

interface QuickPreviewProps {
  project: LabProject | null;
  onClose: () => void;
  onOpenProject: (project: LabProject) => void;
}

export const QuickPreview = ({ project, onClose, onOpenProject }: QuickPreviewProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  if (!project) return null;

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div className={styles.body}>
          <span className={styles.category}>{project.category}</span>
          <h2 className={styles.title}>{project.title}</h2>

          <div className={styles.badges}>
            <span className={`${styles.diff} ${styles[project.difficulty.toLowerCase()]}`}>{project.difficulty}</span>
            <span className={styles.time}>{project.estimatedTime}</span>
          </div>

          <p className={styles.desc}>{project.overview}</p>

          <div className={styles.meta}>
            <div>
              <span className={styles.metaLabel}>Components</span>
              <div className={styles.compList}>
                {project.components.slice(0, 6).map(c => (
                  <span key={c.name} className={styles.comp}>{c.name} <em>×{c.quantity}</em></span>
                ))}
              </div>
            </div>
            <div>
              <span className={styles.metaLabel}>Skills</span>
              <div className={styles.skillList}>
                {project.requiredSkills.slice(0, 3).map(s => (
                  <span key={s} className={styles.skill}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.openBtn} onClick={() => { onOpenProject(project); onClose(); }}>
            Open Project
          </button>
          <button className={styles.closeBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickPreview;
