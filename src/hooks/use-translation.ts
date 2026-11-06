import i18n from '@/lib/i18n.ts';
import { useMemo } from 'react';
import { Locale } from '@/config/i18n.ts';

interface Props {
  lng: Locale;
  ns?: string;
}

export function useTranslation({ lng, ns }: Props): {
  i18n: typeof i18n;
  t: typeof i18n.t;
} {
  const i18nMemo = useMemo(
    () =>
      i18n.cloneInstance({
        lng,
        defaultNS: ns,
      }),
    [lng, ns]
  );

  return { i18n: i18nMemo, t: i18nMemo.t };
}

export type I18nType = typeof i18n;
export type I18nFunctionType = typeof i18n.t;
