import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../stores/editorStore';
import UploadDropzone from './UploadDropzone';
import Timeline from './Timeline';
import PreviewCanvas from './PreviewCanvas';
import ControlsPanel from './ControlsPanel';
import ExportPanel from './ExportPanel';

export default function EditorApp() {
  const { t } = useTranslation();
  const videoFile = useEditorStore((state) => state.videoFile);

  if (!videoFile) {
    return (
      <div className="min-h-screen bg-bg text-ink pt-20">
        <div className="container mx-auto p-4 max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">{t('editor.title')}</h1>
            <p className="text-secondary">{t('upload.hint')}</p>
          </div>
          <UploadDropzone />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink pt-20">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{t('editor.title')}</h1>
        
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          {/* 左侧：预览和时间轴 */}
          <section className="space-y-4">
            <div className="card">
              <PreviewCanvas />
            </div>
            <div className="card">
              <Timeline />
            </div>
          </section>

          {/* 右侧：控制面板和导出 */}
          <aside className="space-y-4">
            <div className="card">
              <ControlsPanel />
            </div>
            <div className="card">
              <ExportPanel />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
