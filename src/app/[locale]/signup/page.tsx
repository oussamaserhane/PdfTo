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


export default async function SignupPage({ params }: AuthPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-aurora-mesh">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Card className="mx-auto w-full max-w-md rounded-[2rem] border-[hsl(var(--color-border))] p-7 shadow-2xl" hover={false}>
            <Link href={`/${locale}`} className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-muted-foreground))] transition hover:text-[hsl(var(--color-primary))]">
              <ArrowLeft className="h-4 w-4" /> Back to PDFto
            </Link>

            <div className="mb-7 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-signal))] text-white shadow-[var(--shadow-glow)]">
                <FileStack className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xl font-black">{brand.name}</div>
                <div className="text-sm text-[hsl(var(--color-muted-foreground))]">Create your workspace</div>
              </div>
            </div>

            <div className="grid gap-3">
              <SocialButton label="Sign up with Google" mark="G" />
              <SocialButton label="Sign up with Facebook" mark="f" />
              <SocialButton label="Sign up with Microsoft" mark="M" />
            </div>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[hsl(var(--color-border))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-muted-foreground))]">or email</span>
              <span className="h-px flex-1 bg-[hsl(var(--color-border))]" />
            </div>

            <form className="space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-[hsl(var(--color-foreground))]">Full name</span>
                <input className="mt-2 h-12 w-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4 text-sm outline-none focus:border-[hsl(var(--color-primary))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)]" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[hsl(var(--color-foreground))]">Email</span>
                <input className="mt-2 h-12 w-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4 text-sm outline-none focus:border-[hsl(var(--color-primary))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)]" placeholder="you@example.com" type="email" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[hsl(var(--color-foreground))]">Password</span>
                <input className="mt-2 h-12 w-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-4 text-sm outline-none focus:border-[hsl(var(--color-primary))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)]" placeholder="Create a password" type="password" />
              </label>
              <Button className="w-full" variant="primary">Create account</Button>
            </form>

            <p className="mt-6 text-center text-sm text-[hsl(var(--color-muted-foreground))]">
              Already have an account?{' '}
              <Link href={`/${locale}/login`} className="font-bold text-[hsl(var(--color-primary))] hover:underline">
                Sign in
              </Link>
            </p>
          </Card>

          <section className="hidden lg:block">
            <h1 className="text-5xl font-black tracking-tight text-[hsl(var(--color-foreground))]">
              Start building your <span className="text-gradient-brand">PDF command center</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              This signup page is design-only. It gives PDFto a SaaS-ready entry point without connecting authentication yet.
            </p>
            <div className="mt-8 grid gap-4">
              {['Save future workflows', 'Track usage and jobs', 'Prepare for AI-assisted automation'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.78)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="font-bold text-[hsl(var(--color-foreground))]">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
