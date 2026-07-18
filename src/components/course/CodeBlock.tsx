'use client';
import React, { useState } from 'react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      {filename && (
        <div className={styles.header}>
          <span className={styles.filename}>{filename}</span>
          <span className={styles.language}>{language}</span>
        </div>
      )}
      <div className={styles.codeArea}>
        <pre className={styles.pre}>
          <code>{code}</code>
        </pre>
        <button className={styles.copyBtn} onClick={handleCopy} aria-label="Copy code">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
