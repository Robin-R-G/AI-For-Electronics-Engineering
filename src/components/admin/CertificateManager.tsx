'use client';
import React, { useState } from 'react';
import CertificateDesigner from './CertificateDesigner';
import {
  CertificateSettings, getSettings, saveSettings, resetSettings,
  fileToDataUrl as settingsFileToDataUrl,
} from '@/lib/settings';
import styles from './AdminStyles.module.css';

function ImageField({
  label, hint, value, onPick, onClear,
}: {
  label: string; hint: string; value: string;
  onPick: (f: File | null) => void; onClear: () => void;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className={styles.imgField}>
      <span className={styles.imgLabel}>{label} <em>({hint})</em></span>
      {value ? (
        <div className={styles.imgThumbWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className={styles.imgThumb} />
          <button className={styles.delLink} onClick={onClear}>Remove</button>
        </div>
      ) : (
        <input ref={ref} type="file" accept=".png,.jpg,.jpeg" onChange={(e) => onPick(e.target.files?.[0] ?? null)} />
      )}
    </div>
  );
}

export default function CertificateManager() {
  const [mode, setMode] = useState<'settings' | 'designer'>('settings');
  const [s, setS] = useState<CertificateSettings>(() => getSettings());
  const [status, setStatus] = useState('');

  const update = (patch: Partial<CertificateSettings>) => setS((prev) => ({ ...prev, ...patch }));
  const flash = (msg: string) => { setStatus(msg); setTimeout(() => setStatus(''), 2500); };

  const handleImage = async (file: File | null, key: 'signatureImage' | 'institutionLogo' | 'ieeeLogo') => {
    if (!file) return;
    try { update({ [key]: await settingsFileToDataUrl(file) }); flash('Image loaded.'); }
    catch { flash('Could not read image.'); }
  };

  const handleSave = () => { saveSettings(s); flash('Settings saved!'); };
  const handleReset = () => { resetSettings(); setS(getSettings()); flash('Reset to defaults.'); };

  if (mode === 'designer') {
    return <CertificateDesigner onBack={() => setMode('settings')} />;
  }

  return (
    <div className={styles.certGrid}>
      <section className={styles.certSection}>
        <h2>Workshop &amp; Instructor</h2>
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

      <section className={styles.certSection}>
        <h2>Certificate Template</h2>
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
            <span>Body Text (use Enter for new line)</span>
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

      <section className={styles.certSection}>
        <h2>Logos &amp; Signature</h2>
        <p className={styles.sectionDesc}>
          Upload images to place on the certificate.
        </p>
        <div className={styles.imgUploadRow}>
          <ImageField label="Institution Logo" hint="top-left" value={s.institutionLogo} onPick={(f) => handleImage(f, 'institutionLogo')} onClear={() => update({ institutionLogo: '' })} />
          <ImageField label="Signature Image" hint="under instructor name" value={s.signatureImage} onPick={(f) => handleImage(f, 'signatureImage')} onClear={() => update({ signatureImage: '' })} />
        </div>
        <div className={styles.checkboxRow}>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={s.ieeeEnabled} onChange={(e) => update({ ieeeEnabled: e.target.checked })} />
            <span>Show IEEE logo</span>
          </label>
        </div>
        {s.ieeeEnabled && (
          <div className={styles.imgUploadRow}>
            <ImageField label="IEEE Logo" hint="top-right" value={s.ieeeLogo} onPick={(f) => handleImage(f, 'ieeeLogo')} onClear={() => update({ ieeeLogo: '' })} />
          </div>
        )}
      </section>

      <section className={styles.certSection}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className={styles.submitBtn} onClick={handleSave}>Save Settings</button>
          <button className={styles.cancelBtn} onClick={handleReset}>Reset to Defaults</button>
          <button
            className={styles.submitBtn}
            style={{ background: 'var(--color-brand)', borderColor: 'var(--color-brand)' }}
            onClick={() => setMode('designer')}
          >
            Open Visual Designer
          </button>
          {status && <span className={styles.statusMsg}>{status}</span>}
        </div>
      </section>
    </div>
  );
}
