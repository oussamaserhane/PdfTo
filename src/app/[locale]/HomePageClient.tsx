'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  MessageSquareText,
  Sparkles,
  UploadCloud,
  WandSparkles,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeToolsSidebar } from '@/components/home/HomeToolsSidebar';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { brand } from '@/config/brand';
import { getPopularTools } from '@/config/tools';
import type { Locale } from '@/lib/i18n/config';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title?: string; description?: string; metaDescription?: string }>;
}

type SuggestedRoute = {
  label: string;
  href: string;
  reason: string;
  mode: 'tool' | 'workflow';
};

const proofPoints = ['Upload-first', 'AI-ready routing', 'Real PDFto tools'];

const promptExamples = [
  'Compress this PDF for email',
  'Merge these PDFs and add page numbers',
  'Extract pages 5 to 10 and convert them to images',
];

function inferRoute(prompt: string, locale: string): SuggestedRoute {
  const text = prompt.toLowerCase();

  const isWorkflow =
    text.includes(' and ') ||
    text.includes(' then ') ||
    text.includes('workflow') ||
    text.includes('batch') ||
    (text.includes('merge') && (text.includes('page number') || text.includes('watermark') || text.includes('compress'))) ||
    (text.includes('protect') && (text.includes('metadata') || text.includes('compress') || text.includes('watermark')));

  if (isWorkflow) {
    return {
      label: 'Open Workflow Builder',
      href: `/${locale}/workflow`,
      reason: 'This looks like a multi-step PDF task.',
      mode: 'workflow',
    };
  }

  if (text.includes('compress') || text.includes('reduce') || text.includes('email')) {
    return {
      label: 'Open Compress PDF',
      href: `/${locale}/tools/compress-pdf`,
      reason: 'This looks like a single compression task.',
      mode: 'tool',
    };
  }

  if (text.includes('merge') || text.includes('combine')) {
    return {
      label: 'Open Merge PDF',
      href: `/${locale}/tools/merge-pdf`,
      reason: 'This looks like a single merge task.',
      mode: 'tool',
    };
  }

  if (text.includes('split')) {
    return {
      label: 'Open Split PDF',
      href: `/${locale}/tools/split-pdf`,
      reason: 'This looks like a single split task.',
      mode: 'tool',
    };
  }

  if (text.includes('extract')) {
    return {
      label: 'Open Extract Pages',
      href: `/${locale}/tools/extract-pages`,
      reason: 'This looks like a page extraction task.',
      mode: 'tool',
    };
  }

  if (text.includes('watermark')) {
    return {
      label: 'Open Watermark PDF',
      href: `/${locale}/tools/add-watermark`,
      reason: 'This looks like a watermarking task.',
      mode: 'tool',
    };
  }

  if (text.includes('ocr') || text.includes('scan') || text.includes('scanned')) {
    return {
      label: 'Open OCR PDF',
      href: `/${locale}/tools/ocr-pdf`,
      reason: 'This looks like a scanned-document/OCR task.',
      mode: 'tool',
    };
  }

  if (text.includes('protect') || text.includes('password') || text.includes('encrypt')) {
    return {
      label: 'Open Encrypt PDF',
      href: `/${locale}/tools/encrypt-pdf`,
      reason: 'This looks like a PDF security task.',
      mode: 'tool',
    };
  }

  return {
    label: 'Browse Matching Tools',
    href: `/${locale}/tools`,
    reason: 'Write a prompt to preview the destination.',
    mode: 'tool',
  };
}

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const popularTools = getPopularTools().slice(0, 8);
  const [prompt, setPrompt] = useState('');
  const [fileName, setFileName] = useState('');
  const suggestedRoute = useMemo(() => inferRoute(prompt, locale), [prompt, locale]);
  const hasPrompt = prompt.trim().length > 0;

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main className="mx-auto flex w-full max-w-[1800px] gap-5 px-3 py-3 sm:px-4 lg:px-3">
        <HomeToolsSidebar locale={locale} localizedToolContent={localizedToolContent} />

        <div className="min-w-0 flex-1">
          <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[hsl(var(--color-primary-soft))] via-[hsl(var(--color-background))] to-[hsl(var(--color-accent-soft))] px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-7rem)] lg:px-10 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--color-border)/0.34)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--color-border)/0.34)_1px,transparent_1px)] bg-[size:36px_36px] opacity-45" />
            <div className="pointer-events-none absolute right-8 top-10 h-64 w-64 rounded-full bg-[hsl(var(--color-accent)/0.16)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-8 left-8 h-72 w-72 rounded-full bg-[hsl(var(--color-primary)/0.12)] blur-3xl" />

            <div className="relative mx-auto max-w-[1180px]">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.82)] px-4 py-2 text-sm font-bold text-[hsl(var(--color-muted-foreground))] shadow-sm backdrop-blur">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" aria-hidden="true" />
                  AI-first PDF workspace
                </span>

                <h1 className="mx-auto mt-6 max-w-5xl text-balance text-4xl font-black tracking-tight text-[hsl(var(--color-foreground))] sm:text-5xl xl:text-6xl">
                  Upload a PDF.{' '}
                  <span className="bg-gradient-to-r from-[hsl(var(--color-primary))] via-orange-500 to-[hsl(var(--color-accent))] bg-clip-text text-transparent">
                    Tell {brand.name}
                  </span>{' '}
                  what to do.
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[hsl(var(--color-muted-foreground))] sm:text-lg">
                  Choose a tool from the left menu, upload a document, or describe your task in natural language.
                </p>
              </div>

              <Card className="mx-auto mt-8 max-w-5xl rounded-[2rem] border-[hsl(var(--color-primary)/0.18)] bg-[hsl(var(--color-card)/0.86)] p-4 shadow-2xl backdrop-blur-xl sm:p-5" hover={false}>
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <label className="group flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background)/0.52)] p-8 text-center transition hover:border-[hsl(var(--color-primary)/0.55)] hover:bg-[hsl(var(--color-primary-soft))]">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) setFileName(file.name);
                      }}
                    />
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))] shadow-sm transition group-hover:scale-105">
                      <UploadCloud className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 text-xl font-black text-[hsl(var(--color-foreground))]">
                      {fileName ? 'PDF selected' : 'Drop your PDF here'}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                      {fileName ? fileName : 'Drag and drop a PDF file, or click to browse.'}
                    </p>
                    <span className="mt-5 rounded-full bg-[hsl(var(--color-primary))] px-5 py-2 text-sm font-black text-[hsl(var(--color-primary-foreground))] shadow-sm">
                      Choose PDF
                    </span>
                  </label>

                  <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] via-orange-500 to-[hsl(var(--color-accent))] text-white shadow-sm">
                        <MessageSquareText className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-[hsl(var(--color-muted-foreground))]">
                          Prompt command
                        </p>
                        <h2 className="mt-1 text-lg font-black text-[hsl(var(--color-foreground))]">
                          What do you want to do?
                        </h2>
                      </div>
                    </div>

                    <textarea
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      placeholder="Example: compress this PDF for email and add page numbers"
                      className="mt-5 min-h-28 w-full resize-none rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background)/0.55)] p-4 text-sm leading-relaxed text-[hsl(var(--color-foreground))] outline-none transition placeholder:text-[hsl(var(--color-muted-foreground))] focus:border-[hsl(var(--color-primary))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)] sm:text-base"
                    />

                    <div className="mt-3 flex flex-wrap gap-2">
                      {promptExamples.map((example) => (
                        <button
                          key={example}
                          onClick={() => setPrompt(example)}
                          className="rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-1.5 text-xs font-bold text-[hsl(var(--color-muted-foreground))] shadow-sm transition hover:border-[hsl(var(--color-primary)/0.45)] hover:text-[hsl(var(--color-primary))]"
                        >
                          {example}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-secondary)/0.55)] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-[0.68rem] font-black uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
                            <WandSparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" aria-hidden="true" />
                            Routing preview
                          </div>
                          <p className="mt-1.5 text-sm font-bold text-[hsl(var(--color-foreground))]">
                            {hasPrompt ? suggestedRoute.reason : 'Write a prompt to preview the destination.'}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${
                            suggestedRoute.mode === 'workflow'
                              ? 'bg-[hsl(var(--color-accent-soft))] text-[hsl(var(--color-accent))]'
                              : 'bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]'
                          }`}
                        >
                          {suggestedRoute.mode === 'workflow' ? 'Workflow' : 'Tool'}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Link href={suggestedRoute.href}>
                          <Button variant="primary" className="w-full sm:w-auto">
                            {suggestedRoute.label}
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                          </Button>
                        </Link>
                        <Link href={`/${locale}/tools`}>
                          <Button variant="outline" className="w-full sm:w-auto">
                            Browse tools
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                {proofPoints.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--color-success))]" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="px-1 py-12 sm:px-2" aria-labelledby="popular-tools-title">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-primary-soft))] px-3 py-1 text-sm font-bold text-[hsl(var(--color-primary))]">
                  <FileSearch className="h-4 w-4" aria-hidden="true" />
                  Direct access
                </span>
                <h2 id="popular-tools-title" className="mt-3 text-2xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-3xl">
                  Most used tools
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))] md:text-base">
                  The left menu gives you quick access by category. These popular tools remain visible here for faster use.
                </p>
              </div>
              <Link href={`/${locale}/tools`}>
                <Button variant="outline">
                  All tools
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            <ToolGrid tools={popularTools} locale={locale} localizedToolContent={localizedToolContent} />
          </section>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
