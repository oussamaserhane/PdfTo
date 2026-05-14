'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileStack, Globe, Lock, Mail, ShieldCheck } from 'lucide-react';
import { brand } from '@/config/brand';
import { getLocalizedPath, localeConfig, locales, type Locale } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';

export interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    router.push(getLocalizedPath(pathname, newLocale));
  };

  const productLinks = [
    { href: `/${locale}/tools`, label: 'Tools' },
    { href: `/${locale}/pricing`, label: 'Pricing' },
    { href: `/${locale}/workflow`, label: 'Workflow' },
    { href: `/${locale}/about`, label: 'About' },
  ];

  const legalLinks = [
    { href: `/${locale}/privacy`, label: 'Privacy' },
    { href: `/${locale}/terms`, label: 'Terms' },
    { href: `/${locale}/contact`, label: 'Contact' },
  ];

  const toolLinks = [
    { href: `/${locale}/tools/compress-pdf`, label: 'Compress PDF' },
    { href: `/${locale}/tools/merge-pdf`, label: 'Merge PDF' },
    { href: `/${locale}/tools/split-pdf`, label: 'Split PDF' },
    { href: `/${locale}/tools/ocr-pdf`, label: 'OCR PDF' },
  ];

  return (
    <footer className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] pt-16 pb-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-5">
            <Link href={`/${locale}`} className="group inline-flex items-center gap-2.5 font-bold text-[hsl(var(--color-foreground))]">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-signal))] text-white shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
                <FileStack className="h-4 w-4" />
              </span>
              <span className="text-xl tracking-tight">PDF<span className="text-gradient-brand">to</span></span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              {brand.description}
            </p>
            <a href={`mailto:${brand.supportEmail}`} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-foreground))] shadow-[var(--shadow-soft)] transition hover:border-[hsl(var(--color-primary)/0.45)]">
              <Mail className="h-4 w-4" />
              Contact support
            </a>
          </div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Popular tools" links={toolLinks} />

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))]">Trust model</h3>
            <div className="space-y-3">
              <TrustItem
                icon={<Lock className="h-4 w-4" />}
                title="Browser-first tools"
                body="The visual layer keeps the existing PDFCraft processing model intact."
                tone="accent"
              />
              <TrustItem
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Self-hosting ready"
                body="Designed to evolve toward controlled PDF automation infrastructure."
                tone="primary"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[hsl(var(--color-border))] pt-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--color-foreground))]">
            <Globe className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" /> Language
          </div>
          <div className="flex flex-wrap gap-2">
            {locales.map((loc) => {
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    isActive
                      ? 'bg-[hsl(var(--color-primary))] text-white shadow-[var(--shadow-glow)]'
                      : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-primary)/0.10)] hover:text-[hsl(var(--color-primary))]'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {localeConfig[loc].nativeName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[hsl(var(--color-border))] pt-8 text-sm text-[hsl(var(--color-muted-foreground))] md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} {brand.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[hsl(var(--color-foreground))]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))]">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] transition hover:text-[hsl(var(--color-primary))]">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-muted-foreground)/0.55)] transition group-hover:bg-[hsl(var(--color-primary))]" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustItem({ icon, title, body, tone }: { icon: React.ReactNode; title: string; body: string; tone: 'primary' | 'accent' }) {
  const color = tone === 'primary' ? 'var(--color-primary)' : 'var(--color-accent)';
  const soft = tone === 'primary' ? 'var(--color-primary-soft)' : 'var(--color-accent-soft)';
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-soft)]">
      <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl" style={{ backgroundColor: `hsl(${soft})`, color: `hsl(${color})` }}>
        {icon}
      </span>
      <div>
        <div className="text-sm font-semibold text-[hsl(var(--color-foreground))]">{title}</div>
        <div className="text-xs leading-relaxed text-[hsl(var(--color-muted-foreground))]">{body}</div>
      </div>
    </div>
  );
}

export default Footer;
