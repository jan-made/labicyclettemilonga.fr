import { Locale, locales } from '@/config/i18n.ts';
import { ReactNode, useState } from 'react';
import { cn } from '@/helpers/cn.ts';
import { usePathname } from 'next/navigation';
import getLangPrefix from '@/helpers/lang-prefix.ts';
import Link from 'next/link';
import IconifyIcon from '@/components/wrappers/IconifyIcon.tsx';

export default function LangSelector({
  lang,
  isDark,
  buttonLabel,
}: {
  lang: Locale;
  isDark?: boolean;
  buttonLabel: ReactNode;
}) {
  const pathName = usePathname();
  const langPrefix = getLangPrefix(lang);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const getHref = (locale: Locale): string => {
    const localeLangPrefix = getLangPrefix(locale);

    if (pathName.startsWith(langPrefix)) {
      return localeLangPrefix + pathName.substring(langPrefix.length);
    }

    return localeLangPrefix;
  };

  return (
    <div className='relative'>
      <button
        type='button'
        className={cn(
          'text-md inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold uppercase',
          isDark ? '' : 'text-bicyclette bg-gray-300'
        )}
        onClick={handleToggle}
      >
        {buttonLabel}
        <span className='ml-2'>
          {open ? (
            <IconifyIcon
              icon='lucide:chevron-up'
              className='me-2 text-xl'
            />
          ) : (
            <IconifyIcon
              icon='lucide:chevron-down'
              className='me-2 text-xl'
            />
          )}
        </span>
      </button>
      {open && (
        <div className='absolute top-12 left-1/2 -translate-x-1/2'>
          <ul className='text-md h-auto w-12 rounded-md border bg-white p-1 text-center font-bold uppercase shadow-md'>
            {locales
              .map((x) => ({
                key: x,
                label: x,
              }))
              .map((item) => (
                <li
                  key={item.key}
                  className=''
                >
                  <Link
                    className='hover:text-bicyclette'
                    href={{ pathname: getHref(item.key) }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
