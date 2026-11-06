import '../globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { defaultLocale } from '@/config/i18n.ts';
import Html from '@/components/Html.tsx';
import { useTranslation } from '@/hooks/use-translation.ts';
import { favicon } from '@/components/Favicon.tsx';
import TopNavbar from '@/components/TopNavbar.tsx';
import FooterWithInfo from '@/components/FooterWithInfo.tsx';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'La Bicycletta Milonga',
  description: 'La milonga de Toulouse',
  icons: favicon,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const lang = defaultLocale;
  const { i18n } = useTranslation({ lng: lang });

  return (
    <Html i18n={i18n}>
      <body className='antialiased'>
        <TopNavbar lang={lang} />
        {children}
        <FooterWithInfo lang={lang} />
      </body>
    </Html>
  );
}
