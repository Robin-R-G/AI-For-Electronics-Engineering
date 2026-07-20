export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: 'Document' | 'Code' | 'Template' | 'Presentation';
  fileType: string;
  fileSize: string;
  version: string;
  updatedAt: string;
  downloadUrl: string;
  icon: string;
}

export const downloadsData: DownloadItem[] = [
  {
    id: 'workshop-notes',
    title: 'Workshop Notes',
    description: 'Complete notes covering all AI workshop sessions, theory, and practical examples covered during the program.',
    category: 'Document',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    version: 'v2.1',
    updatedAt: 'July 18, 2026',
    downloadUrl: '/downloads/workshop-notes.pdf',
    icon: '📓'
  },
  {
    id: 'prompt-book',
    title: 'Prompt Engineering Book',
    description: 'A curated collection of 100+ battle-tested prompts for electronics engineers, categorized by use case and tool.',
    category: 'Document',
    fileType: 'PDF',
    fileSize: '2.8 MB',
    version: 'v1.4',
    updatedAt: 'July 15, 2026',
    downloadUrl: '/downloads/prompt-book.pdf',
    icon: '📖'
  },
  {
    id: 'cheat-sheet',
    title: 'AI Tools Cheat Sheet',
    description: 'Quick-reference card listing the best AI prompts, keyboard shortcuts, and model comparisons for hardware developers.',
    category: 'Document',
    fileType: 'PDF',
    fileSize: '890 KB',
    version: 'v3.0',
    updatedAt: 'July 18, 2026',
    downloadUrl: '/downloads/cheat-sheet.pdf',
    icon: '📋'
  },
  {
    id: 'project-list',
    title: 'Project Ideas & Specs',
    description: 'Detailed list of 50+ beginner-to-advanced embedded AI projects with hardware requirements, estimated hours, and skill labels.',
    category: 'Document',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    version: 'v1.0',
    updatedAt: 'July 10, 2026',
    downloadUrl: '/downloads/project-list.pdf',
    icon: '🚀'
  },
  {
    id: 'certificate-template',
    title: 'Certificate Template',
    description: 'Editable PowerPoint and PDF templates for the AI for Electronics Engineers Certificate of Completion.',
    category: 'Template',
    fileType: 'PPTX + PDF',
    fileSize: '3.1 MB',
    version: 'v1.2',
    updatedAt: 'July 5, 2026',
    downloadUrl: '/downloads/certificate-template.pdf',
    icon: '🎖️'
  },
  {
    id: 'source-code',
    title: 'Workshop Source Code',
    description: 'Full source code for all live demo examples including ESP32 deep sleep, STM32 PID controller, and I2C debugging scripts.',
    category: 'Code',
    fileType: 'ZIP',
    fileSize: '8.7 MB',
    version: 'v2.0',
    updatedAt: 'July 17, 2026',
    downloadUrl: '/downloads/source-code.zip',
    icon: '💻'
  },
  {
    id: 'presentation-pdf',
    title: 'Workshop Presentation',
    description: 'The full instructor slide deck (228 slides) used during the live AI for Electronics Engineers workshop program.',
    category: 'Presentation',
    fileType: 'PDF',
    fileSize: '22.4 MB',
    version: 'v4.1',
    updatedAt: 'July 18, 2026',
    downloadUrl: '/downloads/presentation-pdf.pdf',
    icon: '📊'
  },
  {
    id: 'resources-pdf',
    title: 'Resources & Reading List',
    description: 'Curated list of the best books, YouTube channels, forums, and online tools to continue your AI + electronics learning journey.',
    category: 'Document',
    fileType: 'PDF',
    fileSize: '620 KB',
    version: 'v1.1',
    updatedAt: 'July 12, 2026',
    downloadUrl: '/downloads/resources-pdf.pdf',
    icon: '📚'
  }
];

export const downloadCategories = ['All', 'Document', 'Code', 'Template', 'Presentation'];
