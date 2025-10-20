import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./translations";

// Cookie helpers
const LANGUAGE_COOKIE = "preferred_language";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Detect user's preferred language
function getInitialLanguage(): string {
  // 1. Check if language is saved in cookie
  const savedLanguage = getCookie(LANGUAGE_COOKIE);
  if (savedLanguage && (savedLanguage === "th" || savedLanguage === "en")) {
    return savedLanguage;
  }

  // 2. Auto-detect from browser locale
  const browserLang = navigator.language.toLowerCase();

  // Check if browser language is Thai
  if (browserLang.startsWith("th")) {
    return "th";
  }

  // Default to English for all other locales
  return "en";
}

const initialLanguage = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: initialLanguage,
    fallbackLng: "th",
    interpolation: {
      escapeValue: false,
    },
  });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  setCookie(LANGUAGE_COOKIE, lng);
});

export default i18n;
