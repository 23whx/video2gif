import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
}

/**
 * 全局 i18n 提供者
 * 确保所有子组件都能访问统一的语言状态
 */
export default function I18nProvider({ children }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    // 从 localStorage 读取并设置语言
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang).then(() => {
        setCurrentLang(savedLang);
        setIsReady(true);
      });
    } else {
      setIsReady(true);
    }

    // 监听语言变化
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // 等待语言加载完成
  if (!isReady) {
    return <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-ink">Loading...</div>
    </div>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

