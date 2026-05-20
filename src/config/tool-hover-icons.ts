// src/config/tool-hover-icons.ts

import type { ComponentType } from 'react';
import { getToolIcon } from '@/config/icons';

// Import Itshover icons you installed/copied
import FileStackIcon from '@/components/icons/itshover/file-stack-icon';
import ScissorsIcon from '@/components/icons/itshover/scissors-icon';
import ZapIcon from '@/components/icons/itshover/zap-icon';
import WrenchIcon from '@/components/icons/itshover/wrench-icon';
import ImageIcon from '@/components/icons/itshover/image-icon';
import LockIcon from '@/components/icons/itshover/lock-icon';
import ShieldCheckIcon from '@/components/icons/itshover/shield-check-icon';
import ScanTextIcon from '@/components/icons/itshover/scan-text-icon';
import CropIcon from '@/components/icons/itshover/crop-icon';
import RotateCwIcon from '@/components/icons/itshover/rotate-cw-icon';

type HoverIcon = ComponentType<{
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}>;

// Map PdfTo/PDFCraft icon names to Itshover components.
// Keep the keys aligned with src/config/icons.ts and config/tools.ts.
const HOVER_ICON_MAP: Record<string, HoverIcon> = {
  // Organize / manage
  merge: FileStackIcon,
  combine: FileStackIcon,
  scissors: ScissorsIcon,
  files: FileStackIcon,
  'trash-2': ScissorsIcon,
  'rotate-cw': RotateCwIcon,
  crop: CropIcon,

  // Optimize / repair
  zap: ZapIcon,
  wrench: WrenchIcon,
  'pocket-knife': WrenchIcon,

  // Convert / image
  image: ImageIcon,
  images: ImageIcon,
  'image-up': ImageIcon,
  'file-image': ImageIcon,

  // OCR / text
  'scan-text': ScanTextIcon,
  'file-text': ScanTextIcon,

  // Security
  lock: LockIcon,
  key: LockIcon,
  'file-lock': LockIcon,
  'file-key': LockIcon,
  'shield-check': ShieldCheckIcon,
};

export function getToolHoverIcon(iconName: string): HoverIcon {
  return HOVER_ICON_MAP[iconName] ?? getToolIcon(iconName);
}