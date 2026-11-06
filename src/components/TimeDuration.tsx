'use client';

import useCountdown from '@/hooks/use-countdown.ts';
import { Locale } from '@/config/i18n.ts';
import { useTranslation } from '@/hooks/use-translation.ts';

export default function TimeDuration({
  lang,
  deadline,
}: {
  lang: Locale;
  deadline: Date;
}) {
  const { days, hours, minutes, seconds, inFuture } = useCountdown({
    deadline,
  });

  const { t } = useTranslation({ lng: lang, ns: 'components' });

  if (!inFuture) {
    return <></>;
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:gap-x-0'>
      <div className='inline-flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-2 font-bold text-white'>
        <span
          id='days'
          className='text-3xl'
          suppressHydrationWarning={true}
        >
          {days}
        </span>
        <span
          className='text-base'
          suppressHydrationWarning={true}
        >
          {t('time-duration.days', { count: days })}
        </span>
      </div>
      <div className='mx-4 hidden text-2xl font-bold text-white sm:block'>
        :
      </div>
      <div className='inline-flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-2 font-bold text-white'>
        <span
          id='hours'
          className='text-3xl'
          suppressHydrationWarning={true}
        >
          {hours}
        </span>
        <span
          className='text-base'
          suppressHydrationWarning={true}
        >
          {t('time-duration.hours', { count: hours })}
        </span>
      </div>
      <div className='mx-4 hidden text-2xl font-bold text-white sm:block'>
        :
      </div>
      <div className='inline-flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-2 font-bold text-white'>
        <span
          id='minutes'
          className='text-3xl'
          suppressHydrationWarning={true}
        >
          {minutes}
        </span>
        <span
          className='text-base'
          suppressHydrationWarning={true}
        >
          {t('time-duration.minutes', { count: minutes })}
        </span>
      </div>
      <div className='mx-4 hidden text-2xl font-bold text-white sm:block'>
        :
      </div>
      <div className='inline-flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-2 font-bold text-white'>
        <span
          id='seconds'
          className='text-3xl'
          suppressHydrationWarning={true}
        >
          {seconds}
        </span>
        <span
          className='text-base'
          suppressHydrationWarning={true}
        >
          {t('time-duration.seconds', { count: seconds })}
        </span>
      </div>
    </div>
  );
}
