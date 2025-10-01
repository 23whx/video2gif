import { useTranslation } from 'react-i18next';
import LangSwitcher from './LangSwitcher';

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-sm shadow-soft z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-accent">🎬</span>
          <span className="text-xl font-bold">{t('app.name')}</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm hover:text-accent transition-colors">
            {t('nav.home')}
          </a>
          <a href="/editor" className="text-sm hover:text-accent transition-colors">
            {t('nav.editor')}
          </a>
          <a href="/about" className="text-sm hover:text-accent transition-colors">
            {t('nav.about')}
          </a>
          <a href="/support" className="text-sm hover:text-accent transition-colors">
            {t('nav.support')}
          </a>
          <LangSwitcher />
        </div>

        {/* Mobile menu - simplified */}
        <div className="md:hidden">
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
}
