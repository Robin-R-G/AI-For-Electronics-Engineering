'use client';
import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { downloadsData, downloadCategories, DownloadItem } from '@/data/downloadsData';
import { StoredFile, getFiles, subscribeStorage, fileTypeLabel, formatBytes } from '@/lib/storage';
import { docsSections } from '@/lib/docsConfig';
import { getSettings } from '@/lib/settings';
import { renderCertificate } from '@/lib/certificate';
import styles from './downloads.module.css';

const getCategoryColor = (category: DownloadItem['category']) => {
  switch (category) {
    case 'Document': return styles.catDocument;
    case 'Code': return styles.catCode;
    case 'Template': return styles.catTemplate;
    case 'Presentation': return styles.catPresentation;
  }
};

const getTypeColor = (type: string) => {
  if (type.includes('PDF')) return styles.typePdf;
  if (type.includes('ZIP')) return styles.typeZip;
  if (type.includes('PPTX')) return styles.typePptx;
  return styles.typePdf;
};

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, currentY);
      line = word + ' ';
      currentY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) { ctx.fillText(line.trim(), x, currentY); currentY += lineHeight; }
  return currentY;
}

function generateWorkshopNotesImage(): HTMLCanvasElement {
  const W = 1200, H = 1600;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  // background
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  // accent bar
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#00e5ff'); grad.addColorStop(1, '#0055ff');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 8);
  // header
  ctx.fillStyle = '#00e5ff'; ctx.font = 'bold 42px sans-serif';
  ctx.fillText('AI for Electronics Engineers Workshop', 60, 80);
  ctx.fillStyle = '#8b949e'; ctx.font = '22px sans-serif';
  ctx.fillText('Workshop Notes  |  v2.1  |  July 18, 2026', 60, 115);
  // divider
  ctx.strokeStyle = '#21262d'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();
  // sections
  const sections = [
    { num: '01', title: 'Introduction to AI for Electronics Engineers', desc: 'Overview of AI applications in hardware design, embedded systems, and manufacturing.' },
    { num: '02', title: 'AI Fundamentals', desc: 'Cloud vs Edge computing, model quantization, inference optimization for resource-constrained devices.' },
    { num: '03', title: 'Machine Learning', desc: 'Supervised and unsupervised learning, feature engineering, model evaluation metrics.' },
    { num: '04', title: 'Deep Learning', desc: 'Neural network architectures, CNNs for signal processing, backpropagation and gradient descent.' },
    { num: '05', title: 'Generative AI', desc: 'VAEs, GANs, and diffusion models for hardware synthesis and design automation.' },
    { num: '06', title: 'Large Language Models', desc: 'Transformer architecture, RAG pipelines, running local models on embedded hardware.' },
    { num: '07', title: 'AI Tools', desc: 'ChatGPT, Claude, Copilot, Cursor — best practices for hardware engineering workflows.' },
    { num: '08', title: 'Electronics Applications', desc: 'TinyML on microcontrollers, AI-assisted PCB routing, predictive maintenance.' },
    { num: '09', title: 'Prompt Engineering', desc: 'Role-based prompting, chain-of-thought, few-shot examples for code generation.' },
    { num: '10', title: 'Career Roadmap', desc: 'Pathways into embedded AI, required skills, certifications, and portfolio building.' },
    { num: '11', title: 'Future Trends', desc: 'Neuromorphic computing, self-driving labs, AI-powered EDA tools, RISC-V AI accelerators.' },
  ];
  let y = 190;
  for (const s of sections) {
    // number badge
    ctx.fillStyle = 'rgba(0,229,255,0.12)';
    ctx.beginPath(); ctx.roundRect(60, y - 5, 55, 35, 6); ctx.fill();
    ctx.fillStyle = '#00e5ff'; ctx.font = 'bold 18px monospace';
    ctx.fillText(s.num, 72, y + 20);
    // title
    ctx.fillStyle = '#e6edf3'; ctx.font = 'bold 24px sans-serif';
    ctx.fillText(s.title, 130, y + 20);
    // desc
    ctx.fillStyle = '#8b949e'; ctx.font = '18px sans-serif';
    y = wrapText(ctx, s.desc, 130, y + 48, W - 200, 26) + 20;
    y += 20;
  }
  // footer
  ctx.fillStyle = '#21262d'; ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = '#8b949e'; ctx.font = '16px sans-serif';
  ctx.fillText('Designed by Robin R G  |  AI for Electronics Engineers Workshop', 60, H - 30);
  return c;
}

