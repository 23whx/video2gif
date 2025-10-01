# Video2GIF 项目文档（v2）

> 技术栈：**Astro + React + Tailwind CSS**（多平台 Web / PWA），可扩展到桌面（Tauri/Electron）与移动壳（Capacitor）。

---

## 1. 项目概述 / Overview / 概要
**中文**：Video2GIF 是一款跨平台的视频转 GIF 工具网站，支持导入几乎所有常见视频格式，内置裁剪、截帧、压缩与画质优化，主色为白色，背景以淡绿色为主，关键操作与提示使用淡红色强调，并支持中英日三语言切换。

**English**: Video2GIF is a cross‑platform video‑to‑GIF web app. It accepts almost all common video formats, provides trimming, frame picking, compression, and quality tuning, uses a white primary surface with a soft green background and soft red accents, and supports Chinese/English/Japanese language switching.

**日本語**：Video2GIF はマルチプラットフォーム対応の動画→GIF 変換 Web アプリです。主要な動画形式のインポートに対応し、トリミング・フレーム選択・圧縮・画質調整を提供。配色は**白基調**、背景は**淡い緑**、重要箇所は**淡い赤**で強調。中・英・日の3言語切替をサポートします。

**目标用户 / Target Users**：内容创作者、设计与产品团队、社媒运营、教育从业者、开发者、一般用户。

**核心价值 / Value Props**：
- 本地浏览器端处理（隐私友好，无需上传原视频）
- 快速、可控的体积与质量（预设 + 高级参数）
- 一键分享（复制到剪贴板 / 下载 / 拖拽导出）

---

## 2. 需求与范围 / Requirements & Scope
**Must‑have**
1. 多语言 UI（中/英/日）及语言切换控件。
2. 支持导入主流视频格式：mp4, mov, avi, mkv, webm, mpeg, flv, mts, m2ts, 3gp 等（通过 **ffmpeg.wasm** 解析转换）。
3. 基础编辑：时间轴裁剪、尺寸缩放、帧率调整、循环方式（forward/reverse/yo‑yo）、画质与调色（亮度/对比/饱和度）。
4. 输出：GIF（支持调色板优化、抖动）、可选 MP4/WebM 预览；导出尺寸/帧率/颜色数可调。
5. PWA：可安装、离线使用（基本页面与最近使用的预设缓存）。
6. 主题与配色符合规范：白色为主、淡绿色背景、淡红色强调。

**Nice‑to‑have**
- 文本/贴纸/表情图层、关键帧滤镜
- 画面裁切（裁剪到指定比例）与水印
- 批量转换、队列处理
- 桌面端封装（Tauri）与移动端封装（Capacitor）

**Non‑goals（首发不做）**
- 云端渲染农场、多人协作编辑、账号系统

---

## 3. 架构设计 / Architecture
- **前端框架**：Astro（文件路由、静态输出 + 部分岛屿交互），React 作为交互组件层。
- **样式**：Tailwind CSS + 自定义设计令牌（颜色、阴影、圆角）。
- **媒体处理**：`ffmpeg.wasm` + `Web Worker`（避免主线程卡顿）；大文件可选降级到后端微服务（Node.js + FFmpeg 原生二进制，K8s 可水平扩展）。
- **状态管理**：Zustand（轻量）、URL 同步（查询参数保存预设）。
- **国际化**：i18next（前端 JSON 文案包 + 语言检测 + 切换）。
- **PWA**：Workbox 生成 Service Worker；静态资源缓存 + 预设缓存；Manifest 支持安装。
- **可观测性**：Sentry（前端错误）、简单事件埋点（转换开始/完成/失败）。

**数据流**：
上传视频 → Worker 初始化 ffmpeg → 解封装/转码 → 生成预览（低帧率或短片段）→ 参数调优 → 导出 GIF（并生成大小/耗时报告）。

---

## 4. 页面与路由 / Pages & Routes
- `/` 主页：拖拽/选择文件、最近预设、示例视频；语言切换；主题说明。
- `/editor` 编辑器：时间轴、画布预览、参数侧栏、导出面板。
- `/about` 关于与隐私说明、离线支持说明、开源许可（如采用）。
- `/support` 常见问题与反馈表单。

---

## 5. UI/UX 规范 / UI & UX Guidelines
**配色（Tailwind 令牌）**
- **Base / Surface（白色为主）**：`--bg-surface: #FFFFFF;`、文本 `#0F172A`（slate-900）
- **背景（淡绿色）**：建议 `#E8F5E9`（mint/green-50 区间），渐变可从 `#E8F5E9`→`#F1FAF1`
- **强调（淡红色）**：建议 `#FCA5A5`（red-300 区间）用于主按钮、进度条高亮、危险操作提示。
- 辅助中性色：`#94A3B8`（slate-400）用于次级文本。

