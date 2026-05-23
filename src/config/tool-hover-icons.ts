// src/config/tool-hover-icons.ts

import type { ComponentType } from 'react';
import {
  Archive,
  ArrowDownAZ,
  BookImage,
  BookMarked,
  BookOpen,
  BookText,
  Bookmark,
  Brush,
  Columns,
  Contrast,
  Crop,
  Download,
  Droplets,
  Eraser,
  FileBox,
  FileCode,
  FileCog,
  FileEdit,
  FileImage,
  FileInput,
  FileKey,
  FileLock,
  FileMinus2,
  FilePen,
  FilePlus2,
  FileScan,
  FileSpreadsheet,
  FileText,
  FileType2,
  FileX,
  Gauge,
  GitCompare,
  Grid2X2,
  ImageDown,
  Images,
  Info,
  Key,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  List,
  ListOrdered,
  Mail,
  NotepadTextDashed,
  Palette,
  Paperclip,
  PenTool,
  PencilRuler,
  Pilcrow,
  Presentation,
  RefreshCcw,
  Ruler,
  ScanLine,
  SearchX,
  ShieldCheck,
  Shuffle,
  Smartphone,
  Stamp,
  StretchHorizontal,
  Table,
  TabletSmartphone,
  Type,
  Ungroup,
  UnfoldVertical,
  Unlink,
  Unlock,
} from 'lucide-react';

import { getToolIcon } from '@/config/icons';
import { createHoverIcon } from '@/components/icons/itshover/create-hover-icon';

// Your existing Itshover-style icons
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

