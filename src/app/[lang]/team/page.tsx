'use client';

import { use } from 'react';
import { defaultLocale } from '@/config/i18n.ts';
import { useTranslation } from '@/hooks/use-translation.ts';
import { Params } from '@/types/props.ts';
import Image from 'next/image';
import { useHeaderHeight } from '@/hooks/use-header-height.ts';
import { unComputedHeaderHeight } from '@/common/constants.ts';
import { cn } from '@/helpers/cn.ts';

export default function GenericTeamPage({ params }: { params: Params }) {
  const lang = use(params).lang ?? defaultLocale;
  const headHeight = useHeaderHeight(unComputedHeaderHeight);

  const { t } = useTranslation({ lng: lang });

  const members = t('team.members', {
    returnObjects: true,
  }) as Array<{
    image: string;
    width: number;
    height: number;
    name: string;
    role: string;
    main: string;
  }>;

  return (
    <>
      <section
        id='team'
        style={{ scrollMarginTop: headHeight }}
        className='relative flex min-h-full items-center justify-center overflow-hidden bg-[url(/img/toulouse-map.jpg)] bg-cover bg-fixed bg-center bg-no-repeat'
      >
        <div className='absolute inset-0 bg-black/80' />
        <div className='container'>
          <div className='relative mt-20 flex w-full items-center justify-center px-12 py-12 text-center lg:mt-12'>
            <div>
              <h1 className='my-8 text-4xl font-extrabold text-white lg:text-5xl'>
                {t('team.title')}
              </h1>
              {members.map((member, i) => (
                <div
                  key={i}
                  className='my-8 flex w-full flex-wrap items-start justify-center text-white'
                >
                  <h2 className='mb-2 w-full text-center text-2xl font-medium'>
                    {member.name}
                  </h2>
                  <div className='w-0 basis-full'></div>
                  <p className='mb-2 w-full text-center text-lg font-medium italic'>
                    {member.role}
                  </p>
                  <div className='w-0 basis-full'></div>
                  <Image
                    src={`/img/team/${member.image}`}
                    width={member.width}
                    height={member.height}
                    alt={member.name}
                    className={cn(
                      'max-w-2xl object-scale-down pr-2 pb-2 md:w-6/12 lg:w-5/12',
                      i % 2 === 0 ? '' : 'md:order-2'
                    )}
                  />
                  <p
                    className={cn(
                      'mt-4 text-center md:mt-0 md:ml-12 md:w-5/12 md:text-left lg:ml-12',
                      i % 2 === 0 ? '' : 'md:order-1'
                    )}
                  >
                    {member.main}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