**组件风格**：
- 圆角 `rounded-2xl`，柔和阴影 `shadow-lg/soft`，适度留白 `p-4`/`p-6`。
- 交互：悬停放大 `hover:scale-[1.01]`、焦点可视环 `focus-visible:ring-red-300`。

**关键组件**
1. **UploadDropzone**（支持拖拽/点击、显示受支持格式与大小提示）
2. **Timeline**（缩略帧、入点/出点、拖拽手柄）
3. **PreviewCanvas**（实时预览、缩放、网格）
4. **ControlsPanel**（尺寸、帧率、循环、调色、颜色数/抖动）
5. **ExportPanel**（目标大小估算、质量滑杆、导出按钮、进度/日志）
6. **LangSwitcher**（中/英/日）
7. **ThemeTokens**（颜色/阴影统一）

**交互流**
- 选择/拖拽视频 → 自动生成 3–5 秒低帧率预览 → 调整参数 → 一键导出 → 下载或复制到剪贴板。

**可访问性**
- 对比度 AA；键盘全操作；`aria-live` 报告导出进度；动画可减弱（尊重 `prefers-reduced-motion`）。

---

## 6. 国际化（中/英/日）/ i18n
- 库：`i18next` + `react-i18next`，资源文件 `locales/{zh,en,ja}.json`。
- 语言检测：优先顺序 = 用户显式选择（localStorage）> URL `?lang=` > 浏览器语言。
- 文案组织：按页面与模块分区。示例：
```json
// locales/zh.json（节选）
{
  "app": {"name": "Video2GIF"},
  "nav": {"home": "首页", "editor": "编辑器", "about": "关于"},
  "upload": {"title": "导入视频", "hint": "拖拽或点击选择，支持多种格式"},
  "export": {"action": "导出 GIF", "est": "预计大小"}
}
```

**多语言 UI 文案对照（关键项）**
- 导入视频：CN「导入视频」/ EN "Import Video" / JP「動画をインポート」
- 导出 GIF：CN「导出 GIF」/ EN "Export GIF" / JP「GIF を書き出す」
- 质量：CN「质量」/ EN "Quality" / JP「品質」
- 帧率：CN「帧率」/ EN "FPS" / JP「フレームレート」
- 语言：CN「语言」/ EN "Language" / JP「言語」

---

## 7. 媒体与格式支持 / Media & Formats
- 通过 **ffmpeg.wasm** 支持的容器与编码：H.264/H.265（若浏览器许可，H.265 可能需服务端）、VP8/VP9、AV1（试验性）、MPEG‑2、Theora；容器：MP4/MOV/MKV/AVI/WEBM/FLV/MPEG/TS/3GP 等。
- **性能建议**：
  - 优先使用解封装 + 直通像素 → GIF 编码；
  - 大于 200MB 的视频建议提示“试用服务端加速”（可选）；
  - 内存预算：ffmpeg.wasm 需 ~256–512MB；使用 `-r`（帧率）、`-s`（尺寸）先行降采样可显著提速。
- **导出参数**：尺寸（最大边 1024px）、FPS（1–30）、颜色数（2–256）、抖动（Floyd‑Steinberg/Ordered/None）、循环（∞/N）。

---

## 8. 性能与稳定性 / Performance
- Web Worker 独立线程，主线程仅负责 UI；
- 分块读取（`Blob.slice` + `readable streams`）；
- 预览采用片段编码（首 3–5 秒）与低 FPS；
- 使用 `OffscreenCanvas`（可用时）做预处理；
- 缓存：wasm 核心文件与最近使用的 presets 缓存到 Cache Storage；
- 失败恢复：导出失败时保留参数，允许一键重试并上报日志。

---

## 9. 设计系统 / Tailwind 配置
```ts
// tailwind.config.ts（节选）
import type { Config } from 'tailwindcss'
export default {
  content: ["./src/**/*.{astro,ts,tsx,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FFFFFF",
        bg: "#E8F5E9",       // 淡绿色背景
        accent: "#FCA5A5",   // 淡红色强调
        ink: "#0F172A",
      },
      borderRadius: { 'xl2': '1.25rem' },
      boxShadow: { soft: '0 8px 24px rgba(0,0,0,0.08)' },
    },
  },
  plugins: [],
} satisfies Config
```

**主题使用示例（React 片段）**
```tsx
<button className="rounded-2xl bg-accent text-surface px-4 py-2 shadow-soft hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent">导出 GIF</button>
```

---

