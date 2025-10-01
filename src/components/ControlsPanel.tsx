import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../stores/editorStore';
import { useState, useEffect } from 'react';

export default function ControlsPanel() {
  const { t } = useTranslation();
  const settings = useEditorStore((state) => state.settings);
  const aspectRatioLocked = useEditorStore((state) => state.aspectRatioLocked);
  const updateSettings = useEditorStore((state) => state.updateSettings);
  const setAspectRatioLocked = useEditorStore((state) => state.setAspectRatioLocked);

  // 保存当前高宽比（用于锁定时的计算）
  const [lockedAspectRatio, setLockedAspectRatio] = useState(settings.width / settings.height);
  
  // 本地输入状态，允许用户自由输入
  const [widthInput, setWidthInput] = useState(settings.width.toString());
  const [heightInput, setHeightInput] = useState(settings.height.toString());

  // 当 store 中的设置变化时，同步到本地输入状态和高宽比
  useEffect(() => {
    setWidthInput(settings.width.toString());
    setHeightInput(settings.height.toString());
    // 始终更新高宽比，确保上传新视频时能同步
    setLockedAspectRatio(settings.width / settings.height);
  }, [settings.width, settings.height]);

  const handleWidthBlur = () => {
    const newWidth = parseInt(widthInput) || 480;
    const width = Math.max(100, Math.min(1920, newWidth));
    
    if (aspectRatioLocked) {
      // 根据当前高宽比自动计算高度
      const height = Math.round(width / lockedAspectRatio);
      updateSettings({ width, height: Math.max(100, Math.min(1080, height)) });
    } else {
      updateSettings({ width });
    }
  };

  const handleHeightBlur = () => {
    const newHeight = parseInt(heightInput) || 360;
    const height = Math.max(100, Math.min(1080, newHeight));
    
    if (aspectRatioLocked) {
      // 根据当前高宽比自动计算宽度
      const width = Math.round(height * lockedAspectRatio);
      updateSettings({ width: Math.max(100, Math.min(1920, width)), height });
    } else {
      updateSettings({ height });
    }
  };

  const handleWidthKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleWidthBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleHeightKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleHeightBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const toggleAspectRatioLock = () => {
    if (!aspectRatioLocked) {
      // 从未锁定切换到锁定时，保存当前的高宽比
      setLockedAspectRatio(settings.width / settings.height);
    }
    setAspectRatioLocked(!aspectRatioLocked);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t('editor.controls')}</h3>

      {/* 尺寸 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">{t('controls.size')}</label>
          <button
            onClick={toggleAspectRatioLock}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all ${
              aspectRatioLocked
                ? 'bg-accent text-white'
                : 'bg-ink/10 text-secondary hover:bg-ink/20'
            }`}
            title={t('controls.lockAspectRatio')}
          >
            {aspectRatioLocked ? '🔒' : '🔓'}
            <span className="hidden sm:inline">{t('controls.lockAspectRatio')}</span>
          </button>
        </div>
        
        {/* 显示当前高宽比 */}
        {aspectRatioLocked && (
          <div className="text-xs text-secondary text-center">
            {t('controls.aspectRatio')}: {lockedAspectRatio.toFixed(2)}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-secondary">{t('controls.width')}</label>
            <input
              type="number"
              value={widthInput}
              onChange={(e) => setWidthInput(e.target.value)}
              onBlur={handleWidthBlur}
              onKeyDown={handleWidthKeyDown}
              className="input w-full text-sm"
              min={100}
              max={1920}
              step={10}
            />
          </div>
          <div>
            <label className="text-xs text-secondary">{t('controls.height')}</label>
            <input
              type="number"
              value={heightInput}
              onChange={(e) => setHeightInput(e.target.value)}
              onBlur={handleHeightBlur}
              onKeyDown={handleHeightKeyDown}
              className="input w-full text-sm"
              min={100}
              max={1080}
              step={10}
            />
          </div>
        </div>
      </div>

      {/* 帧率 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {t('controls.fps')}: {settings.fps}
        </label>
        <input
          type="range"
          min={1}
          max={30}
          value={settings.fps}
          onChange={(e) => updateSettings({ fps: parseInt(e.target.value) })}
          className="slider"
        />
      </div>

      {/* 质量 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {t('controls.quality')}: {settings.quality}%
        </label>
        <input
          type="range"
          min={1}
          max={100}
          value={settings.quality}
          onChange={(e) => updateSettings({ quality: parseInt(e.target.value) })}
          className="slider"
        />
      </div>

      {/* 颜色数 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {t('controls.colors')}: {settings.colors}
        </label>
        <input
          type="range"
          min={2}
          max={256}
          value={settings.colors}
          onChange={(e) => updateSettings({ colors: parseInt(e.target.value) })}
          className="slider"
        />
      </div>

      {/* 循环 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">{t('controls.loop')}</label>
        <select
          value={settings.loop}
          onChange={(e) => updateSettings({ loop: parseInt(e.target.value) })}
          className="input w-full"
        >
          <option value={0}>{t('controls.loopForever')}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* 循环模式 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">{t('controls.loopMode')}</label>
        <select
          value={settings.loopMode}
          onChange={(e) =>
            updateSettings({ loopMode: e.target.value as 'forward' | 'reverse' | 'yoyo' })
          }
          className="input w-full"
        >
          <option value="forward">{t('controls.forward')}</option>
          <option value="reverse">{t('controls.reverse')}</option>
          <option value="yoyo">{t('controls.yoyo')}</option>
        </select>
      </div>

      {/* 抖动算法 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">{t('controls.dither')}</label>
        <select
          value={settings.dither}
          onChange={(e) =>
            updateSettings({ dither: e.target.value as 'none' | 'floyd-steinberg' | 'ordered' })
          }
          className="input w-full"
        >
          <option value="none">{t('controls.ditherNone')}</option>
          <option value="floyd-steinberg">{t('controls.ditherFS')}</option>
          <option value="ordered">{t('controls.ditherOrdered')}</option>
        </select>
      </div>

      {/* 调色 */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('controls.brightness')}: {settings.brightness}
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={settings.brightness}
            onChange={(e) => updateSettings({ brightness: parseInt(e.target.value) })}
            className="slider"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('controls.contrast')}: {settings.contrast}
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={settings.contrast}
            onChange={(e) => updateSettings({ contrast: parseInt(e.target.value) })}
            className="slider"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('controls.saturation')}: {settings.saturation}
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={settings.saturation}
            onChange={(e) => updateSettings({ saturation: parseInt(e.target.value) })}
            className="slider"
          />
        </div>
      </div>
    </div>
  );
}
