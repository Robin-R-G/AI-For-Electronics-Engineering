// ponytail: template presets — flat arrays, no inheritance.

import { TemplatePreset, DesignElement, CanvasSettings } from './designerTypes';
import { uid } from './designerStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function el(overrides: any): DesignElement {
  return { ...overrides, id: uid() } as DesignElement;
}

const classicCanvas: CanvasSettings = {
  width: 1200, height: 850,
  backgroundColor: '#0B0D16',
  backgroundImage: '', backgroundFit: 'cover',
  borderColor: '#f59e0b', borderWidth: 4, borderStyle: 'solid', borderRadius: 0,
};

const modernCanvas: CanvasSettings = {
  width: 1200, height: 850,
  backgroundColor: '#ffffff',
  backgroundImage: '', backgroundFit: 'cover',
  borderColor: '#1a1a2e', borderWidth: 0, borderStyle: 'solid', borderRadius: 0,
};

const minimalCanvas: CanvasSettings = {
  width: 1200, height: 850,
  backgroundColor: '#f8f9fa',
  backgroundImage: '', backgroundFit: 'cover',
  borderColor: '#dee2e6', borderWidth: 1, borderStyle: 'solid', borderRadius: 0,
};

const darkGoldCanvas: CanvasSettings = {
  width: 1200, height: 850,
  backgroundColor: '#1a1a2e',
  backgroundImage: '', backgroundFit: 'cover',
  borderColor: '#d4af37', borderWidth: 3, borderStyle: 'solid', borderRadius: 0,
};

const elegantCanvas: CanvasSettings = {
  width: 1200, height: 850,
  backgroundColor: '#0d1117',
  backgroundImage: '', backgroundFit: 'cover',
  borderColor: '#58a6ff', borderWidth: 2, borderStyle: 'solid', borderRadius: 0,
};

