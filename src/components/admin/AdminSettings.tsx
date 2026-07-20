'use client';
import React, { useState } from 'react';
import {
  CertificateSettings,
  getSettings,
  saveSettings,
  resetSettings,
} from '@/lib/settings';
import styles from './AdminStyles.module.css';

export default function AdminSettings() {
  const [s, setS] = useState<CertificateSettings>(() => getSettings());
  const [status, setStatus] = useState('');
  const [siteName, setSiteName] = useState(() => {
    try { return localStorage.getItem('workshop_site_name') || 'AI Workshop'; } catch { return 'AI Workshop'; }
  });
  const [footerText, setFooterText] = useState(() => {
    try { return localStorage.getItem('workshop_footer_text') || 'AI for Electronics Engineers Workshop - 2026'; } catch { return 'AI for Electronics Engineers Workshop - 2026'; }
  });

  const update = (patch: Partial<CertificateSettings>) => setS((prev) => ({ ...prev, ...patch }));

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 2500);
  };

  const handleSaveAll = () => {
    saveSettings(s);
    try {
      localStorage.setItem('workshop_site_name', siteName);
      localStorage.setItem('workshop_footer_text', footerText);
    } catch {}
    flash('All settings saved!');
  };

  const handleReset = () => {
    resetSettings();
    setS(getSettings());
    try {
      localStorage.removeItem('workshop_site_name');
      localStorage.removeItem('workshop_footer_text');
    } catch {}
    setSiteName('AI Workshop');
    setFooterText('AI for Electronics Engineers Workshop - 2026');
    flash('Reset to defaults');
  };

  return (
    <div>
      <section className={styles.certSection} style={{ marginBottom: '1.5rem' }}>
        <h2>Website Identity</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Site Name</span>
            <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="AI Workshop" />
          </label>
          <label className={styles.field}>
            <span>Footer Text</span>
            <input value={footerText} onChange={(e) => setFooterText(e.target.value)} placeholder="Workshop tagline or copyright" />
          </label>
        </div>
      </section>

      <section className={styles.certSection} style={{ marginBottom: '1.5rem' }}>
        <h2>Workshop Branding (used on certificates)</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Workshop Name</span>
            <input value={s.workshopName} onChange={(e) => update({ workshopName: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Instructor Name</span>
            <input value={s.instructorName} onChange={(e) => update({ instructorName: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Instructor Title / Role</span>
            <input value={s.instructorTitle} onChange={(e) => update({ instructorTitle: e.target.value })} />
          </label>
        </div>
      </section>

      <section className={styles.certSection} style={{ marginBottom: '1.5rem' }}>
        <h2>Certificate Defaults</h2>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Certificate Title</span>
            <input value={s.certTitle} onChange={(e) => update({ certTitle: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Subtitle</span>
            <input value={s.certSubtitle} onChange={(e) => update({ certSubtitle: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Body Text</span>
            <textarea value={s.bodyText} rows={3} onChange={(e) => update({ bodyText: e.target.value })} />
          </label>
          <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span>Details Line</span>
            <input value={s.detailsLine} onChange={(e) => update({ detailsLine: e.target.value })} />
          </label>
          <label className={styles.field}>
            <span>Date Label</span>
            <input value={s.dateLabel} onChange={(e) => update({ dateLabel: e.target.value })} />
          </label>
        </div>
      </section>

      <div className={styles.certActions}>
        <button className={styles.submitBtn} onClick={handleSaveAll}>Save All Settings</button>
        <button className={styles.cancelBtn} onClick={handleReset}>Reset to Defaults</button>
        {status && <span className={styles.statusMsg}>{status}</span>}
      </div>
    </div>
  );
}