function generatePromptBookImage(): HTMLCanvasElement {
  const W = 1200, H = 1400;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#a855f7'); grad.addColorStop(1, '#6366f1');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#a855f7'; ctx.font = 'bold 42px sans-serif';
  ctx.fillText('Prompt Engineering Book', 60, 80);
  ctx.fillStyle = '#8b949e'; ctx.font = '22px sans-serif';
  ctx.fillText('100+ Battle-Tested Prompts  |  v1.4', 60, 115);
  ctx.strokeStyle = '#21262d'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();
  const sections = [
    { cat: 'HARDWARE DEBUGGING', items: ['I2C Scanner Debug — systematic I2C troubleshooting', 'SPI Communication Debug — SPI configuration checks', 'UART Debug — serial communication verification'] },
    { cat: 'CODE GENERATION', items: ['HAL Function Generation — STM32 HAL code', 'FreeRTOS Task Design — RTOS task architecture', 'Python ML Pipeline — training pipeline setup'] },
    { cat: 'DESIGN REVIEW', items: ['PCB Layout Review — 4-layer board analysis', 'Schematic Review — circuit validation', 'Datasheet Analysis — component selection'] },
  ];
  let y = 190;
  for (const sec of sections) {
    ctx.fillStyle = 'rgba(168,85,247,0.15)';
    ctx.beginPath(); ctx.roundRect(60, y, W - 120, 36, 6); ctx.fill();
    ctx.fillStyle = '#c084fc'; ctx.font = 'bold 18px sans-serif';
    ctx.fillText(sec.cat, 80, y + 24);
    y += 60;
    for (const item of sec.items) {
      ctx.fillStyle = '#00e5ff'; ctx.font = 'bold 18px sans-serif';
      ctx.fillText('▸', 80, y + 4);
      ctx.fillStyle = '#e6edf3'; ctx.font = '20px sans-serif';
      y = wrapText(ctx, item, 110, y + 4, W - 200, 28) + 16;
    }
    y += 20;
  }
  ctx.fillStyle = '#21262d'; ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = '#8b949e'; ctx.font = '16px sans-serif';
  ctx.fillText('Designed by Robin R G  |  AI for Electronics Engineers Workshop', 60, H - 30);
  return c;
}

function generateCheatSheetImage(): HTMLCanvasElement {
  const W = 1200, H = 800;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#f59e0b'); grad.addColorStop(1, '#ef4444');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 42px sans-serif';
  ctx.fillText('AI Tools Cheat Sheet', 60, 80);
  ctx.fillStyle = '#8b949e'; ctx.font = '22px sans-serif';
  ctx.fillText('Quick Reference  |  v3.0', 60, 115);
  ctx.strokeStyle = '#21262d'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();
  const tools = [
    { name: 'ChatGPT', color: '#10a37f', use: 'General coding, temp 0.1–0.3', tip: 'Best for quick prototypes' },
    { name: 'Claude', color: '#cc785c', use: 'Long code reviews, 200K context', tip: 'Best for large refactors' },
    { name: 'Copilot', color: '#6e40c9', use: 'Inline completion, use comments', tip: 'Tab to accept, Esc to dismiss' },
    { name: 'Cursor', color: '#00e5ff', use: 'Codebase-aware editing', tip: 'Cmd+K edit, Cmd+L chat' },
    { name: 'Ollama', color: '#ffffff', use: 'Private / offline work', tip: 'Run models locally' },
  ];
  let y = 180;
  for (const t of tools) {
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath(); ctx.roundRect(60, y, W - 120, 90, 10); ctx.fill();
    ctx.fillStyle = t.color; ctx.font = 'bold 26px sans-serif';
    ctx.fillText(t.name, 85, y + 38);
    ctx.fillStyle = '#e6edf3'; ctx.font = '20px sans-serif';
    ctx.fillText(t.use, 85, y + 68);
    ctx.fillStyle = '#8b949e'; ctx.font = '18px sans-serif';
    ctx.fillText(t.tip, 600, y + 52);
    y += 110;
  }
  ctx.fillStyle = '#21262d'; ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = '#8b949e'; ctx.font = '16px sans-serif';
  ctx.fillText('Designed by Robin R G  |  AI for Electronics Engineers Workshop', 60, H - 30);
  return c;
}

