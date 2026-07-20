'use client';
import React, { useEffect, useState } from 'react';
import { loadAllProjects, getCategoriesList, LabProject } from '@/lib/labService';
import styles from './AdminStyles.module.css';

export default function LabManager() {
  const [projects, setProjects] = useState<LabProject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [projs, cats] = await Promise.all([loadAllProjects(), getCategoriesList()]);
      setProjects(projs);
      setCategories(cats);
      setLoading(false);
    })();
  }, []);

  const filtered = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const countsByCategory = categories.map((c) => ({
    name: c,
    count: projects.filter((p) => p.category === c).length,
  }));

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
        <p>Loading lab projects...</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.statsGrid} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{projects.length}</span>
          <span className={styles.statLabel}>Total Projects</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{categories.length}</span>
          <span className={styles.statLabel}>Categories</span>
        </div>
      </div>

      <div className={styles.filterBar} style={{ marginBottom: '1.5rem' }}>
        <button
          className={styles.filterBtn + ' ' + (selectedCategory === 'all' ? styles.activeFilter : '')}
          onClick={() => setSelectedCategory('all')}
        >
          All ({projects.length})
        </button>
        {countsByCategory.map((c) => (
          <button
            key={c.name}
            className={styles.filterBtn + ' ' + (selectedCategory === c.name ? styles.activeFilter : '')}
            onClick={() => setSelectedCategory(c.name)}
          >
            {c.name} ({c.count})
          </button>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '6%' }}>ID</th>
              <th style={{ width: '28%' }}>Title</th>
              <th style={{ width: '18%' }}>Category</th>
              <th style={{ width: '12%' }}>Difficulty</th>
              <th style={{ width: '12%' }}>Time</th>
              <th style={{ width: '10%' }}>Components</th>
              <th style={{ width: '14%' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <React.Fragment key={p.id}>
                <tr>
                  <td>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-cyan)' }}>{p.id}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{p.title}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem' }}>{p.category}</span>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      background: p.difficulty === 'Beginner' ? 'rgba(52,211,153,0.1)' : p.difficulty === 'Intermediate' ? 'rgba(251,191,36,0.1)' : p.difficulty === 'Advanced' ? 'rgba(248,113,113,0.1)' : 'rgba(167,139,250,0.1)',
                      color: p.difficulty === 'Beginner' ? 'var(--color-success)' : p.difficulty === 'Intermediate' ? 'var(--color-warning)' : p.difficulty === 'Advanced' ? 'var(--color-error)' : '#c084fc',
                      fontWeight: 600
                    }}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{p.estimatedTime}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem' }}>{p.components.length}</span>
                  </td>
                  <td>
                    <button
                      className={styles.delLink}
                      style={{ color: 'var(--color-cyan)' }}
                      onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                    >
                      {expandedId === p.id ? 'Collapse' : 'Details'}
                    </button>
                  </td>
                </tr>
                {expandedId === p.id && (
                  <tr>
                    <td colSpan={7} style={{ padding: '1rem', background: 'rgba(0,0,0,0.15)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        <div>
                          <strong>Overview</strong>
                          <p style={{ marginTop: '0.25rem' }}>{p.overview}</p>
                        </div>
                        <div>
                          <strong>Components ({p.components.length})</strong>
                          <ul style={{ marginTop: '0.25rem', paddingLeft: '1rem' }}>
                            {p.components.slice(0, 8).map((c, i) => (
                              <li key={i}>{c.name} x {c.quantity}</li>
                            ))}
                            {p.components.length > 8 && <li>...and {p.components.length - 8} more</li>}
                          </ul>
                        </div>
                        <div>
                          <strong>Skills Required</strong>
                          <ul style={{ marginTop: '0.25rem', paddingLeft: '1rem' }}>
                            {p.requiredSkills.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong>Career Roles</strong>
                          <ul style={{ marginTop: '0.25rem', paddingLeft: '1rem' }}>
                            {p.careerRoles.map((r, i) => <li key={i}>{r}</li>)}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>No lab projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}