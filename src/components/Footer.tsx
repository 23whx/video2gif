import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-surface/80 backdrop-blur-sm border-t border-ink/10 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-secondary">
              © {new Date().getFullYear()} {t('app.name')} - {t('app.tagline')}
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a
              href="mailto:wanghongxiang23@gmail.com"
              className="text-sm text-secondary hover:text-accent transition-colors"
            >
              📧 wanghongxiang23@gmail.com
            </a>
            <a
              href="https://x.com/Rollkey4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-accent transition-colors"
            >
              𝕏 @Rollkey4
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
