// ponytail: designer element types — kept flat, no inheritance trees.

export type ElementType = 'text' | 'image' | 'line' | 'rect';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  zIndex: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: 'normal' | 'italic';
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  textDecoration: 'none' | 'underline';
  textShadow: string;
  whiteSpace: 'normal' | 'nowrap';
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  objectFit: 'contain' | 'cover' | 'fill';
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
}

export interface LineElement extends BaseElement {
  type: 'line';
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  strokeLinecap: 'butt' | 'round' | 'square';
}

export interface RectElement extends BaseElement {
  type: 'rect';
  fill: string;
  stroke: string;
  strokeWidth: number;
  borderRadius: number;
  strokeDasharray: string;
}

export type DesignElement = TextElement | ImageElement | LineElement | RectElement;

export interface CanvasSettings {
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImage: string;
  backgroundFit: 'cover' | 'contain' | 'tile';
  borderColor: string;
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'double';
  borderRadius: number;
}

export interface DesignerState {
  elements: DesignElement[];
  canvas: CanvasSettings;
  selectedIds: string[];
  zoom: number;
  panX: number;
  panY: number;
  activeTemplate: string;
  showGrid: boolean;
  showRulers: boolean;
  snapToGrid: boolean;
  gridSize: number;
  historyIndex: number;
  history: HistoryEntry[];
  lastSaved: number;
}

export interface HistoryEntry {
  elements: DesignElement[];
  canvas: CanvasSettings;
  timestamp: number;
  label: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  elements: DesignElement[];
  canvas: CanvasSettings;
}

export const CANVAS_PRESETS: Record<string, { width: number; height: number; label: string }> = {
  landscape: { width: 1200, height: 850, label: 'Landscape (1200x850)' },
  portrait: { width: 850, height: 1200, label: 'Portrait (850x1200)' },
  a4: { width: 794, height: 1123, label: 'A4 (794x1123)' },
  wide: { width: 1400, height: 700, label: 'Wide (1400x700)' },
};

export const FONT_OPTIONS = [
  'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy',
  'Georgia', 'Times New Roman', 'Courier New', 'Arial', 'Verdana',
  'Trebuchet MS', 'Impact', 'Palatino', 'Garamond', 'Bookman',
];

export const DEFAULT_CANVAS: CanvasSettings = {
  width: 1200,
  height: 850,
  backgroundColor: '#0B0D16',
  backgroundImage: '',
  backgroundFit: 'cover',
  borderColor: '#f59e0b',
  borderWidth: 4,
  borderStyle: 'solid',
  borderRadius: 0,
};
