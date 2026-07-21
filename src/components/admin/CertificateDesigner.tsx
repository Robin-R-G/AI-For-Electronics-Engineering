'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  DesignerState, DesignElement, TextElement, ImageElement,
  LineElement, RectElement, ElementType, CANVAS_PRESETS, FONT_OPTIONS,
} from '@/lib/designerTypes';
import {
  loadState, saveState, getDefaultState, pushHistory, undo, redo,
  updateElements, snapToGridValue, uid,
  createTextElement, createImageElement, createLineElement, createRectElement,
} from '@/lib/designerStore';
import { TEMPLATE_PRESETS, getTemplateById } from '@/lib/designerTemplates';
import {
  renderCertificate, canvasToPdfBlob, downloadBlob, downloadCanvasPng,
} from '@/lib/certificate';
import { track } from '@/lib/analytics';
import styles from './DesignerStyles.module.css';

type DragMode = 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | null;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function CertificateDesigner({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState<DesignerState>(() => loadState() || getDefaultState());
  const [status, setStatus] = useState('');
  const [activePanel, setActivePanel] = useState<'properties' | 'layers' | 'templates'>('properties');
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState('Sample Participant');
  const [names, setNames] = useState('');
  const [generating, setGenerating] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    mode: DragMode;
    startX: number;
    startY: number;
    startElX: number;
    startElY: number;
    startW: number;
    startH: number;
    elId: string;
  } | null>(null);

  const flash = (msg: string) => { setStatus(msg); setTimeout(() => setStatus(''), 2500); };

  const push = (label: string) => setState((prev) => pushHistory(prev, label));

  const selected = state.selectedIds.length === 1
    ? state.elements.find((e) => e.id === state.selectedIds[0]) ?? null
    : null;

  const updateSelected = (patch: Partial<DesignElement>) => {
    if (!selected) return;
    push('Edit ' + selected.type);
    setState((prev) => ({
      ...prev,
      elements: prev.elements.map((e) =>
        e.id === selected.id ? { ...e, ...patch } as DesignElement : e
      ),
    }));
  };

  // ── Element actions ────────────────────────────────────────
  const addElement = (type: ElementType) => {
    push('Add ' + type);
    const factory = { text: createTextElement, image: createImageElement, line: createLineElement, rect: createRectElement };
    const el = factory[type]();
    setState((prev) => ({ ...prev, elements: [...prev.elements, el], selectedIds: [el.id] }));
  };

  const duplicateSelected = () => {
    if (!selected) return;
    push('Duplicate');
    const clone = { ...structuredClone(selected), id: uid(), x: selected.x + 20, y: selected.y + 20 };
    setState((prev) => ({ ...prev, elements: [...prev.elements, clone], selectedIds: [clone.id] }));
  };

  const deleteSelected = () => {
    if (!selected) return;
    push('Delete');
    setState((prev) => ({
      ...prev,
      elements: prev.elements.filter((e) => e.id !== selected.id),
      selectedIds: [],
    }));
  };

  const bringForward = () => {
    if (!selected) return;
    push('Bring forward');
    setState((prev) => {
      const sorted = [...prev.elements].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((e) => e.id === selected.id);
      if (idx < sorted.length - 1) {
        const temp = sorted[idx].zIndex;
        sorted[idx] = { ...sorted[idx], zIndex: sorted[idx + 1].zIndex };
        sorted[idx + 1] = { ...sorted[idx + 1], zIndex: temp };
      }
      return { ...prev, elements: sorted };
    });
  };

  const sendBackward = () => {
    if (!selected) return;
    push('Send backward');
    setState((prev) => {
      const sorted = [...prev.elements].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((e) => e.id === selected.id);
      if (idx > 0) {
        const temp = sorted[idx].zIndex;
        sorted[idx] = { ...sorted[idx], zIndex: sorted[idx - 1].zIndex };
        sorted[idx - 1] = { ...sorted[idx - 1], zIndex: temp };
      }
      return { ...prev, elements: sorted };
    });
  };

  const alignElement = (dir: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (!selected) return;
    push('Align ' + dir);
    const cw = state.canvas.width;
    const ch = state.canvas.height;
    let patch: Partial<DesignElement> = {};
    if (dir === 'left') patch = { x: 0 };
    if (dir === 'center') patch = { x: (cw - selected.width) / 2 };
    if (dir === 'right') patch = { x: cw - selected.width };
    if (dir === 'top') patch = { y: 0 };
    if (dir === 'middle') patch = { y: (ch - selected.height) / 2 };
    if (dir === 'bottom') patch = { y: ch - selected.height };
    updateSelected(patch);
  };

  // ── Canvas mouse interaction ───────────────────────────────
  const getCanvasCoords = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / state.zoom,
      y: (e.clientY - rect.top) / state.zoom,
    };
  }, [state.zoom]);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const elId = target.getAttribute('data-el-id');
    const handle = target.getAttribute('data-handle');

    if (handle && elId) {
      const el = state.elements.find((x) => x.id === elId);
      if (!el || el.locked) return;
      e.stopPropagation();
      const coords = getCanvasCoords(e);
      dragRef.current = {
        mode: handle as DragMode,
        startX: coords.x, startY: coords.y,
        startElX: el.x, startElY: el.y,
        startW: el.width, startH: el.height,
        elId,
      };
      return;
    }

    if (elId) {
      const el = state.elements.find((x) => x.id === elId);
      if (!el || el.locked) return;
      if (e.shiftKey) {
        setState((prev) => ({
          ...prev,
          selectedIds: prev.selectedIds.includes(elId)
            ? prev.selectedIds.filter((id) => id !== elId)
            : [...prev.selectedIds, elId],
        }));
      } else {
        setState((prev) => ({ ...prev, selectedIds: [elId] }));
      }
      const coords = getCanvasCoords(e);
      dragRef.current = {
        mode: 'move',
        startX: coords.x, startY: coords.y,
        startElX: el.x, startElY: el.y,
        startW: el.width, startH: el.height,
        elId,
      };
      return;
    }

    setState((prev) => ({ ...prev, selectedIds: [] }));
  }, [state.elements, getCanvasCoords]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current) return;
    const d = dragRef.current;
    const coords = getCanvasCoords(e);
    const dx = coords.x - d.startX;
    const dy = coords.y - d.startY;
    const g = state.gridSize;
    const snap = state.snapToGrid;

    setState((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => {
        if (el.id !== d.elId) return el;
        if (d.mode === 'move') {
          return { ...el, x: snapToGridValue(d.startElX + dx, g, snap), y: snapToGridValue(d.startElY + dy, g, snap) };
        }
        let newX = el.x, newY = el.y, newW = el.width, newH = el.height;
        if (d.mode === 'se') { newW = Math.max(20, d.startW + dx); newH = Math.max(20, d.startH + dy); }
        else if (d.mode === 'sw') { newX = d.startElX + dx; newW = Math.max(20, d.startW - dx); newH = Math.max(20, d.startH + dy); }
        else if (d.mode === 'ne') { newW = Math.max(20, d.startW + dx); newY = d.startElY + dy; newH = Math.max(20, d.startH - dy); }
        else if (d.mode === 'nw') { newX = d.startElX + dx; newY = d.startElY + dy; newW = Math.max(20, d.startW - dx); newH = Math.max(20, d.startH - dy); }
        else if (d.mode === 'n') { newY = d.startElY + dy; newH = Math.max(20, d.startH - dy); }
        else if (d.mode === 's') { newH = Math.max(20, d.startH + dy); }
        else if (d.mode === 'e') { newW = Math.max(20, d.startW + dx); }
        else if (d.mode === 'w') { newX = d.startElX + dx; newW = Math.max(20, d.startW - dx); }
        return { ...el, x: snapToGridValue(newX, g, snap), y: snapToGridValue(newY, g, snap), width: snapToGridValue(newW, g, snap), height: snapToGridValue(newH, g, snap) };
      }),
    }));
  }, [getCanvasCoords, state.gridSize, state.snapToGrid]);

  const handleMouseUp = useCallback(() => {
    if (dragRef.current) {
      push('Move/resize');
      dragRef.current = null;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // ── Keyboard shortcuts ─────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (editingTextId) return;
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === 'z' && !e.shiftKey) { e.preventDefault(); setState((s) => undo(s)); }
      else if (ctrl && e.key === 'z' && e.shiftKey) { e.preventDefault(); setState((s) => redo(s)); }
      else if (ctrl && e.key === 'y') { e.preventDefault(); setState((s) => redo(s)); }
      else if (ctrl && e.key === 'd') { e.preventDefault(); duplicateSelected(); }
      else if (e.key === 'Delete' || e.key === 'Backspace') { if (selected) { e.preventDefault(); deleteSelected(); } }
      else if (e.key === 'Escape') { setState((prev) => ({ ...prev, selectedIds: [] })); setEditingTextId(null); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, editingTextId]);

  // ── Auto-save ──────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => saveState(state), 2000);
    return () => clearTimeout(t);
  }, [state]);

  // ── Template switch ────────────────────────────────────────
  const applyTemplate = (templateId: string) => {
    const t = getTemplateById(templateId);
    if (!t) return;
    push('Apply template ' + t.name);
    setState((prev) => ({
      ...prev,
      canvas: { ...t.canvas },
      elements: t.elements.map((e) => ({ ...e, id: uid() })),
      activeTemplate: templateId,
      selectedIds: [],
    }));
  };

  // ── Image upload ───────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selected || selected.type !== 'image') return;
    const dataUrl = await fileToDataUrl(file);
    updateSelected({ src: dataUrl } as Partial<ImageElement>);
  };

  // ── Export ─────────────────────────────────────────────────
  const exportCanvas = async (): Promise<HTMLCanvasElement> => {
    const c = document.createElement('canvas');
    const cw = state.canvas.width;
    const ch = state.canvas.height;
    c.width = cw;
    c.height = ch;
    const ctx = c.getContext('2d')!;

    ctx.fillStyle = state.canvas.backgroundColor;
    ctx.fillRect(0, 0, cw, ch);

    if (state.canvas.backgroundImage) {
      try {
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const i = new Image();
          i.onload = () => res(i);
          i.onerror = rej;
          i.src = state.canvas.backgroundImage;
        });
        if (state.canvas.backgroundFit === 'cover') {
          const ratio = Math.max(cw / img.width, ch / img.height);
          const w = img.width * ratio, h = img.height * ratio;
          ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
        } else if (state.canvas.backgroundFit === 'contain') {
          const ratio = Math.min(cw / img.width, ch / img.height);
          const w = img.width * ratio, h = img.height * ratio;
          ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
        } else {
          ctx.drawImage(img, 0, 0, cw, ch);
        }
      } catch { /* skip */ }
    }

    const sorted = [...state.elements].sort((a, b) => a.zIndex - b.zIndex);
    for (const el of sorted) {
      if (!el.visible) continue;
      ctx.save();
      ctx.globalAlpha = el.opacity;
      if (el.rotation) {
        ctx.translate(el.x + el.width / 2, el.y + el.height / 2);
        ctx.rotate((el.rotation * Math.PI) / 180);
        ctx.translate(-(el.x + el.width / 2), -(el.y + el.height / 2));
      }

      if (el.type === 'text') {
        const t = el as TextElement;
        const weight = t.fontWeight >= 700 ? 'bold' : t.fontWeight >= 400 ? 'normal' : `${t.fontWeight}`;
        const style = t.fontStyle === 'italic' ? 'italic ' : '';
        ctx.font = `${style}${weight} ${t.fontSize}px ${t.fontFamily}`;
        ctx.fillStyle = t.color;
        ctx.textAlign = t.textAlign;
        ctx.textBaseline = 'top';
        if (t.letterSpacing) ctx.letterSpacing = `${t.letterSpacing}px`;
        const tx = t.textAlign === 'center' ? el.x + el.width / 2 : t.textAlign === 'right' ? el.x + el.width : el.x;
        const lines = t.content.split('\n');
        const lineH = t.fontSize * t.lineHeight;
        lines.forEach((line, i) => {
          ctx.fillText(line, tx, el.y + i * lineH);
        });
      } else if (el.type === 'image') {
        const img = el as ImageElement;
        if (img.src) {
          try {
            const image = await new Promise<HTMLImageElement>((res, rej) => {
              const i = new Image();
              i.onload = () => res(i);
              i.onerror = rej;
              i.src = img.src;
            });
            if (img.objectFit === 'contain') {
              const ratio = Math.min(el.width / image.width, el.height / image.height);
              const w = image.width * ratio, h = image.height * ratio;
              ctx.drawImage(image, el.x + (el.width - w) / 2, el.y + (el.height - h) / 2, w, h);
            } else if (img.objectFit === 'cover') {
              const ratio = Math.max(el.width / image.width, el.height / image.height);
              const w = image.width * ratio, h = image.height * ratio;
              ctx.drawImage(image, el.x + (el.width - w) / 2, el.y + (el.height - h) / 2, w, h);
            } else {
              ctx.drawImage(image, el.x, el.y, el.width, el.height);
            }
          } catch { /* skip */ }
        }
      } else if (el.type === 'line') {
        const l = el as LineElement;
        ctx.strokeStyle = l.stroke;
        ctx.lineWidth = l.strokeWidth;
        ctx.lineCap = l.strokeLinecap;
        if (l.strokeDasharray) ctx.setLineDash(l.strokeDasharray.split(',').map(Number));
        ctx.beginPath();
        ctx.moveTo(el.x, el.y + el.height / 2);
        ctx.lineTo(el.x + el.width, el.y + el.height / 2);
        ctx.stroke();
      } else if (el.type === 'rect') {
        const r = el as RectElement;
        if (r.fill && r.fill !== 'transparent') {
          ctx.fillStyle = r.fill;
          ctx.beginPath();
          ctx.roundRect(el.x, el.y, el.width, el.height, r.borderRadius);
          ctx.fill();
        }
        if (r.strokeWidth > 0 && r.stroke !== 'transparent') {
          ctx.strokeStyle = r.stroke;
          ctx.lineWidth = r.strokeWidth;
          if (r.strokeDasharray) ctx.setLineDash(r.strokeDasharray.split(',').map(Number));
          ctx.beginPath();
          ctx.roundRect(el.x, el.y, el.width, el.height, r.borderRadius);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    if (state.canvas.borderWidth > 0 && state.canvas.borderColor !== 'transparent') {
      ctx.strokeStyle = state.canvas.borderColor;
      ctx.lineWidth = state.canvas.borderWidth;
      if (state.canvas.borderStyle === 'dashed') ctx.setLineDash([8, 4]);
      else if (state.canvas.borderStyle === 'dotted') ctx.setLineDash([2, 4]);
      else ctx.setLineDash([]);
      ctx.strokeRect(0, 0, cw, ch);
    }

    return c;
  };

  const handleExportPng = async () => {
    const c = await exportCanvas();
    downloadCanvasPng(c, 'certificate.png');
    track('certificate_generated', { format: 'png', mode: 'export' });
    flash('PNG downloaded');
  };

  const handleExportPdf = async () => {
    const c = await exportCanvas();
    const blob = await canvasToPdfBlob(c);
    downloadBlob(blob, 'certificate.pdf');
    track('certificate_generated', { format: 'pdf', mode: 'export' });
    flash('PDF downloaded');
  };

  const handleGenerateBatch = async () => {
    const list = names.split('\n').map((n) => n.trim()).filter(Boolean);
    if (!list.length) { flash('Enter at least one name.'); return; }
    setGenerating(true);
    try {
      const canvases = await Promise.all(list.map(async (name) => {
        const c = document.createElement('canvas');
        const cw = state.canvas.width;
        const ch = state.canvas.height;
        c.width = cw; c.height = ch;
        const ctx = c.getContext('2d')!;
        ctx.fillStyle = state.canvas.backgroundColor;
        ctx.fillRect(0, 0, cw, ch);
        const sorted = [...state.elements].sort((a, b) => a.zIndex - b.zIndex);
        for (const el of sorted) {
          if (!el.visible) continue;
          ctx.save();
          ctx.globalAlpha = el.opacity;
          if (el.type === 'text') {
            const t = el as TextElement;
            const weight = t.fontWeight >= 700 ? 'bold' : 'normal';
            ctx.font = `${t.fontStyle === 'italic' ? 'italic ' : ''}${weight} ${t.fontSize}px ${t.fontFamily}`;
            ctx.fillStyle = t.color;
            ctx.textAlign = t.textAlign;
            ctx.textBaseline = 'top';
            const tx = t.textAlign === 'center' ? el.x + el.width / 2 : t.textAlign === 'right' ? el.x + el.width : el.x;
            let content = t.content;
            if (t.content.includes('Participant Name') || t.content === 'Participant Name') {
              content = name;
            }
            const lines = content.split('\n');
            lines.forEach((line, i) => {
              ctx.fillText(line, tx, el.y + i * t.fontSize * t.lineHeight);
            });
          } else if (el.type === 'line') {
            const l = el as LineElement;
            ctx.strokeStyle = l.stroke;
            ctx.lineWidth = l.strokeWidth;
            ctx.beginPath();
            ctx.moveTo(el.x, el.y + el.height / 2);
            ctx.lineTo(el.x + el.width, el.y + el.height / 2);
            ctx.stroke();
          } else if (el.type === 'rect') {
            const r = el as RectElement;
            if (r.fill !== 'transparent') { ctx.fillStyle = r.fill; ctx.beginPath(); ctx.roundRect(el.x, el.y, el.width, el.height, r.borderRadius); ctx.fill(); }
            if (r.strokeWidth > 0 && r.stroke !== 'transparent') { ctx.strokeStyle = r.stroke; ctx.lineWidth = r.strokeWidth; ctx.beginPath(); ctx.roundRect(el.x, el.y, el.width, el.height, r.borderRadius); ctx.stroke(); }
          } else if (el.type === 'image') {
            const img = el as ImageElement;
            if (img.src) {
              try {
                const image = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = img.src; });
                ctx.drawImage(image, el.x, el.y, el.width, el.height);
              } catch { /* skip */ }
            }
          }
          ctx.restore();
        }
        return c;
      }));
      const blob = canvases.length === 1 ? await canvasToPdfBlob(canvases[0]) : await (await import('@/lib/certificate')).canvasesToPdf(canvases);
      downloadBlob(blob, `certificates_${canvases.length}.pdf`);
      track('certificate_generated', { count: canvases.length });
      flash(`Generated ${canvases.length} certificate(s)`);
    } catch { flash('PDF generation failed.'); }
    finally { setGenerating(false); }
  };

  const handlePublish = () => {
    saveState({ ...state, lastSaved: Date.now() });
    flash('Template published! Changes are live.');
  };

  // ── Render canvas element ──────────────────────────────────
  const renderElement = (el: DesignElement) => {
    const isSelected = state.selectedIds.includes(el.id);
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: el.x,
      top: el.y,
      width: el.width,
      height: el.height,
      opacity: el.opacity,
      transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
      cursor: el.locked ? 'not-allowed' : 'move',
      zIndex: el.zIndex,
      display: el.visible ? undefined : 'none',
    };

    return (
      <div
        key={el.id}
        data-el-id={el.id}
        style={baseStyle}
        className={styles.canvasElement + (isSelected ? ' ' + styles.selected : '')}
        onDoubleClick={() => {
          if (el.type === 'text' && !el.locked) setEditingTextId(el.id);
        }}
      >
        {el.type === 'text' && (
          <div
            style={{
              width: '100%', height: '100%',
              fontFamily: (el as TextElement).fontFamily,
              fontSize: (el as TextElement).fontSize,
              fontWeight: (el as TextElement).fontWeight,
              fontStyle: (el as TextElement).fontStyle,
              color: (el as TextElement).color,
              textAlign: (el as TextElement).textAlign,
              lineHeight: (el as TextElement).lineHeight,
              letterSpacing: (el as TextElement).letterSpacing,
              textDecoration: (el as TextElement).textDecoration,
              whiteSpace: (el as TextElement).whiteSpace === 'nowrap' ? 'nowrap' : 'pre-wrap',
              overflow: 'hidden',
              textShadow: (el as TextElement).textShadow || undefined,
              padding: 4,
            }}
          >
            {editingTextId === el.id ? (
              <textarea
                autoFocus
                value={(el as TextElement).content}
                onChange={(e) => updateSelected({ content: e.target.value } as Partial<TextElement>)}
                onBlur={() => { setEditingTextId(null); push('Edit text'); }}
                onKeyDown={(e) => { if (e.key === 'Escape') setEditingTextId(null); e.stopPropagation(); }}
                style={{
                  width: '100%', height: '100%', background: 'transparent', border: '1px solid #6366f1',
                  color: (el as TextElement).color, fontFamily: (el as TextElement).fontFamily,
                  fontSize: (el as TextElement).fontSize, fontWeight: (el as TextElement).fontWeight,
                  textAlign: (el as TextElement).textAlign, resize: 'none', outline: 'none', padding: 2,
                }}
              />
            ) : (
              (el as TextElement).content
            )}
          </div>
        )}
        {el.type === 'image' && (el as ImageElement).src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={(el as ImageElement).src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: (el as ImageElement).objectFit, borderRadius: (el as ImageElement).borderRadius, pointerEvents: 'none' }}
          />
        )}
        {el.type === 'image' && !(el as ImageElement).src && (
          <div className={styles.imagePlaceholder}>Drop image here</div>
        )}
        {el.type === 'line' && (
          <div style={{
            position: 'absolute', top: '50%', left: 0, width: '100%',
            height: (el as LineElement).strokeWidth,
            background: (el as LineElement).stroke,
            borderRadius: (el as LineElement).strokeLinecap === 'round' ? (el as LineElement).strokeWidth : 0,
          }} />
        )}
        {el.type === 'rect' && (
          <div style={{
            width: '100%', height: '100%',
            background: (el as RectElement).fill,
            border: `${(el as RectElement).strokeWidth}px solid ${(el as RectElement).stroke}`,
            borderRadius: (el as RectElement).borderRadius,
            borderStyle: (el as RectElement).strokeDasharray ? 'dashed' : 'solid',
          }} />
        )}

        {isSelected && !el.locked && (
          <>
            <div data-handle="nw" className={styles.handle + ' ' + styles.handleNw} />
            <div data-handle="ne" className={styles.handle + ' ' + styles.handleNe} />
            <div data-handle="sw" className={styles.handle + ' ' + styles.handleSw} />
            <div data-handle="se" className={styles.handle + ' ' + styles.handleSe} />
            <div data-handle="n" className={styles.handle + ' ' + styles.handleN} />
            <div data-handle="s" className={styles.handle + ' ' + styles.handleS} />
            <div data-handle="e" className={styles.handle + ' ' + styles.handleE} />
            <div data-handle="w" className={styles.handle + ' ' + styles.handleW} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.designer}>
      {/* ── Toolbar ──────────────────────────────────────── */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button className={styles.toolBtn} onClick={onBack} title="Back to Certificate Manager">Back</button>
          <span className={styles.toolbarSep} />
          <button className={styles.toolBtn} onClick={() => setState((s) => undo(s))} title="Undo (Ctrl+Z)" disabled={state.historyIndex <= 0}>Undo</button>
          <button className={styles.toolBtn} onClick={() => setState((s) => redo(s))} title="Redo (Ctrl+Shift+Z)" disabled={state.historyIndex >= state.history.length - 1}>Redo</button>
        </div>
        <div className={styles.toolbarGroup}>
          <button className={styles.toolBtn} onClick={() => setState((p) => ({ ...p, zoom: Math.max(0.25, p.zoom - 0.1) }))}>-</button>
          <span className={styles.zoomLabel}>{Math.round(state.zoom * 100)}%</span>
          <button className={styles.toolBtn} onClick={() => setState((p) => ({ ...p, zoom: Math.min(3, p.zoom + 0.1) }))}>+</button>
          <button className={styles.toolBtn} onClick={() => setState((p) => ({ ...p, zoom: 1 }))}>Reset</button>
          <span className={styles.toolbarSep} />
          <button className={styles.toolBtn} onClick={() => setState((p) => ({ ...p, showGrid: !p.showGrid }))}>{state.showGrid ? 'Hide Grid' : 'Show Grid'}</button>
          <button className={styles.toolBtn} onClick={() => setState((p) => ({ ...p, snapToGrid: !p.snapToGrid }))}>{state.snapToGrid ? 'Snap On' : 'Snap Off'}</button>
        </div>
        <div className={styles.toolbarGroup}>
          <input
            className={styles.nameInput}
            value={previewName}
            onChange={(e) => setPreviewName(e.target.value)}
            placeholder="Preview name"
          />
          <button className={styles.toolBtnAccent} onClick={handlePublish}>Publish</button>
        </div>
      </div>

      <div className={styles.workspace}>
        {/* ── Left sidebar (layers / templates) ────────── */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarTabs}>
            <button className={styles.sidebarTab + (activePanel === 'layers' ? ' ' + styles.activeTab : '')} onClick={() => setActivePanel('layers')}>Layers</button>
            <button className={styles.sidebarTab + (activePanel === 'templates' ? ' ' + styles.activeTab : '')} onClick={() => setActivePanel('templates')}>Templates</button>
          </div>

          {activePanel === 'layers' && (
            <div className={styles.layerList}>
              {[...state.elements].sort((a, b) => b.zIndex - a.zIndex).map((el) => (
                <div
                  key={el.id}
                  className={styles.layerItem + (state.selectedIds.includes(el.id) ? ' ' + styles.layerActive : '')}
                  onClick={() => setState((prev) => ({ ...prev, selectedIds: [el.id] }))}
                >
                  <span className={styles.layerIcon}>
                    {el.type === 'text' ? 'T' : el.type === 'image' ? 'I' : el.type === 'line' ? '-' : 'R'}
                  </span>
                  <span className={styles.layerName}>
                    {el.type === 'text' ? (el as TextElement).content.slice(0, 20) : el.type}
                  </span>
                  <button
                    className={styles.layerVis}
                    onClick={(e) => { e.stopPropagation(); updateElements(state, (els) => els.map((x) => x.id === el.id ? { ...x, visible: !x.visible } : x)); }}
                  >
                    {el.visible ? 'V' : 'H'}
                  </button>
                </div>
              ))}
              {state.elements.length === 0 && <p className={styles.emptyMsg}>No elements yet. Add from toolbar.</p>}
            </div>
          )}

          {activePanel === 'templates' && (
            <div className={styles.templateGrid}>
              {TEMPLATE_PRESETS.map((t) => (
                <button
                  key={t.id}
                  className={styles.templateCard + (state.activeTemplate === t.id ? ' ' + styles.templateActive : '')}
                  onClick={() => applyTemplate(t.id)}
                >
                  <div className={styles.templateThumb} style={{ background: t.canvas.backgroundColor, borderColor: t.canvas.borderColor }}>
                    <span className={styles.templateInitial}>{t.name[0]}</span>
                  </div>
                  <span className={styles.templateName}>{t.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Canvas area ──────────────────────────────── */}
        <div className={styles.canvasArea}>
          <div
            className={styles.canvasWrap}
            style={{ transform: `scale(${state.zoom})`, transformOrigin: 'top left' }}
          >
            <div
              ref={canvasRef}
              className={styles.canvas}
              style={{
                width: state.canvas.width,
                height: state.canvas.height,
                backgroundColor: state.canvas.backgroundColor,
                backgroundImage: state.canvas.backgroundImage ? `url(${state.canvas.backgroundImage})` : undefined,
                backgroundSize: state.canvas.backgroundFit === 'cover' ? 'cover' : state.canvas.backgroundFit === 'contain' ? 'contain' : 'auto',
                border: state.canvas.borderWidth > 0 ? `${state.canvas.borderWidth}px ${state.canvas.borderStyle} ${state.canvas.borderColor}` : undefined,
                borderRadius: state.canvas.borderRadius,
              }}
              onMouseDown={handleCanvasMouseDown}
            >
              {state.showGrid && (
                <div className={styles.gridOverlay} style={{
                  backgroundSize: `${state.gridSize}px ${state.gridSize}px`,
                }} />
              )}
              {[...state.elements].sort((a, b) => a.zIndex - b.zIndex).map(renderElement)}
            </div>
          </div>
        </div>

        {/* ── Right sidebar (properties + tools) ──────── */}
        <div className={styles.rightSidebar}>
          <div className={styles.sidebarTabs}>
            <button className={styles.sidebarTab + (activePanel === 'properties' ? ' ' + styles.activeTab : '')} onClick={() => setActivePanel('properties')}>Properties</button>
          </div>

          {/* Add element buttons */}
          <div className={styles.addBar}>
            <button className={styles.addBtn} onClick={() => addElement('text')}>+ Text</button>
            <button className={styles.addBtn} onClick={() => addElement('image')}>+ Image</button>
            <button className={styles.addBtn} onClick={() => addElement('line')}>+ Line</button>
            <button className={styles.addBtn} onClick={() => addElement('rect')}>+ Rect</button>
          </div>

          {selected ? (
            <div className={styles.propsPanel}>
              {/* Position & Size */}
              <div className={styles.propSection}>
                <h4 className={styles.propTitle}>Position & Size</h4>
                <div className={styles.propRow}>
                  <label className={styles.propField}>
                    <span>X</span>
                    <input type="number" value={Math.round(selected.x)} onChange={(e) => updateSelected({ x: +e.target.value })} />
                  </label>
                  <label className={styles.propField}>
                    <span>Y</span>
                    <input type="number" value={Math.round(selected.y)} onChange={(e) => updateSelected({ y: +e.target.value })} />
                  </label>
                </div>
                <div className={styles.propRow}>
                  <label className={styles.propField}>
                    <span>W</span>
                    <input type="number" value={Math.round(selected.width)} onChange={(e) => updateSelected({ width: +e.target.value })} />
                  </label>
                  <label className={styles.propField}>
                    <span>H</span>
                    <input type="number" value={Math.round(selected.height)} onChange={(e) => updateSelected({ height: +e.target.value })} />
                  </label>
                </div>
                <div className={styles.propRow}>
                  <label className={styles.propField}>
                    <span>Rotation</span>
                    <input type="number" value={selected.rotation} onChange={(e) => updateSelected({ rotation: +e.target.value })} />
                  </label>
                  <label className={styles.propField}>
                    <span>Opacity</span>
                    <input type="number" min={0} max={1} step={0.1} value={selected.opacity} onChange={(e) => updateSelected({ opacity: +e.target.value })} />
                  </label>
                </div>
              </div>

              {/* Align */}
              <div className={styles.propSection}>
                <h4 className={styles.propTitle}>Align</h4>
                <div className={styles.alignRow}>
                  <button className={styles.alignBtn} onClick={() => alignElement('left')}>L</button>
                  <button className={styles.alignBtn} onClick={() => alignElement('center')}>C</button>
                  <button className={styles.alignBtn} onClick={() => alignElement('right')}>R</button>
                  <button className={styles.alignBtn} onClick={() => alignElement('top')}>T</button>
                  <button className={styles.alignBtn} onClick={() => alignElement('middle')}>M</button>
                  <button className={styles.alignBtn} onClick={() => alignElement('bottom')}>B</button>
                </div>
              </div>

              {/* Text properties */}
              {selected.type === 'text' && (
                <div className={styles.propSection}>
                  <h4 className={styles.propTitle}>Typography</h4>
                  <label className={styles.propField}>
                    <span>Content</span>
                    <textarea
                      value={(selected as TextElement).content}
                      rows={3}
                      onChange={(e) => updateSelected({ content: e.target.value } as Partial<TextElement>)}
                    />
                  </label>
                  <label className={styles.propField}>
                    <span>Font</span>
                    <select value={(selected as TextElement).fontFamily} onChange={(e) => updateSelected({ fontFamily: e.target.value } as Partial<TextElement>)}>
                      {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </label>
                  <div className={styles.propRow}>
                    <label className={styles.propField}>
                      <span>Size</span>
                      <input type="number" value={(selected as TextElement).fontSize} onChange={(e) => updateSelected({ fontSize: +e.target.value } as Partial<TextElement>)} />
                    </label>
                    <label className={styles.propField}>
                      <span>Weight</span>
                      <select value={(selected as TextElement).fontWeight} onChange={(e) => updateSelected({ fontWeight: +e.target.value } as Partial<TextElement>)}>
                        <option value={300}>Light</option>
                        <option value={400}>Regular</option>
                        <option value={500}>Medium</option>
                        <option value={600}>Semibold</option>
                        <option value={700}>Bold</option>
                      </select>
                    </label>
                  </div>
                  <div className={styles.propRow}>
                    <label className={styles.propField}>
                      <span>Color</span>
                      <input type="color" value={(selected as TextElement).color} onChange={(e) => updateSelected({ color: e.target.value } as Partial<TextElement>)} />
                    </label>
                    <label className={styles.propField}>
                      <span>Align</span>
                      <select value={(selected as TextElement).textAlign} onChange={(e) => updateSelected({ textAlign: e.target.value } as Partial<TextElement>)}>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </label>
                  </div>
                  <div className={styles.propRow}>
                    <label className={styles.propField}>
                      <span>Line Height</span>
                      <input type="number" step={0.1} value={(selected as TextElement).lineHeight} onChange={(e) => updateSelected({ lineHeight: +e.target.value } as Partial<TextElement>)} />
                    </label>
                    <label className={styles.propField}>
                      <span>Spacing</span>
                      <input type="number" value={(selected as TextElement).letterSpacing} onChange={(e) => updateSelected({ letterSpacing: +e.target.value } as Partial<TextElement>)} />
                    </label>
                  </div>
                  <label className={styles.propField}>
                    <span>Style</span>
                    <select value={(selected as TextElement).fontStyle} onChange={(e) => updateSelected({ fontStyle: e.target.value } as Partial<TextElement>)}>
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                    </select>
                  </label>
                </div>
              )}

              {/* Image properties */}
              {selected.type === 'image' && (
                <div className={styles.propSection}>
                  <h4 className={styles.propTitle}>Image</h4>
                  <input type="file" accept=".png,.jpg,.jpeg,.gif,.svg" onChange={handleImageUpload} />
                  <label className={styles.propField}>
                    <span>Fit</span>
                    <select value={(selected as ImageElement).objectFit} onChange={(e) => updateSelected({ objectFit: e.target.value } as Partial<ImageElement>)}>
                      <option value="contain">Contain</option>
                      <option value="cover">Cover</option>
                      <option value="fill">Fill</option>
                    </select>
                  </label>
                  <label className={styles.propField}>
                    <span>Border Radius</span>
                    <input type="number" value={(selected as ImageElement).borderRadius} onChange={(e) => updateSelected({ borderRadius: +e.target.value } as Partial<ImageElement>)} />
                  </label>
                </div>
              )}

              {/* Line properties */}
              {selected.type === 'line' && (
                <div className={styles.propSection}>
                  <h4 className={styles.propTitle}>Line</h4>
                  <div className={styles.propRow}>
                    <label className={styles.propField}>
                      <span>Color</span>
                      <input type="color" value={(selected as LineElement).stroke} onChange={(e) => updateSelected({ stroke: e.target.value } as Partial<LineElement>)} />
                    </label>
                    <label className={styles.propField}>
                      <span>Width</span>
                      <input type="number" value={(selected as LineElement).strokeWidth} onChange={(e) => updateSelected({ strokeWidth: +e.target.value } as Partial<LineElement>)} />
                    </label>
                  </div>
                  <label className={styles.propField}>
                    <span>Dash</span>
                    <input type="text" placeholder="e.g. 8,4" value={(selected as LineElement).strokeDasharray} onChange={(e) => updateSelected({ strokeDasharray: e.target.value } as Partial<LineElement>)} />
                  </label>
                </div>
              )}

              {/* Rect properties */}
              {selected.type === 'rect' && (
                <div className={styles.propSection}>
                  <h4 className={styles.propTitle}>Rectangle</h4>
                  <div className={styles.propRow}>
                    <label className={styles.propField}>
                      <span>Fill</span>
                      <input type="color" value={(selected as RectElement).fill === 'transparent' ? '#000000' : (selected as RectElement).fill} onChange={(e) => updateSelected({ fill: e.target.value } as Partial<RectElement>)} />
                    </label>
                    <label className={styles.propField}>
                      <span>Stroke</span>
                      <input type="color" value={(selected as RectElement).stroke === 'transparent' ? '#000000' : (selected as RectElement).stroke} onChange={(e) => updateSelected({ stroke: e.target.value } as Partial<RectElement>)} />
                    </label>
                  </div>
                  <div className={styles.propRow}>
                    <label className={styles.propField}>
                      <span>Stroke W</span>
                      <input type="number" value={(selected as RectElement).strokeWidth} onChange={(e) => updateSelected({ strokeWidth: +e.target.value } as Partial<RectElement>)} />
                    </label>
                    <label className={styles.propField}>
                      <span>Radius</span>
                      <input type="number" value={(selected as RectElement).borderRadius} onChange={(e) => updateSelected({ borderRadius: +e.target.value } as Partial<RectElement>)} />
                    </label>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className={styles.propSection}>
                <h4 className={styles.propTitle}>Actions</h4>
                <div className={styles.actionRow}>
                  <button className={styles.actionBtn} onClick={duplicateSelected}>Duplicate</button>
                  <button className={styles.actionBtnDanger} onClick={deleteSelected}>Delete</button>
                </div>
                <div className={styles.actionRow}>
                  <button className={styles.actionBtn} onClick={bringForward}>Bring Forward</button>
                  <button className={styles.actionBtn} onClick={sendBackward}>Send Back</button>
                </div>
                <label className={styles.propField}>
                  <input type="checkbox" checked={selected.locked} onChange={(e) => updateSelected({ locked: e.target.checked })} />
                  <span>Lock element</span>
                </label>
              </div>
            </div>
          ) : (
            <div className={styles.propsPanel}>
              {/* Canvas settings when nothing selected */}
              <div className={styles.propSection}>
                <h4 className={styles.propTitle}>Canvas</h4>
                <label className={styles.propField}>
                  <span>Preset</span>
                  <select value={`${state.canvas.width}x${state.canvas.height}`} onChange={(e) => {
                    const [w, h] = e.target.value.split('x').map(Number);
                    setState((p) => ({ ...p, canvas: { ...p.canvas, width: w, height: h } }));
                  }}>
                    {Object.entries(CANVAS_PRESETS).map(([k, v]) => (
                      <option key={k} value={`${v.width}x${v.height}`}>{v.label}</option>
                    ))}
                  </select>
                </label>
                <div className={styles.propRow}>
                  <label className={styles.propField}>
                    <span>Width</span>
                    <input type="number" value={state.canvas.width} onChange={(e) => setState((p) => ({ ...p, canvas: { ...p.canvas, width: +e.target.value } }))} />
                  </label>
                  <label className={styles.propField}>
                    <span>Height</span>
                    <input type="number" value={state.canvas.height} onChange={(e) => setState((p) => ({ ...p, canvas: { ...p.canvas, height: +e.target.value } }))} />
                  </label>
                </div>
                <label className={styles.propField}>
                  <span>Background</span>
                  <input type="color" value={state.canvas.backgroundColor} onChange={(e) => setState((p) => ({ ...p, canvas: { ...p.canvas, backgroundColor: e.target.value } }))} />
                </label>
                <label className={styles.propField}>
                  <span>Border</span>
                  <input type="color" value={state.canvas.borderColor} onChange={(e) => setState((p) => ({ ...p, canvas: { ...p.canvas, borderColor: e.target.value } }))} />
                </label>
                <div className={styles.propRow}>
                  <label className={styles.propField}>
                    <span>Border W</span>
                    <input type="number" value={state.canvas.borderWidth} onChange={(e) => setState((p) => ({ ...p, canvas: { ...p.canvas, borderWidth: +e.target.value } }))} />
                  </label>
                  <label className={styles.propField}>
                    <span>Style</span>
                    <select value={state.canvas.borderStyle} onChange={(e) => setState((p) => ({ ...p, canvas: { ...p.canvas, borderStyle: e.target.value as 'solid' | 'dashed' | 'dotted' | 'double' } }))}>
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Export section */}
          <div className={styles.exportSection}>
            <h4 className={styles.propTitle}>Export</h4>
            <button className={styles.exportBtn} onClick={handleExportPng}>Download PNG</button>
            <button className={styles.exportBtn} onClick={handleExportPdf}>Download PDF</button>
            <div className={styles.batchSection}>
              <textarea
                className={styles.namesArea}
                value={names}
                onChange={(e) => setNames(e.target.value)}
                placeholder={'Robin R G\nAlice Thomas\nBob Martin'}
                rows={4}
              />
              <button className={styles.exportBtn} onClick={handleGenerateBatch} disabled={generating}>
                {generating ? 'Generating...' : 'Batch PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Status bar ──────────────────────────────────── */}
      <div className={styles.statusBar}>
        <span>{state.elements.length} element(s)</span>
        <span>{state.canvas.width} x {state.canvas.height}px</span>
        <span>History: {state.historyIndex + 1}/{state.history.length}</span>
        {state.lastSaved > 0 && <span>Saved {new Date(state.lastSaved).toLocaleTimeString()}</span>}
        {status && <span className={styles.statusMsg}>{status}</span>}
      </div>
    </div>
  );
}
