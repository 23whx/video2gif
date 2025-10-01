import { useTranslation } from 'react-i18next';
import { languages } from '../i18n/config';
import { useState, useEffect } from 'react';

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    // 监听语言变化
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const handleLanguageChange = (lang: string) => {
    // 切换语言
    i18n.changeLanguage(lang).then(() => {
      setCurrentLang(lang);
      // 确保保存到 localStorage
      localStorage.setItem('i18nextLng', lang);
      console.log('Language changed to:', lang);
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-secondary">🌐</span>
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="input text-sm py-1 cursor-pointer"
        aria-label="Language selector"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
