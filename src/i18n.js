import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from 'translation/en/translation.json';
import polish from 'translation/pl/translation.json';

const resources = {
  en: { translation: english },
  pl: { translation: polish },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
