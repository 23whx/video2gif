# 快速开始指南

欢迎使用 Video2GIF！本指南将帮助您快速启动项目。

## 📋 前置要求

- Node.js 18.0 或更高版本
- npm 或 pnpm 或 yarn

## 🚀 安装步骤

### 1. 安装依赖

```bash
npm install
```

或使用 pnpm（更快）：
```bash
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

这将启动一个本地开发服务器，通常在 `http://localhost:4321`

### 3. 在浏览器中打开

打开浏览器访问 `http://localhost:4321`，您应该能看到 Video2GIF 的首页。

## 🎯 快速体验

1. **导航到编辑器**
   - 点击首页的"开始使用"按钮
   - 或直接访问 `/editor` 路径

2. **上传视频**
   - 拖拽视频文件到上传区域
   - 或点击选择文件

3. **编辑参数**
   - 调整时间轴裁剪视频片段
   - 修改尺寸、帧率、颜色数等参数
   - 使用滑块调整亮度、对比度、饱和度

4. **导出 GIF**
   - 点击"导出 GIF"按钮
   - 等待处理完成
   - 下载或复制到剪贴板

## 🌐 切换语言

点击右上角的语言切换器，可以在中文、英文、日文之间切换。

## 📱 PWA 安装

在支持的浏览器中（Chrome、Edge、Safari 等），您会看到安装提示：

1. 点击地址栏的安装图标
2. 或在浏览器菜单中选择"安装 Video2GIF"
3. 安装后可以像原生应用一样使用

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 类型检查
npm run astro check
```

## 📁 项目结构概览

```
video2gif/
├── src/
│   ├── pages/           # 页面文件（路由）
│   ├── components/      # React 组件
│   ├── stores/          # 状态管理
│   ├── i18n/            # 国际化
│   └── styles/          # 样式文件
├── public/              # 静态资源
└── package.json         # 项目配置
```

## 🎨 自定义配置

### 修改主题颜色

编辑 `tailwind.config.ts`：

```ts
colors: {
  surface: '#FFFFFF',    // 主表面
  bg: '#E8F5E9',         // 背景色
  accent: '#E95656',     // 强调色
  ink: '#0F172A',        // 文本色
}
```

### 添加新语言

1. 在 `src/i18n/locales/` 下创建新的语言文件
2. 在 `src/i18n/config.ts` 中注册新语言

## ❓ 常见问题

### Q: 端口 4321 已被占用？

修改启动命令使用其他端口：
```bash
npm run dev -- --port 3000
```

### Q: 热更新不工作？

尝试删除 `.astro` 和 `node_modules/.vite` 缓存目录，然后重新启动。

### Q: 构建失败？

1. 确保 Node.js 版本 >= 18
2. 删除 `node_modules` 和 `package-lock.json`
3. 重新运行 `npm install`

## 📚 下一步

- 阅读完整的 [README.md](./README.md)
- 查看 [部署指南](./DEPLOYMENT.md)
- 了解如何[贡献代码](./CONTRIBUTING.md)

## 💡 提示

- 建议使用 Chrome 或 Edge 浏览器以获得最佳体验
- 视频文件建议不超过 200MB
- GIF 帧率设置在 10-20 FPS 通常就足够了
- 使用时间轴精确裁剪所需片段可以显著减小文件大小

## 🆘 需要帮助？

- 📧 邮箱: wanghongxiang23@gmail.com
- 𝕏 Twitter: [@Rollkey4](https://x.com/Rollkey4)
- 💬 提交 Issue: [GitHub Issues](https://github.com/yourusername/video2gif/issues)

---

祝您使用愉快！🎉

