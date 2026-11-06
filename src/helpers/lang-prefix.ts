import { defaultLocale, Locale } from '@/config/i18n.ts';

export default function getLangPrefix(lang: Locale): string {
  if (lang === defaultLocale) {
    return '/';
  }

  return `/${lang}/`;
}
