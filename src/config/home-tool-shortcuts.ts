import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  Crop,
  FileImage,
  FileText,
  Hash,
  Image,
  Layers3,
  Lock,
  RotateCw,
  ScanText,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stamp,
  Unlock,
  WandSparkles,
  Workflow,
} from 'lucide-react';

export type HomeToolShortcut = {
  title: string;
  slug?: string;
  href?: string;
  icon: LucideIcon;
  badge?: string;
  keywords?: string[];
};

export type HomeToolShortcutCategory = {
  title: string;
  description?: string;
  icon: LucideIcon;
  tools: HomeToolShortcut[];
};

export const homeToolShortcutCategories: HomeToolShortcutCategory[] = [
  {
    title: 'Most used',
    description: 'Fast actions for daily PDF tasks',
    icon: Sparkles,
    tools: [
      {
        title: 'Compress PDF',
        slug: 'compress-pdf',
        icon: Archive,
        keywords: ['reduce size', 'small file', 'email', 'optimize', 'zip'],
      },
      {
        title: 'Merge PDF',
        slug: 'merge-pdf',
        icon: Layers3,
        keywords: ['combine', 'join', 'multiple files', 'append'],
      },
      {
        title: 'Split PDF',
        slug: 'split-pdf',
        icon: Scissors,
        keywords: ['divide', 'separate', 'range', 'pages'],
      },
      {
        title: 'PDF to JPG',
        slug: 'pdf-to-jpg',
        icon: FileImage,
        keywords: ['image', 'picture', 'convert', 'export'],
      },
      {
        title: 'JPG to PDF',
        slug: 'jpg-to-pdf',
        icon: Image,
        keywords: ['image to pdf', 'photo', 'convert', 'scan'],
      },
    ],
  },
  {
    title: 'Organize PDF',
    description: 'Arrange, extract, rotate, and clean pages',
    icon: FileText,
    tools: [
      {
        title: 'Extract Pages',
        slug: 'extract-pages',
        icon: FileText,
        keywords: ['pull pages', 'select pages', 'page range'],
      },
      {
        title: 'Rotate PDF',
        slug: 'rotate-pdf',
        icon: RotateCw,
        keywords: ['turn pages', 'orientation', 'landscape', 'portrait'],
      },
      {
        title: 'Delete Pages',
        slug: 'delete-pages',
        icon: Scissors,
        keywords: ['remove pages', 'clean', 'cut'],
      },
      {
        title: 'Organize PDF',
        slug: 'organize-pdf',
        icon: Layers3,
        keywords: ['reorder', 'arrange', 'sort pages'],
      },
    ],
  },
  {
    title: 'Convert PDF',
    description: 'Convert PDFs and images quickly',
    icon: FileImage,
    tools: [
      {
        title: 'PDF to JPG',
        slug: 'pdf-to-jpg',
        icon: FileImage,
        keywords: ['image', 'picture', 'convert', 'export'],
      },
      {
        title: 'PDF to PNG',
        slug: 'pdf-to-png',
        icon: FileImage,
        keywords: ['transparent', 'image', 'convert', 'export'],
      },
      {
        title: 'JPG to PDF',
        slug: 'jpg-to-pdf',
        icon: Image,
        keywords: ['image to pdf', 'photo', 'convert', 'scan'],
      },
      {
        title: 'OCR PDF',
        slug: 'ocr-pdf',
        icon: ScanText,
        keywords: ['scan', 'text recognition', 'searchable', 'extract text'],
      },
    ],
  },
  {
    title: 'Edit PDF',
    description: 'Add visible structure and document marks',
    icon: WandSparkles,
    tools: [
      {
        title: 'Watermark PDF',
        slug: 'add-watermark',
        icon: Stamp,
        keywords: ['stamp', 'confidential', 'logo', 'mark'],
      },
      {
        title: 'Page Numbers',
        slug: 'page-numbers',
        icon: Hash,
        keywords: ['numbering', 'footer', 'header', 'pages'],
      },
      {
        title: 'Crop PDF',
        slug: 'crop-pdf',
        icon: Crop,
        keywords: ['trim', 'margin', 'resize', 'cut'],
      },
      {
        title: 'Edit PDF',
        slug: 'edit-pdf',
        icon: WandSparkles,
        keywords: ['modify', 'annotate', 'change'],
      },
    ],
  },
  {
    title: 'Secure PDF',
    description: 'Protect, unlock, and prepare documents safely',
    icon: ShieldCheck,
    tools: [
      {
        title: 'Protect PDF',
        slug: 'encrypt-pdf',
        icon: Lock,
        keywords: ['password', 'encrypt', 'secure', 'lock'],
      },
      {
        title: 'Unlock PDF',
        slug: 'decrypt-pdf',
        icon: Unlock,
        keywords: ['remove password', 'decrypt', 'open', 'unprotect'],
      },
    ],
  },
  {
    title: 'AI & Workflow',
    description: 'Route complex tasks into a workflow',
    icon: Workflow,
    tools: [
      {
        title: 'Workflow Builder',
        href: '/workflow',
        icon: Workflow,
        badge: 'Beta',
        keywords: ['automation', 'pipeline', 'multi step', 'batch', 'ai'],
      },
    ],
  },
];
