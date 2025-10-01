import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zh from './locales/zh.json';
import en from './locales/en.json';
import ja from './locales/ja.json';

export const defaultLang = 'en'; // 默认英文
export const languages = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
};

// 语言检测配置
const detectionOptions = {
  // 检测顺序：localStorage > navigator > 默认语言
  order: ['localStorage', 'navigator', 'htmlTag'],
  
  // localStorage 键名
  lookupLocalStorage: 'i18nextLng',
  
  // 缓存用户选择
  caches: ['localStorage'],
  
  // 不检测 cookie 和 querystring
  excludeCacheFor: ['cimode'],
};

// 语言映射：将浏览器语言代码映射到我们支持的语言
const languageMap: { [key: string]: string } = {
  'zh': 'zh',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  'zh-HK': 'zh',
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'ja': 'ja',
  'ja-JP': 'ja',
};

// 获取浏览器语言
function getBrowserLanguage(): string {
  if (typeof window === 'undefined') return defaultLang;
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // 精确匹配
  if (languageMap[browserLang]) {
    return languageMap[browserLang];
  }
  
  // 匹配语言代码前缀（如 en-AU -> en）
  const langPrefix = browserLang.split('-')[0];
  if (languageMap[langPrefix]) {
    return languageMap[langPrefix];
  }
  
  return defaultLang;
}

// 获取初始语言
function getInitialLanguage(): string {
  if (typeof window === 'undefined') return defaultLang;
  
  // 优先使用 localStorage 中保存的语言
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en' || savedLang === 'ja')) {
    return savedLang;
  }
  
  // 其次使用浏览器语言
  return getBrowserLanguage();
}

// 初始化 i18next
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      ja: { translation: ja },
    },
    
    // 使用检测到的语言，而不是固定的默认语言
    lng: getInitialLanguage(),
    
    // 回退语言
    fallbackLng: 'en',
    
    // 语言检测配置
    detection: detectionOptions,
    
    // 插值配置
    interpolation: {
      escapeValue: false,
    },
    
    // React配置
    react: {
      useSuspense: false,
    },
  });

export default i18next;
