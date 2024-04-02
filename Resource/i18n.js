import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './English/en.json';
import hiTranslation from './Hindi/hi.json';
import knTranslation from './Kannada/kn.json';

const resources = {
    en: { translation: enTranslation },
    hi: { translation: hiTranslation },
    kn: { translation: knTranslation }
};


i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false // React already does escaping
        }
    });

export default i18n;
