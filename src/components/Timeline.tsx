import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../stores/editorStore';
import { formatTime } from '../utils/formatters';

export default function Timeline() {
  const { t } = useTranslation();
  const videoUrl = useEditorStore((state) => state.videoUrl);
  const duration = useEditorStore((state) => state.duration);
  const settings = useEditorStore((state) => state.settings);
  const updateSettings = useEditorStore((state) => state.updateSettings);
  
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoUrl || !duration) return;

    const generateThumbnails = async () => {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';

      await new Promise((resolve) => {
        video.onloadeddata = resolve;
      });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 160;
      canvas.height = 90;

      const thumbs: string[] = [];
      const count = 10;

      for (let i = 0; i < count; i++) {
        video.currentTime = (duration / count) * i;
        await new Promise((resolve) => {
          video.onseeked = resolve;
        });

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        thumbs.push(canvas.toDataURL());
      }

      setThumbnails(thumbs);
    };

    generateThumbnails();
  }, [videoUrl, duration]);

  useEffect(() => {
    // 初始化结束时间为视频时长
    if (duration && settings.endTime === 0) {
      updateSettings({ endTime: duration });
    }
  }, [duration, settings.endTime, updateSettings]);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateSettings({ startTime: Math.min(value, settings.endTime - 0.1) });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateSettings({ endTime: Math.max(value, settings.startTime + 0.1) });
  };

  if (!videoUrl) return null;

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />
      
      <div>
        <h3 className="text-lg font-semibold mb-2">{t('editor.timeline')}</h3>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {thumbnails.map((thumb, i) => (
            <img
              key={i}
              src={thumb}
              alt={`Frame ${i}`}
              className="h-16 rounded-lg shadow"
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('controls.startTime')}: {formatTime(settings.startTime)}
          </label>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={settings.startTime}
            onChange={handleStartTimeChange}
            className="slider"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('controls.endTime')}: {formatTime(settings.endTime)}
          </label>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={settings.endTime}
            onChange={handleEndTimeChange}
            className="slider"
          />
        </div>

        <div className="text-sm text-secondary">
          {t('controls.trim')}: {formatTime(settings.endTime - settings.startTime)}
        </div>
      </div>
    </div>
  );
}

