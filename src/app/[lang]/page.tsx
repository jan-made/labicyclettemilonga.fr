'use client';

import { defaultLocale } from '@/config/i18n.ts';
import { use, useMemo } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation.ts';
import { Params } from '@/types/props.ts';
import dynamic from 'next/dynamic';
import TimeDuration from '@/components/TimeDuration.tsx';
import { milongaDates } from '@/app/[lang]/data.ts';
import { useHeaderHeight } from '@/hooks/use-header-height.ts';
import { unComputedHeaderHeight } from '@/common/constants.ts';

export default function GenericHomePage({ params }: { params: Params }) {
  const DynamicVenueMap = useMemo(
    () =>
      dynamic(() => import('@/components/VenueMap.tsx'), {
        ssr: false,
      }),
    []
  );

  const lang = use(params).lang ?? defaultLocale;
  const headHeight = useHeaderHeight(unComputedHeaderHeight);

  const { t } = useTranslation({ lng: lang });

  const today = new Date();

  const nextMilonga = milongaDates.find((x) => x.ends > today);

  return (
    <>
      <section
        id='introduction'
        style={{ scrollMarginTop: headHeight }}
        className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[url(/img/toulouse-map.jpg)] bg-cover bg-fixed bg-center bg-no-repeat'
      >
        <div className='absolute inset-0 bg-black/80' />
        <div className='container'>
          <div className='relative mt-20 flex w-full items-center justify-center px-12 py-12 text-center lg:mt-12'>
            <div>
              <div className='mt-12 flex items-start justify-center gap-6'>
                <div className='max-w-96'>
                  <Image
                    src='/img/title-site.png'
                    width={800}
                    height={420}
                    alt='La Bicyclette Milonga Toulouse'
                  />
                </div>
              </div>
              <h1 className='my-8 text-4xl font-extrabold text-white capitalize lg:text-5xl'>
                {t('milonga.title')}
              </h1>
              {nextMilonga !== undefined && (
                <>
                  <div className='flex justify-center'>
                    <div className='max-w-xl text-center'>
                      <p className='text-2xl font-semibold text-white lg:text-3xl'>
                        {t('milonga.dateTime', {
                          starts: nextMilonga.starts,
                          ends: nextMilonga.ends,
                          formatParams: {
                            starts: {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                            },
                            ends: { hour: 'numeric', minute: 'numeric' },
                          },
                        })}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <div className='relative mt-14'>
                      <div>
                        <TimeDuration
                          lang={lang}
                          deadline={nextMilonga.starts}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-12 flex justify-center'>
                    <div className='max-w-xl text-center'>
                      <p className='font-semibold text-white'>
                        {t('milonga.subtitle')}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section
        id='next'
        style={{ scrollMarginTop: headHeight }}
        className='flex flex-wrap items-center justify-center overflow-hidden px-12 py-12'
      >
        <div className='flex items-center justify-center text-center'>
          <h2 className='text-xl font-bold lg:text-2xl'>
            {t('milonga.description')}
          </h2>
        </div>
        <div className='basis-full'></div>
        <div className='flex items-center justify-center py-4 text-center'>
          <div className='my-14 justify-center'>
            <Image
              src='/img/milongas/nextmilongadj.jpg'
              width={1080}
              height={1080}
              alt='Next Milonga DJ'
            />
          </div>
        </div>
      </section>
      <section
        id='schedule'
        style={{ scrollMarginTop: headHeight }}
        className='flex flex-wrap items-center justify-center overflow-hidden px-12 py-12'
      >
        <div className='flex items-center justify-center text-center'>
          <h2 className='text-xl font-bold lg:text-2xl'>{t('milonga.plan')}</h2>
        </div>
        <div className='basis-full'></div>
        <div className='flex items-center justify-center py-4 text-center'>
          <div className='my-14 justify-center'>
            <Image
              src='/img/milongas/milonga-plan-2025-09_2026-05.jpg'
              width={820}
              height={960}
              alt='Milonga schedule'
            />
          </div>
        </div>
      </section>
      <div
        id='location'
        suppressHydrationWarning={true}
      >
        <DynamicVenueMap lang={lang} />
      </div>
      <section
        id='newsletter'
        style={{ scrollMarginTop: headHeight }}
        className='flex items-center justify-center'
      >
        <div className='flex w-full flex-wrap items-center justify-center px-12 py-12 text-center lg:mt-12'>
          <div className='w-full rounded-t-md bg-gray-800/20 px-4 py-[5px] font-medium'>
            {t('milonga.newsletter')}
          </div>

          <iframe
            suppressHydrationWarning={true}
            data-w-type='embedded'
            src='https://sugu5.mjt.lu/wgt/sugu5/x507/form?c=0f08a2f3'
            className='min-h-[650px] w-full'
          ></iframe>

          <script
            type='text/javascript'
            src='https://app.mailjet.com/pas-nc-embedded-v1.js'
          ></script>
        </div>
      </section>
    </>
  );
}
