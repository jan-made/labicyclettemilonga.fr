'use client';

import Link from 'next/link';
import IconifyIcon from './wrappers/IconifyIcon.tsx';
import { cn } from '@/helpers/cn.ts';
import useScrollEvent from '@/hooks/use-scroll-event.ts';
import Logo from '@/components/Logo.tsx';
import { useState } from 'react';
import { Locale } from '@/config/i18n.ts';
import Links from '@/components/Links.tsx';
import LangSelector from '@/components/LangSelector.tsx';
import getLangPrefix from '@/helpers/lang-prefix.ts';
import useOutside from '@/hooks/use-outside.ts';
import SecondaryNavbar from '@/components/SecondaryNavbar.tsx';
import { usePathname } from 'next/navigation';

export default function TopNavbar({
  isDark,
  lang,
}: {
  isDark?: boolean;
  lang: Locale;
}) {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScrollEvent();
  const langPrefix = getLangPrefix(lang);

  const currentRoute = pathname.startsWith(langPrefix)
    ? pathname.substring(langPrefix.length)
    : pathname;

  const isSticky = scrollY >= 50;

  const wrapperRef = useOutside(() => setNav(false));

  return (
    <header
      id='header'
      ref={wrapperRef}
      className={cn(
        'font-nunito fixed inset-x-0 top-0 z-2000 block w-full bg-gray-800 py-4 shadow-xl transition-all duration-500 lg:bg-transparent lg:shadow-none',
        isDark ? '' : '',
        isSticky ? 'lg:bg-gray-800/80' : ''
      )}
    >
      <div className='relative z-20 container mr-auto ml-auto'>
        <nav className='flex flex-wrap items-center justify-between lg:flex-nowrap'>
          <Link
            href={{ pathname: langPrefix }}
            className='inline-block whitespace-nowrap'
          >
            <Logo className='fill-bicyclette w-28' />
          </Link>
          <div className='ms-auto flex items-center px-2.5 lg:hidden'>
            <LangSelector
              lang={lang}
              isDark={isDark}
              buttonLabel={lang}
            />
            <button
              className='hs-collapse-toggle ml-8 inline-flex h-10 w-12 items-center justify-center rounded-md border bg-gray-300'
              type='button'
              onClick={() => setNav(!nav)}
            >
              <IconifyIcon
                icon='uil:bars'
                className='text-2xl'
              />
            </button>
          </div>
          <div
            className={cn(
              nav ? '' : 'hidden',
              'hs-collapse mx-auto mt-2 grow basis-full items-center justify-center overflow-hidden transition-all duration-300 lg:mt-0 lg:flex lg:basis-auto'
            )}
          >
            <ul className='mt-4 inline-flex w-full flex-col justify-center gap-x-4 lg:mt-0 lg:flex-row lg:items-center'>
              <Links
                lang={lang}
                setNav={setNav}
                className={cn(
                  'relative inline-block cursor-pointer rounded-md bg-transparent px-3.5 py-1 text-base font-semibold tracking-wide capitalize transition-all duration-300',
                  'text-white',
                  'active:text-bicyclette active:bg-white/20 lg:active:bg-black/40',
                  'focus:text-bicyclette focus:bg-white/20 lg:focus:bg-black/40',
                  'hover:text-bicyclette hover:bg-white/20 lg:hover:bg-black/40',
                  isDark ? '' : '',
                  isSticky ? '' : ''
                )}
              />
            </ul>
          </div>
          <div className='hidden lg:block'>
            <LangSelector
              lang={lang}
              isDark={isDark}
              buttonLabel={lang}
            />
          </div>
        </nav>
      </div>
      <SecondaryNavbar
        currentRoute={currentRoute}
        nav={nav}
        isDark={isDark}
        lang={lang}
      />
    </header>
  );
}
