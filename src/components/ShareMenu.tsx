import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ShareMenuProps {
  gifBlob: Blob | null;
  onClose: () => void;
}

export default function ShareMenu({ gifBlob, onClose }: ShareMenuProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.origin;
  const shareText = t('share.text');

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{t('share.title')}</h3>
          <button onClick={onClose} className="text-secondary hover:text-ink text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* 社交媒体分享 */}
          <div>
            <p className="text-sm text-secondary mb-3">{t('share.socialMedia')}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShareTwitter}
                className="flex items-center gap-2 p-3 rounded-lg border border-ink/10 hover:border-accent hover:bg-accent/5 transition-colors"
              >
                <span className="text-xl">𝕏</span>
                <span className="text-sm font-medium">X (Twitter)</span>
              </button>
              <button
                onClick={handleShareFacebook}
                className="flex items-center gap-2 p-3 rounded-lg border border-ink/10 hover:border-accent hover:bg-accent/5 transition-colors"
              >
                <span className="text-xl">📘</span>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>

          {/* 复制链接 */}
          <div>
            <p className="text-sm text-secondary mb-3">{t('share.orCopyLink')}</p>
            <button
              onClick={handleCopyLink}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
                copied
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink/10 hover:border-accent hover:bg-accent/5'
              }`}
            >
              <span className="text-xl">{copied ? '✓' : '🔗'}</span>
              <span className="text-sm font-medium">
                {copied ? t('share.linkCopied') : t('share.copyWebsite')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