// Itshover-style generated icons for keys not covered by your copied files
const PencilRulerHoverIcon = createHoverIcon(PencilRuler, 'PencilRulerHoverIcon');
const PenToolHoverIcon = createHoverIcon(PenTool, 'PenToolHoverIcon');
const UngroupHoverIcon = createHoverIcon(Ungroup, 'UngroupHoverIcon');
const BookmarkHoverIcon = createHoverIcon(Bookmark, 'BookmarkHoverIcon');
const ListHoverIcon = createHoverIcon(List, 'ListHoverIcon');
const ListOrderedHoverIcon = createHoverIcon(ListOrdered, 'ListOrderedHoverIcon');
const DropletsHoverIcon = createHoverIcon(Droplets, 'DropletsHoverIcon');
const PilcrowHoverIcon = createHoverIcon(Pilcrow, 'PilcrowHoverIcon');
const ContrastHoverIcon = createHoverIcon(Contrast, 'ContrastHoverIcon');
const PaletteHoverIcon = createHoverIcon(Palette, 'PaletteHoverIcon');
const TypeHoverIcon = createHoverIcon(Type, 'TypeHoverIcon');
const StampHoverIcon = createHoverIcon(Stamp, 'StampHoverIcon');
const EraserHoverIcon = createHoverIcon(Eraser, 'EraserHoverIcon');
const FileInputHoverIcon = createHoverIcon(FileInput, 'FileInputHoverIcon');
const FileMinusHoverIcon = createHoverIcon(FileMinus2, 'FileMinusHoverIcon');
const ImagesHoverIcon = createHoverIcon(Images, 'ImagesHoverIcon');
const SmartphoneHoverIcon = createHoverIcon(Smartphone, 'SmartphoneHoverIcon');
const LayersHoverIcon = createHoverIcon(Layers, 'LayersHoverIcon');
const FilePenHoverIcon = createHoverIcon(FilePen, 'FilePenHoverIcon');
const FileCodeHoverIcon = createHoverIcon(FileCode, 'FileCodeHoverIcon');
const FileImageHoverIcon = createHoverIcon(FileImage, 'FileImageHoverIcon');
const FileTextHoverIcon = createHoverIcon(FileText, 'FileTextHoverIcon');
const FileSpreadsheetHoverIcon = createHoverIcon(FileSpreadsheet, 'FileSpreadsheetHoverIcon');
const PresentationHoverIcon = createHoverIcon(Presentation, 'PresentationHoverIcon');
const FileBoxHoverIcon = createHoverIcon(FileBox, 'FileBoxHoverIcon');
const FileTypeHoverIcon = createHoverIcon(FileType2, 'FileTypeHoverIcon');
const BookOpenHoverIcon = createHoverIcon(BookOpen, 'BookOpenHoverIcon');
const BookMarkedHoverIcon = createHoverIcon(BookMarked, 'BookMarkedHoverIcon');
const FileScanHoverIcon = createHoverIcon(FileScan, 'FileScanHoverIcon');
const BookTextHoverIcon = createHoverIcon(BookText, 'BookTextHoverIcon');
const ShuffleHoverIcon = createHoverIcon(Shuffle, 'ShuffleHoverIcon');
const PaperclipHoverIcon = createHoverIcon(Paperclip, 'PaperclipHoverIcon');
const DownloadHoverIcon = createHoverIcon(Download, 'DownloadHoverIcon');
const ImageDownHoverIcon = createHoverIcon(ImageDown, 'ImageDownHoverIcon');
const FileEditHoverIcon = createHoverIcon(FileEdit, 'FileEditHoverIcon');
const ColumnsHoverIcon = createHoverIcon(Columns, 'ColumnsHoverIcon');
const FilePlusHoverIcon = createHoverIcon(FilePlus2, 'FilePlusHoverIcon');
const ArrowDownAZHoverIcon = createHoverIcon(ArrowDownAZ, 'ArrowDownAZHoverIcon');
const RefreshHoverIcon = createHoverIcon(RefreshCcw, 'RefreshHoverIcon');
const LayoutGridHoverIcon = createHoverIcon(LayoutGrid, 'LayoutGridHoverIcon');
const LayoutDashboardHoverIcon = createHoverIcon(LayoutDashboard, 'LayoutDashboardHoverIcon');
const UnfoldVerticalHoverIcon = createHoverIcon(UnfoldVertical, 'UnfoldVerticalHoverIcon');
const InfoHoverIcon = createHoverIcon(Info, 'InfoHoverIcon');
const FileCogHoverIcon = createHoverIcon(FileCog, 'FileCogHoverIcon');
const StretchHorizontalHoverIcon = createHoverIcon(StretchHorizontal, 'StretchHorizontalHoverIcon');
const GitCompareHoverIcon = createHoverIcon(GitCompare, 'GitCompareHoverIcon');
const NotepadTextDashedHoverIcon = createHoverIcon(NotepadTextDashed, 'NotepadTextDashedHoverIcon');
const RulerHoverIcon = createHoverIcon(Ruler, 'RulerHoverIcon');
const GaugeHoverIcon = createHoverIcon(Gauge, 'GaugeHoverIcon');
const UnlinkHoverIcon = createHoverIcon(Unlink, 'UnlinkHoverIcon');
const BrushHoverIcon = createHoverIcon(Brush, 'BrushHoverIcon');
const SearchXHoverIcon = createHoverIcon(SearchX, 'SearchXHoverIcon');
const UnlockHoverIcon = createHoverIcon(Unlock, 'UnlockHoverIcon');
const FileXHoverIcon = createHoverIcon(FileX, 'FileXHoverIcon');
const FileKeyHoverIcon = createHoverIcon(FileKey, 'FileKeyHoverIcon');
const FileLockHoverIcon = createHoverIcon(FileLock, 'FileLockHoverIcon');
const ScanLineHoverIcon = createHoverIcon(ScanLine, 'ScanLineHoverIcon');
const GridHoverIcon = createHoverIcon(Grid2X2, 'GridHoverIcon');
const MailHoverIcon = createHoverIcon(Mail, 'MailHoverIcon');
const BookImageHoverIcon = createHoverIcon(BookImage, 'BookImageHoverIcon');
const ArchiveHoverIcon = createHoverIcon(Archive, 'ArchiveHoverIcon');
const TableHoverIcon = createHoverIcon(Table, 'TableHoverIcon');
const TabletSmartphoneHoverIcon = createHoverIcon(TabletSmartphone, 'TabletSmartphoneHoverIcon');

