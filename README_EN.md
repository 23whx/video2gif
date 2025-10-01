# Video2GIF

> Turn moments into lightweight GIFs

A cross-platform video-to-GIF tool built with Astro + React + Tailwind CSS. All processing happens locally in your browser to protect your privacy.

## ✨ Features

- 🔒 **Local Processing** - All conversions happen in your browser, no upload required
- ⚡ **Fast & Controllable** - Flexibly adjust size and quality to meet different needs
- 📤 **One-Click Sharing** - Download or copy to clipboard for easy sharing
- 🌐 **Multi-language** - Supports Chinese, English, and Japanese
- 📱 **PWA Support** - Install on your device, use offline
- 🎨 **Modern Design** - White primary + soft green background + soft red accents (#E95656)

## 🎬 Supported Formats

MP4, MOV, AVI, MKV, WebM, MPEG, FLV, MTS, M2TS, 3GP, and almost all common video formats

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

Visit `http://localhost:4321` to see the app

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework**: Astro (Static Site Generator)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **i18n**: i18next + react-i18next
- **Video Processing**: FFmpeg.wasm
- **PWA**: Workbox

## 🌐 Internationalization

Supported languages:

- 🇨🇳 中文（简体）
- 🇺🇸 English
- 🇯🇵 日本語

Language preferences are automatically saved to localStorage and applied on next visit.

## 🔐 Privacy Policy

Video2GIF processes videos locally in your browser by default and does not upload your source videos to any server. We do not collect any content data, only anonymous performance metrics and error logs to improve the product.

## 👨‍💻 Author

- **Email**: wanghongxiang23@gmail.com
- **Twitter/X**: [@Rollkey4](https://x.com/Rollkey4)

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

Made with ❤️ by [@Rollkey4](https://x.com/Rollkey4)

