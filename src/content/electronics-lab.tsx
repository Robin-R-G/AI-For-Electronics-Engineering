'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { loadAllProjects, getCategoriesList, type LabProject } from '@/lib/labService';
import { ProjectCard } from '@/components/lab/ProjectCard';
import { LabToolbar, type SortKey, type ViewMode } from '@/components/lab/LabToolbar';
import { LabDetailPanel } from '@/components/lab/LabDetailPanel';
import { QuickPreview } from '@/components/lab/QuickPreview';
import styles from './electronics-lab.module.css';

const PROGRESS_KEY = 'labProgress';
const BOOKMARK_KEY = 'labBookmarks';

const getStorage = (key: string): Record<string, number | boolean> => {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(key) ?? '{}'); } catch { return {}; }
};

const ElectronicsLabContent = () => {
  const [allProjects, setAllProjects] = useState<LabProject[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    Promise.all([loadAllProjects(), getCategoriesList()]).then(([projects, cats]) => {
      setAllProjects(projects);
      setCategories(['All', ...cats]);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProject, setSelectedProject] = useState<LabProject | null>(null);
  const [previewProject, setPreviewProject] = useState<LabProject | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getStorage(PROGRESS_KEY) as Record<string, number>);
    setBookmarks(getStorage(BOOKMARK_KEY) as Record<string, boolean>);
    if (allProjects.length > 0 && !selectedProject) {
      setSelectedProject(allProjects[0]);
    }
  }, []);

  const filtered = useMemo(() => {
    const result = allProjects.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.components.some(c => c.name.toLowerCase().includes(q)) ||
        p.workingPrinciple.toLowerCase().includes(q) ||
        p.requiredSkills.some(s => s.toLowerCase().includes(q));
    });

    result.sort((a, b) => {
      if (sortKey === 'title') return a.title.localeCompare(b.title);
      const order = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
      if (sortKey === 'difficulty') return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
      return a.estimatedTime.localeCompare(b.estimatedTime);
    });

    return result;
  }, [allProjects, selectedCategory, selectedDifficulty, searchQuery, sortKey]);

  const handleToggleBookmark = useCallback((id: string) => {
    setBookmarks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleOpenProject = useCallback((project: LabProject) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getProgress = (id: string) => Math.round((progress[id] ?? 0) * 100);

  return (
    <div className={styles.wrapper}>
      <p className={styles.intro}>
        Welcome to the <strong>Engineering Project Studio</strong> &mdash; {allProjects.length} fully documented hardware
        and firmware projects with schematics, debugging guides, quizzes, and AI prompt packs.
      </p>

      <LabToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        sortKey={sortKey}
        onSortChange={setSortKey}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filtered.length}
      />

      <div className={styles.layout}>
        <div className={`${styles.grid} ${viewMode === 'list' ? styles.list : ''}`}>
          {filtered.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              bookmarked={!!bookmarks[p.id]}
              onToggleBookmark={handleToggleBookmark}
              onOpenProject={handleOpenProject}
              onQuickPreview={setPreviewProject}
              progress={getProgress(p.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className={styles.empty}>No projects match your filters.</div>
          )}
        </div>

        {selectedProject && (
          <LabDetailPanel
            project={selectedProject}
            allProjects={allProjects}
            onSelectProject={(id) => {
              const p = allProjects.find(pr => pr.id === id);
              if (p) setSelectedProject(p);
            }}
          />
        )}
      </div>

      <QuickPreview
        project={previewProject}
        onClose={() => setPreviewProject(null)}
        onOpenProject={handleOpenProject}
      />
    </div>
  );
};

export default ElectronicsLabContent;
