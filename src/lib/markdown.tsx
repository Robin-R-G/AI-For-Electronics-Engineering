'use client';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { getFile } from './storage';
import styles from './markdown.module.css';

const VIDEO_EXT = ['mp4', 'webm', 'ogg', 'mov'];

function resolveSrc(src: string): string {
  if (src.startsWith('store://')) {
    const f = getFile(src.slice('store://'.length));
    return f?.dataUrl ?? '';
  }
  return src;
}

const CALLOUT_TYPES: Record<string, { label: string; cls: string }> = {
  NOTE: { label: 'Note', cls: styles.calloutNote },
  TIP: { label: 'Tip', cls: styles.calloutTip },
  IMPORTANT: { label: 'Important', cls: styles.calloutImportant },
  WARNING: { label: 'Warning', cls: styles.calloutWarning },
  CAUTION: { label: 'Caution', cls: styles.calloutCaution },
};

function Callout({ children }: { children: React.ReactNode }) {
  return <div className={styles.callout}>{children}</div>;
}

interface InteractiveConfig {
  type?: string;
  question?: string;
  prompt?: string;
  answer?: string;
  solution?: string;
  back?: string;
  front?: string;
  label?: string;
  value?: number | string;
  min?: number | string;
  max?: number | string;
  format?: string;
  [key: string]: unknown;
}

function RevealBlock({ cfg }: { cfg: InteractiveConfig }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.interactive}>
      <div className={styles.interactiveQ}>{cfg.question ?? cfg.prompt ?? ''}</div>
      {!open ? (
        <button className={styles.interactiveBtn} onClick={() => setOpen(true)}>
          Reveal Answer
        </button>
      ) : (
        <div className={styles.interactiveA}>{cfg.answer ?? cfg.solution ?? ''}</div>
      )}
    </div>
  );
}

function FlashcardBlock({ cfg }: { cfg: InteractiveConfig }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={styles.interactive}>
      <div
        className={`${styles.flashcard} ${flipped ? styles.flashcardBack : ''}`}
        onClick={() => setFlipped((v) => !v)}
      >
        {flipped ? cfg.back ?? cfg.answer : cfg.front ?? cfg.question}
      </div>
      <span className={styles.interactiveHint}>Tap to flip</span>
    </div>
  );
}

function SliderBlock({ cfg }: { cfg: InteractiveConfig }) {
  const [val, setVal] = useState(Number(cfg.value ?? cfg.min ?? 0));
  return (
    <div className={styles.interactive}>
      <div className={styles.interactiveQ}>{cfg.label ?? cfg.question ?? 'Adjust'}</div>
      <input
        type="range"
        min={Number(cfg.min ?? 0)}
        max={Number(cfg.max ?? 100)}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.interactiveA}>
        {cfg.format ? cfg.format.replace('{v}', String(val)) : val}
      </div>
    </div>
  );
}

function InteractiveBlock({ source }: { source: string }) {
  let cfg: InteractiveConfig = {};
  try {
    cfg = JSON.parse(source.trim()) as InteractiveConfig;
  } catch {
    return <div className={styles.interactiveErr}>Invalid interactive config (expected JSON).</div>;
  }

  switch (cfg.type) {
    case 'reveal':
      return <RevealBlock cfg={cfg} />;
    case 'flashcard':
      return <FlashcardBlock cfg={cfg} />;
    case 'slider':
      return <SliderBlock cfg={cfg} />;
    default:
      return (
        <div className={styles.interactiveErr}>
          Unknown interactive type: {String(cfg.type ?? '')}
        </div>
      );
  }
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHead}>
        <span className={styles.codeLang}>{lang || 'code'}</span>
        <button className={styles.codeCopy} onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.codePre}><code>{code}</code></pre>
    </div>
  );
}

export default function MarkdownView({ markdown }: { markdown: string }) {
  return (
    <div className={styles.md}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          pre: ({ children }) => <>{children}</>,
          code({ className, children }) {
            const text = String(children ?? '');
            const lang = /language-(\w+)/.exec(className ?? '')?.[1] ?? '';
            if (lang === 'interactive') return <InteractiveBlock source={text} />;
            if (lang) return <CodeBlock code={text.replace(/\n$/, '')} lang={lang} />;
            return <code className={styles.inlineCode}>{children}</code>;
          },
          img({ src, alt }) {
            const resolved = resolveSrc(String(src ?? ''));
            const ext = resolved.split('.').pop()?.toLowerCase() ?? '';
            if (VIDEO_EXT.includes(ext) || resolved.startsWith('data:video')) {
              return (
                <video className={styles.media} controls src={resolved}>
                  {alt}
                </video>
              );
            }
            // eslint-disable-next-line @next/next/no-img-element
            return <img className={styles.media} src={resolved} alt={String(alt ?? '')} />;
          },
          a({ href, children }) {
            return (
              <a href={String(href ?? '#')} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          },
          blockquote({ children }) {
            const text = String(children ?? '');
            const m = /^\[!(\w+)\]\s*(.*)/.exec(text.trim());
            if (m && CALLOUT_TYPES[m[1]]) {
              const t = CALLOUT_TYPES[m[1]];
              return (
                <Callout>
                  <div className={`${styles.calloutTitle} ${t.cls}`}>{t.label}</div>
                  <div>{m[2]}</div>
                  {children}
                </Callout>
              );
            }
            return <blockquote className={styles.blockquote}>{children}</blockquote>;
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
