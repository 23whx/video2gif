import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../stores/editorStore';

export default function PreviewCanvas() {
  const { t } = useTranslation();
  const videoUrl = useEditorStore((state) => state.videoUrl);
  const settings = useEditorStore((state) => state.settings);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = settings.startTime;
    }
  }, [settings.startTime]);

  if (!videoUrl) {
    return (
      <div className="aspect-video bg-ink/5 rounded-2xl flex items-center justify-center">
        <div className="text-center text-secondary">
          <div className="text-6xl mb-4">📹</div>
          <p>{t('editor.preview')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('editor.preview')}</h3>
      <div className="relative">
        <video
          ref={videoRef}
          controls
          className="w-full rounded-2xl shadow-soft"
          style={{
            maxWidth: `${settings.width}px`,
            filter: `brightness(${1 + settings.brightness / 100}) contrast(${
              1 + settings.contrast / 100
            }) saturate(${1 + settings.saturation / 100})`,
          }}
        />
      </div>
    </div>
  );
}

