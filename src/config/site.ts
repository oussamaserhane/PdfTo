import { brand } from './brand';
/**
 * Site configuration
 */

export const siteConfig = {
  name: brand.name,

  description: brand.description,

  url: brand.domain,

  ogImage: '/images/og-image.png',

  links: {
    github: 'https://github.com/',
    twitter: 'https://twitter.com/',
  },

  creator: `${brand.name} Team`,

  keywords: [
    'PDF automation',
    'AI PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'secure PDF',
    'PDF workflows',
    'online PDF tools',
    'browser-based PDF',
    'AI document processing',
  ],

  seo: {
    titleTemplate: `%s | ${brand.name}`,

    defaultTitle: `${brand.name} - ${brand.tagline}`,

    twitterHandle: '@pdfto',

    locale: 'en_US',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'AI Workflows', href: '/ai-workflows' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],

  footerNav: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Terms', href: '/terms' },
    { title: 'Contact', href: '/contact' },
  ],
};