function generateProjectListImage(): HTMLCanvasElement {
  const W = 1200, H = 1000;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#22c55e'); grad.addColorStop(1, '#00e5ff');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#22c55e'; ctx.font = 'bold 42px sans-serif';
  ctx.fillText('Project Ideas & Specs', 60, 80);
  ctx.fillStyle = '#8b949e'; ctx.font = '22px sans-serif';
  ctx.fillText('50+ Projects  |  v1.0  |  July 10, 2026', 60, 115);
  ctx.strokeStyle = '#21262d'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();
  const levels = [
    { label: 'BEGINNER', color: '#22c55e', projects: ['LED Mood Light', 'Digital Thermometer', 'Ultrasonic Distance Meter', 'IR Remote Decoder'] },
    { label: 'INTERMEDIATE', color: '#f59e0b', projects: ['Wi-Fi Weather Station', 'Line Follower Robot', 'Bluetooth HC-05 Controller', 'PID Motor Controller'] },
    { label: 'ADVANCED', color: '#ef4444', projects: ['ESP32-CAM Security System', 'STM32 CAN Bus Analyzer', 'TinyML Gesture Recognition', 'Self-Balancing Robot'] },
  ];
  let y = 180;
  for (const lv of levels) {
    ctx.fillStyle = `${lv.color}22`;
    ctx.beginPath(); ctx.roundRect(60, y, W - 120, 36, 6); ctx.fill();
    ctx.fillStyle = lv.color; ctx.font = 'bold 20px sans-serif';
    ctx.fillText(lv.label, 80, y + 25);
    y += 55;
    for (const p of lv.projects) {
      ctx.fillStyle = '#00e5ff'; ctx.fillText('◆', 85, y + 4);
      ctx.fillStyle = '#e6edf3'; ctx.font = '22px sans-serif';
      ctx.fillText(p, 115, y + 5);
      y += 38;
    }
    y += 20;
  }
  ctx.fillStyle = '#21262d'; ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = '#8b949e'; ctx.font = '16px sans-serif';
  ctx.fillText('Designed by Robin R G  |  AI for Electronics Engineers Workshop', 60, H - 30);
  return c;
}

