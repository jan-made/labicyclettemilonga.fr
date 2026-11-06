'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Locale } from '@/config/i18n.ts';
import { cn } from '@/helpers/cn.ts';
import { useTranslation } from '@/hooks/use-translation.ts';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Swiper as SwiperClass } from 'swiper/types';
import { useRouter } from 'next/navigation';
import { Route } from 'next';
import useScrollEvent from '@/hooks/use-scroll-event.ts';

interface Submenu {
  id: number;
  key: string;
  hash: string;
  translation: string;
}

export default function SecondaryNavbar({
  currentRoute,
  nav,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isDark,
  lang,
}: {
  currentRoute: string;
  nav: boolean;
  isDark?: boolean;
  lang: Locale;
}) {
  const isMarathonNamespace =
    currentRoute.startsWith('marathon/') &&
    currentRoute.length >= 'marathon/2025'.length;
  const router = useRouter();
  const { t } = useTranslation({
    lng: lang,
    ns: isMarathonNamespace ? 'marathons' : undefined,
  });
  const { scrollY } = useScrollEvent();

  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const submenu = useMemo(() => {
    const i = currentRoute.indexOf('/');

    const routeKey = isMarathonNamespace
      ? currentRoute.substring(i + 1).replace(/\//g, '')
      : currentRoute === ''
        ? 'milonga'
        : i > 0
          ? currentRoute.substring(0, i)
          : currentRoute;

    const routeSubmenu = t(`${routeKey}.submenu`, {
      returnObjects: true,
    }) as Record<string, string>;

    const items: Array<Submenu> = [];

    let submenuId = 0;
    for (const [key, value] of Object.entries(routeSubmenu)) {
      items.push({
        id: submenuId,
        key,
        hash: `#${key}`,
        translation: value,
      });

      submenuId++;
    }

    return items;
  }, [currentRoute, t, isMarathonNamespace]);

  const submenuClick = useCallback(
    (item: Submenu) => {
      router.push(item.hash as Route);

      swiper?.slideTo(item.id);
    },
    [swiper, router]
  );

  const submenuClickEvent = (item: Submenu) => (event: MouseEvent) => {
    event.preventDefault();

    return submenuClick(item);
  };

  const activeIndex = useMemo(
    () => {
      if (typeof window === 'undefined') return 0;

      const innerHalfHeight = window.innerHeight / 2;

      let candidate: Submenu | undefined = undefined;
      for (const item of submenu) {
        const el = document.getElementById(item.key);
        if (!el) continue;
        const startsAt = el.getBoundingClientRect().top;
        if (startsAt < innerHalfHeight || candidate === undefined) {
          candidate = item;
        } else {
          break;
        }
      }

      return candidate?.id ?? 0;
    },
    /* eslint-disable-line react-hooks/exhaustive-deps */ [scrollY, submenu]
  );

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(activeIndex);
  }, [swiper, activeIndex]);

  if (submenu.length === 0) {
    return <></>;
  }

  return (
    <div
      className={cn(nav ? 'hidden' : '', 'relative z-10 px-4 pt-2 text-white')}
    >
      <Swiper
        spaceBetween={40}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView='auto'
        initialSlide={activeIndex}
        onSwiper={setSwiper}
      >
        {submenu.map((item, i) => (
          <SwiperSlide
            key={i}
            className='w-auto! shrink-0 p-2'
          >
            <Link
              className={cn(
                'px-2 py-1',
                activeIndex === item.id
                  ? 'text-bicyclette rounded-md bg-white/20 text-xl lg:bg-black/40'
                  : ''
              )}
              href={{ hash: item.hash }}
              onClick={(e) => submenuClickEvent(item)(e)}
            >
              {item.translation}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
