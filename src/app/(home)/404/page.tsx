'use client';

import { use } from 'react';
import { defaultLocale } from '@/config/i18n.ts';
import { useTranslation } from '@/hooks/use-translation.ts';
import { Params } from '@/types/props.ts';

export default function NotFoundPage({ params }: { params: Params }) {
  const lang = use(params).lang ?? defaultLocale;

  const { t } = useTranslation({ lng: lang, ns: 'not-found' });

  return (
    <section className='relative flex h-full items-center justify-center overflow-hidden bg-[url(/img/toulouse-map.jpg)] bg-cover bg-fixed bg-center bg-no-repeat md:h-screen'>
      <div className='absolute inset-0 bg-black/80' />
      <div className='container'>
        <div className='relative flex h-full w-full items-center justify-center px-12 py-12 text-center'>
          <div>
            <div className='flex justify-center'>
              <div className='relative mt-10'>
                <h6 className='mb-4 text-center text-lg text-white'>
                  {t('title')}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