function generateSourceCodeImage(): HTMLCanvasElement {
  const W = 1200, H = 700;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#00e5ff'); grad.addColorStop(1, '#22c55e');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#00e5ff'; ctx.font = 'bold 42px sans-serif';
  ctx.fillText('Workshop Source Code', 60, 80);
  ctx.fillStyle = '#8b949e'; ctx.font = '22px sans-serif';
  ctx.fillText('All Live Demo Examples  |  v2.0', 60, 115);
  ctx.strokeStyle = '#21262d'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();
  const files = [
    { name: 'esp32_deep_sleep.ino', desc: 'ESP32 deep sleep with wake-on-motion', lang: 'C++' },
    { name: 'stm32_pid_controller.c', desc: 'STM32 PID motor controller implementation', lang: 'C' },
    { name: 'i2c_scanner.py', desc: 'I2C bus scanner and device detector', lang: 'Python' },
    { name: 'tinym Gesture_model.tflite', desc: 'Pre-trained gesture recognition model', lang: 'TFLite' },
  ];
  let y = 180;
  for (const f of files) {
    ctx.fillStyle = 'rgba(0,229,255,0.04)';
    ctx.beginPath(); ctx.roundRect(60, y, W - 120, 70, 8); ctx.fill();
    ctx.fillStyle = '#00e5ff'; ctx.font = 'bold 20px monospace';
    ctx.fillText(f.name, 85, y + 30);
    ctx.fillStyle = '#8b949e'; ctx.font = '17px sans-serif';
    ctx.fillText(f.desc, 85, y + 55);
    ctx.fillStyle = '#22c55e44';
    ctx.beginPath(); ctx.roundRect(W - 170, y + 15, 70, 28, 4); ctx.fill();
    ctx.fillStyle = '#22c55e'; ctx.font = 'bold 14px sans-serif';
    ctx.fillText(f.lang, W - 158, y + 34);
    y += 90;
  }
  ctx.fillStyle = '#21262d'; ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = '#8b949e'; ctx.font = '16px sans-serif';
  ctx.fillText('Designed by Robin R G  |  AI for Electronics Engineers Workshop', 60, H - 30);
  return c;
}

function generatePresentationImage(): HTMLCanvasElement {
  const W = 1200, H = 700;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#b400ff'); grad.addColorStop(1, '#6366f1');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#b400ff'; ctx.font = 'bold 42px sans-serif';
  ctx.fillText('Workshop Presentation', 60, 80);
  ctx.fillStyle = '#8b949e'; ctx.font = '22px sans-serif';
  ctx.fillText('228 Slides  |  v4.1  |  July 18, 2026', 60, 115);
  ctx.strokeStyle = '#21262d'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();
  const topics = ['Introduction & Overview', 'AI Fundamentals', 'Machine Learning', 'Deep Learning', 'Generative AI', 'LLMs & Transformers', 'AI Tools & Frameworks', 'Electronics Applications', 'Hands-on Labs', 'Career Roadmap', 'Q&A'];
  ctx.fillStyle = '#8b949e'; ctx.font = '20px sans-serif';
  ctx.fillText('Slides cover all 11 workshop modules with diagrams, code samples, and live demos.', 60, 175);
  let y = 220;
  for (let i = 0; i < topics.length; i++) {
    ctx.fillStyle = 'rgba(180,0,255,0.08)';
    ctx.beginPath(); ctx.roundRect(60, y, W - 120, 38, 6); ctx.fill();
    ctx.fillStyle = '#c084fc'; ctx.font = 'bold 16px monospace';
    ctx.fillText(String(i + 1).padStart(2, '0'), 80, y + 25);
    ctx.fillStyle = '#e6edf3'; ctx.font = '20px sans-serif';
    ctx.fillText(topics[i], 120, y + 25);
    y += 48;
  }
  ctx.fillStyle = '#21262d'; ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = '#8b949e'; ctx.font = '16px sans-serif';
  ctx.fillText('Designed by Robin R G  |  AI for Electronics Engineers Workshop', 60, H - 30);
  return c;
}

