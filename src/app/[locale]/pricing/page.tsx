import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { brand } from '@/config/brand';
import { locales, type Locale } from '@/lib/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For quick PDF tasks and testing the workspace.',
    cta: 'Start free',
    href: 'signup',
    highlighted: false,
    features: [
      'Basic PDF tools',
      'Limited daily processing',
      'Small file size limit',
      'Browser-first processing',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For frequent users who need larger files and AI-ready workflows.',
    cta: 'Try Pro',
    href: 'signup',
    highlighted: true,
    features: [
      'Higher monthly usage',
      'Larger file uploads',
      'OCR-ready workflows',
      'Batch workflow preparation',
      'Priority processing queue',
    ],
  },
  {
    name: 'Business',
    price: '$29',
    period: 'per user/month',
    description: 'For teams preparing repeatable PDF automation pipelines.',
    cta: 'Contact sales',
    href: 'contact',
    highlighted: false,
    features: [
      'Team workspace design',
      'Shared workflow templates',
      'API access placeholder',
      'Admin usage dashboard',
      'Self-hosting support path',
    ],
  },
];

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Header locale={locale as Locale} />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-aurora-mesh pt-36 pb-20" aria-labelledby="pricing-title">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="container relative mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.82)] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-muted-foreground))] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" />
              Dummy pricing for prototype
            </span>
            <h1 id="pricing-title" className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-[hsl(var(--color-foreground))] md:text-6xl">
              Plans for every <span className="text-gradient-brand">PDF workflow</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              This pricing page is design-only. Payment, billing, and quota enforcement can be connected later.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative rounded-[2rem] p-7 ${
                  plan.highlighted
                    ? 'border-[hsl(var(--color-primary))] shadow-[var(--shadow-glow)]'
                    : 'border-[hsl(var(--color-border))] shadow-[var(--shadow-soft)]'
                }`}
                hover={false}
              >
                {plan.highlighted && (
                  <span className="absolute right-6 top-6 rounded-full bg-[hsl(var(--color-accent))] px-3 py-1 text-xs font-black text-white shadow-[var(--shadow-coral)]">
                    Popular
                  </span>
                )}
                <h2 className="text-2xl font-black text-[hsl(var(--color-foreground))]">{plan.name}</h2>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{plan.description}</p>

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-5xl font-black tracking-tight text-[hsl(var(--color-foreground))]">{plan.price}</span>
                  <span className="pb-2 text-sm text-[hsl(var(--color-muted-foreground))]">{plan.period}</span>
                </div>

                <Link href={`/${locale}/${plan.href}`}>
                  <Button variant={plan.highlighted ? 'primary' : 'outline'} className="mt-7 w-full">
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[hsl(var(--color-foreground))]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--color-success))]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-8 text-center shadow-[var(--shadow-soft)]">
            <h2 className="text-2xl font-black text-[hsl(var(--color-foreground))]">Need self-hosted deployment?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              {brand.name} is being designed around a future self-hosted backend, private storage, local workers, and local LLM orchestration.
            </p>
            <Link href={`/${locale}/contact`}>
              <Button variant="outline" className="mt-5">Discuss deployment</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  );
}
