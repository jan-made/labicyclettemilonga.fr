import { Locale } from '@/config/i18n.ts';
import { HTMLProps } from 'react';

export type CoreParams = { lang: Locale };
export type Params = Promise<CoreParams>;

export type NavbarLinkProps = {
  label: string;
  link: string;
};

export type ClassNameProps = HTMLProps<HTMLElement>['className'];