function generateResourcesImage(): HTMLCanvasElement {
  const W = 1200, H = 900;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#00e5ff'); grad.addColorStop(1, '#22c55e');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 8);
  ctx.fillStyle = '#00e5ff'; ctx.font = 'bold 42px sans-serif';
  ctx.fillText('Resources & Reading List', 60, 80);
  ctx.fillStyle = '#8b949e'; ctx.font = '22px sans-serif';
  ctx.fillText('Curated Collection  |  v1.1', 60, 115);
  ctx.strokeStyle = '#21262d'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();
  const cats = [
    { name: 'BOOKS', items: ['Hands-On Machine Learning (Géron)', 'TinyML (Cimpanu)', 'Programming Computer Vision (Lutz)'] },
    { name: 'YOUTUBE', items: ['Ben Eater', 'Phil\'s Lab', 'Low Power Lab'] },
    { name: 'ONLINE', items: ['Coursera — Edge AI', 'Fast.ai — Practical DL', 'Hugging Face Course'] },
    { name: 'TOOLS', items: ['STM32CubeIDE', 'Arduino IDE 2.x', 'PlatformIO'] },
  ];
  let y = 180;
  for (const cat of cats) {
    ctx.fillStyle = 'rgba(0,229,255,0.1)';
    ctx.beginPath(); ctx.roundRect(60, y, W - 120, 32, 5); ctx.fill();
    ctx.fillStyle = '#00e5ff'; ctx.font = 'bold 17px sans-serif';
    ctx.fillText(cat.name, 80, y + 23);
    y += 48;
    for (const item of cat.items) {
      ctx.fillStyle = '#e6edf3'; ctx.font = '20px sans-serif';
      ctx.fillText('  •  ' + item, 85, y + 4);
      y += 34;
    }
    y += 16;
  }
  ctx.fillStyle = '#21262d'; ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = '#8b949e'; ctx.font = '16px sans-serif';
  ctx.fillText('Designed by Robin R G  |  AI for Electronics Engineers Workshop', 60, H - 30);
  return c;
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }, 'image/png');
}

const imageGenerators: Record<string, (name?: string) => HTMLCanvasElement> = {
  'workshop-notes': () => generateWorkshopNotesImage(),
  'prompt-book': () => generatePromptBookImage(),
  'cheat-sheet': () => generateCheatSheetImage(),
  'project-list': () => generateProjectListImage(),
  'source-code': () => generateSourceCodeImage(),
  'presentation-pdf': () => generatePresentationImage(),
  'resources-pdf': () => generateResourcesImage(),
};

type DisplayItem =
  | { kind: 'seed'; item: DownloadItem }
  | { kind: 'resource'; item: StoredFile };

