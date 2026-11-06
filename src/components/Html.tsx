import { dir } from 'i18next';
import { ReactNode } from 'react';
import type { i18n } from 'i18next';

export default function Html({
  children,
  i18n,
}: {
  children: ReactNode;
  i18n: i18n;
}) {
  const lang = i18n.language;

  return (
    <html
      lang={lang}
      dir={dir(lang)}
    >
      <body>{children}</body>
    </html>
  );
}
