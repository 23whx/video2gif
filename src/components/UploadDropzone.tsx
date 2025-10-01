import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../stores/editorStore';

export default function UploadDropzone() {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const setVideoFile = useEditorStore((state) => state.setVideoFile);
  const setVideoUrl = useEditorStore((state) => state.setVideoUrl);
  const setDuration = useEditorStore((state) => state.setDuration);
  const updateSettings = useEditorStore((state) => state.updateSettings);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('video/')) {
      alert(t('upload.error'));
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);

    // 获取视频元数据（时长、宽高）
    const video = document.createElement('video');
    video.src = url;
    video.onloadedmetadata = () => {
      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;
      
      setDuration(duration);
      
      // 自动设置为视频的原始尺寸和时长
      updateSettings({
        width,
        height,
        startTime: 0,
        endTime: duration,
      });
    };
  }, [setVideoFile, setVideoUrl, setDuration, updateSettings, t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`card border-2 border-dashed transition-all ${
        isDragging
          ? 'border-accent bg-accent/5 scale-[1.02]'
          : 'border-ink/20 hover:border-accent/50'
      } cursor-pointer`}
    >
      <label className="cursor-pointer block text-center py-12">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-2xl font-semibold mb-2">{t('upload.title')}</h3>
        <p className="text-secondary mb-4">{t('upload.hint')}</p>
        <p className="text-sm text-secondary mb-2">{t('upload.formats')}</p>
        <p className="text-xs text-secondary">{t('upload.maxSize')}</p>
        <span className="btn-primary mt-6 inline-block">
          {t('upload.selectFile')}
        </span>
      </label>
    </div>
  );
}

