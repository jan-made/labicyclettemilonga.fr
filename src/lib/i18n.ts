import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nOptions } from '@/config/i18n.ts';

i18next.use(LanguageDetector).init(i18nOptions);

export default i18next;
