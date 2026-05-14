'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Languages, Lock, ShieldCheck, Sparkles, UploadCloud, Workflow, Zap } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getPopularTools } from '@/config/tools';
import { brand } from '@/config/brand';
import { type Locale } from '@/lib/i18n/config';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

const examplePrompts = [
  'Compress this PDF for email',
  'Merge these files and add page numbers',
  'Extract pages 5 to 10 and convert them to images',
  'Add a confidential watermark',
  'OCR this scanned PDF in French',
];

const features = [
  {
    icon: Workflow,
    title: 'Classic PDF tools',
    description: 'Merge, split, compress, convert, OCR, watermark, secure, and organize PDFs with the existing PDFCraft engine.',
  },
  {
    icon: Sparkles,
    title: 'AI-ready automation',
    description: 'The interface is prepared for natural-language workflows while preserving current tool behavior.',
  },
  {
    icon: Zap,
    title: 'Fast browser workflows',
    description: 'Keep the privacy-first, client-side processing model while presenting a polished SaaS experience.',
  },
  {
    icon: Languages,
    title: 'Multilingual by design',
    description: 'Built for localized pages and ready for English, French, Arabic, and existing PdfTo locales.',
  },
  {
    icon: Lock,
    title: 'Privacy-aware processing',
    description: 'Designed around temporary, controlled PDF workflows and the original browser-first privacy model.',
  },
  {
    icon: ShieldCheck,
    title: 'Self-hosting ready',
    description: 'A visual foundation for evolving PDFto into a self-hosted PDF automation platform.',
  },
];

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const popularTools = getPopularTools().slice(0, 8);

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-24 lg:pt-40 lg:pb-28" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.82)] px-4 py-2 text-sm font-medium text-[hsl(var(--color-muted-foreground))] shadow-sm backdrop-blur">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" aria-hidden="true" />
                  {brand.tagline}
                </span>

                <h1 id="hero-title" className="mt-6 text-4xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-5xl lg:text-6xl">
                  PDF tools and <span className="text-gradient-brand">AI automation</span> in one place.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                  Convert, compress, merge, split, secure, and automate PDFs using the real PDFCraft tool engine behind a modern PDFto interface.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/${locale}/tools`}>
                    <Button variant="primary" size="lg" className="h-12 px-8 text-base shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5">
                      Start with a PDF
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link href={`/${locale}/tools/compress-pdf`}>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                      Try Compress PDF
                    </Button>
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                  {['No installation', 'Browser-first tools', 'Multilingual UI'].map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--color-success))]" aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[hsl(var(--color-primary)/0.20)] via-[hsl(var(--color-accent)/0.10)] to-transparent blur-3xl" />
                <Card className="overflow-hidden rounded-[2rem] border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.92)] p-5 shadow-2xl backdrop-blur" hover={false}>
                  <div className="rounded-3xl border-2 border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-8 text-center transition hover:border-[hsl(var(--color-primary)/0.55)] hover:bg-[hsl(var(--color-primary-soft))]">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))] shadow-[var(--shadow-soft)]">
                      <UploadCloud className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-bold text-[hsl(var(--color-foreground))]">Drop a PDF to start</h2>
                    <p className="mt-2 text-sm text-[hsl(var(--color-muted-foreground))]">Use a single tool now, or combine tools later in workflows.</p>
                    <Link href={`/${locale}/tools`} className="mt-5 inline-flex rounded-xl bg-[hsl(var(--color-primary))] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)]">
                      Browse tools
                    </Link>
                  </div>

                  <div className="mt-5 rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-secondary)/0.55)] p-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--color-muted-foreground))]">
                      <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--color-accent))]" /> Future AI plan preview
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[hsl(var(--color-foreground))]">“Compress this PDF for email and add page numbers”</p>
                    <ol className="mt-4 space-y-2 text-sm">
                      {['Compress PDF', 'Add page numbers', 'Export final document'].map((step, index) => (
                        <li key={step} className="flex items-center gap-2">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-[hsl(var(--color-primary))] text-xs font-bold text-white">{index + 1}</span>
                          <span className="text-[hsl(var(--color-foreground))]">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20" aria-labelledby="popular-tools-title">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-primary-soft))] px-3 py-1 text-sm font-semibold text-[hsl(var(--color-primary))]">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Popular tools
              </span>
              <h2 id="popular-tools-title" className="mt-4 text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
                Start with the tools people use most
              </h2>
              <p className="mt-2 max-w-2xl text-[hsl(var(--color-muted-foreground))]">
                These cards still connect to the existing PdfTo/PDFCraft routes and tool implementations.
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

        <section className="bg-[hsl(var(--color-secondary)/0.45)] py-24" aria-labelledby="ai-section-title">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-sm font-semibold text-[hsl(var(--color-accent))]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" /> AI-ready interface
                </span>
                <h2 id="ai-section-title" className="mt-5 text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
                  Designed for natural-language PDF workflows
                </h2>
                <p className="mt-4 text-[hsl(var(--color-muted-foreground))]">
                  This phase only refreshes design. Future AI orchestration can map prompts to the existing tool registry without rewriting PDF processing logic.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {examplePrompts.map((prompt) => (
                    <span key={prompt} className="rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-1.5 text-sm text-[hsl(var(--color-foreground))] shadow-sm">
                      {prompt}
                    </span>
                  ))}
                </div>
              </div>

              <Card className="rounded-[2rem] border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-soft)]" hover={false}>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--color-success))]" /> Example workflow
                </div>
                <p className="mt-3 text-lg font-bold text-[hsl(var(--color-foreground))]">“Merge these contracts and add a confidential watermark”</p>
                <div className="mt-5 space-y-3">
                  {[
                    ['Merge PDF', '3 input files → 1 output'],
                    ['Add watermark', 'text: CONFIDENTIAL · diagonal'],
                    ['Export final document', 'contracts-merged.pdf'],
                  ].map(([name, meta], index) => (
                    <div key={name} className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-secondary)/0.45)] p-4">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-[hsl(var(--color-primary))] text-xs font-bold text-white">{index + 1}</span>
                      <span>
                        <span className="block font-semibold text-[hsl(var(--color-foreground))]">{name}</span>
                        <span className="block text-xs text-[hsl(var(--color-muted-foreground))]">{meta}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24" aria-labelledby="features-title">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="features-title" className="text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
              A SaaS-grade interface for a powerful PDF engine
            </h2>
            <p className="mt-3 text-[hsl(var(--color-muted-foreground))]">
              The visual layer is refreshed while core PDF utilities remain untouched.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="rounded-3xl border-[hsl(var(--color-border))] p-6 transition hover:border-[hsl(var(--color-primary)/0.45)]" hover={false}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[hsl(var(--color-foreground))]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24" aria-labelledby="privacy-title">
          <div className="rounded-[2rem] border border-[hsl(var(--color-border))] bg-gradient-to-br from-[hsl(var(--color-primary-soft))] via-[hsl(var(--color-card))] to-[hsl(var(--color-accent-soft))] p-10 text-center shadow-[var(--shadow-soft)] md:p-16">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--color-card))] shadow-[var(--shadow-soft)]">
              <ShieldCheck className="h-7 w-7 text-[hsl(var(--color-primary))]" aria-hidden="true" />
            </span>
            <h2 id="privacy-title" className="mt-6 text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
              Privacy-aware PDF processing, modernized
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--color-muted-foreground))]">
              The new design keeps PDFto aligned with the original PDFCraft privacy model while preparing the interface for future self-hosted and AI-assisted workflows.
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
