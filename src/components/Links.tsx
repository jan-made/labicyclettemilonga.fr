import Link from 'next/link';
import { cn } from '@/helpers/cn.ts';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation.ts';
import { Locale } from '@/config/i18n.ts';
import getLangPrefix from '@/helpers/lang-prefix.ts';
import { Dispatch, SetStateAction } from 'react';

export default function Links({
  lang,
  setNav,
  className,
}: {
  lang: Locale;
  setNav: Dispatch<SetStateAction<boolean>>;
  className: string;
}) {
  let pathName = usePathname();
  const langPrefix = getLangPrefix(lang);

  const { t } = useTranslation({ lng: lang });

  if (pathName.endsWith('/')) {
    pathName = pathName.substring(0, pathName.length - 1);
  }

  const isActive = (link: string): boolean => {
    if (link.endsWith('/')) {
      link = link.substring(0, link.length - 1);
    }

    return link === pathName;
  };

  const resetNav = () => {
    setNav(false);
  };

  return (
    <>
      <li className='mb-4 text-center lg:mb-0 lg:text-left'>
        <Link
          href={{ pathname: langPrefix }}
          className={cn(
            className,
            isActive(langPrefix)
              ? 'text-bicyclette bg-white/20 text-xl lg:bg-black/40'
              : ''
          )}
          onClick={resetNav}
        >
          {t('menu.milonga')}
        </Link>
      </li>
      <li className='mb-4 text-center lg:mb-0 lg:text-left'>
        <Link
          href={{ pathname: `${langPrefix}marathon/` }}
          className={cn(
            className,
            isActive(`${langPrefix}marathon/`)
              ? 'text-bicyclette bg-white/20 text-xl lg:bg-black/40'
              : ''
          )}
          onClick={resetNav}
        >
          {t('menu.marathon')}
        </Link>
      </li>
      <li className='mb-4 text-center lg:mb-0 lg:text-left'>
        <Link
          href={{ pathname: `${langPrefix}team/` }}
          className={cn(
            className,
            isActive(`${langPrefix}team/`)
              ? 'text-bicyclette bg-white/20 text-xl lg:bg-black/40'
              : ''
          )}
          onClick={resetNav}
        >
          {t('menu.team')}
        </Link>
      </li>
    </>
  );
}
