'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpFromLine, FileUp, Plus, Sparkles, UploadCloud } from 'lucide-react';

export interface FileUploaderProps {
  /** Accepted file types (MIME types or extensions) */
  accept?: string[];
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Callback when files are selected */
  onFilesSelected: (files: File[]) => void;
  /** Callback when an error occurs */
  onError?: (error: string) => void;
  /** Custom class name */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom label text */
  label?: string;
  /** Custom description text */
  description?: string;
}

/**
 * FileUploader Component
 * Requirements: 5.2
 *
 * Supports drag-and-drop, file picker, and paste from clipboard.
 * Modern PDFto upload experience with animated upload icon and clearer CTA.
 */
export const FileUploader: React.FC<FileUploaderProps> = ({
  accept = ['application/pdf'],
  multiple = false,
  maxSize = Infinity, // No limit by default
  maxFiles = 10,
  onFilesSelected,
  onError,
  className = '',
  disabled = false,
  label,
  description,
}) => {
  const t = useTranslations('common');
  const tErrors = useTranslations('errors');

  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Generate accept string for input element
  const acceptString = accept.join(',');

  /**
   * Validate files against constraints
   */
  const validateFiles = useCallback((files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    // Check max files
    if (!multiple && files.length > 1) {
      errors.push('Only one file can be uploaded at a time.');
      return { valid: [files[0]], errors };
    }

    if (files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed.`);
      files = files.slice(0, maxFiles);
    }

    for (const file of files) {
      // Check file size (skip if no limit)
      if (maxSize !== Infinity && file.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / (1024 * 1024));
        errors.push(tErrors('fileTooLarge', { maxSize: maxSizeMB }));
        continue;
      }

      // Check file type
      const isValidType = accept.some(type => {
        // Accept all files
        if (type === '*/*' || type === '*') {
          return true;
        }
        if (type.startsWith('.')) {
          // Extension check
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        if (type.endsWith('/*')) {
          // Wildcard MIME type
          const baseType = type.slice(0, -2);
          return file.type.startsWith(baseType);
        }
        // Exact MIME type match
        return file.type === type;
      });

      // Also check by extension for PDF files
      const isPdfByExtension = file.name.toLowerCase().endsWith('.pdf');
      const acceptsPdf = accept.includes('application/pdf');

      if (!isValidType && !(acceptsPdf && isPdfByExtension)) {
        errors.push(tErrors('fileTypeInvalid', { acceptedTypes: accept.join(', ') }));
        continue;
      }

      valid.push(file);
    }

    return { valid, errors };
  }, [accept, maxSize, maxFiles, multiple, tErrors]);

  /**
   * Handle file selection
   */
  const handleFiles = useCallback((files: FileList | File[]) => {
    if (disabled) return;

    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const { valid, errors } = validateFiles(fileArray);

    if (errors.length > 0 && onError) {
      onError(errors[0]);
    }

    if (valid.length > 0) {
      onFilesSelected(valid);
    }
  }, [disabled, validateFiles, onError, onFilesSelected]);

  /**
   * Handle drag enter
   */
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, [disabled]);

  /**
   * Handle drag leave
   */
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter(prev => {
      const newCount = prev - 1;
      if (newCount === 0) {
        setIsDragging(false);
      }
      return newCount;
    });
  }, []);

  /**
   * Handle drag over
   */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  /**
   * Handle drop
   */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
    setDragCounter(0);

    if (disabled) return;

    const files = e.dataTransfer.files;
    handleFiles(files);
  }, [disabled, handleFiles]);

  /**
   * Handle file input change
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [handleFiles]);

  /**
   * Handle click to open file picker
   */
  const handleClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  /**
   * Handle keyboard interaction
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }, [disabled]);

  /**
   * Handle paste from clipboard
   */
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (disabled) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        e.preventDefault();
        handleFiles(files);
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [disabled, handleFiles]);

  const baseStyles = `
    relative flex flex-col items-center justify-center
    w-full min-h-[320px] overflow-hidden p-8 sm:p-12
    border-2 border-dashed
    rounded-[2.25rem]
    transition-all duration-300
    cursor-pointer
    group
  `;

  // Dynamic styles based on state
  const stateStyles = disabled
    ? 'border-[hsl(var(--color-muted))] bg-[hsl(var(--color-muted)/0.3)] cursor-not-allowed opacity-50'
    : isDragging
      ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.08)] scale-[1.01] shadow-2xl shadow-[hsl(var(--color-primary)/0.15)]'
      : `
      border-[hsl(var(--color-border))]
      bg-[linear-gradient(145deg,hsl(var(--color-card)/0.95),hsl(var(--color-primary)/0.045))]
      hover:border-[hsl(var(--color-primary))]
      hover:bg-[linear-gradient(145deg,hsl(var(--color-card)),hsl(var(--color-primary)/0.07))]
      hover:shadow-xl hover:shadow-[hsl(var(--color-primary)/0.08)]
      glass-card
    `;

  const maxSizeLabel = maxSize !== Infinity ? `${Math.round(maxSize / (1024 * 1024))} MB` : null;

  return (
    <div
      ref={dropZoneRef}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label || t('buttons.upload')}
      aria-disabled={disabled}
      className={`${baseStyles} ${stateStyles} ${className}`.trim()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
        disabled={disabled}
      />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] opacity-80" aria-hidden="true">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[hsl(var(--color-primary)/0.13)] blur-3xl" />
        <div className="absolute -bottom-20 right-6 h-52 w-52 rounded-full bg-[hsl(var(--color-accent)/0.12)] blur-3xl" />
        <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-[hsl(var(--color-primary)/0.35)] to-transparent" />
      </div>

      {/* Animated upload icon */}
      <div className={`relative mb-7 grid h-28 w-28 place-items-center transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
        <span className="pdfto-upload-ring absolute inset-0 rounded-full border border-[hsl(var(--color-primary)/0.22)]" aria-hidden="true" />
        <span className="pdfto-upload-orbit absolute inset-3 rounded-full border border-dashed border-[hsl(var(--color-primary)/0.30)]" aria-hidden="true">
          <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[hsl(var(--color-accent))] shadow-[0_0_22px_hsl(var(--color-accent)/0.75)]" />
        </span>
        <span className="pdfto-upload-icon relative grid h-20 w-20 place-items-center rounded-[1.75rem] bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] text-white shadow-[var(--shadow-glow)]">
          <UploadCloud className="h-10 w-10" aria-hidden="true" />
        </span>
      </div>

      {/* Label */}
      <div className="relative text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border)/0.80)] bg-[hsl(var(--color-card)/0.72)] px-3 py-1 text-xs font-semibold text-[hsl(var(--color-primary))] shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Start here
        </div>
        <p className="text-2xl font-bold tracking-tight text-[hsl(var(--color-foreground))] sm:text-3xl">
          {label || t('buttons.upload')}
        </p>
      </div>

      {/* Description */}
      <div className="relative mt-4 max-w-xl text-center text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
        {description || (
          <>
            <p className="mb-4 text-base">{t('fileUploader.dragDrop')}</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--color-muted)/0.65)] px-3 py-1.5 text-xs font-medium">
                <ArrowUpFromLine className="h-3.5 w-3.5" aria-hidden="true" />
                {t('fileUploader.support')}: {t('fileUploader.paste')}
              </span>
              {maxSizeLabel && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--color-muted)/0.65)] px-3 py-1.5 text-xs font-medium">
                  <FileUp className="h-3.5 w-3.5" aria-hidden="true" />
                  Max {maxSizeLabel}
                </span>
              )}
              {multiple && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--color-primary)/0.10)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--color-primary))]">
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Up to {maxFiles} files
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[2.25rem] bg-[hsl(var(--color-background)/0.92)] backdrop-blur-md transition-opacity duration-200">
          <div className="mb-4 grid h-20 w-20 place-items-center rounded-[1.5rem] bg-[hsl(var(--color-primary)/0.12)] text-[hsl(var(--color-primary))] motion-safe:animate-bounce">
            <Plus className="h-9 w-9" aria-hidden="true" />
          </div>
          <p className="text-xl font-bold text-[hsl(var(--color-primary))]">
            {t('fileUploader.dropToUpload')}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