## 10. 关键技术实现 / Key Implementations
1. **ffmpeg.wasm 初始化**：懒加载 + 进度条；CDN 回源失败时本地备份。
2. **Worker 通讯**：`postMessage` 传递 ArrayBuffer，避免拷贝（`transferable`）。
3. **进度与估算**：解析 ffmpeg 日志（`-progress pipe:1` 或 stderr 解析）动态估算体积与耗时。
4. **剪裁与帧率**：`-ss` / `-to` / `-vf scale=f=min(iw\,ih)`: 保障等比缩放与最大边限制。
5. **GIF 优化**：`palettegen` + `paletteuse`；抖动算法切换；循环控制 `-loop`。

---

## 11. 隐私与合规 / Privacy
- 默认本地浏览器端转码，不上传源视频；
- 若用户选择“服务端加速”，明确提示临时存储与自动清理策略（如 24 小时内清除）；
- 不收集内容数据，仅收集匿名性能指标与错误日志；
- 提供开源第三方许可清单（FFmpeg、wasm 库等）。

---

## 12. 测试计划 / Testing
- 单元测试：参数计算、时间轴与预览同步、i18n 切换。
- 端到端：导入→裁剪→导出全流程（Cypress/Playwright）。
- 浏览器矩阵：Chromium/Firefox/Safari（桌面+移动）。
- 大文件与极端参数（超长/高分辨率/高帧率）。

---

## 13. 发布与运维 / Release & Ops
- 构建：`astro build`，产物静态托管（Vercel/Netlify/Cloudflare Pages）。
- 版本节奏：Beta（公开测试）→ v1.0。变更记录与回滚预案。
- 监控：可用率、平均导出时长、失败率、PWA 安装数。

---

## 14. 里程碑 / Milestones
- **M1（2 周）**：UI 骨架 + i18n + 主题与色板；基础上传与预览。
- **M2（2–3 周）**：ffmpeg.wasm 集成、裁剪/帧率/尺寸、GIF 导出。
- **M3（1–2 周）**：PWA、错误上报、FAQ/支持页、性能优化。
- **M4（可选）**：服务端加速、批量处理、桌面/移动壳封装。

---

## 15. 骨架代码（Astro + React 结构示意）
```txt
src/
  pages/
    index.astro        # 主页（上传、最近预设、语言切换）
    editor.astro       # 编辑器（挂载 React EditorApp）
    about.astro
    support.astro
  components/
    LangSwitcher.tsx
    UploadDropzone.tsx
    EditorApp.tsx
    Timeline.tsx
    ControlsPanel.tsx
    PreviewCanvas.tsx
    ExportPanel.tsx
  workers/
    ffmpeg.worker.ts   # 与 ffmpeg.wasm 通讯
  locales/
    zh.json
    en.json
    ja.json
```

**EditorApp 片段（TypeScript）**
```tsx
export default function EditorApp(){
  // Zustand 状态、i18n、参数管理...
  return (
    <div className="min-h-screen bg-bg text-ink">
      <main className="container mx-auto p-4 grid gap-4 md:grid-cols-[1fr_320px]">
        <section className="rounded-2xl bg-surface p-4 shadow-soft">
          {/* PreviewCanvas & Timeline */}
        </section>
        <aside className="rounded-2xl bg-surface p-4 shadow-soft">
          {/* ControlsPanel & ExportPanel */}
        </aside>
      </main>
    </div>
  )
}
```

---

## 16. 文案与品牌 / Copy & Brand
- Logo：简洁字标「Video2GIF」，弱阴影，淡红色点缀。
- 标语：
  - CN：**把精彩瞬间，做成轻盈 GIF。**
  - EN: **Turn moments into lightweight GIFs.**
  - JP: **瞬間を、軽やかな GIF に。**

---

## 17. 风险与对策 / Risks
- wasm 编码性能不足 → 提供“服务端加速”与分辨率/帧率预降级建议。
- Safari 兼容性 → 降级路径与功能提示（禁用某些滤镜、引导导出参数）。
- 大文件内存占用 → 分段处理与临时文件释放，必要时强制片段导出。

---

## 18. 验收标准 / Acceptance Criteria
- 不安装任何原生应用即可在主流浏览器完成一次成功的**视频→GIF 导出**。
- 多语言在任一页面可即时切换并持久化。
- UI 配色满足白/淡绿/淡红的品牌要求，关键操作以淡红色强调。
- 100MB、1080p、30fps 的 MP4 在桌面 Chrome 可在合理时间内导出 5 秒 GIF（≤30s，示例参数：最长边 720、颜色数≤128、FS 抖动）。

## 19. 作者的联系方式 / Contact information for the author
- 在导航栏和首页底部注脚放上作者的联系方式。
- email：wanghongxiang23@gmail.com
- X：@Rollkey4