const HOVER_ICON_MAP: Record<string, HoverIcon> = {
  // Existing copied icons
  merge: FileStackIcon,
  combine: FileStackIcon,
  scissors: ScissorsIcon,
  zap: ZapIcon,
  wrench: WrenchIcon,
  'pocket-knife': WrenchIcon,
  image: ImageIcon,
  lock: LockIcon,
  'shield-check': ShieldCheckIcon,
  'scan-text': ScanTextIcon,
  crop: CropIcon,
  'rotate-cw': RotateCwIcon,

  // Organize / manage
  'pencil-ruler': PencilRulerHoverIcon,
  files: FileStackIcon,
  'trash-2': ScissorsIcon,
  ungroup: UngroupHoverIcon,
  shuffle: ShuffleHoverIcon,
  paperclip: PaperclipHoverIcon,
  download: DownloadHoverIcon,
  'file-edit': FileEditHoverIcon,
  'table-columns-split': ColumnsHoverIcon,
  'file-plus-2': FilePlusHoverIcon,
  'arrow-down-z-a': ArrowDownAZHoverIcon,
  'refresh-ccw': RefreshHoverIcon,
  'layout-grid': LayoutGridHoverIcon,
  'layout-dashboard': LayoutDashboardHoverIcon,
  'unfold-vertical': UnfoldVerticalHoverIcon,
  info: InfoHoverIcon,
  'file-cog': FileCogHoverIcon,
  'stretch-horizontal': StretchHorizontalHoverIcon,
  'git-compare': GitCompareHoverIcon,
  'notepad-text-dashed': NotepadTextDashedHoverIcon,

  // Edit / annotate
  'pen-tool': PenToolHoverIcon,
  bookmark: BookmarkHoverIcon,
  list: ListHoverIcon,
  'list-ordered': ListOrderedHoverIcon,
  droplets: DropletsHoverIcon,
  pilcrow: PilcrowHoverIcon,
  contrast: ContrastHoverIcon,
  palette: PaletteHoverIcon,
  type: TypeHoverIcon,
  stamp: StampHoverIcon,
  eraser: EraserHoverIcon,
  'square-pen': PenToolHoverIcon,
  'file-input': FileInputHoverIcon,
  'file-minus-2': FileMinusHoverIcon,

  // Convert to/from PDF
  images: ImagesHoverIcon,
  'image-up': ImageIcon,
  'file-image': FileImageHoverIcon,
  smartphone: SmartphoneHoverIcon,
  layers: LayersHoverIcon,
  'file-pen': FilePenHoverIcon,
  'file-code': FileCodeHoverIcon,
  'file-code-2': FileCodeHoverIcon,
  'file-text': FileTextHoverIcon,
  'file-spreadsheet': FileSpreadsheetHoverIcon,
  presentation: PresentationHoverIcon,
  'file-box': FileBoxHoverIcon,
  'file-type': FileTypeHoverIcon,
  'file-type-2': FileTypeHoverIcon,
  'book-open': BookOpenHoverIcon,
  'book-marked': BookMarkedHoverIcon,
  'file-scan': FileScanHoverIcon,
  'book-text': BookTextHoverIcon,
  'image-down': ImageDownHoverIcon,
  table: TableHoverIcon,

  // Optimize / repair
  'ruler-dimension-line': RulerHoverIcon,
  ruler: RulerHoverIcon,
  gauge: GaugeHoverIcon,
  unlink: UnlinkHoverIcon,
  'brush-cleaning': BrushHoverIcon,
  archive: ArchiveHoverIcon,
  'grid-2x2': GridHoverIcon,
  'scan-line': ScanLineHoverIcon,

  // Security
  key: LockIcon,
  'file-lock': FileLockHoverIcon,
  'file-key': FileKeyHoverIcon,
  'search-x': SearchXHoverIcon,
  unlock: UnlockHoverIcon,
  'file-x': FileXHoverIcon,

  // New tools
  mail: MailHoverIcon,
  'book-image': BookImageHoverIcon,
  'tablet-smartphone': TabletSmartphoneHoverIcon,
};

export function getToolHoverIcon(iconName: string): HoverIcon {
  return HOVER_ICON_MAP[iconName] ?? getToolIcon(iconName);
}