'use client';
import React from 'react';

interface PCBDecorProps {
  className?: string;
  opacity?: number;
  variant?: 'corner-tl' | 'corner-br' | 'traces' | 'chip';
}

export const PCBDecor: React.FC<PCBDecorProps> = ({
  className = '',
  opacity = 0.15,
  variant = 'traces'
}) => {
  if (variant === 'corner-tl') {
    return (
      <svg
        className={className}
        width="160" height="160" viewBox="0 0 160 160"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <path d="M8 8 H80 V40 H120 V80" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 8 V80 H40 V120 H80" stroke="#0052ff" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="80" cy="40" r="4" fill="none" stroke="#00e5ff" strokeWidth="1.5"/>
        <circle cx="40" cy="120" r="4" fill="none" stroke="#0052ff" strokeWidth="1.5"/>
        <rect x="4" y="4" width="8" height="8" rx="1" fill="#00e5ff" fillOpacity="0.4"/>
        <circle cx="120" cy="80" r="3" fill="#00e5ff" fillOpacity="0.5"/>
        <style>{`.pcb-trace{stroke-dasharray:4 4;animation:pcbPulse 3s ease-in-out infinite}`}</style>
      </svg>
    );
  }

  if (variant === 'corner-br') {
    return (
      <svg
        className={className}
        width="160" height="160" viewBox="0 0 160 160"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <path d="M152 152 H80 V120 H40 V80" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M152 152 V80 H120 V40 H80" stroke="#00e5ff" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="80" cy="120" r="4" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
        <circle cx="120" cy="40" r="4" fill="none" stroke="#00e5ff" strokeWidth="1.5"/>
        <rect x="148" y="148" width="8" height="8" rx="1" fill="#7c3aed" fillOpacity="0.4"/>
      </svg>
    );
  }

  if (variant === 'chip') {
    return (
      <svg
        className={className}
        width="100" height="60" viewBox="0 0 100 60"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <rect x="20" y="10" width="60" height="40" rx="4" stroke="#00e5ff" strokeWidth="1.5"/>
        <rect x="26" y="16" width="48" height="28" rx="2" fill="#00e5ff" fillOpacity="0.04"/>
        {/* Pins left */}
        {[0,1,2,3].map(i => (
          <line key={`l${i}`} x1="10" y1={18 + i*8} x2="20" y2={18 + i*8} stroke="#00e5ff" strokeWidth="1.5"/>
        ))}
        {/* Pins right */}
        {[0,1,2,3].map(i => (
          <line key={`r${i}`} x1="80" y1={18 + i*8} x2="90" y2={18 + i*8} stroke="#00e5ff" strokeWidth="1.5"/>
        ))}
        <circle cx="50" cy="30" r="8" stroke="#00e5ff" strokeWidth="1" strokeDasharray="3 3"/>
        <circle cx="50" cy="30" r="3" fill="#00e5ff" fillOpacity="0.6"/>
      </svg>
    );
  }

  // Default: traces grid
  return (
    <svg
      className={className}
      width="400" height="300" viewBox="0 0 400 300"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Horizontal traces */}
      <line x1="0" y1="50"  x2="400" y2="50"  stroke="#00e5ff" strokeWidth="0.75"/>
      <line x1="0" y1="150" x2="400" y2="150" stroke="#0052ff" strokeWidth="0.75"/>
      <line x1="0" y1="250" x2="400" y2="250" stroke="#7c3aed" strokeWidth="0.75"/>
      {/* Vertical traces */}
      <line x1="80"  y1="0" x2="80"  y2="300" stroke="#00e5ff" strokeWidth="0.75"/>
      <line x1="200" y1="0" x2="200" y2="300" stroke="#0052ff" strokeWidth="0.75"/>
      <line x1="320" y1="0" x2="320" y2="300" stroke="#7c3aed" strokeWidth="0.75"/>
      {/* Vias / pads */}
      {[
        [80, 50], [200, 50], [320, 50],
        [80, 150], [200, 150], [320, 150],
        [80, 250], [200, 250], [320, 250],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="7" stroke="#00e5ff" strokeWidth="1" fill="none"/>
          <circle cx={cx} cy={cy} r="3" fill="#00e5ff" fillOpacity="0.4"/>
        </g>
      ))}
      {/* Corner markers */}
      <rect x="0"   y="0"   width="12" height="12" fill="#00e5ff" fillOpacity="0.2" rx="2"/>
      <rect x="388" y="0"   width="12" height="12" fill="#00e5ff" fillOpacity="0.2" rx="2"/>
      <rect x="0"   y="288" width="12" height="12" fill="#7c3aed" fillOpacity="0.2" rx="2"/>
      <rect x="388" y="288" width="12" height="12" fill="#7c3aed" fillOpacity="0.2" rx="2"/>
    </svg>
  );
};

export default PCBDecor;
