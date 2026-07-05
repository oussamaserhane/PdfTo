'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Layers3,
  Lock,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getPopularTools } from '@/config/tools';
import { type Locale } from '@/lib/i18n/config';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
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
  'Add a confidential watermark',
  'OCR this scanned PDF in French',
  'Protect this PDF with a password and remove metadata',
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI-first interaction',
    description: 'The homepage starts from user intent: upload a PDF, describe the task, then route to the best PDF action.',
  },
  {
    icon: Workflow,
    title: 'Tool or workflow routing',
    description: 'Simple requests can open a focused tool page; multi-step requests can move to the workflow builder later.',
  },
  {
    icon: Layers3,
    title: 'Built on real tool logic',
    description: 'This UI does not change PDF processing. It keeps the existing PdfTo routes and PDFto implementations.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-aware by default',
    description: 'The interface keeps the browser-first privacy positioning clear and visible.',
  },
  {
    icon: FileSearch,
    title: 'Fast tool discovery',
    description: 'Users can still browse the full tool library when they prefer manual selection.',
  },
  {
    icon: Rocket,
    title: 'Ready for LLM integration',
    description: 'The UI prepares the prompt-driven path, while actual LLM planning can be connected in a later phase.',
  },
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
    reason: 'Describe the task to get a better suggested destination.',
    mode: 'tool',
  };
}

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const popularTools = getPopularTools().slice(0, 8);
  const [prompt, setPrompt] = useState('');
  const [fileName, setFileName] = useState<string>('');

  const suggestedRoute = useMemo(() => inferRoute(prompt, locale), [prompt, locale]);
  const hasPrompt = prompt.trim().length > 0;

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <section className="relative overflow-hidden bg-aurora-mesh pt-24 pb-12 md:pt-28 lg:pt-30" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-[hsl(var(--color-primary)/0.14)] blur-3xl" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.78)] px-3.5 py-1.5 text-xs font-semibold text-[hsl(var(--color-muted-foreground))] shadow-sm backdrop-blur md:text-sm">
                <BrainCircuit className="h-4 w-4 text-[hsl(var(--color-accent))]" aria-hidden="true" />
                AI-first PDF workspace
              </div>

              <h1
  id="hero-title"
  className="mx-auto mt-5 max-w-none whitespace-normal text-center text-[clamp(2.5rem,4.5vw,4.75rem)] font-black leading-[1.05] tracking-tight text-[hsl(var(--color-foreground))] lg:whitespace-nowrap"
>
  Upload a PDF. <span className="text-gradient-brand">Tell PDFto</span> what to do.
