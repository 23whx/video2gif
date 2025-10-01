import zhTranslation from '../i18n/locales/zh.json';
import enTranslation from '../i18n/locales/en.json';
import jaTranslation from '../i18n/locales/ja.json';

type PageType = 'home' | 'editor' | 'about' | 'support';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogImageAlt: string;
}

/**
 * 根据页面类型和语言获取 SEO 数据
 */
export function getSEOData(page: PageType, lang: string = 'en'): SEOData {
  let translation;
  
  switch (lang) {
    case 'zh':
      translation = zhTranslation;
      break;
    case 'ja':
      translation = jaTranslation;
      break;
    default:
      translation = enTranslation;
  }
  
  const seoPage = translation.seo[page];
  const ogData = translation.seo.og;
  
  return {
    title: seoPage.title,
    description: seoPage.description,
    keywords: seoPage.keywords,
    ogImage: ogData.image,
    ogImageAlt: ogData.imageAlt,
  };
}

/**
 * 检测客户端浏览器语言（用于 SSR）
 */
export function detectLanguageFromHeaders(headers: Headers): string {
  const acceptLanguage = headers.get('accept-language') || '';
  
  if (acceptLanguage.includes('zh')) return 'zh';
  if (acceptLanguage.includes('ja')) return 'ja';
  
  return 'en'; // 默认英文
}

/**
 * 生成规范 URL
 */
export function getCanonicalUrl(siteUrl: string, pathname: string, lang?: string): string {
  const url = new URL(pathname, siteUrl);
  if (lang) {
    url.searchParams.set('lang', lang);
  }
  return url.toString();
}

