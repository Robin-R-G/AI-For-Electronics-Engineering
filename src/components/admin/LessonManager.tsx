'use client';
import React, { useEffect, useState, useRef } from 'react';
import { docsSections } from '@/lib/docsConfig';
import { getFiles, fileTypeLabel } from '@/lib/storage';
import {
  getLessonOverride,
  getLessonHistory,
  saveLessonContent,
  restoreVersion,
  resetLesson,
  subscribeLessons,
} from '@/lib/lessonContent';
import MarkdownView from '@/lib/markdown';
import styles from './AdminStyles.module.css';

export default function LessonManager() {
  const [slug, setSlug] = useState(docsSections[0].slug);
  const [content, setContent] = useState('');
  const [history, setHistory] = useState(() => getLessonHistory(docsSections[0].slug));
  const [hasOverride, setHasOverride] = useState(false);
  const [preview, setPreview] = useState(false);
  const [savedHint, setSavedHint] = useState('');
  const taRef = useRef<HTMLTextAreaElement>(null);

  const load = (s: string) => {
    setContent(getLessonOverride(s) ?? '');
    setHistory(getLessonHistory(s));
    setHasOverride(getLessonOverride(s) !== null);
  };

  useEffect(() => {
    const onChange = () => load(slug);
    onChange();
    return subscribeLessons(onChange);
  }, [slug]);

  useEffect(() => {
    if (!content) return;
    const t = setTimeout(() => {
      saveLessonContent(slug, content, 'autosave');
      setHasOverride(true);
      setSavedHint('Auto-saved');
      setTimeout(() => setSavedHint(''), 1500);
    }, 900);
    return () => clearTimeout(t);
  }, [content, slug]);

  const insert = (before: string, after = '', placeholder = '') => {
    const ta = taRef.current;
    if (!ta) { setContent((c) => c + before + placeholder + after); return; }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + sel + after + content.slice(end);
    setContent(next);
  };

  const mediaFiles = getFiles().filter(
    (f) => f.mimeType.startsWith('image/') || f.mimeType.startsWith('video/')
  );
  const insertMedia = (id: string, title: string) => {
    insert('![' + title + '](store://' + id + ')\n');
  };

  return (
    <div className={styles.editorGrid}>
      <div className={styles.editorSide}>
        <label className={styles.field} style={{ marginBottom: '1rem' }}>
          <span>Lesson</span>
          <select value={slug} onChange={(e) => setSlug(e.target.value)}>
            {docsSections.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </label>

        {hasOverride ? (
          <span className={styles.overrideTag}>Overriding default content</span>
        ) : (
          <span className={styles.defaultTag}>Using default content</span>
        )}

        <div className={styles.toolbar}>
          <button onClick={() => insert('## ', '', 'Heading')}>H2</button>
          <button onClick={() => insert('**', '**', 'bold')}>B</button>
          <button onClick={() => insert('*', '*', 'italic')}>I</button>
          <button onClick={() => insert('`', '`', 'code')}>{'</>'}</button>
          <button onClick={() => insert('```\n', '\n```\n', 'code block')}>Code</button>
          <button onClick={() => insert('| Col A | Col B |\n| --- | --- |\n| 1 | 2 |\n')}>Table</button>
          <button onClick={() => insert('> [!NOTE]\n> Your note here\n')}>Callout</button>
          <button onClick={() => insert('$', '$', 'E = mc^2')}>Eq</button>
          <button onClick={() => insert('$$\n', '\n$$', '\\int_0^1 x\\,dx')}>Block Eq</button>
          <button onClick={() => insert('![alt](https://)', '')}>Image</button>
          <button onClick={() => insert('![alt](https://video.mp4)', '')}>Video</button>
        </div>

        {mediaFiles.length > 0 && (
          <div className={styles.mediaPicker}>
            <span className={styles.imgLabel}>Insert from storage:</span>
            <select
              defaultValue=""
              onChange={(e) => {
                const f = mediaFiles.find((m) => m.id === e.target.value);
                if (f) insertMedia(f.id, f.originalName);
                e.target.value = '';
              }}
            >
              <option value="">Choose image/video...</option>
              {mediaFiles.map((m) => (
                <option key={m.id} value={m.id}>{m.originalName} ({fileTypeLabel(m)})</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.editorActions}>
          <button className={styles.smallBtn} onClick={() => setPreview((p) => !p)}>
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button className={styles.smallBtn} onClick={() => { saveLessonContent(slug, content, 'manual save'); setHasOverride(true); setSavedHint('Saved'); setTimeout(() => setSavedHint(''), 1500); }}>
            Save Version
          </button>
          <button className={styles.cancelBtn} onClick={() => { resetLesson(slug); load(slug); }}>
            Reset to Default
          </button>
          {savedHint && <span className={styles.statusMsg}>{savedHint}</span>}
        </div>

        <div className={styles.historyBox}>
          <h3>Version History ({history.length})</h3>
          {history.length === 0 ? (
            <p className={styles.empty}>No versions yet - start editing.</p>
          ) : (
            <ul className={styles.historyList}>
              {history.map((v) => (
                <li key={v.id}>
                  <span>{new Date(v.at).toLocaleString()}</span>
                  <span className={styles.histNote}>{v.note}</span>
                  <button className={styles.delLink} onClick={() => { const c = restoreVersion(slug, v.id); if (c !== null) { setContent(c); setSavedHint('Loaded'); setTimeout(() => setSavedHint(''), 1500); } }}>
                    Load
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.editorMain}>
        {preview ? (
          <MarkdownView markdown={content} />
        ) : (
          <textarea
            ref={taRef}
            className={styles.editorArea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write lesson content in Markdown. Use the toolbar to insert headings, code, tables, callouts, equations, images, videos, and interactive sections."
          />
        )}
      </div>
    </div>
  );
}