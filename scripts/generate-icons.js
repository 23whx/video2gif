#!/usr/bin/env node

/**
 * 图标生成脚本
 * 
 * 这个脚本提供了两种使用方式：
 * 1. 使用浏览器工具：访问 /generate-icons.html
 * 2. 使用在线工具：访问 https://realfavicongenerator.net/
 * 
 * 由于项目中没有图像处理库（如 sharp），
 * 此脚本用于提供使用指南和验证功能。
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

console.log('🎨 Video2GIF 图标生成助手\n');

// 检查源文件
const sourceFiles = [
  'favicon.webp',
  'icon.webp'
];

console.log('📁 检查源文件：');
sourceFiles.forEach(file => {
  const path = join(publicDir, file);
  const exists = existsSync(path);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// 检查生成的图标文件
const requiredIcons = [
  { name: 'favicon.ico', desc: '传统浏览器图标' },
  { name: 'favicon-16x16.png', desc: '16x16 PNG 图标' },
  { name: 'favicon-32x32.png', desc: '32x32 PNG 图标' },
  { name: 'apple-touch-icon.png', desc: 'Apple Touch 图标 (180x180)' },
  { name: 'icon-192x192.png', desc: 'PWA 图标 (192x192)' },
  { name: 'icon-512x512.png', desc: 'PWA 图标 (512x512)' }
];

console.log('\n🔍 检查生成的图标：');
let missingIcons = [];
requiredIcons.forEach(({ name, desc }) => {
  const path = join(publicDir, name);
  const exists = existsSync(path);
  console.log(`  ${exists ? '✅' : '⚠️ '} ${name} - ${desc}`);
  if (!exists) {
    missingIcons.push(name);
  }
});

if (missingIcons.length > 0) {
  console.log('\n⚠️  缺少以下图标文件：');
  missingIcons.forEach(icon => console.log(`   - ${icon}`));
  
  console.log('\n📝 生成图标的方法：\n');
  console.log('方法 1: 使用浏览器工具（推荐）');
  console.log('  1. 运行: npm run dev');
  console.log('  2. 访问: http://localhost:4321/generate-icons.html');
  console.log('  3. 点击"生成所有图标"并下载');
  console.log('  4. 将文件放入 public 文件夹\n');
  
  console.log('方法 2: 使用在线工具');
  console.log('  1. 访问: https://realfavicongenerator.net/');
  console.log('  2. 上传 public/icon.webp');
  console.log('  3. 下载生成的图标包');
  console.log('  4. 解压并放入 public 文件夹\n');
  
  console.log('方法 3: 手动使用图片编辑工具');
  console.log('  使用 Photoshop、GIMP 等工具调整图片尺寸');
  console.log('  并导出为对应尺寸的 PNG/ICO 格式\n');
  
  process.exit(1);
} else {
  console.log('\n✅ 所有图标文件都已就绪！');
  
  // 验证 manifest.json
  const manifestPath = join(publicDir, 'manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      console.log('\n📱 Manifest.json 配置：');
      console.log(`  名称: ${manifest.name}`);
      console.log(`  图标数量: ${manifest.icons?.length || 0}`);
      if (manifest.icons && manifest.icons.length > 0) {
        manifest.icons.forEach(icon => {
          console.log(`    - ${icon.src} (${icon.sizes})`);
        });
      }
    } catch (error) {
      console.log('  ⚠️  manifest.json 解析失败');
    }
  }
  
  console.log('\n🚀 下一步：');
  console.log('  1. 运行 npm run build 构建项目');
  console.log('  2. 部署到生产环境');
  console.log('  3. 使用 https://realfavicongenerator.net/favicon_checker 验证图标');
  console.log('  4. 等待导航站重新抓取（可能需要 24-48 小时）\n');
  
  process.exit(0);
}

