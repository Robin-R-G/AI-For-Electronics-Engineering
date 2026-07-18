'use client';
import React, { useState, useMemo } from 'react';
import { downloadsData, downloadCategories, DownloadItem } from '@/data/downloadsData';
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

function generateDownloadContent(item: DownloadItem): string {
  const header = `AI for Electronics Engineers Workshop\n${'='.repeat(50)}\n${item.title}\nVersion: ${item.version} | Updated: ${item.updatedAt}\n\n`;

  const contents: Record<string, string> = {
    'workshop-notes': `${header}WORKSHOP NOTES\n\n1. Introduction to AI for Electronics Engineers\n2. AI Fundamentals — Cloud vs Edge, Quantization\n3. Machine Learning — Supervised/Unsupervised, Features\n4. Deep Learning — Neurons, CNNs, Backprop\n5. Generative AI — VAEs, GANs, Diffusion\n6. LLMs — Transformers, RAG, Local Models\n7. AI Tools — ChatGPT, Claude, Copilot, Cursor\n8. Electronics Applications — TinyML, PCB AI\n9. Prompt Engineering — Role-based prompting\n10. Career Roadmap — Embedded AI pathway\n11. Future Trends — Neuromorphic, Self-driving labs\n\nDesigned by Robin R G`,
    'prompt-book': `${header}PROMPT ENGINEERING BOOK\n\nSECTION 1: Hardware Debugging\n1. I2C Scanner Debug — systematic I2C troubleshooting\n2. SPI Communication Debug — SPI configuration checks\n3. UART Debug — serial communication verification\n\nSECTION 2: Code Generation\n4. HAL Function Generation — STM32 HAL code\n5. FreeRTOS Task Design — RTOS architecture\n6. Python ML Pipeline — training pipeline setup\n\nSECTION 3: Design Review\n7. PCB Layout Review — 4-layer board analysis\n8. Schematic Review — circuit validation\n9. Datasheet Analysis — component selection\n\nDesigned by Robin R G`,
    'cheat-sheet': `${header}AI TOOLS CHEAT SHEET\n\nCHATGPT: Best for general coding, temp 0.1-0.3\nCLAUDE: Best for long code reviews, 200K context\nCOPILOT: Best for inline completion, use comments\nCURSOR: Best for codebase-aware editing\nOLLAMA: Best for private/offline work\n\nKey shortcuts:\nCopilot: Tab (accept), Esc (dismiss)\nCursor: Cmd+K (edit), Cmd+L (chat)\n\nDesigned by Robin R G`,
    'project-list': `${header}PROJECT IDEAS\n\nBEGINNER: LED mood light, thermometer, distance meter\nINTERMEDIATE: Wi-Fi weather station, line follower robot\nADVANCED: ESP32-CAM security, STM32 CAN bus, TinyML wearable\n\nDesigned by Robin R G`,
  };

  return contents[item.id] || `${header}\nWorkshop resource: ${item.title}\n\nFor the full interactive experience, visit the workshop platform.\n\nDesigned by Robin R G`;
}

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const DownloadsContent = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return downloadsData;
    return downloadsData.filter(d => d.category === activeCategory);
  }, [activeCategory]);

  const handleDownload = (item: DownloadItem) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      const content = generateDownloadContent(item);
      downloadFile(content, `${item.id.replace(/-/g, '_')}.txt`);
      setDownloadingId(null);
    }, 500);
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
        {filtered.map((item, i) => (
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
        ))}
      </div>
    </div>
  );
};

export default DownloadsContent;
