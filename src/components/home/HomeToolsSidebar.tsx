'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Command, Search, Sparkles, X } from 'lucide-react';
import {
  homeToolShortcutCategories,
  type HomeToolShortcut,
  type HomeToolShortcutCategory,
} from '@/config/home-tool-shortcuts';
import type { Locale } from '@/lib/i18n/config';

type LocalizedToolContent = Record<string, { title?: string; description?: string; metaDescription?: string }>;

type HomeToolsSidebarProps = {
  locale: Locale;
  localizedToolContent?: LocalizedToolContent;
};

type ResolvedTool = HomeToolShortcut & {
  label: string;
  description?: string;
  categoryTitle: string;
};

type FilteredCategory = Omit<HomeToolShortcutCategory, 'tools'> & {
  tools: ResolvedTool[];
};

function getToolHref(locale: Locale, slug?: string, href?: string) {
  if (href) return `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
  return `/${locale}/tools/${slug}`;
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function getToolKey(tool: Pick<HomeToolShortcut, 'slug' | 'href' | 'title'>, categoryTitle: string) {
  return `${categoryTitle}-${tool.slug ?? tool.href ?? tool.title}`;
}

function resolveTool(tool: HomeToolShortcut, categoryTitle: string, localizedToolContent?: LocalizedToolContent): ResolvedTool {
  const localized = tool.slug ? localizedToolContent?.[tool.slug] : undefined;

  return {
    ...tool,
    label: localized?.title ?? tool.title,
    description: localized?.description ?? localized?.metaDescription,
    categoryTitle,
  };
}

function toolMatchesQuery(tool: ResolvedTool, category: HomeToolShortcutCategory, query: string) {
  if (!query) return true;

  const searchable = [
    tool.label,
    tool.title,
    tool.description,
    tool.slug,
    tool.href,
    tool.badge,
    category.title,
    category.description,
    ...(tool.keywords ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => searchable.includes(term));
}

export function HomeToolsSidebar({ locale, localizedToolContent }: HomeToolsSidebarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const normalizedQuery = normalize(query);

  const filteredCategories = useMemo<FilteredCategory[]>(() => {
    return homeToolShortcutCategories
      .map((category) => {
        const tools = category.tools
          .map((tool) => resolveTool(tool, category.title, localizedToolContent))
          .filter((tool) => toolMatchesQuery(tool, category, normalizedQuery));

        return { ...category, tools };
      })
      .filter((category) => category.tools.length > 0);
  }, [localizedToolContent, normalizedQuery]);

  const flatResults = useMemo(() => filteredCategories.flatMap((category) => category.tools), [filteredCategories]);
  const topResult = flatResults[0];
  const topResultKey = topResult ? getToolKey(topResult, topResult.categoryTitle) : null;
  const resultCount = flatResults.length;

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || !topResult) return;
    event.preventDefault();
    router.push(getToolHref(locale, topResult.slug, topResult.href));
  };

  return (
    <aside className="sticky top-[4.85rem] hidden h-[calc(100vh-5.35rem)] w-[23rem] shrink-0 lg:block">
      <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-[hsl(var(--color-primary)/0.55)] via-[hsl(var(--color-border)/0.45)] to-[hsl(var(--color-accent)/0.55)] p-[1px] shadow-[0_24px_70px_hsl(var(--color-primary)/0.12)]">
        <div className="absolute -left-20 top-8 h-40 w-40 rounded-full bg-[hsl(var(--color-primary)/0.18)] blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-44 w-44 rounded-full bg-[hsl(var(--color-accent)/0.18)] blur-3xl" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1px)] border border-white/35 bg-[hsl(var(--color-card)/0.82)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-2xl">
          <div className="border-b border-[hsl(var(--color-border)/0.72)] bg-gradient-to-br from-[hsl(var(--color-primary-soft)/0.96)] via-[hsl(var(--color-card)/0.88)] to-[hsl(var(--color-accent-soft)/0.82)] p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-primary)/0.16)] bg-[hsl(var(--color-card)/0.8)] px-2.5 py-1 text-[0.66rem] font-black uppercase tracking-[0.18em] text-[hsl(var(--color-primary))] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Smart menu
                </div>
                <h2 className="mt-2 text-xl font-black tracking-tight text-[hsl(var(--color-foreground))]">
                  PDF tools
                </h2>
                <p className="mt-1 max-w-[18rem] text-xs leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                  Search or choose a tool by category. Press Enter to open the best match.
                </p>
              </div>

              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] shadow-lg shadow-[hsl(var(--color-primary)/0.22)]">
                <Command className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                type="search"
                placeholder="Search tools, e.g. compress, merge, OCR..."
                className="h-12 w-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background)/0.72)] pl-10 pr-11 text-sm font-semibold text-[hsl(var(--color-foreground))] outline-none transition placeholder:font-medium placeholder:text-[hsl(var(--color-muted-foreground))] focus:border-[hsl(var(--color-primary)/0.65)] focus:bg-[hsl(var(--color-card))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.14)]"
                aria-label="Search PDF tools"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-[hsl(var(--color-muted-foreground))] transition hover:bg-[hsl(var(--color-secondary))] hover:text-[hsl(var(--color-foreground))]"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="mt-3 flex items-center justify-between text-[0.72rem] font-bold text-[hsl(var(--color-muted-foreground))]">
              <span>{normalizedQuery ? `${resultCount} matching tool${resultCount === 1 ? '' : 's'}` : 'Most used and grouped tools'}</span>
              {topResult && normalizedQuery ? (
                <Link
                  href={getToolHref(locale, topResult.slug, topResult.href)}
                  className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--color-primary-soft))] px-2 py-1 text-[hsl(var(--color-primary))] transition hover:bg-[hsl(var(--color-primary)/0.12)]"
                >
                  Open best match
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>

          <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3.5 py-4" aria-label="Homepage PDF tool shortcuts">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => {
                const CategoryIcon = category.icon;

                return (
                  <section key={category.title}>
                    <div className="mb-2 flex items-center justify-between gap-2 px-1.5">
                      <div className="flex min-w-0 items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[hsl(var(--color-muted-foreground))]">
                        <CategoryIcon className="h-4 w-4 shrink-0 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                        <span className="truncate">{category.title}</span>
                      </div>
                      <span className="shrink-0 rounded-full bg-[hsl(var(--color-secondary))] px-2 py-0.5 text-[0.64rem] font-black text-[hsl(var(--color-muted-foreground))]">
                        {category.tools.length}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {category.tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        const href = getToolHref(locale, tool.slug, tool.href);
                        const toolKey = getToolKey(tool, category.title);
                        const isTopMatch = normalizedQuery.length > 0 && toolKey === topResultKey;

                        return (
                          <Link
                            key={toolKey}
                            href={href}
                            className={`group relative flex items-center gap-3 rounded-[1.15rem] border px-2.5 py-2.5 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary)/0.35)] ${
                              isTopMatch
                                ? 'border-[hsl(var(--color-primary)/0.28)] bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))] shadow-sm'
                                : 'border-transparent text-[hsl(var(--color-foreground))] hover:border-[hsl(var(--color-primary)/0.13)] hover:bg-[hsl(var(--color-primary)/0.075)] hover:text-[hsl(var(--color-primary))]'
                            }`}
                          >
                            <span
                              className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl transition group-hover:scale-105 ${
                                isTopMatch
                                  ? 'bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))] shadow-md shadow-[hsl(var(--color-primary)/0.2)]'
                                  : 'bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]'
                              }`}
                            >
                              <ToolIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block truncate">{tool.label}</span>
                              {isTopMatch ? (
                                <span className="mt-0.5 block text-[0.66rem] font-black uppercase tracking-[0.16em] text-[hsl(var(--color-primary))]">
                                  Best match
                                </span>
                              ) : null}
                            </span>

                            {tool.badge ? (
                              <span className="shrink-0 rounded-full bg-[hsl(var(--color-accent-soft))] px-2 py-0.5 text-[0.64rem] font-black text-[hsl(var(--color-accent))]">
                                {tool.badge}
                              </span>
                            ) : (
                              <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-background)/0.6)] p-4 text-center">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[hsl(var(--color-primary-soft))] text-[hsl(var(--color-primary))]">
                  <Search className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-sm font-black text-[hsl(var(--color-foreground))]">No matching tool</h3>
                <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                  Try words like compress, merge, image, OCR, password, rotate, or watermark.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-3 rounded-full bg-[hsl(var(--color-primary))] px-4 py-2 text-xs font-black text-[hsl(var(--color-primary-foreground))] shadow-sm transition hover:bg-[hsl(var(--color-primary-hover))]"
                >
                  Reset search
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default HomeToolsSidebar;
