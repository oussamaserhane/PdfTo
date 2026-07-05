'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Filter, Search, Sparkles, Star, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getAllTools, getToolById, getToolsByCategory } from '@/config/tools';
import { toolMatchesQuery } from '@/lib/utils/search';
import { type Locale } from '@/lib/i18n/config';
import { type ToolCategory } from '@/types/tool';
import { useFavorites } from '@/hooks/useFavorites';

type CategoryFilter = ToolCategory | 'all' | 'favorites';

interface ToolsPageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

const categoryLabels: Record<ToolCategory, string> = {
  'edit-annotate': 'Edit',
  'convert-to-pdf': 'Convert to PDF',
  'convert-from-pdf': 'Convert from PDF',
  'organize-manage': 'Organize',
  'optimize-repair': 'Optimize',
  'secure-pdf': 'Secure',
};

export default function ToolsPageClient({ locale, localizedToolContent }: ToolsPageClientProps) {
  const searchParams = useSearchParams();
  const allTools = getAllTools();
  const { favorites, isLoaded: favoritesLoaded, favoritesCount } = useFavorites();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>((searchParams.get('category') as CategoryFilter) || 'all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setSelectedCategory((searchParams.get('category') as CategoryFilter) || 'all');
  }, [searchParams]);

  const categories: { value: CategoryFilter; label: string; icon?: React.ReactNode; count?: number }[] = [
    { value: 'all', label: 'All tools', count: allTools.length },
    { value: 'favorites', label: 'Favorites', icon: <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />, count: favoritesLoaded ? favoritesCount : undefined },
    { value: 'organize-manage', label: 'Organize', count: getToolsByCategory('organize-manage').length },
    { value: 'convert-to-pdf', label: 'To PDF', count: getToolsByCategory('convert-to-pdf').length },
    { value: 'convert-from-pdf', label: 'From PDF', count: getToolsByCategory('convert-from-pdf').length },
    { value: 'optimize-repair', label: 'Optimize', count: getToolsByCategory('optimize-repair').length },
    { value: 'edit-annotate', label: 'Edit', count: getToolsByCategory('edit-annotate').length },
    { value: 'secure-pdf', label: 'Secure', count: getToolsByCategory('secure-pdf').length },
  ];

  const filteredTools = useMemo(() => {
    let tools = allTools;

    if (selectedCategory === 'favorites') {
      tools = favorites
        .map((id) => getToolById(id))
        .filter((tool): tool is NonNullable<typeof tool> => tool !== undefined);
    } else if (selectedCategory !== 'all') {
      tools = getToolsByCategory(selectedCategory as ToolCategory);
    }

    if (searchQuery.trim()) {
      tools = tools.filter((tool) => toolMatchesQuery(tool, searchQuery, localizedToolContent?.[tool.id]));
    }

    return tools;
  }, [allTools, favorites, localizedToolContent, searchQuery, selectedCategory]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-hero-gradient pt-36 pb-20" aria-labelledby="tools-page-title">
          <div className="absolute inset-0 bg-grid opacity-35" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card)/0.82)] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-muted-foreground))] shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-[hsl(var(--color-accent))]" /> Tool library
              </span>
              <h1 id="tools-page-title" className="mt-5 text-4xl font-bold tracking-tight text-[hsl(var(--color-foreground))] md:text-5xl">
                All <span className="text-gradient-brand">PDF tools</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[hsl(var(--color-muted-foreground))]">
                Browse the existing PdfTo/PDFto tools through a cleaner, faster, SaaS-style interface.
              </p>

              <div className="mx-auto mt-9 max-w-2xl">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search tools..."
                    className="h-14 w-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] pl-14 pr-12 text-base text-[hsl(var(--color-foreground))] shadow-[var(--shadow-soft)] outline-none transition focus:border-[hsl(var(--color-primary))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)]"
                    aria-label="Search tools"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-[hsl(var(--color-muted-foreground))] transition hover:bg-[hsl(var(--color-muted))]"
                      aria-label="Clear search"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--color-secondary)/0.35)] py-10">
          <div className="container mx-auto px-4">
            <div className="sticky top-24 z-30 mb-8 rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background)/0.86)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters((open) => !open)} aria-expanded={showFilters}>
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>

                <div className={`${showFilters ? 'flex' : 'hidden'} flex-wrap gap-2 lg:flex`} role="group" aria-label="Filter by category">
                  {categories.map((category) => {
                    const active = selectedCategory === category.value;
                    return (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        aria-pressed={active}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? category.value === 'favorites'
                              ? 'bg-amber-100 text-amber-700 shadow-sm dark:bg-amber-900/40 dark:text-amber-300'
                              : 'bg-[hsl(var(--color-primary))] text-white shadow-[var(--shadow-glow)]'
                            : 'bg-transparent text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]'
                        }`}
                      >
                        {category.icon}
                        {category.label}
                        {typeof category.count === 'number' && <span className="text-xs opacity-70">({category.count})</span>}
                      </button>
                    );
                  })}
                </div>

                {(searchQuery || selectedCategory !== 'all') && (
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                Showing <span className="font-semibold text-[hsl(var(--color-foreground))]">{filteredTools.length}</span> of {allTools.length} tools
                {selectedCategory !== 'all' && selectedCategory !== 'favorites' ? ` in ${categoryLabels[selectedCategory as ToolCategory]}` : ''}
                {searchQuery ? ` for “${searchQuery}”` : ''}
              </p>
              <Link href={`/${locale}/workflow`} className="text-sm font-semibold text-[hsl(var(--color-primary))] hover:underline">
                Build a workflow →
              </Link>
            </div>

            {filteredTools.length > 0 ? (
              selectedCategory === 'all' && !searchQuery ? (
                <ToolGrid tools={filteredTools} locale={locale} localizedToolContent={localizedToolContent} showCategoryHeaders />
              ) : (
                <ToolGrid tools={filteredTools} locale={locale} localizedToolContent={localizedToolContent} />
              )
            ) : (
              <Card className="rounded-3xl border-2 border-dashed border-[hsl(var(--color-border))] p-16 text-center" hover={false}>
                <div className="mx-auto flex max-w-md flex-col items-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-[hsl(var(--color-muted))]">
                    {selectedCategory === 'favorites' ? (
                      <Star className="h-10 w-10 text-amber-500" aria-hidden="true" />
                    ) : (
                      <Search className="h-10 w-10 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[hsl(var(--color-foreground))]">
                    {selectedCategory === 'favorites' ? 'No favorite tools yet' : 'No tools found'}
                  </h3>
                  <p className="mt-2 text-[hsl(var(--color-muted-foreground))]">
                    {selectedCategory === 'favorites'
                      ? 'Mark tools as favorites to make them easier to find.'
                      : 'Try another keyword or clear the active filters.'}
                  </p>
                  <Button variant="outline" onClick={handleClearFilters} className="mt-6">
                    Show all tools
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
