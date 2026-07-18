'use client';

import React, { useState, useMemo } from 'react';
import { components, componentCategories, ComponentEntry } from '@/data/componentEncyclopedia';

const ComponentEncyclopediaContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedComponent, setSelectedComponent] = useState<ComponentEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = components;
    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <p>
        A searchable library of common electronic components with descriptions, pinouts,
        specifications, applications, sample circuits, and interview questions.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.6rem 1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--color-border)',
            borderRadius: '9999px',
            color: 'var(--color-text-primary)',
            fontSize: '0.85rem',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {componentCategories.map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setSelectedComponent(null); }}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: `1px solid ${selectedCategory === cat ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
              background: selectedCategory === cat ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: selectedCategory === cat ? '#00e5ff' : 'rgba(200,210,235,0.75)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedComponent ? (
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '1.5rem' }}>
          <button
            onClick={() => setSelectedComponent(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-cyan)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem',
              padding: 0,
            }}
          >
            &larr; Back to all components
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{selectedComponent.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginTop: '0.25rem' }}>
                {selectedComponent.package} &middot; {selectedComponent.category}
              </p>
            </div>
            <a
              href={selectedComponent.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.4rem 1rem',
                background: 'rgba(0,229,255,0.1)',
                border: '1px solid rgba(0,229,255,0.3)',
                borderRadius: '9999px',
                color: '#00e5ff',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Datasheet &rarr;
            </a>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {selectedComponent.description}
          </p>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
            Pinout
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {selectedComponent.pinout.map(pin => (
              <div key={pin.number} style={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 100px',
                gap: '1rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>Pin {pin.number}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{pin.name}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{pin.description}</span>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
            Specifications
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {selectedComponent.specifications.map((spec, i) => (
              <div key={i} style={{
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>{spec.label}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  {spec.value}{spec.unit ? ` ${spec.unit}` : ''}
                </span>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
            Sample Circuit
          </h4>
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
            overflow: 'auto',
            marginBottom: '1.5rem',
          }}>
            {selectedComponent.sampleCircuit}
          </pre>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
            Common Mistakes
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {selectedComponent.commonMistakes.map((mistake, i) => (
              <li key={i} style={{
                padding: '0.5rem 0.75rem',
                background: 'rgba(239,68,68,0.05)',
                borderRadius: '8px',
                borderLeft: '3px solid #ef4444',
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
              }}>
                {mistake}
              </li>
            ))}
          </ul>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
            Applications
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {selectedComponent.applications.map(app => (
              <span key={app} style={{
                padding: '0.3rem 0.75rem',
                background: 'rgba(0,229,255,0.1)',
                border: '1px solid rgba(0,229,255,0.2)',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                color: 'var(--color-cyan)',
              }}>
                {app}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filtered.map(comp => (
            <div
              key={comp.id}
              onClick={() => setSelectedComponent(comp)}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{comp.name}</h3>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  background: 'rgba(124,58,237,0.1)',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  color: '#7c3aed',
                }}>
                  {comp.category}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>
                {comp.package}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {comp.description.substring(0, 120)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ComponentEncyclopediaContent;
