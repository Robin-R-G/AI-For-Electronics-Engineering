// ponytail: localStorage-only settings store (no backend, static export).
// Holds workshop branding + certificate template, edited by the admin.

export const SETTINGS_STORAGE_KEY = 'workshop_settings';

export interface CertificateSettings {
  workshopName: string;
  instructorName: string;
  instructorTitle: string;
  certTitle: string;
  certSubtitle: string;
  bodyText: string;
  detailsLine: string;
  dateLabel: string;
  signatureImage: string; // data URL, '' = none
  institutionLogo: string; // data URL, '' = none
  ieeeEnabled: boolean;
  ieeeLogo: string; // data URL, '' = none
}

export const DEFAULT_SETTINGS: CertificateSettings = {
  workshopName: 'AI for Electronics Engineers',
  instructorName: 'Robin R G',
  instructorTitle: 'Instructor | AI for Electronics Engineers Workshop',
  certTitle: 'AI for Electronics Engineers',
  certSubtitle: 'Workshop Program',
  bodyText:
    'This is to certify that the participant has successfully completed\nall modules of the AI for Electronics Engineers Workshop.',
  detailsLine: '19 Modules  •  11 Sections  •  Hands-on Labs  •  Quiz  •  Certificate',
  dateLabel: 'July 2026',
  signatureImage: '',
  institutionLogo: '',
  ieeeEnabled: false,
  ieeeLogo: '',
};

export function getSettings(): CertificateSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<CertificateSettings>) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: CertificateSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function resetSettings(): void {
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
}

export function subscribeSettings(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
