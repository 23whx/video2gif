import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../stores/editorStore';
import { formatBytes, estimateGifSize } from '../utils/formatters';
import ShareMenu from './ShareMenu';

export default function ExportPanel() {
  const { t } = useTranslation();
  const videoFile = useEditorStore((state) => state.videoFile);
  const settings = useEditorStore((state) => state.settings);
  const isProcessing = useEditorStore((state) => state.isProcessing);
  const progress = useEditorStore((state) => state.progress);
  const setProcessing = useEditorStore((state) => state.setProcessing);
  const setProgress = useEditorStore((state) => state.setProgress);

  const [exportedGif, setExportedGif] = useState<Blob | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const duration = settings.endTime - settings.startTime;
  const estimatedSize = estimateGifSize(
    settings.width,
    settings.height,
    settings.fps,
    duration,
    settings.colors
  );

  // 检查是否超过 2MB (2 * 1024 * 1024 bytes)
  const isLargeFile = estimatedSize > 2 * 1024 * 1024;

  const handleExport = async () => {
    if (!videoFile) return;

    setProcessing(true);
    setProgress(0);

    try {
      // 这里应该调用 ffmpeg.wasm worker
      // 目前先从视频中提取当前帧作为预览
      
      // 获取视频元素
      const videoElement = document.querySelector('video') as HTMLVideoElement;
      
      if (!videoElement) {
        throw new Error('Video element not found');
      }

      // 确保视频已加载
      if (videoElement.readyState < 2) {
        await new Promise((resolve) => {
          videoElement.addEventListener('loadeddata', resolve, { once: true });
        });
      }

      // 模拟进度
      setProgress(30);
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // 计算实际要提取的帧数
      const duration = settings.endTime - settings.startTime;
      const totalFrames = Math.min(Math.floor(duration * settings.fps), 50); // 最多50帧避免卡顿
      
      // 创建 canvas (启用 willReadFrequently 优化性能)
      const canvas = document.createElement('canvas');
      canvas.width = settings.width;
      canvas.height = settings.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      if (!ctx) throw new Error('Canvas context not available');
      
      // 动态加载 gif.js 库来生成 GIF
      const GIF = (window as any).GIF;
      
      if (!GIF) {
        // 如果没有 gif.js，只导出第一帧
        setProgress(60);
        videoElement.currentTime = settings.startTime;
        await new Promise((resolve) => {
          videoElement.addEventListener('seeked', resolve, { once: true });
        });
        
        // 绘制视频当前帧（无水印）
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        setProgress(90);
        
        // 转换为 PNG blob
        const previewBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob || new Blob());
          }, 'image/png', 0.95);
        });
        
        setProgress(100);
        
        // 自动下载
        const url = URL.createObjectURL(previewBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `video2gif-frame-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // 保存blob以便用户可以再次下载或复制
        setExportedGif(previewBlob);
        return;
      }
      
      // 使用 gif.js 生成真实 GIF
      const gif = new GIF({
        workers: 2,
        quality: Math.floor((100 - settings.quality) / 10) + 1, // 转换质量参数
        width: settings.width,
        height: settings.height,
        workerScript: '/gif.worker.js' // 使用本地 worker 文件
      });
      
      // 提取视频帧
      const frameInterval = 1 / settings.fps;
      for (let i = 0; i < totalFrames; i++) {
        const currentTime = settings.startTime + (i * frameInterval);
        
        // 跳转到指定时间
        videoElement.currentTime = currentTime;
        await new Promise((resolve) => {
          videoElement.addEventListener('seeked', resolve, { once: true });
        });
        
        // 绘制当前帧到 canvas（无水印）
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        // 添加帧到 GIF
        gif.addFrame(ctx, { copy: true, delay: 1000 / settings.fps });
        
        // 更新进度
        setProgress(60 + (i / totalFrames) * 30);
      }
      
      setProgress(90);
      
      // 渲染 GIF
      const gifBlob = await new Promise<Blob>((resolve, reject) => {
        gif.on('finished', (blob: Blob) => {
          resolve(blob);
        });
        gif.on('error', reject);
        gif.render();
      });
      
      setProgress(100);
      
      // 自动下载
      const url = URL.createObjectURL(gifBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `video2gif-${Date.now()}.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // 保存blob以便用户可以再次下载或复制
      setExportedGif(gifBlob);
    } catch (error) {
      alert(t('export.error'));
      console.error(error);
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!exportedGif) return;

    const url = URL.createObjectURL(exportedGif);
    const a = document.createElement('a');
    a.href = url;
      a.download = `video2gif-${Date.now()}.gif`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    setShowShareMenu(true);
  };

  if (!videoFile) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('editor.export')}</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-secondary">{t('export.estimatedSize')}:</span>
          <span className={`font-medium ${isLargeFile ? 'text-accent' : ''}`}>
            {formatBytes(estimatedSize)}
            {isLargeFile && (
              <span className="ml-1 text-xs">⚠️</span>
            )}
          </span>
        </div>

        {/* 大小警告提示 */}
        {isLargeFile && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <span className="text-accent text-sm">⚠️</span>
              <div>
                <p className="text-sm text-accent font-medium mb-1">
                  {t('export.sizeWarningShort')}
                </p>
                <p className="text-xs text-secondary">
                  {t('export.sizeWarning')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 优化建议 */}
        {isLargeFile && (
          <div className="bg-ink/5 rounded-lg p-3">
            <p className="text-xs text-secondary mb-2">
              <strong>{t('export.optimizationTips')}</strong>
            </p>
            <ul className="text-xs text-secondary space-y-1">
              <li>• {t('export.tipResolution')}</li>
              <li>• {t('export.tipFrameRate')}</li>
              <li>• {t('export.tipDuration')}</li>
              <li>• {t('export.tipColors')}</li>
            </ul>
          </div>
        )}

        {isProcessing && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-secondary">{t('export.progress')}:</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-secondary mt-2">{t('export.generating')}</p>
          </div>
        )}

        <button
          onClick={handleExport}
          disabled={isProcessing}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? t('export.processing') : t('export.action')}
        </button>

        {exportedGif && (
          <div className="space-y-2">
            <div className="text-xs text-secondary text-center">
              ✅ {t('export.downloaded')}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={handleDownload} className="btn-secondary text-sm py-2">
                📥 {t('export.download')}
              </button>
              <button 
                onClick={handleShare} 
                className="btn-secondary text-sm py-2"
              >
                🔗 {t('export.share')}
              </button>
            </div>
          </div>
        )}

        {/* 分享菜单 */}
        {showShareMenu && (
          <ShareMenu 
            gifBlob={exportedGif} 
            onClose={() => setShowShareMenu(false)} 
          />
        )}
      </div>
    </div>
  );
}

