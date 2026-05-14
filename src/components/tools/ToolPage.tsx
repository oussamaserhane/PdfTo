'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Clock, Home, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { getToolById } from '@/config/tools';
import { getToolIcon } from '@/config/icons';
import { ToolProvider } from '@/lib/contexts/ToolContext';
import { sanitizeHtml } from '@/lib/utils/html-sanitizer';
import { type Locale } from '@/lib/i18n/config';
import { type FAQ, type HowToStep, type Tool, type ToolCategory, type ToolContent, type UseCase } from '@/types/tool';

export interface ToolPageProps {
  tool: Tool;
  content: ToolContent;
  locale: string;
  children?: React.ReactNode;
  localizedRelatedTools?: Record<string, { title: string; description: string }>;
}

const categoryLabels: Record<ToolCategory, string> = {
  'edit-annotate': 'Edit',
  'convert-to-pdf': 'Convert to PDF',
  'convert-from-pdf': 'Convert from PDF',
  'organize-manage': 'Organize',
  'optimize-repair': 'Optimize',
  'secure-pdf': 'Secure',
};

export function ToolPage({ tool, content, locale, children, localizedRelatedTools = {} }: ToolPageProps) {
  const relatedTools = tool.relatedTools
    .map((id) => getToolById(id))
    .filter((related): related is Tool => related !== undefined);

  const toolDisplayName = content.title || toTitle(tool.id);
  const categoryName = categoryLabels[tool.category] || tool.category;
  const Icon = getToolIcon(tool.icon);

  return (
    <ToolProvider toolSlug={tool.slug} toolName={toolDisplayName}>
      <div className="min-h-screen bg-[hsl(var(--color-background))]" data-testid="tool-page">
        <Header locale={locale as Locale} />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          <section className="relative overflow-hidden border-b border-[hsl(var(--color-border))] bg-hero-gradient pt-32 pb-10" aria-labelledby="tool-title">
            <div className="absolute inset-0 bg-grid opacity-35" />
            <div className="container relative mx-auto px-4">
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <Link href={`/${locale}`} className="inline-flex items-center gap-1 transition hover:text-[hsl(var(--color-primary))]">
                  <Home className="h-4 w-4" aria-hidden="true" /> Home
                </Link>
                <ChevronRight className="h-4 w-4 text-[hsl(var(--color-border))]" />
                <Link href={`/${locale}/tools`} className="transition hover:text-[hsl(var(--color-primary))]">Tools</Link>
                <ChevronRight className="h-4 w-4 text-[hsl(var(--color-border))]" />
                <span className="font-medium text-[hsl(var(--color-foreground))]" aria-current="page">{toolDisplayName}</span>
              </nav>

              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="flex items-start gap-5">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] text-white shadow-[var(--shadow-glow)]">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[hsl(var(--color-primary-soft))] px-3 py-1 text-xs font-semibold text-[hsl(var(--color-primary))]">{categoryName}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.8)] px-3 py-1 text-xs font-medium text-[hsl(var(--color-muted-foreground))]">
                        <ShieldCheck className="h-3.5 w-3.5" /> Browser-first
                      </span>
                    </div>
                    <h1 id="tool-title" className="text-3xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-5xl" itemProp="name">
                      {toolDisplayName}
                    </h1>
                    <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]" itemProp="description">
                      {content.metaDescription}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-[hsl(var(--color-muted-foreground))]">
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> Usually finishes in seconds</span>
                      <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" /> Works with PDFto visual shell</span>
                    </div>
                  </div>
                </div>

                <FavoriteButton toolId={tool.id} size="lg" showLabel />
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-10" aria-label="Tool interface">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
              {['Upload', 'Configure', 'Process & download'].map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[hsl(var(--color-primary))] text-xs font-bold text-white">{index + 1}</span>
                  <span className="font-medium text-[hsl(var(--color-foreground))]">{step}</span>
                  {index < 2 && <span className="h-px w-8 bg-[hsl(var(--color-border))]" />}
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-soft)] sm:p-6">
              {children}
            </div>
          </section>

          <div className="container mx-auto px-4 pb-16">
            <DescriptionSection description={content.description} />
            <HowToUseSection steps={content.howToUse} />
            <UseCasesSection useCases={content.useCases} />
            <FAQSection faq={content.faq} />
            <RelatedToolsSection tools={relatedTools} locale={locale} localizedRelatedTools={localizedRelatedTools} />
          </div>
        </main>

        <Footer locale={locale as Locale} />
      </div>
    </ToolProvider>
  );
}

