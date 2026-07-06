import { setRequestLocale } from 'next-intl/server';

import { tools } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { locales, type Locale } from '@/lib/i18n/config';
import HomePageClient from './HomePageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const safeLocale = locale as Locale;

  setRequestLocale(safeLocale);

  const localizedToolContent = tools.reduce(
    (acc, tool) => {
      const content = getToolContent(safeLocale, tool.id);

      if (content) {
        acc[tool.id] = {
          title: content.title,
          description: content.metaDescription,
        };
      }

      return acc;
    },
    {} as Record<string, { title: string; description: string }>
  );

  return (
    <HomePageClient
      locale={safeLocale}
      localizedToolContent={localizedToolContent}
    />
  );
}
