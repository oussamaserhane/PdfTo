'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Home, Menu, Search, X } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { brand } from '@/config/brand';
import { Button } from '@/components/ui/Button';
import { RecentFilesDropdown } from '@/components/common/RecentFilesDropdown';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { getAllTools } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { searchTools, type SearchResult } from '@/lib/utils/search';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ locale, showSearch = true }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [localizedTools, setLocalizedTools] = useState<Record<string, { title: string; description: string }>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentMap: Record<string, { title: string; description: string }> = {};

    getAllTools().forEach((tool) => {
      const content = getToolContent(locale, tool.id);
      if (content) {
        contentMap[tool.id] = {
          title: content.title,
          description: content.metaDescription,
        };
      }
    });

    setLocalizedTools(contentMap);
  }, [locale]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchTools(searchQuery, localizedTools).slice(0, 8));
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setSelectedIndex(-1);
    }
  }, [searchQuery, localizedTools]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    const openShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 80);
      }
    };

    document.addEventListener('keydown', openShortcut);
    return () => document.removeEventListener('keydown', openShortcut);
  }, []);

  const navigateToTool = useCallback(
    (slug: string) => {
      router.push(`/${locale}/tools/${slug}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    },
    [locale, router]
  );

  const handleSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const target = selectedIndex >= 0 ? searchResults[selectedIndex] : searchResults[0];
        if (target) navigateToTool(target.tool.slug);
      }

      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    },
    [navigateToTool, searchResults, selectedIndex]
  );

  const navItems = [
    { href: `/${locale}`, label: 'Home', icon: Home },
    { href: `/${locale}/tools`, label: 'Tools' },
    { href: `/${locale}/workflow`, label: 'Workflow' },
    { href: `/${locale}/pricing`, label: 'Pricing' },
    { href: `/${locale}/about`, label: 'About' },
  ];

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]/95 backdrop-blur-md"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-5">
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center gap-2.5 font-semibold text-[hsl(var(--color-foreground))]"
            aria-label={`${brand.name} home`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-[hsl(var(--color-primary))] shadow-sm">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xl tracking-tight">
              PDF<span className="text-[hsl(var(--color-primary))]">to</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]"
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {showSearch && (
              <div className="relative hidden lg:block" ref={searchContainerRef}>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onFocus={() => setIsSearchOpen(true)}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setIsSearchOpen(true);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search PDF tools..."
                    className="h-10 w-[280px] rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] pl-10 pr-16 text-sm text-[hsl(var(--color-foreground))] shadow-sm outline-none transition placeholder:text-[hsl(var(--color-muted-foreground))] focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.14)] xl:w-[340px]"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] px-1.5 py-0.5 text-[10px] font-medium text-[hsl(var(--color-muted-foreground))]">
                    ⌘K
                  </span>
                </div>

                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute right-0 top-12 w-[380px] overflow-hidden rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] shadow-xl">
                    <div className="max-h-[420px] overflow-auto p-2">
                      {searchResults.map((result, index) => {
                        const localized = localizedTools[result.tool.id];

                        return (
                          <button
                            key={result.tool.id}
                            onClick={() => navigateToTool(result.tool.slug)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                              index === selectedIndex
                                ? 'bg-[hsl(var(--color-primary)/0.10)] text-[hsl(var(--color-primary))]'
                                : 'hover:bg-[hsl(var(--color-muted))]'
                            }`}
                          >
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[hsl(var(--color-muted))] text-xs font-semibold">
                              PDF
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold">
                                {localized?.title ?? result.tool.slug}
                              </span>
                              <span className="block truncate text-xs text-[hsl(var(--color-muted-foreground))]">
                                {localized?.description ?? result.tool.category}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 80);
                }}
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <RecentFilesDropdown
              locale={locale}
              translations={{
                title: 'Recent files',
                empty: 'No recent files',
                clearAll: 'Clear all',
                processedWith: 'Processed with',
              }}
            />

            <ThemeToggle />

            <div id="language-selector-slot" />

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="fixed inset-x-4 top-4 z-[60] lg:hidden" ref={searchContainerRef}>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search PDF tools..."
                className="h-12 w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] pl-10 pr-11 text-sm shadow-xl outline-none focus:border-[hsl(var(--color-primary))] focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.14)]"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-2 max-h-[60vh] overflow-auto rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-2 shadow-xl">
                {searchResults.map((result, index) => {
                  const localized = localizedTools[result.tool.id];

                  return (
                    <button
                      key={result.tool.id}
                      onClick={() => navigateToTool(result.tool.slug)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                        index === selectedIndex
                          ? 'bg-[hsl(var(--color-primary)/0.10)] text-[hsl(var(--color-primary))]'
                          : 'hover:bg-[hsl(var(--color-muted))]'
                      }`}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[hsl(var(--color-muted))] text-xs font-semibold">
                        PDF
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                          {localized?.title ?? result.tool.slug}
                        </span>
                        <span className="block truncate text-xs text-[hsl(var(--color-muted-foreground))]">
                          {localized?.description ?? result.tool.category}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {isMobileMenuOpen && (
          <nav
            className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] py-3 md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[hsl(var(--color-foreground))] transition hover:bg-[hsl(var(--color-muted))]"
                    >
                      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;