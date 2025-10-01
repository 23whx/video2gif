import { useTranslation } from 'react-i18next';

export default function SupportPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-bg text-ink pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('support.title')}</h1>

        <div className="space-y-6">
          {/* FAQ 1 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              ❓ {t('support.q1')}
            </h3>
            <p className="text-secondary leading-relaxed">
              {t('support.a1')}
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              📏 {t('support.q2')}
            </h3>
            <p className="text-secondary leading-relaxed">
              {t('support.a2')}
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              📱 {t('support.q3')}
            </h3>
            <p className="text-secondary leading-relaxed">
              {t('support.a3')}
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              🔐 {t('support.q4')}
            </h3>
            <p className="text-secondary leading-relaxed">
              {t('support.a4')}
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              ⚙️ How to get the best conversion quality?
            </h3>
            <p className="text-secondary leading-relaxed mb-3">
              Here are some optimization suggestions:
            </p>
            <ul className="list-disc list-inside text-secondary space-y-1 ml-4">
              <li>Use appropriate size: don't exceed the original video resolution</li>
              <li>Adjust frame rate: usually 10-20 FPS is sufficient</li>
              <li>Choose the right number of colors: 128-256 colors usually provide good visual effects</li>
              <li>Use Floyd-Steinberg dithering algorithm for smoother gradients</li>
              <li>Trim to key segments to avoid overly long GIFs</li>
            </ul>
          </div>

          {/* FAQ 6 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              🌐 {t('language.label')}?
            </h3>
            <p className="text-secondary leading-relaxed">
              Currently supports Chinese (Simplified), English, and Japanese.
              You can select your preferred language from the language switcher in the top right corner.
              Language preferences are automatically saved and will be remembered on your next visit.
            </p>
          </div>

          {/* Feedback */}
          <div className="card bg-accent/5 border-2 border-accent/20">
            <h3 className="text-xl font-semibold mb-3">{t('support.feedback')}</h3>
            <p className="text-secondary leading-relaxed mb-4">
              {t('support.feedbackHint')}
            </p>
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
    </main>
  );
}

