// special instance of i18n used during SSG

import { i18nOptions, type Locale } from '@/config/i18n.ts';
import { createInstance } from 'i18next';

export async function translator(lng: Locale) {
  const instance = createInstance(i18nOptions);
  return await instance.init({ lng });
}
