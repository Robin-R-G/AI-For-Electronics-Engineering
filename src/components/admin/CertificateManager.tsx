'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  CertificateSettings,
  getSettings,
  saveSettings,
  resetSettings,
  fileToDataUrl as settingsFileToDataUrl,
} from '@/lib/settings';
import {
  renderCertificate,
  canvasToPdfBlob,
  canvasesToPdf,
  downloadBlob,
  downloadCanvasPng,
} from '@/lib/certificate';
import { track } from '@/lib/analytics';
import styles from './AdminStyles.module.css';

function ImageField({
  label, hint, value, onPick, onClear,
}: {
  label: string; hint: string;
  value: string;
  onPick: (f: File | null) => void;
  onClear: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
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
  const [s, setS] = useState<CertificateSettings>(() => getSettings());
  const [status, setStatus] = useState('');
  const [generating, setGenerating] = useState(false);
  const [previewName, setPreviewName] = useState('Sample Participant');
  const [names, setNames] = useState('');
  const previewRef = useRef<HTMLCanvasElement>(null);

  const update = (patch: Partial<CertificateSettings>) => setS((prev) => ({ ...prev, ...patch }));

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 2500);
  };

  const handleImage = async (
    file: File | null,
    key: 'signatureImage' | 'institutionLogo' | 'ieeeLogo'
  ) => {
    if (!file) return;
    try {
      update({ [key]: await settingsFileToDataUrl(file) });
      flash('Image loaded - click Preview to see it.');
    } catch {
      flash('Could not read image.');
    }
  };

  const handleSave = () => {
    saveSettings(s);
    flash('Saved!');
    if (previewRef.current) renderCertificate(previewRef.current, s, previewName.trim() || 'Sample Participant');
  };

  const handleReset = () => {
    resetSettings();
    setS(getSettings());
    flash('Reset to defaults');
  };

  const handlePreview = async () => {
    if (!previewRef.current) return;
    await renderCertificate(previewRef.current, s, previewName.trim() || 'Sample Participant');
  };

  const handleDownloadPng = async () => {
    const c = document.createElement('canvas');
    await renderCertificate(c, s, previewName.trim() || 'Sample Participant');
    downloadCanvasPng(c, 'certificate.png');
  };

  const handleGenerate = async () => {
    const list = names.split('\n').map((n) => n.trim()).filter(Boolean);
    if (list.length === 0) { flash('Enter at least one name.'); return; }
    setGenerating(true);
    try {
      const canvases = await Promise.all(
        list.map(async (name) => {
          const c = document.createElement('canvas');
          await renderCertificate(c, s, name);
          return c;
        })
      );
      const blob = canvases.length === 1 ? await canvasToPdfBlob(canvases[0]) : await canvasesToPdf(canvases);
      downloadBlob(blob, `certificates_${canvases.length}.pdf`);
      track('certificate_generated', { count: canvases.length });
      flash(`Generated ${canvases.length} certificate(s)`);
    } catch {
      flash('PDF generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (previewRef.current) renderCertificate(previewRef.current, s, previewName.trim() || 'Sample Participant');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Upload images to place on the certificate. Institution logo sits top-left,
          IEEE logo (optional) top-right, signature bottom-center above the instructor name.
        </p>
        <div className={styles.imgUploadRow}>
          <ImageField label="Institution Logo" hint="top-left" value={s.institutionLogo} onPick={(f) => handleImage(f, 'institutionLogo')} onClear={() => update({ institutionLogo: '' })} />
          <ImageField label="Signature Image" hint="under instructor name" value={s.signatureImage} onPick={(f) => handleImage(f, 'signatureImage')} onClear={() => update({ signatureImage: '' })} />
        </div>
        <div className={styles.checkboxRow}>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={s.ieeeEnabled} onChange={(e) => update({ ieeeEnabled: e.target.checked })} />
            <span>Show IEEE logo (when applicable)</span>
          </label>
        </div>
        {s.ieeeEnabled && (
          <div className={styles.imgUploadRow}>
            <ImageField label="IEEE Logo" hint="top-right" value={s.ieeeLogo} onPick={(f) => handleImage(f, 'ieeeLogo')} onClear={() => update({ ieeeLogo: '' })} />
          </div>
        )}
      </section>

      <section className={styles.certSection}>
        <h2>Live Preview</h2>
        <div className={styles.previewWrap}>
          <canvas ref={previewRef} className={styles.previewCanvas} />
        </div>
        <div className={styles.previewControls}>
          <input className={styles.nameInput} value={previewName} onChange={(e) => setPreviewName(e.target.value)} placeholder="Preview name" />
          <button className={styles.smallBtn} onClick={handlePreview}>Update Preview</button>
          <button className={styles.smallBtn} onClick={handleDownloadPng}>Download PNG</button>
        </div>
      </section>

      <section className={styles.certSection}>
        <h2>Generate PDF Certificates</h2>
        <p className={styles.sectionDesc}>
          Enter one participant name per line. A PDF is generated automatically - one
          certificate per name (multi-page when more than one).
        </p>
        <textarea className={styles.namesArea} value={names} onChange={(e) => setNames(e.target.value)} placeholder={'Robin R G\nAlice Thomas\nBob Martin'} rows={6} />
        <button className={styles.submitBtn} onClick={handleGenerate} disabled={generating}>
          {generating ? 'Generating...' : 'Generate PDF Certificates'}
        </button>
      </section>

      <section className={styles.certSection}>
        <div className={styles.certActions}>
          <button className={styles.submitBtn} onClick={handleSave}>Save Settings</button>
          <button className={styles.cancelBtn} onClick={handleReset}>Reset to Defaults</button>
          {status && <span className={styles.statusMsg}>{status}</span>}
        </div>
      </section>
    </div>
  );
}