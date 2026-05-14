import Link from 'next/link';
import { ArrowLeft, FileStack, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { brand } from '@/config/brand';
import { locales } from '@/lib/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface AuthPageProps {
  params: Promise<{ locale: string }>;
}

function SocialButton({ label, mark }: { label: string; mark: string }) {
  return (
    <button className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 text-sm font-semibold text-[hsl(var(--color-foreground))] shadow-[var(--shadow-soft)] transition hover:border-[hsl(var(--color-primary)/0.45)] hover:-translate-y-0.5">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-[hsl(var(--color-secondary))] text-xs font-black">{mark}</span>
      {label}
    </button>
  );
}


export default async function LoginPage({ params }: AuthPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-aurora-mesh">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <section className="hidden lg:block">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-muted-foreground))] transition hover:text-[hsl(var(--color-primary))]">
              <ArrowLeft className="h-4 w-4" /> Back to PDFto
            </Link>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-[hsl(var(--color-foreground))]">
              Sign in to your <span className="text-gradient-brand">PDF workspace</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              This is a design-only authentication page. It prepares the product for accounts, usage limits, and future self-hosted login.
            </p>
            <div className="mt-8 rounded-[2rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.76)] p-5 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-black text-[hsl(var(--color-foreground))]">No backend connected yet</div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Buttons and forms are visual placeholders.</div>
                </div>
              </div>
            </div>
          </section>

          <Card className="mx-auto w-full max-w-md rounded-[2rem] border-[hsl(var(--color-border))] p-7 shadow-2xl" hover={false}>
            <Link href={`/${locale}`} className="mb-7 inline-flex items-center gap-2 lg:hidden">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <div className="mb-7 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-signal))] text-white shadow-[var(--shadow-glow)]">
                <FileStack className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xl font-black">{brand.name}</div>
                <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Sign in to continue</div>
              </div>
            </div>

            <div className="grid gap-3">
              <SocialButton label="Continue with Google" mark="G" />
              <SocialButton label="Continue with Facebook" mark="f" />
              <SocialButton label="Continue with Microsoft" mark="M" />
            </div>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[hsl(var(--color-border))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">or email</span>
              <span className="h-px flex-1 bg-[hsl(var(--color-border))]" />
            </div>

            <form className="space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-[hsl(var(--color-foreground))]">Email</span>
                <span className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4">
                  <Mail className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                  <input className="w-full bg-transparent text-sm outline-none" placeholder="you@example.com" type="email" />
                </span>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[hsl(var(--color-foreground))]">Password</span>
                <span className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4">
                  <LockKeyhole className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                  <input className="w-full bg-transparent text-sm outline-none" placeholder="••••••••" type="password" />
                </span>
              </label>
              <Button className="w-full" variant="primary">Sign in</Button>
            </form>

            <p className="mt-6 text-center text-sm text-[hsl(var(--color-muted-foreground))]">
              New to PDFto?{' '}
              <Link href={`/${locale}/signup`} className="font-bold text-[hsl(var(--color-primary))] hover:underline">
                Create an account
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