const oceanCanvas: CanvasSettings = {
  width: 1200, height: 850,
  backgroundColor: '#0a192f',
  backgroundImage: '', backgroundFit: 'cover',
  borderColor: '#64ffda', borderWidth: 3, borderStyle: 'solid', borderRadius: 0,
};

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start from scratch',
    thumbnail: '',
    canvas: { ...classicCanvas },
    elements: [],
  },
  {
    id: 'classic',
    name: 'Classic Dark',
    description: 'Traditional dark certificate with gold accents',
    thumbnail: '',
    canvas: { ...classicCanvas },
    elements: [
      el({ type: 'rect', x: 20, y: 20, width: 1160, height: 810, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 0, fill: 'transparent', stroke: '#f59e0b', strokeWidth: 4, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'rect', x: 30, y: 30, width: 1140, height: 790, rotation: 0, opacity: 0.2, locked: false, visible: true, zIndex: 0, fill: 'transparent', stroke: '#f59e0b', strokeWidth: 1, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'text', x: 250, y: 70, width: 700, height: 40, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'CERTIFICATE OF COMPLETION', fontFamily: 'sans-serif', fontSize: 22, fontWeight: 700, fontStyle: 'normal', color: '#f59e0b', textAlign: 'center', lineHeight: 1.4, letterSpacing: 4, textDecoration: 'none', textShadow: '', whiteSpace: 'nowrap' }),
      el({ type: 'text', x: 200, y: 140, width: 800, height: 70, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'AI for Electronics Engineers', fontFamily: 'sans-serif', fontSize: 52, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.2, letterSpacing: -1, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 300, y: 220, width: 600, height: 40, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'Workshop Program', fontFamily: 'sans-serif', fontSize: 26, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'line', x: 300, y: 270, width: 600, height: 0, rotation: 0, opacity: 0.3, locked: false, visible: true, zIndex: 1, stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '', strokeLinecap: 'round' }),
      el({ type: 'text', x: 200, y: 300, width: 800, height: 80, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'This is to certify that the participant has successfully completed\nall modules of the AI for Electronics Engineers Workshop.', fontFamily: 'sans-serif', fontSize: 22, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'rect', x: 300, y: 410, width: 600, height: 70, rotation: 0, opacity: 0.08, locked: false, visible: true, zIndex: 0, fill: '#f59e0b', stroke: 'transparent', strokeWidth: 0, borderRadius: 8, strokeDasharray: '' }),
      el({ type: 'text', x: 300, y: 420, width: 600, height: 50, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Participant Name', fontFamily: 'sans-serif', fontSize: 30, fontWeight: 700, fontStyle: 'normal', color: '#f59e0b', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 300, y: 500, width: 600, height: 30, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: '19 Modules  |  11 Sections  |  Hands-on Labs  |  Quiz  |  Certificate', fontFamily: 'sans-serif', fontSize: 18, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 600, width: 500, height: 30, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Robin R G', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 635, width: 500, height: 25, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'Instructor | AI for Electronics Engineers Workshop', fontFamily: 'sans-serif', fontSize: 18, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 450, y: 700, width: 300, height: 25, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'July 2026', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
    ],
  },
  {
    id: 'modern',
    name: 'Modern Light',
    description: 'Clean white certificate with dark accents',
    thumbnail: '',
    canvas: { ...modernCanvas },
    elements: [
      el({ type: 'rect', x: 0, y: 0, width: 1200, height: 120, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 0, fill: '#1a1a2e', stroke: 'transparent', strokeWidth: 0, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'text', x: 100, y: 35, width: 1000, height: 50, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'CERTIFICATE OF COMPLETION', fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, fontStyle: 'normal', color: '#ffffff', textAlign: 'center', lineHeight: 1.4, letterSpacing: 6, textDecoration: 'none', textShadow: '', whiteSpace: 'nowrap' }),
      el({ type: 'text', x: 150, y: 180, width: 900, height: 70, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'AI for Electronics Engineers', fontFamily: 'sans-serif', fontSize: 56, fontWeight: 700, fontStyle: 'normal', color: '#1a1a2e', textAlign: 'center', lineHeight: 1.2, letterSpacing: -1, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 200, y: 260, width: 800, height: 40, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'Workshop Program', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 400, fontStyle: 'normal', color: '#666666', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'line', x: 400, y: 320, width: 400, height: 0, rotation: 0, opacity: 0.2, locked: false, visible: true, zIndex: 1, stroke: '#1a1a2e', strokeWidth: 2, strokeDasharray: '', strokeLinecap: 'round' }),
      el({ type: 'text', x: 150, y: 350, width: 900, height: 80, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'This is to certify that the participant has successfully completed\nall modules of the AI for Electronics Engineers Workshop.', fontFamily: 'sans-serif', fontSize: 22, fontWeight: 400, fontStyle: 'normal', color: '#555555', textAlign: 'center', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 300, y: 470, width: 600, height: 50, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Participant Name', fontFamily: 'sans-serif', fontSize: 32, fontWeight: 700, fontStyle: 'normal', color: '#1a1a2e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'line', x: 400, y: 530, width: 400, height: 0, rotation: 0, opacity: 0.2, locked: false, visible: true, zIndex: 1, stroke: '#1a1a2e', strokeWidth: 1, strokeDasharray: '', strokeLinecap: 'round' }),
      el({ type: 'text', x: 300, y: 560, width: 600, height: 30, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: '19 Modules  |  11 Sections  |  Hands-on Labs  |  Quiz  |  Certificate', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#888888', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 640, width: 500, height: 30, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Robin R G', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 700, fontStyle: 'normal', color: '#1a1a2e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 675, width: 500, height: 25, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'Instructor | AI for Electronics Engineers Workshop', fontFamily: 'sans-serif', fontSize: 18, fontWeight: 400, fontStyle: 'normal', color: '#888888', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 450, y: 740, width: 300, height: 25, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'July 2026', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#888888', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
    ],
  },
  {
    id: 'minimal',
    name: 'Minimal Grey',
    description: 'Ultra-clean, light grey with subtle borders',
    thumbnail: '',
    canvas: { ...minimalCanvas },
    elements: [
      el({ type: 'rect', x: 40, y: 40, width: 1120, height: 770, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 0, fill: 'transparent', stroke: '#dee2e6', strokeWidth: 1, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'text', x: 200, y: 100, width: 800, height: 50, rotation: 0, opacity: 0.4, locked: false, visible: true, zIndex: 1, content: 'CERTIFICATE', fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700, fontStyle: 'normal', color: '#6c757d', textAlign: 'center', lineHeight: 1.4, letterSpacing: 8, textDecoration: 'none', textShadow: '', whiteSpace: 'nowrap' }),
      el({ type: 'text', x: 150, y: 200, width: 900, height: 70, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'AI for Electronics Engineers', fontFamily: 'serif', fontSize: 52, fontWeight: 700, fontStyle: 'normal', color: '#212529', textAlign: 'center', lineHeight: 1.2, letterSpacing: -1, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 200, y: 280, width: 800, height: 40, rotation: 0, opacity: 0.4, locked: false, visible: true, zIndex: 1, content: 'Workshop Program', fontFamily: 'serif', fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: '#6c757d', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 150, y: 360, width: 900, height: 80, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'This is to certify that the participant has successfully completed\nall modules of the AI for Electronics Engineers Workshop.', fontFamily: 'sans-serif', fontSize: 20, fontWeight: 400, fontStyle: 'normal', color: '#6c757d', textAlign: 'center', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 300, y: 480, width: 600, height: 50, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Participant Name', fontFamily: 'serif', fontSize: 32, fontWeight: 700, fontStyle: 'normal', color: '#212529', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'line', x: 450, y: 540, width: 300, height: 0, rotation: 0, opacity: 0.2, locked: false, visible: true, zIndex: 1, stroke: '#212529', strokeWidth: 1, strokeDasharray: '', strokeLinecap: 'round' }),
      el({ type: 'text', x: 350, y: 580, width: 500, height: 30, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Robin R G', fontFamily: 'serif', fontSize: 22, fontWeight: 700, fontStyle: 'normal', color: '#212529', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 615, width: 500, height: 25, rotation: 0, opacity: 0.4, locked: false, visible: true, zIndex: 1, content: 'Instructor | AI for Electronics Engineers Workshop', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#6c757d', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 450, y: 700, width: 300, height: 25, rotation: 0, opacity: 0.4, locked: false, visible: true, zIndex: 1, content: 'July 2026', fontFamily: 'sans-serif', fontSize: 14, fontWeight: 400, fontStyle: 'normal', color: '#6c757d', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
    ],
  },
  {
    id: 'darkgold',
    name: 'Dark & Gold',
    description: 'Deep navy with gold borders and accents',
    thumbnail: '',
    canvas: { ...darkGoldCanvas },
    elements: [
      el({ type: 'rect', x: 15, y: 15, width: 1170, height: 820, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 0, fill: 'transparent', stroke: '#d4af37', strokeWidth: 3, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'rect', x: 25, y: 25, width: 1150, height: 800, rotation: 0, opacity: 0.3, locked: false, visible: true, zIndex: 0, fill: 'transparent', stroke: '#d4af37', strokeWidth: 1, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'text', x: 200, y: 80, width: 800, height: 40, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'CERTIFICATE OF COMPLETION', fontFamily: 'sans-serif', fontSize: 20, fontWeight: 700, fontStyle: 'normal', color: '#d4af37', textAlign: 'center', lineHeight: 1.4, letterSpacing: 6, textDecoration: 'none', textShadow: '', whiteSpace: 'nowrap' }),
      el({ type: 'text', x: 150, y: 160, width: 900, height: 70, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'AI for Electronics Engineers', fontFamily: 'serif', fontSize: 54, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.2, letterSpacing: -1, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 200, y: 240, width: 800, height: 40, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'Workshop Program', fontFamily: 'serif', fontSize: 24, fontWeight: 400, fontStyle: 'italic', color: '#d4af37', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'line', x: 350, y: 300, width: 500, height: 0, rotation: 0, opacity: 0.3, locked: false, visible: true, zIndex: 1, stroke: '#d4af37', strokeWidth: 1, strokeDasharray: '', strokeLinecap: 'round' }),
      el({ type: 'text', x: 150, y: 330, width: 900, height: 80, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'This is to certify that the participant has successfully completed\nall modules of the AI for Electronics Engineers Workshop.', fontFamily: 'sans-serif', fontSize: 22, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'rect', x: 300, y: 440, width: 600, height: 70, rotation: 0, opacity: 0.06, locked: false, visible: true, zIndex: 0, fill: '#d4af37', stroke: 'transparent', strokeWidth: 0, borderRadius: 8, strokeDasharray: '' }),
      el({ type: 'text', x: 300, y: 450, width: 600, height: 50, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Participant Name', fontFamily: 'serif', fontSize: 32, fontWeight: 700, fontStyle: 'normal', color: '#d4af37', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 300, y: 530, width: 600, height: 30, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: '19 Modules  |  11 Sections  |  Hands-on Labs  |  Quiz  |  Certificate', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 610, width: 500, height: 30, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Robin R G', fontFamily: 'serif', fontSize: 24, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 645, width: 500, height: 25, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'Instructor | AI for Electronics Engineers Workshop', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 450, y: 720, width: 300, height: 25, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'July 2026', fontFamily: 'sans-serif', fontSize: 14, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
    ],
  },
  {
    id: 'elegant',
    name: 'Elegant Blue',
    description: 'Dark theme with blue accents and clean lines',
    thumbnail: '',
    canvas: { ...elegantCanvas },
    elements: [
      el({ type: 'rect', x: 20, y: 20, width: 1160, height: 810, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 0, fill: 'transparent', stroke: '#58a6ff', strokeWidth: 2, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'text', x: 200, y: 80, width: 800, height: 40, rotation: 0, opacity: 0.8, locked: false, visible: true, zIndex: 1, content: 'CERTIFICATE OF COMPLETION', fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, fontStyle: 'normal', color: '#58a6ff', textAlign: 'center', lineHeight: 1.4, letterSpacing: 6, textDecoration: 'none', textShadow: '', whiteSpace: 'nowrap' }),
      el({ type: 'text', x: 150, y: 170, width: 900, height: 70, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'AI for Electronics Engineers', fontFamily: 'sans-serif', fontSize: 52, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.2, letterSpacing: -1, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 200, y: 250, width: 800, height: 40, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'Workshop Program', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'line', x: 350, y: 310, width: 500, height: 0, rotation: 0, opacity: 0.3, locked: false, visible: true, zIndex: 1, stroke: '#58a6ff', strokeWidth: 1, strokeDasharray: '', strokeLinecap: 'round' }),
      el({ type: 'text', x: 150, y: 340, width: 900, height: 80, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'This is to certify that the participant has successfully completed\nall modules of the AI for Electronics Engineers Workshop.', fontFamily: 'sans-serif', fontSize: 22, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 300, y: 460, width: 600, height: 50, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Participant Name', fontFamily: 'sans-serif', fontSize: 32, fontWeight: 700, fontStyle: 'normal', color: '#58a6ff', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 560, width: 500, height: 30, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Robin R G', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 595, width: 500, height: 25, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'Instructor | AI for Electronics Engineers Workshop', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 450, y: 680, width: 300, height: 25, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'July 2026', fontFamily: 'sans-serif', fontSize: 14, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean Teal',
    description: 'Deep navy with teal/cyan accents',
    thumbnail: '',
    canvas: { ...oceanCanvas },
    elements: [
      el({ type: 'rect', x: 20, y: 20, width: 1160, height: 810, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 0, fill: 'transparent', stroke: '#64ffda', strokeWidth: 3, borderRadius: 0, strokeDasharray: '' }),
      el({ type: 'text', x: 200, y: 80, width: 800, height: 40, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'CERTIFICATE OF COMPLETION', fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, fontStyle: 'normal', color: '#64ffda', textAlign: 'center', lineHeight: 1.4, letterSpacing: 6, textDecoration: 'none', textShadow: '', whiteSpace: 'nowrap' }),
      el({ type: 'text', x: 150, y: 170, width: 900, height: 70, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'AI for Electronics Engineers', fontFamily: 'sans-serif', fontSize: 52, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.2, letterSpacing: -1, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 200, y: 250, width: 800, height: 40, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'Workshop Program', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'line', x: 350, y: 310, width: 500, height: 0, rotation: 0, opacity: 0.3, locked: false, visible: true, zIndex: 1, stroke: '#64ffda', strokeWidth: 1, strokeDasharray: '', strokeLinecap: 'round' }),
      el({ type: 'text', x: 150, y: 340, width: 900, height: 80, rotation: 0, opacity: 0.6, locked: false, visible: true, zIndex: 1, content: 'This is to certify that the participant has successfully completed\nall modules of the AI for Electronics Engineers Workshop.', fontFamily: 'sans-serif', fontSize: 22, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.6, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 300, y: 460, width: 600, height: 50, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Participant Name', fontFamily: 'sans-serif', fontSize: 32, fontWeight: 700, fontStyle: 'normal', color: '#64ffda', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 560, width: 500, height: 30, rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1, content: 'Robin R G', fontFamily: 'sans-serif', fontSize: 24, fontWeight: 700, fontStyle: 'normal', color: '#e6edf3', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 350, y: 595, width: 500, height: 25, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'Instructor | AI for Electronics Engineers Workshop', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
      el({ type: 'text', x: 450, y: 680, width: 300, height: 25, rotation: 0, opacity: 0.5, locked: false, visible: true, zIndex: 1, content: 'July 2026', fontFamily: 'sans-serif', fontSize: 14, fontWeight: 400, fontStyle: 'normal', color: '#8b949e', textAlign: 'center', lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none', textShadow: '', whiteSpace: 'normal' }),
    ],
  },
];

export function getTemplateById(id: string): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find((t) => t.id === id);
}
