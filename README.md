# Video2GIF

> 把精彩瞬间，做成轻盈 GIF / Turn moments into lightweight GIFs / 瞬間を、軽やかな GIF に

一款基于 Astro + React + Tailwind CSS 的跨平台视频转 GIF 工具，支持本地浏览器端处理，保护您的隐私。

## ✨ 特性

- 🔒 **本地处理，隐私友好** - 所有转换在浏览器本地完成，无需上传视频
- ⚡ **快速可控** - 灵活调整体积与质量，满足不同需求
- 📤 **一键分享** - 下载或复制到剪贴板，轻松分享
- 🌐 **多语言支持** - 支持中文、英文、日文三语言切换
- 📱 **PWA 支持** - 可安装到设备，离线使用
- 🎨 **现代化设计** - 白色主色调 + 淡绿色背景 + 淡红色强调

## 🎬 支持的视频格式

MP4, MOV, AVI, MKV, WebM, MPEG, FLV, MTS, M2TS, 3GP 等几乎所有常见视频格式

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:4321` 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🛠️ 技术栈

- **前端框架**: Astro (静态站点生成器)
- **UI 库**: React 18
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **国际化**: i18next + react-i18next
- **视频处理**: FFmpeg.wasm
- **PWA**: Workbox

## 📁 项目结构

```
video2gif/
├── src/
│   ├── components/       # React 组件
│   │   ├── LangSwitcher.tsx
│   │   ├── UploadDropzone.tsx
│   │   ├── EditorApp.tsx
│   │   ├── Timeline.tsx
│   │   ├── ControlsPanel.tsx
│   │   ├── PreviewCanvas.tsx
│   │   ├── ExportPanel.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── pages/           # Astro 页面
│   │   ├── index.astro  # 首页
│   │   ├── editor.astro # 编辑器
│   │   ├── about.astro  # 关于
│   │   └── support.astro # 支持
│   ├── stores/          # Zustand 状态管理
│   │   └── editorStore.ts
│   ├── i18n/            # 国际化
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── zh.json
│   │       ├── en.json
│   │       └── ja.json
│   ├── workers/         # Web Workers
│   │   └── ffmpeg.worker.ts
│   ├── utils/           # 工具函数
│   │   └── formatters.ts
│   └── styles/          # 全局样式
│       └── global.css
├── public/              # 静态资源
│   ├── manifest.json
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 设计系统

### 配色方案

- **主表面**: `#FFFFFF` (白色)
- **背景**: `#E8F5E9` (淡绿色)
- **强调色**: `#E95656` (淡红色)
- **文本**: `#0F172A` (深灰)
- **次级文本**: `#94A3B8` (浅灰)

### 设计原则

- 圆角 `rounded-2xl` 柔和视觉
- 阴影 `shadow-soft` 增加层次感
- 适度留白 `p-4`/`p-6`
- 悬停放大 `hover:scale-[1.01]`
- 焦点可视环 `focus-visible:ring-accent`

## 🌐 国际化

支持以下语言：

- 🇨🇳 中文（简体）
- 🇺🇸 English
- 🇯🇵 日本語

语言偏好会自动保存到 localStorage，下次访问时自动应用。

## 📱 PWA 特性

- ✅ 可安装到设备主屏幕
- ✅ 离线可用
- ✅ 快速启动
- ✅ 原生应用般的体验

## 🔐 隐私政策

Video2GIF 默认在浏览器本地进行视频转换，不会上传您的源视频到任何服务器。我们不收集任何内容数据，仅收集匿名性能指标和错误日志以改进产品。

## 📄 开源许可

本项目使用了以下优秀的开源项目：

- FFmpeg - LGPL 2.1+
- ffmpeg.wasm - LGPL 2.1+
- Astro - MIT
- React - MIT
- Tailwind CSS - MIT
- i18next - MIT
- Zustand - MIT

## 👨‍💻 作者

- **邮箱**: wanghongxiang23@gmail.com
- **Twitter/X**: [@Rollkey4](https://x.com/Rollkey4)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 待办事项

- [ ] 完整实现 FFmpeg.wasm 集成
- [ ] 添加更多导出格式（MP4, WebM）
- [ ] 批量转换功能
- [ ] 文本/贴纸图层
- [ ] 桌面端封装（Tauri）
- [ ] 移动端封装（Capacitor）

## 📊 里程碑

- **M1** ✅ UI 骨架 + i18n + 主题与色板
- **M2** 🚧 ffmpeg.wasm 集成、裁剪/帧率/尺寸、GIF 导出
- **M3** ⏳ PWA、错误上报、性能优化
- **M4** ⏳ 服务端加速、批量处理、桌面/移动壳封装

---

Made with ❤️ by [@Rollkey4](https://x.com/Rollkey4)

