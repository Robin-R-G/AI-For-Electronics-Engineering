'use client';
import { useMemo } from 'react';
import type { LabProject } from '@/lib/labService';
import styles from './ProjectCard.module.css';

const DIFF_COLORS: Record<string, { bg: string; fg: string; label: string }> = {
  Beginner: { bg: 'rgba(52,211,153,0.12)', fg: 'var(--color-success)', label: 'BEGINNER' },
  Intermediate: { bg: 'rgba(251,191,36,0.12)', fg: 'var(--color-warning)', label: 'INTERMEDIATE' },
  Advanced: { bg: 'rgba(248,113,113,0.12)', fg: 'var(--color-error)', label: 'ADVANCED' },
  Expert: { bg: 'rgba(192,132,252,0.12)', fg: '#c084fc', label: 'EXPERT' },
};

interface ProjectCardProps {
  project: LabProject;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenProject: (project: LabProject) => void;
  onQuickPreview: (project: LabProject) => void;
  progress: number;
}

export const ProjectCard = ({
  project,
  bookmarked,
  onToggleBookmark,
  onOpenProject,
  onQuickPreview,
  progress,
}: ProjectCardProps) => {
  const diff = DIFF_COLORS[project.difficulty] ?? DIFF_COLORS.Intermediate;
  const techs = useMemo(() => project.requiredSkills.slice(0, 3), [project.requiredSkills]);
  const comps = useMemo(() => project.components.slice(0, 4), [project.components]);

  return (
    <article className={styles.card}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.category}>{project.category}</span>
          <button
            className={`${styles.bookmark} ${bookmarked ? styles.bookmarked : ''}`}
            onClick={() => onToggleBookmark(project.id)}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark project'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </button>
        </div>

        <h3 className={styles.title}>{project.title}</h3>

        <div className={styles.badges}>
          <span className={styles.badge} style={{ background: diff.bg, color: diff.fg }}>
            {diff.label}
          </span>
          <span className={styles.badgeTime}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {project.estimatedTime}
          </span>
        </div>

        <div className={styles.components}>
          {comps.map(c => (
            <span key={c.name} className={styles.comp}>{c.name}</span>
          ))}
          {project.components.length > 4 && (
            <span className={styles.compMore}>+{project.components.length - 4}</span>
          )}
        </div>

        <div className={styles.techs}>
          {techs.map(t => (
            <span key={t} className={styles.tech}>{t}</span>
          ))}
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>{progress}%</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.openBtn} onClick={() => onOpenProject(project)}>
            Open Project
          </button>
          <button className={styles.previewBtn} onClick={() => onQuickPreview(project)}>
            Quick Preview
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