const DownloadsContent = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [certName, setCertName] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);
  const liveResources = useSyncExternalStore(subscribeStorage, () => getFiles(), () => []);

  const filtered = useMemo<DisplayItem[]>(() => {
    const publicResources = liveResources.filter(
      (r) => r.visibility === 'public' &&
        r.bucket !== 'lesson-files' && r.bucket !== 'certificates' &&
        r.bucket !== 'images' && r.bucket !== 'videos'
    );
    const ordered = [...publicResources].sort((a, b) =>
      a.displayOrder - b.displayOrder || a.uploadedAt.localeCompare(b.uploadedAt)
    );
    const resourceItems: DisplayItem[] = ordered.map(item => ({ kind: 'resource', item }));
    const seedItems: DisplayItem[] = (activeCategory === 'All'
      ? downloadsData
      : downloadsData.filter(d => d.category === activeCategory)
    ).map(item => ({ kind: 'seed', item }));
    return [...resourceItems, ...seedItems];
  }, [activeCategory, liveResources]);

  const doDownload = (item: DownloadItem, name?: string) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      const generator = imageGenerators[item.id];
      if (generator) {
        downloadCanvas(generator(name), `${item.id.replace(/-/g, '_')}.png`);
      }
      setDownloadingId(null);
    }, 500);
  };

  const downloadResource = (item: StoredFile) => {
    const a = document.createElement('a');
    a.href = item.dataUrl;
    a.download = item.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const lessonTitle = (slug: string) =>
    docsSections.find(s => s.slug === slug)?.title ?? slug;

  const handleDownload = (item: DownloadItem) => {
    if (item.id === 'certificate-template') {
      setCertName('');
      setShowCertModal(true);
      return;
    }
    doDownload(item);
  };

  const handleCertSubmit = async () => {
    setShowCertModal(false);
    setDownloadingId('certificate-template');
    try {
      const canvas = document.createElement('canvas');
      await renderCertificate(canvas, getSettings(), certName.trim() || 'Participant Name');
      downloadCanvas(canvas, 'certificate.png');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Access all workshop materials in one place. All resources are freely available to workshop participants.
      </p>

      <div className={styles.filterBar}>
        {downloadCategories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <span className={styles.resultCount}>{filtered.length} file{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className={styles.grid}>
        {filtered.map((entry, i) => {
          if (entry.kind === 'seed') {
            const item = entry.item;
            return (
              <div
                key={item.id}
                className={styles.card}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.itemIcon}>{item.icon}</span>
                  <span className={`${styles.categoryBadge} ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.description}</p>
                </div>

                <div className={styles.cardMeta}>
                  <div className={styles.metaRow}>
                    <span className={`${styles.fileTypeBadge} ${getTypeColor(item.fileType)}`}>
                      {item.fileType}
                    </span>
                    <span className={styles.metaItem}>📦 {item.fileSize}</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>🔖 {item.version}</span>
                    <span className={styles.metaItem}>🗓 {item.updatedAt}</span>
                  </div>
                </div>

                <button
                  className={`${styles.downloadBtn} ${downloadingId === item.id ? styles.downloading : ''}`}
                  onClick={() => handleDownload(item)}
                  disabled={downloadingId === item.id}
                >
                  {downloadingId === item.id ? (
                    <>
                      <span className={styles.spinner}></span>
                      Generating…
                    </>
                  ) : (
                    <>⬇ Download {item.fileType.split(' ')[0]}</>
                  )}
                </button>
              </div>
            );
          }

          const r = entry.item;
          return (
            <div
              key={r.id}
              className={styles.card}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {r.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.thumbnail} alt={r.originalName} className={styles.thumbImg} />
              ) : (
                <div className={styles.cardHeader}>
                  <span className={styles.itemIcon}>📄</span>
                  <span className={`${styles.categoryBadge} ${getCategoryColor(r.category as DownloadItem['category'])}`}>
                    {r.category}
                  </span>
                </div>
              )}

              <div className={styles.cardBody}>
                <h3 className={styles.itemTitle}>{r.originalName}</h3>
                <p className={styles.itemDesc}>{r.description}</p>
                {r.tags.length > 0 && (
                  <div className={styles.tagRow}>
                    {r.tags.map(t => <span key={t} className={styles.tag}>#{t}</span>)}
                  </div>
                )}
                {r.lessonSlug && (
                  <a
                    className={styles.lessonLink}
                    href={`/AI-For-Electronics-Engineering/learn/${r.lessonSlug}`}
                  >
                    📎 {lessonTitle(r.lessonSlug)}
                  </a>
                )}
              </div>

              <div className={styles.cardMeta}>
                <div className={styles.metaRow}>
                  <span className={`${styles.fileTypeBadge} ${getTypeColor(fileTypeLabel(r))}`}>
                    {fileTypeLabel(r)}
                  </span>
                  <span className={styles.metaItem}>📦 {formatBytes(r.size)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>🔖 {r.version}</span>
                  <span className={styles.metaItem}>
                    🗓 {new Date(r.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                className={styles.downloadBtn}
                onClick={() => downloadResource(r)}
              >
                ⬇ Download {fileTypeLabel(r)}
              </button>
            </div>
          );
        })}
      </div>

      {showCertModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCertModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Enter Your Name</h3>
            <p className={styles.modalDesc}>Your name will appear on the certificate.</p>
            <input
              className={styles.modalInput}
              type="text"
              placeholder="e.g. Robin R G"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCertSubmit()}
            />
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setShowCertModal(false)}>Cancel</button>
              <button className={styles.modalSubmit} onClick={handleCertSubmit}>Download Certificate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadsContent;
