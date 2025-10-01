import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-bg text-ink pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-8xl mb-6">🎬✨</div>
          <h1 className="text-5xl font-bold mb-6 text-balance">
            {t('app.name')}
          </h1>
          <p className="text-2xl text-secondary mb-8">
            {t('app.tagline')}
          </p>
          <a href="/editor" className="btn-primary inline-block text-lg">
            {t('home.getStarted')} →
          </a>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="card text-center hover:scale-[1.02] transition-transform">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">{t('home.feature1')}</h3>
            <p className="text-secondary">{t('home.feature1Desc')}</p>
          </div>

          <div className="card text-center hover:scale-[1.02] transition-transform">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">{t('home.feature2')}</h3>
            <p className="text-secondary">{t('home.feature2Desc')}</p>
          </div>

          <div className="card text-center hover:scale-[1.02] transition-transform">
            <div className="text-5xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2">{t('home.feature3')}</h3>
            <p className="text-secondary">{t('home.feature3Desc')}</p>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="card max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {t('upload.formats')}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {['MP4', 'MOV', 'AVI', 'MKV', 'WebM', 'MPEG', 'FLV', 'MTS', 'M2TS', '3GP'].map(format => (
              <span key={format} className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                {format}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

