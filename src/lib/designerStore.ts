// ponytail: zustand-free state — just React state + localStorage.
// History is a simple array of snapshots, capped at 50.

import {
  DesignElement, CanvasSettings, DesignerState,
  HistoryEntry, DEFAULT_CANVAS, TextElement, ImageElement,
  LineElement, RectElement,
} from './designerTypes';

const STORAGE_KEY = 'cert_designer';
const MAX_HISTORY = 50;

let nextId = 1;
export function uid(): string { return `el_${Date.now()}_${nextId++}`; }

export function createTextElement(overrides: Partial<TextElement> = {}): TextElement {
  return {
    id: uid(), type: 'text',
    x: 300, y: 300, width: 600, height: 60,
    rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1,
    content: 'New Text',
    fontFamily: 'sans-serif', fontSize: 32, fontWeight: 400,
    fontStyle: 'normal', color: '#e6edf3', textAlign: 'center',
    lineHeight: 1.4, letterSpacing: 0, textDecoration: 'none',
    textShadow: '', whiteSpace: 'normal',
    ...overrides,
  };
}

export function createImageElement(overrides: Partial<ImageElement> = {}): ImageElement {
  return {
    id: uid(), type: 'image',
    x: 100, y: 100, width: 150, height: 150,
    rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1,
    src: '', objectFit: 'contain', borderRadius: 0,
    borderWidth: 0, borderColor: 'transparent',
    ...overrides,
  };
}

export function createLineElement(overrides: Partial<LineElement> = {}): LineElement {
  return {
    id: uid(), type: 'line',
    x: 200, y: 400, width: 800, height: 0,
    rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1,
    stroke: '#f59e0b55', strokeWidth: 2, strokeDasharray: '',
    strokeLinecap: 'round',
    ...overrides,
  };
}

export function createRectElement(overrides: Partial<RectElement> = {}): RectElement {
  return {
    id: uid(), type: 'rect',
    x: 100, y: 100, width: 300, height: 200,
    rotation: 0, opacity: 1, locked: false, visible: true, zIndex: 1,
    fill: 'transparent', stroke: '#f59e0b', strokeWidth: 2,
    borderRadius: 0, strokeDasharray: '',
    ...overrides,
  };
}

export function loadState(): DesignerState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    return {
      ...getDefaultState(),
      ...saved,
      historyIndex: 0,
      history: [],
    };
  } catch { return null; }
}

export function saveState(state: DesignerState): void {
  if (typeof window === 'undefined') return;
  const toSave = {
    elements: state.elements,
    canvas: state.canvas,
    activeTemplate: state.activeTemplate,
    zoom: state.zoom,
    showGrid: state.showGrid,
    showRulers: state.showRulers,
    snapToGrid: state.snapToGrid,
    gridSize: state.gridSize,
    lastSaved: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

export function getDefaultState(): DesignerState {
  return {
    elements: [],
    canvas: { ...DEFAULT_CANVAS },
    selectedIds: [],
    zoom: 1,
    panX: 0,
    panY: 0,
    activeTemplate: 'blank',
    showGrid: false,
    showRulers: true,
    snapToGrid: true,
    gridSize: 10,
    historyIndex: -1,
    history: [],
    lastSaved: 0,
  };
}

export function pushHistory(state: DesignerState, label: string): DesignerState {
  const entry: HistoryEntry = {
    elements: structuredClone(state.elements),
    canvas: structuredClone(state.canvas),
    timestamp: Date.now(),
    label,
  };
  const history = state.history.slice(0, state.historyIndex + 1);
  history.push(entry);
  if (history.length > MAX_HISTORY) history.shift();
  return { ...state, history, historyIndex: history.length - 1 };
}

export function undo(state: DesignerState): DesignerState {
  if (state.historyIndex <= 0) return state;
  const idx = state.historyIndex - 1;
  const entry = state.history[idx];
  return {
    ...state,
    elements: structuredClone(entry.elements),
    canvas: structuredClone(entry.canvas),
    historyIndex: idx,
    selectedIds: [],
  };
}

export function redo(state: DesignerState): DesignerState {
  if (state.historyIndex >= state.history.length - 1) return state;
  const idx = state.historyIndex + 1;
  const entry = state.history[idx];
  return {
    ...state,
    elements: structuredClone(entry.elements),
    canvas: structuredClone(entry.canvas),
    historyIndex: idx,
    selectedIds: [],
  };
}

export function updateElements(
  state: DesignerState,
  updater: (els: DesignElement[]) => DesignElement[]
): DesignerState {
  return { ...state, elements: updater(state.elements) };
}

export function snapToGridValue(val: number, grid: number, enabled: boolean): number {
  if (!enabled) return val;
  return Math.round(val / grid) * grid;
}