function DescriptionSection({ description }: { description: string }) {
  const sanitizedDescription = useMemo(() => sanitizeHtml(description), [description]);
  if (!description) return null;

  return (
    <section className="mt-10" aria-labelledby="description-heading">
      <h2 id="description-heading" className="mb-5 text-2xl font-bold text-[hsl(var(--color-foreground))]">About this tool</h2>
      <Card variant="outlined" size="lg" className="glass-card rounded-3xl" hover={false}>
        <div className="prose prose-sm max-w-none text-[hsl(var(--color-foreground))]/85" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </Card>
    </section>
  );
}

function HowToUseSection({ steps }: { steps: HowToStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="how-to-heading" itemScope itemType="https://schema.org/HowTo">
      <h2 id="how-to-heading" className="mb-5 text-2xl font-bold text-[hsl(var(--color-foreground))]" itemProp="name">How to use it</h2>
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.step} itemScope itemProp="step" itemType="https://schema.org/HowToStep">
            <Card className="h-full rounded-3xl border-[hsl(var(--color-border))] p-6" hover={false}>
              <meta itemProp="position" content={String(step.step)} />
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-lg font-bold text-[hsl(var(--color-primary))]">{step.step}</span>
              <h3 className="mt-4 text-lg font-bold text-[hsl(var(--color-foreground))]" itemProp="name">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]" itemProp="text">{step.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

function UseCasesSection({ useCases }: { useCases: UseCase[] }) {
  if (!useCases || useCases.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="use-cases-heading">
      <h2 id="use-cases-heading" className="mb-5 text-2xl font-bold text-[hsl(var(--color-foreground))]">Common use cases</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase, index) => (
          <Card key={`${useCase.title}-${index}`} className="glass-card rounded-3xl p-6" hover={false}>
            <h3 className="font-bold text-[hsl(var(--color-foreground))]">{useCase.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{useCase.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ faq }: { faq: FAQ[] }) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
      <h2 id="faq-heading" className="mb-5 text-2xl font-bold text-[hsl(var(--color-foreground))]">FAQ</h2>
      <div className="space-y-4">
        {faq.map((item, index) => (
          <Card key={`${item.question}-${index}`} variant="outlined" className="rounded-3xl p-6" hover={false} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 className="font-bold text-[hsl(var(--color-foreground))]" itemProp="name">{item.question}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]" itemProp="text">{item.answer}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function RelatedToolsSection({
  tools,
  locale,
  localizedRelatedTools,
}: {
  tools: Tool[];
  locale: string;
  localizedRelatedTools: Record<string, { title: string; description: string }>;
}) {
  const t = useTranslations();
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="mb-5 text-2xl font-bold text-[hsl(var(--color-foreground))]">Related tools</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const localized = localizedRelatedTools[tool.id];
          const Icon = getToolIcon(tool.icon);
          const categoryLabel = categoryLabels[tool.category] ?? t(`home.categories.${tool.category}`);

          return (
            <Link key={tool.id} href={`/${locale}/tools/${tool.slug}`} className="group block">
              <Card className="h-full rounded-3xl p-5 transition group-hover:-translate-y-1 group-hover:border-[hsl(var(--color-primary)/0.45)]" hover={false}>
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))] transition group-hover:bg-[hsl(var(--color-primary))] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-[hsl(var(--color-foreground))]">{localized?.title ?? toTitle(tool.id)}</span>
                    <span className="block truncate text-xs text-[hsl(var(--color-muted-foreground))]">{categoryLabel}</span>
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function toTitle(value: string) {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default ToolPage;
