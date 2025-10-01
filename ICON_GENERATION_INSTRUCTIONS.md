# 📱 图标生成说明

## 当前状态

项目图标文件已被移除，需要生成真实的 PNG 图标。

## 🎨 生成图标的方法

### 方法 1: 使用图标生成器（推荐）

1. **启动开发服务器**:
```bash
npm run dev
```

2. **访问图标生成器**:
```
http://localhost:4321/icon-generator.html
```

3. **下载图标**:
   - 点击 "下载 icon-512.png"
   - 点击 "下载 icon-192.png"
   - 点击 "下载 screenshot-1.png"

4. **保存到项目**:
   - 将下载的文件保存到 `public/` 目录
   - 文件名保持不变

### 方法 2: 使用在线工具

访问以下任一网站生成图标：

- https://realfavicongenerator.net/
- https://www.favicon-generator.org/
- https://favicon.io/

使用项目的 SVG 图标（`public/icon.svg`）作为源文件。

### 方法 3: 手动创建

如果你有设计工具（Photoshop, Figma, etc.）：

1. 创建 512×512px 的图标
2. 导出为 PNG 格式
3. 保存为 `icon-512.png`
4. 创建 192×192px 版本，保存为 `icon-192.png`

## 📋 需要的图标文件

```
public/
├── icon-192.png    (192×192 像素)
├── icon-512.png    (512×512 像素)
└── screenshot-1.png (1280×720 像素，可选)
```

## 🔄 恢复 PWA 功能

图标生成后，更新 `public/manifest.json`:

```json
{
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## ⚠️ 临时解决方案

如果暂时不需要 PWA 功能，当前的 manifest.json 已配置为不使用图标，这样可以避免控制台错误。

## 🎯 设计规范

图标应遵循以下设计规范：

- **主色调**: 淡绿色背景 (#E8F5E9)
- **强调色**: 红色 (#E95656)
- **图标内容**: 视频胶片 + 箭头 + GIF 标签
- **风格**: 简洁、现代、扁平化

参考 `public/icon.svg` 查看完整设计。

---

**注意**: 在生成图标之前，应用可以正常使用，只是无法作为 PWA 安装。

