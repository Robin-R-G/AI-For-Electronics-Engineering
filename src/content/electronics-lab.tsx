'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { loadAllProjects, getCategoriesList, LabProject } from '@/lib/labService';

const ElectronicsLabContent = () => {
  const allProjects = useMemo(() => loadAllProjects(), []);
  const categories = useMemo(() => getCategoriesList(), []);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected project state
  const [selectedProject, setSelectedProject] = useState<LabProject>(allProjects[0]);
  const [activeTab, setActiveTab] = useState<'planning' | 'circuit' | 'code' | 'debug' | 'career'>('planning');

  // Copy indicator states (keyed by role name)
  const [copiedRole, setCopiedRole] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Mini quiz states for the active project
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Download feedback indicator
  const [downloadingName, setDownloadingName] = useState<string | null>(null);

  // Reset quiz state when selected project changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [selectedProject]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = query === '' || 
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.components.some(c => c.name.toLowerCase().includes(query)) ||
        p.workingPrinciple.toLowerCase().includes(query);
        
      return matchCategory && matchDifficulty && matchSearch;
    });
  }, [allProjects, selectedCategory, selectedDifficulty, searchQuery]);

  // Handle active selection fallback
  const activeProject = useMemo(() => {
    if (filteredProjects.some(p => p.id === selectedProject?.id)) {
      return selectedProject;
    }
    return filteredProjects[0] || null;
  }, [filteredProjects, selectedProject]);

  const handleCopyPrompt = (role: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRole(role);
    setTimeout(() => setCopiedRole(null), 2000);
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = (name: string) => {
    setDownloadingName(name);
    setTimeout(() => {
      setDownloadingName(null);
      alert(`Asset download started: ${name}`);
    }, 1500);
  };

  const handleSelectProjectById = (id: string) => {
    const proj = allProjects.find(p => p.id === id);
    if (proj) {
      setSelectedProject(proj);
      setActiveTab('planning');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        Welcome to the <strong>Engineering Project Studio</strong>. This studio hosts 78 fully documented hardware, 
        firmware, and power projects. Every curriculum contains schematics, step-by-step checklists, 
        troubleshooting routines, interactive mini-quizzes, and custom GPT AI engineering prompt packs.
      </p>

      {/* Category Horizontal Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>SELECT ENGINEERING DOMAIN</span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: '1px solid ' + (selectedCategory === 'All' ? 'var(--color-cyan)' : 'rgba(255,255,255,0.06)'),
              background: selectedCategory === 'All' ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255,255,255,0.02)',
              color: selectedCategory === 'All' ? 'var(--color-cyan)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              transition: 'all 0.15s'
            }}
          >
            All
          </button>
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: '9999px',
                  border: '1px solid ' + (isActive ? 'var(--color-cyan)' : 'rgba(255,255,255,0.06)'),
                  background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255,255,255,0.02)',
                  color: isActive ? 'var(--color-cyan)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  transition: 'all 0.15s'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        flexWrap: 'wrap', 
        alignItems: 'stretch',
        marginTop: '1.5rem'
      }}>
        {/* Left Drawer (Search & Filters) */}
        <div style={{ 
          flex: '1 1 300px', 
          maxWidth: '360px',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxHeight: '750px',
          overflowY: 'hidden'
        }}>
          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search 78+ studio projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(0,0,0,0.3)',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
            />
          </div>

          {/* Difficulty filter buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>DIFFICULTY</span>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(diff => {
                const isActive = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      border: '1px solid ' + (isActive ? 'var(--color-cyan)' : 'rgba(255,255,255,0.05)'),
                      background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255,255,255,0.02)',
                      color: isActive ? 'var(--color-cyan)' : 'var(--color-text-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Project Cards List - Clean Compact Form */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.45rem',
            paddingRight: '0.25rem',
            maxHeight: '520px'
          }}>
            {filteredProjects.map(p => {
              const isSelected = activeProject?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => { setSelectedProject(p); setActiveTab('planning'); }}
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: isSelected ? 'rgba(0, 229, 255, 0.04)' : 'rgba(255,255,255,0.01)',
                    border: '1px solid ' + (isSelected ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255,255,255,0.03)'),
                    borderLeft: '4px solid ' + (isSelected ? 'var(--color-cyan)' : 'rgba(255,255,255,0.1)'),
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: isSelected ? 'white' : 'var(--color-text-secondary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1
                    }}>
                      {p.title}
                    </div>
                    <span style={{ 
                      padding: '1px 5px', 
                      borderRadius: '3px',
                      background: p.difficulty === 'Beginner' ? 'rgba(52,211,153,0.08)' : p.difficulty === 'Intermediate' ? 'rgba(251,191,36,0.08)' : p.difficulty === 'Advanced' ? 'rgba(248,113,113,0.08)' : 'rgba(167,139,250,0.08)',
                      color: p.difficulty === 'Beginner' ? '#34d399' : p.difficulty === 'Intermediate' ? '#fbbf24' : p.difficulty === 'Advanced' ? '#f87171' : '#c084fc',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      flexShrink: 0
                    }}>{p.difficulty}</span>
                  </div>
                </div>
              );
            })}
            {filteredProjects.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                color: 'var(--color-text-muted)', 
                fontSize: '0.85rem', 
                padding: '2rem 1rem',
                fontStyle: 'italic'
              }}>
                No engineering projects match filters.
              </div>
            )}
          </div>
        </div>

        {/* Right Details Viewer Panel */}
        <div style={{ 
          flex: '2 1 450px',
          background: 'var(--glass-bg)', 
          border: '1px solid var(--color-border)', 
          borderRadius: '16px', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          minHeight: '700px',
          maxHeight: '900px',
          overflowY: 'auto'
        }}>
          {activeProject ? (
            <>
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                paddingBottom: '1.25rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--color-cyan)', 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {activeProject.category}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'white' }}>
                    {activeProject.title}
                  </h3>
                </div>
                <span style={{
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: activeProject.difficulty === 'Beginner' ? 'rgba(52,211,153,0.1)' :
                    activeProject.difficulty === 'Intermediate' ? 'rgba(251,191,36,0.1)' :
                    activeProject.difficulty === 'Advanced' ? 'rgba(248,113,113,0.1)' : 'rgba(167,139,250,0.1)',
                  color: activeProject.difficulty === 'Beginner' ? '#34d399' :
                    activeProject.difficulty === 'Intermediate' ? '#fbbf24' :
                    activeProject.difficulty === 'Advanced' ? '#f87171' : '#c084fc',
                }}>
                  {activeProject.difficulty}
                </span>
              </div>

              {/* Navigation Tabs */}
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                borderBottom: '1px solid var(--color-border)', 
                paddingBottom: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { id: 'planning', label: '📋 Setup & Planning' },
                  { id: 'circuit', label: '⚡ Wiring & Design' },
                  { id: 'code', label: '💻 Code & Firmware' },
                  { id: 'debug', label: '🛠 Troubleshooting' },
                  { id: 'career', label: '🎓 Career & AI Pack' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `3px solid ${activeTab === t.id ? 'var(--color-cyan)' : 'transparent'}`,
                      color: activeTab === t.id ? 'var(--color-cyan)' : 'rgba(160,175,210,0.5)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      transition: 'all 0.2s'
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div style={{ flex: 1, textAlign: 'left', marginTop: '0.5rem' }}>
                
                {/* 1. SETUP & PLANNING TAB */}
                {activeTab === 'planning' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Overview</h4>
                      <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5', margin: 0 }}>{activeProject.overview}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(255,255,255,0.01)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ESTIMATED TIME</strong>
                        <span style={{ fontSize: '1rem', color: 'white', fontWeight: 600 }}>⏳ {activeProject.estimatedTime}</span>
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>INDUSTRY RELEVANCE</strong>
                        <span style={{ fontSize: '1rem', color: '#fbbf24', fontWeight: 600 }}>🔥 {activeProject.industryRelevance}</span>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Problem Statement</h4>
                      <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5', margin: 0 }}>{activeProject.problemStatement}</p>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Learning Objectives</h4>
                      <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {activeProject.learningObjectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Required Skills</h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {activeProject.requiredSkills.map(skill => (
                          <span key={skill} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.04)', color: 'var(--color-text-secondary)', padding: '0.25rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Component Viewer */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Required Components & Authentic Photos</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                        {activeProject.components.map(comp => (
                          <div key={comp.name} style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                              <span style={{ fontSize: '0.85rem', color: 'white' }}>{comp.name}</span>
                              <span style={{ fontSize: '0.85rem', color: 'var(--color-cyan)' }}>Qty: {comp.quantity}</span>
                            </div>
                            {/* Realistic Component Mock Photo Block */}
                            <div style={{ background: 'rgba(255,255,255,0.02)', height: '60px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--color-text-muted)', border: '1px dashed rgba(255,255,255,0.05)' }}>
                              📷 Manufacturer Photo: {comp.name.replace(/[×\d\s]+/g, '')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. WIRING & CIRCUIT TAB */}
                {activeTab === 'circuit' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Working Principle</h4>
                      <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5', margin: 0 }}>{activeProject.workingPrinciple}</p>
                    </div>

                    {/* Circuit Diagram SVG */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.25rem' }}>Circuit Schematic Diagram</h4>
                      <div dangerouslySetInnerHTML={{ __html: activeProject.circuitDiagramUrl }} />
                    </div>

                    {/* Architecture Diagram SVG */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.25rem' }}>Functional Block Architecture</h4>
                      <div dangerouslySetInnerHTML={{ __html: activeProject.architectureDiagramUrl }} />
                    </div>

                    {/* Pin connections list */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Pinout Connections Explorer</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {activeProject.pinConnections.map((conn, i) => (
                          <div key={i} style={{ padding: '0.75rem 1rem', background: 'rgba(0, 229, 255, 0.02)', borderRadius: '6px', borderLeft: '3px solid var(--color-cyan)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                            {conn}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Hardware Design Explanation</h4>
                      <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5', margin: 0 }}>{activeProject.hardwareExplanation}</p>
                    </div>
                  </div>
                )}

                {/* 3. FIRMWARE & CODE TAB */}
                {activeTab === 'code' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Step-by-Step Assembly Procedure</h4>
                      <ol style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {activeProject.procedure.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Code block with copy button */}
                    <div style={{ position: 'relative' }}>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Source Implementation</h4>
                      <button
                        onClick={() => handleCopyCode(activeProject.code)}
                        style={{
                          position: 'absolute',
                          top: '2rem',
                          right: '0.75rem',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'white',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                          zIndex: 5
                        }}
                      >
                        {copiedCode ? '✓ Copied' : '📋 Copy Code'}
                      </button>
                      <pre style={{
                        background: 'rgba(0,0,0,0.4)',
                        padding: '1.25rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.03)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--color-text-secondary)',
                        overflowX: 'auto',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        maxHeight: '400px',
                        overflowY: 'auto'
                      }}>{activeProject.code}</pre>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Logic Flow Analysis</h4>
                      <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {activeProject.codeExplanation.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                      <p style={{ marginTop: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {activeProject.softwareExplanation}
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. TROUBLESHOOTING TAB */}
                {activeTab === 'debug' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Common Beginner Mistakes</h4>
                      <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {activeProject.commonErrors.map((err, i) => (
                          <li key={i} style={{ color: '#f87171' }}>⚠️ {err}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Troubleshooting symptom table */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Interactive Troubleshooting Guide</h4>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.08)', color: 'white', textAlign: 'left' }}>
                              <th style={{ padding: '0.5rem', width: '30%' }}>SYMPTOM</th>
                              <th style={{ padding: '0.5rem', width: '35%' }}>PROBABLE CAUSE</th>
                              <th style={{ padding: '0.5rem', width: '35%' }}>CORRECTIVE ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProject.debuggingGuide.map((entry, idx) => (
                              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }}>
                                <td style={{ padding: '0.5rem', color: '#f87171', fontWeight: 600 }}>{entry.symptom}</td>
                                <td style={{ padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{entry.cause}</td>
                                <td style={{ padding: '0.5rem', color: '#34d399' }}>{entry.fix}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Hardware Verification Procedure</h4>
                      <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {activeProject.testingProcedure.map((test, i) => (
                          <li key={i}>{test}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>Industrial Safety Precautions</h4>
                      <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {activeProject.safetyPrecautions.map((safe, i) => (
                          <li key={i} style={{ color: '#fbbf24' }}>🛡️ {safe}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 5. CAREER & AI PACK TAB */}
                {activeTab === 'career' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    {/* Downloads Box */}
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '1.25rem' }}>
                      <h4 style={{ color: 'white', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>📂 Download Engineering Resources</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>Get local circuit schematics, source libraries, and PDFs for off-line development.</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
                        {activeProject.downloads.map(dl => (
                          <button
                            key={dl.name}
                            onClick={() => handleDownload(dl.name)}
                            disabled={downloadingName === dl.name}
                            style={{
                              padding: '0.5rem 0.75rem',
                              background: 'rgba(0, 229, 255, 0.05)',
                              border: '1px solid rgba(0, 229, 255, 0.15)',
                              borderRadius: '6px',
                              color: 'var(--color-cyan)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s'
                            }}
                          >
                            {downloadingName === dl.name ? '⏳ Preparing...' : dl.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI Prompt Pack */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.25rem' }}>🤖 AI Prompt Pack</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        Copy these pre-designed expert system prompts to request advanced code upgrades or PCB design revisions from LLM coding assistants.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {activeProject.aiPrompts.map(entry => (
                          <div key={entry.role} style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <strong style={{ fontSize: '0.85rem', color: 'white' }}>💼 {entry.role}</strong>
                              <button
                                onClick={() => handleCopyPrompt(entry.role, entry.prompt)}
                                style={{
                                  background: 'rgba(255,255,255,0.06)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  color: 'white',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                  fontWeight: 600
                                }}
                              >
                                {copiedRole === entry.role ? '✓ Copied' : '📋 Copy Prompt'}
                              </button>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontFamily: 'monospace', maxHeight: '80px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px' }}>
                              {entry.prompt}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mini Quiz */}
                    <div style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px', padding: '1.25rem' }}>
                      <h4 style={{ color: 'white', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>🎯 Knowledge Check Mini-Quiz</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        {activeProject.quiz.map((q, qIdx) => (
                          <div key={qIdx} style={{ borderBottom: qIdx < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: qIdx < 2 ? '1rem' : 0 }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 600, color: 'white' }}>{qIdx + 1}. {q.question}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                              {q.options.map(opt => {
                                const isSelected = quizAnswers[qIdx] === opt;
                                return (
                                  <button
                                    key={opt}
                                    disabled={quizSubmitted}
                                    onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: opt }))}
                                    style={{
                                      padding: '0.5rem 0.75rem',
                                      borderRadius: '6px',
                                      border: '1px solid ' + (isSelected ? 'var(--color-cyan)' : 'rgba(255,255,255,0.05)'),
                                      background: isSelected ? 'rgba(0, 229, 255, 0.05)' : 'rgba(255,255,255,0.01)',
                                      color: isSelected ? 'var(--color-cyan)' : 'var(--color-text-secondary)',
                                      fontSize: '0.8rem',
                                      cursor: 'pointer',
                                      textAlign: 'left'
                                    }}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                            {quizSubmitted && (
                              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', padding: '0.5rem', borderRadius: '4px', background: quizAnswers[qIdx] === q.answer ? 'rgba(52,211,153,0.05)' : 'rgba(248,113,113,0.05)', color: quizAnswers[qIdx] === q.answer ? '#34d399' : '#f87171' }}>
                                <strong>{quizAnswers[qIdx] === q.answer ? '✓ Correct! ' : '✗ Incorrect. '}</strong>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {!quizSubmitted ? (
                        <button
                          onClick={() => setQuizSubmitted(true)}
                          disabled={Object.keys(quizAnswers).length < 3}
                          style={{
                            marginTop: '1.25rem',
                            padding: '0.5rem 1.25rem',
                            background: 'var(--color-cyan)',
                            color: 'var(--color-dark-slate)',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Submit Answers
                        </button>
                      ) : (
                        <button
                          onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                          style={{
                            marginTop: '1.25rem',
                            padding: '0.5rem 1.25rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'white',
                            borderRadius: '6px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Retry Quiz
                        </button>
                      )}
                    </div>

                    {/* Engineering Challenge */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>🛠 Think Like an Engineer Challenge</h4>
                      <div style={{ background: 'rgba(251,191,36,0.03)', border: '1px solid rgba(251,191,36,0.12)', padding: '1rem', borderRadius: '8px' }}>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', margin: 0 }}>{activeProject.engineeringChallenge}</p>
                      </div>
                    </div>

                    {/* Extensions & Scope */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <h4 style={{ color: 'var(--color-cyan)', fontSize: '0.9rem', marginBottom: '0.35rem' }}>Possible Improvements</h4>
                        <ul style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', paddingLeft: '1.1rem', margin: 0 }}>
                          {activeProject.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--color-cyan)', fontSize: '0.9rem', marginBottom: '0.35rem' }}>Future Scope</h4>
                        <ul style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', paddingLeft: '1.1rem', margin: 0 }}>
                          {activeProject.futureScope.map((scope, i) => <li key={i}>{scope}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Suggested Next Projects (Recommendation Engine) */}
                    <div>
                      <h4 style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginBottom: '0.75rem' }}>🎯 Suggested Next Projects (Learning Path)</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                        {activeProject.suggestedNextProjects.map(id => {
                          const nextProj = allProjects.find(ap => ap.id === id);
                          if (!nextProj) return null;
                          return (
                            <div
                              key={id}
                              onClick={() => handleSelectProjectById(id)}
                              style={{
                                padding: '0.75rem 1rem',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-cyan)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                            >
                              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{nextProj.title}</div>
                              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{nextProj.category} • {nextProj.difficulty}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Career Roles & References */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>RELATED CAREER ROLES</strong>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {activeProject.careerRoles.map(role => (
                            <span key={role} style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(52,211,153,0.05)', color: '#34d399', borderRadius: '3px' }}>{role}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>TECHNICAL REFERENCES</strong>
                        <ul style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', paddingLeft: '1.1rem', margin: 0 }}>
                          {activeProject.references.map((ref, i) => <li key={i}>{ref}</li>)}
                        </ul>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              color: 'var(--color-text-muted)',
              fontSize: '1rem',
              fontStyle: 'italic',
              gap: '0.5rem'
            }}>
              <span>💡 Select an engineering project from the sidebar list.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ElectronicsLabContent;
