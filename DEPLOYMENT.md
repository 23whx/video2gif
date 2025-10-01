# 部署指南 / Deployment Guide

本指南介绍如何将 Video2GIF 部署到各种平台。

## 📦 构建项目

在部署之前，先构建项目：

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 🚀 部署平台

### Vercel（推荐）

Vercel 提供了最佳的 Astro 支持和性能。

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 部署：
```bash
vercel
```

3. 或者通过 Vercel 网站导入 GitHub 仓库自动部署

**配置文件** (`vercel.json`)：
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Netlify

1. 安装 Netlify CLI：
```bash
npm install -g netlify-cli
```

2. 部署：
```bash
netlify deploy --prod
```

3. 或者通过 Netlify 网站导入 GitHub 仓库

**配置文件** (`netlify.toml`)：
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Content-Type = "application/manifest+json"
```

### Cloudflare Pages

1. 通过 Cloudflare Pages 网站导入 GitHub 仓库

2. 构建设置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
   - 环境变量：Node.js 版本 18+

### GitHub Pages

1. 修改 `astro.config.mjs` 添加 `site` 和 `base`：
```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/video2gif',
  // ... 其他配置
});
```

2. 使用 GitHub Actions 部署（`.github/workflows/deploy.yml`）：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 自托管服务器

使用 Nginx 或 Apache 托管静态文件：

**Nginx 配置示例**：
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/video2gif/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

## 🔧 环境变量

如果需要使用环境变量，创建 `.env` 文件：

```env
PUBLIC_SITE_URL=https://yourdomain.com
```

**注意**：Astro 只支持以 `PUBLIC_` 开头的环境变量在客户端使用。

## 📊 性能优化

### 1. 启用压缩

确保服务器启用了 Gzip 或 Brotli 压缩。

### 2. CDN

将静态资源托管到 CDN 以加快全球访问速度：
- Cloudflare CDN
- AWS CloudFront
- Azure CDN

### 3. 图片优化

使用 Astro 的图片优化功能：
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/image.png';
---

<Image src={myImage} alt="Description" />
```

## 🔍 监控

### Sentry（错误监控）

1. 安装 Sentry SDK：
```bash
npm install @sentry/astro
```

2. 配置 Sentry：
```js
// astro.config.mjs
import sentry from '@sentry/astro';

export default defineConfig({
  integrations: [
    sentry({
      dsn: 'your-sentry-dsn',
      environment: 'production',
    }),
  ],
});
```

### Google Analytics（可选）

在 `Layout.astro` 中添加 GA 脚本：
```astro
{import.meta.env.PROD && (
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
)}
```

## ✅ 部署检查清单

- [ ] 运行 `npm run build` 确保构建成功
- [ ] 测试构建产物 `npm run preview`
- [ ] 更新 `manifest.json` 中的应用信息
- [ ] 替换图标文件（icon-192.png, icon-512.png）
- [ ] 配置自定义域名（如果需要）
- [ ] 设置 HTTPS
- [ ] 配置 PWA 缓存策略
- [ ] 添加错误监控（Sentry）
- [ ] 测试多语言功能
- [ ] 测试 PWA 安装
- [ ] 测试离线功能
- [ ] 移动端兼容性测试
- [ ] 性能测试（Lighthouse）

## 🐛 常见问题

### Q: 部署后页面空白？

A: 检查 `base` 配置是否正确，特别是在 GitHub Pages 等子路径部署时。

### Q: 静态资源 404？

A: 确保 `astro.config.mjs` 中的 `site` 和 `base` 配置正确。

### Q: PWA 不工作？

A: 检查 `manifest.json` 路径是否正确，HTTPS 是否启用。

---

如有其他问题，请参考 [Astro 官方文档](https://docs.astro.build/en/guides/deploy/) 或提交 Issue。