</h1>
            </div>

            <div className="mx-auto mt-8 max-w-5xl">
              <Card className="relative overflow-hidden rounded-[2rem] border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.90)] p-3 shadow-2xl backdrop-blur md:p-5" hover={false}>
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[hsl(var(--color-accent)/0.18)] blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[hsl(var(--color-primary)/0.16)] blur-3xl" />

                <div className="relative grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <label className="group flex min-h-[17rem] cursor-pointer flex-col items-center justify-center rounded-[1.6rem] border-2 border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-6 text-center transition hover:border-[hsl(var(--color-primary)/0.55)] hover:bg-[hsl(var(--color-primary-soft))]">
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) setFileName(file.name);
                      }}
                    />
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))] shadow-[var(--shadow-soft)] transition group-hover:scale-105">
                      <UploadCloud className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-xl font-black text-[hsl(var(--color-foreground))]">
                      {fileName ? 'PDF selected' : 'Drop your PDF here'}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                      {fileName ? fileName : 'Drag and drop a PDF file, or click to browse.'}
                    </p>
                    <span className="mt-4 inline-flex rounded-full bg-[hsl(var(--color-primary))] px-5 py-2 text-sm font-bold text-white shadow-[var(--shadow-glow)]">
                      Choose PDF
                    </span>
                  </label>

                  <div className="rounded-[1.6rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-4 shadow-[var(--shadow-soft)] md:p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-signal))] text-white shadow-[var(--shadow-glow)]">
                        <MessageSquareText className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[hsl(var(--color-muted-foreground))]">Prompt command</div>
                        <h2 className="text-lg font-black text-[hsl(var(--color-foreground))]">What do you want to do?</h2>
                      </div>
                    </div>

                    <textarea
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      placeholder="Example: compress this PDF for email and add page numbers"
                      className="mt-4 min-h-28 w-full resize-none rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 text-sm leading-relaxed text-[hsl(var(--color-foreground))] outline-none transition placeholder:text-[hsl(var(--color-muted-foreground))] focus:border-[hsl(var(--color-primary))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)] md:text-base"
                    />

                    <div className="mt-3 flex flex-wrap gap-2">
                      {promptExamples.slice(0, 3).map((example) => (
                        <button
                          key={example}
                          onClick={() => setPrompt(example)}
                          className="rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--color-muted-foreground))] shadow-sm transition hover:border-[hsl(var(--color-primary)/0.45)] hover:text-[hsl(var(--color-primary))]"
                        >
                          {example}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-secondary)/0.55)] p-3.5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
                            <WandSparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" />
                            Routing preview
                          </div>
                          <p className="mt-1.5 text-sm font-semibold text-[hsl(var(--color-foreground))]">
                            {hasPrompt ? suggestedRoute.reason : 'Write a prompt to preview the destination.'}
                          </p>
                        </div>
                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${
                          suggestedRoute.mode === 'workflow'
                            ? 'bg-[hsl(var(--color-accent-soft))] text-[hsl(var(--color-accent))]'
                            : 'bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]'
                        }`}>
                          {suggestedRoute.mode === 'workflow' ? 'Workflow' : 'Tool'}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
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
          </div>
        </section>

        <section className="container mx-auto px-4 py-16" aria-labelledby="popular-tools-title">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-primary-soft))] px-3 py-1 text-sm font-semibold text-[hsl(var(--color-primary))]">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Still prefer manual tools?
              </span>
              <h2 id="popular-tools-title" className="mt-4 text-3xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
                Open a tool directly
              </h2>
              <p className="mt-2 max-w-2xl text-[hsl(var(--color-muted-foreground))]">
                The AI-first command panel is the main entry point, but all existing PdfTo/PDFto tools remain available.
              </p>
            </div>
            <Link href={`/${locale}/tools`}>
              <Button variant="outline">
                All tools <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
          <ToolGrid tools={popularTools} locale={locale} localizedToolContent={localizedToolContent} />
        </section>

        <section className="bg-[hsl(var(--color-secondary)/0.48)] py-20" aria-labelledby="ai-first-title">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-sm font-semibold text-[hsl(var(--color-accent))]">
                  <BrainCircuit className="h-4 w-4" aria-hidden="true" /> AI-first product direction
                </span>
                <h2 id="ai-first-title" className="mt-5 text-3xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-5xl">
                  The homepage becomes a prompt-driven router.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                  For now, the routing preview is heuristic and UI-only. Later, the same interface can call a local LLM planner to map intent to a tool or a multi-step workflow.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={feature.title} className="rounded-3xl border-[hsl(var(--color-border))] p-6 transition hover:border-[hsl(var(--color-primary)/0.45)]" hover={false}>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-base lg:text-lg font-bold text-[hsl(var(--color-foreground))] whitespace-nowrap">{feature.title}</h3>

                      
                      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{feature.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20" aria-labelledby="privacy-title">
          <div className="rounded-[2.5rem] border border-[hsl(var(--color-border))] bg-gradient-to-br from-[hsl(var(--color-primary-soft))] via-[hsl(var(--color-card))] to-[hsl(var(--color-accent-soft))] p-10 text-center shadow-[var(--shadow-soft)] md:p-16">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--color-card))] shadow-[var(--shadow-soft)]">
              <Lock className="h-7 w-7 text-[hsl(var(--color-primary))]" aria-hidden="true" />
            </span>
            <h2 id="privacy-title" className="mt-6 text-3xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
              UI first. LLM later. PDF logic unchanged.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--color-muted-foreground))]">
              This phase adds the AI-first homepage experience only. No LLM, backend, PDF utilities, WASM assets, or tool implementations are modified.
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
