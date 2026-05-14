'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FileSearch,
  Layers3,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  WandSparkles,
  Zap,
} from 'lucide-react';
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

const proofPoints = ['No install', 'Real PDFCraft tools', 'AI-ready workflows'];

const commandTiles = [
  ['Convert', 'PDF to image, image to PDF, Office to PDF'],
  ['Compress', 'Reduce size for email, web, and archives'],
  ['Organize', 'Merge, split, extract, rotate, and reorder'],
  ['Secure', 'Encrypt, sanitize, flatten, and manage metadata'],
];

const features = [
  {
    icon: Compass,
    title: 'A command-center interface',
    description: 'A distinctive workspace for choosing tools, preparing documents, and moving from one-off actions to repeatable workflows.',
  },
  {
    icon: Layers3,
    title: 'Built on real tool logic',
    description: 'The design refresh keeps the existing PdfTo routing and PDFCraft implementations untouched.',
  },
  {
    icon: WandSparkles,
    title: 'Ready for AI orchestration',
    description: 'The product language and screens are prepared for future natural-language PDF workflow planning.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-aware by default',
    description: 'The interface keeps the browser-first privacy positioning clear and visible.',
  },
  {
    icon: FileSearch,
    title: 'Fast tool discovery',
    description: 'Search, category browsing, and focused tool cards make the 80+ tool surface easier to navigate.',
  },
  {
    icon: Rocket,
    title: 'SaaS-grade growth path',
    description: 'Pricing, sign-in, and account pages are introduced as design-only surfaces for future backend integration.',
  },
];

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const popularTools = getPopularTools().slice(0, 8);

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <section className="relative overflow-hidden bg-aurora-mesh pt-32 pb-24 lg:pt-40 lg:pb-32" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-grid opacity-45" />
          <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-[hsl(var(--color-primary)/0.16)] blur-3xl" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.78)] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-muted-foreground))] shadow-sm backdrop-blur">
                    <Sparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" aria-hidden="true" />
                    {brand.tagline}
                  </div>

                  <h1 id="hero-title" className="mt-7 max-w-4xl text-5xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-6xl lg:text-7xl">
                    Move PDFs from <span className="text-gradient-brand">task</span> to <span className="text-gradient-warm">workflow</span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))] md:text-xl">
                    PDFto gives the existing PDFCraft engine a new identity: a fast, visual command center for converting, compressing, organizing, and securing documents.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/${locale}/tools`}>
                      <Button variant="primary" size="lg" className="h-12 px-8 text-base shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5">
                        Start with a PDF
                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Link href={`/${locale}/pricing`}>
                      <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                        View pricing
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                    {proofPoints.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-[hsl(var(--color-success))]" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-[hsl(var(--color-primary)/0.24)] via-[hsl(var(--color-accent)/0.16)] to-[hsl(var(--color-signal)/0.12)] blur-3xl" />
                  <Card className="overflow-hidden rounded-[2.25rem] border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.90)] p-5 shadow-2xl backdrop-blur" hover={false}>
                    <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--color-muted-foreground))]">PDFto cockpit</div>
                          <div className="mt-1 text-xl font-black text-[hsl(var(--color-foreground))]">What do you need to do?</div>
                        </div>
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--color-primary))] text-white shadow-[var(--shadow-glow)]">
                          <Zap className="h-5 w-5" />
                        </span>
                      </div>

                      <div className="mt-5 rounded-3xl border-2 border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-secondary)/0.55)] p-7 text-center transition hover:border-[hsl(var(--color-primary)/0.55)]">
                        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))] shadow-[var(--shadow-soft)]">
                          <UploadCloud className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <h2 className="mt-5 text-xl font-black text-[hsl(var(--color-foreground))]">Drop a document</h2>
                        <p className="mt-2 text-sm text-[hsl(var(--color-muted-foreground))]">Then choose a tool or prepare a workflow.</p>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {commandTiles.map(([title, body]) => (
                          <div key={title} className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-soft)]">
                            <div className="font-bold text-[hsl(var(--color-foreground))]">{title}</div>
                            <div className="mt-1 text-xs leading-relaxed text-[hsl(var(--color-muted-foreground))]">{body}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20" aria-labelledby="popular-tools-title">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-primary-soft))] px-3 py-1 text-sm font-semibold text-[hsl(var(--color-primary))]">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Tool launchpad
              </span>
              <h2 id="popular-tools-title" className="mt-4 text-3xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
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

        <section className="bg-[hsl(var(--color-secondary)/0.48)] py-24" aria-labelledby="identity-title">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-sm font-semibold text-[hsl(var(--color-accent))]">
                  <WandSparkles className="h-4 w-4" aria-hidden="true" /> New product identity
                </span>
                <h2 id="identity-title" className="mt-5 text-3xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-5xl">
                  A workspace that feels different from old PDF utility sites.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                  The new visual system uses aurora gradients, command cards, and warm action colors to separate PDFto from generic blue PDF tools.
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
                      <h3 className="mt-5 text-lg font-black text-[hsl(var(--color-foreground))]">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{feature.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24" aria-labelledby="privacy-title">
          <div className="rounded-[2.5rem] border border-[hsl(var(--color-border))] bg-gradient-to-br from-[hsl(var(--color-primary-soft))] via-[hsl(var(--color-card))] to-[hsl(var(--color-accent-soft))] p-10 text-center shadow-[var(--shadow-soft)] md:p-16">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--color-card))] shadow-[var(--shadow-soft)]">
              <Lock className="h-7 w-7 text-[hsl(var(--color-primary))]" aria-hidden="true" />
            </span>
            <h2 id="privacy-title" className="mt-6 text-3xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-4xl">
              Modern design, same protected functionality.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--color-muted-foreground))]">
              This phase changes the visual layer only: no PDF processing utilities, WASM assets, or tool implementations are modified.
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
