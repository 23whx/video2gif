import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-bg text-ink pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('about.title')}</h1>

        <div className="space-y-8">
          {/* Privacy */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔒</div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">{t('about.privacy')}</h2>
                <p className="text-secondary leading-relaxed">
                  {t('about.privacyContent')}
                </p>
              </div>
            </div>
          </div>

          {/* Offline Support */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📱</div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">{t('about.offline')}</h2>
                <p className="text-secondary leading-relaxed">
                  {t('about.offlineContent')}
                </p>
              </div>
            </div>
          </div>

          {/* Open Source */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚙️</div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">{t('about.opensource')}</h2>
                <p className="text-secondary leading-relaxed mb-3">
                  {t('about.opensourceContent')}
                </p>
                <ul className="list-disc list-inside text-secondary space-y-1">
                  <li>FFmpeg - {t('common.loading')}</li>
                  <li>ffmpeg.wasm - WebAssembly version</li>
                  <li>Astro - Static site generator</li>
                  <li>React - UI library</li>
                  <li>Tailwind CSS - CSS framework</li>
                  <li>i18next - i18n framework</li>
                  <li>Zustand - State management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="card bg-accent/5 border-2 border-accent/20">
            <div className="flex items-start gap-4">
              <div className="text-4xl">✉️</div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">{t('about.contact')}</h2>
                <div className="space-y-2">
                  <p className="text-secondary">
                    <strong>{t('about.email')}:</strong>
                    <a href="mailto:wanghongxiang23@gmail.com" className="text-accent hover:underline ml-2">
                      wanghongxiang23@gmail.com
                    </a>
                  </p>
                  <p className="text-secondary">
                    <strong>{t('about.twitter')}:</strong>
                    <a href="https://x.com/Rollkey4" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-2">
                      @Rollkey4
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

