'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileStack, Menu, Search, Sparkles, X } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [localizedTools, setLocalizedTools] = useState<Record<string, { title: string; description: string }>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', closeOnOutsideClick);
    }
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [isSearchOpen]);

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

  const navigateToTool = useCallback((slug: string) => {
    router.push(`/${locale}/tools/${slug}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [locale, router]);

  const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
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
  }, [navigateToTool, searchResults, selectedIndex]);

  const navItems = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/tools`, label: 'Tools' },
    { href: `/${locale}/pricing`, label: 'Pricing' },
    { href: `/${locale}/workflow`, label: 'Workflow' },
    { href: `/${locale}/about`, label: 'About' },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-[hsl(var(--color-border)/0.72)] bg-[hsl(var(--color-background)/0.78)] shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2.5 font-bold text-[hsl(var(--color-foreground))] transition-opacity hover:opacity-90"
            aria-label={`${brand.name} home`}
          >
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] via-[hsl(var(--color-accent))] to-[hsl(var(--color-signal))] text-white shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
              <span className="absolute inset-0 bg-white/15 opacity-0 transition group-hover:opacity-100" />
              <FileStack className="relative h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xl tracking-tight">
              PDF<span className="text-gradient-brand">to</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-[hsl(var(--color-border)/0.68)] bg-[hsl(var(--color-background)/0.62)] p-1.5 shadow-sm backdrop-blur md:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-all hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            {showSearch && (
              <div className="relative" ref={searchContainerRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen((open) => !open);
                    setTimeout(() => searchInputRef.current?.focus(), 80);
                  }}
                  aria-label="Open search"
                  className="text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]"
                >
                  <Search className="h-5 w-5" aria-hidden="true" />
                  <span className="ml-2 hidden rounded border border-[hsl(var(--color-border))] px-1.5 py-0.5 text-xs text-[hsl(var(--color-muted-foreground))] lg:inline-block">⌘K</span>
                </Button>

                {isSearchOpen && (
                  <div className="fixed left-4 right-4 top-5 z-50 md:absolute md:left-auto md:right-0 md:top-1/2 md:w-[28rem] md:-translate-y-1/2">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-primary))]" />
                      <input
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search PDF tools..."
                        className="h-12 w-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] pl-11 pr-11 text-sm shadow-xl outline-none transition focus:border-[hsl(var(--color-primary))] focus:ring-4 focus:ring-[hsl(var(--color-primary)/0.15)]"
                      />
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-muted))]"
                        aria-label="Close search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {searchResults.length > 0 && (
                      <div className="mt-2 max-h-[60vh] overflow-auto rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] p-2 shadow-xl">
                        {searchResults.map((result, index) => {
                          const localized = localizedTools[result.tool.id];
                          return (
                            <button
                              key={result.tool.id}
                              onClick={() => navigateToTool(result.tool.slug)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                                index === selectedIndex
                                  ? 'bg-[hsl(var(--color-primary)/0.10)] text-[hsl(var(--color-primary))]'
                                  : 'hover:bg-[hsl(var(--color-muted))]'
                              }`}
                            >
                              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[hsl(var(--color-primary-soft))] text-sm">PDF</span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold">{localized?.title ?? result.tool.slug}</span>
                                <span className="block truncate text-xs text-[hsl(var(--color-muted-foreground))]">{localized?.description ?? result.tool.category}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
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

            <Link href={`/${locale}/login`} className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[hsl(var(--color-muted-foreground))] transition hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-foreground))] lg:inline-flex">
              Sign in
            </Link>
            <Link href={`/${locale}/signup`} className="hidden rounded-full bg-[hsl(var(--color-primary))] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 lg:inline-flex">
              Start free
            </Link>

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

        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] py-3" aria-label="Mobile navigation">
            <ul className="space-y-1 p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-[hsl(var(--color-foreground))] transition hover:bg-[hsl(var(--color-muted))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-[hsl(var(--color-border))] px-4 py-3 text-sm font-semibold text-[hsl(var(--color-foreground))]"
                >
                  Sign in
                </Link>
                <Link
                  href={`/${locale}/signup`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--color-primary))] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)]"
                >
                  <Sparkles className="h-4 w-4" /> Start free
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
