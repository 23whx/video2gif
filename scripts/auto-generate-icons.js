#!/usr/bin/env node

/**
 * 自动图标生成脚本
 * 从 favicon.webp 和 icon.webp 自动生成所有需要的图标格式
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

console.log('🎨 Video2GIF 自动图标生成器\n');

// 检查源文件
const faviconSource = join(publicDir, 'favicon.webp');
const iconSource = join(publicDir, 'icon.webp');

if (!existsSync(faviconSource)) {
  console.error('❌ 找不到源文件: favicon.webp');
  process.exit(1);
}

if (!existsSync(iconSource)) {
  console.error('❌ 找不到源文件: icon.webp');
  process.exit(1);
}

console.log('✅ 源文件检查通过\n');
console.log('📦 开始生成图标...\n');

// 生成图标的配置
const iconConfigs = [
  // Favicon 系列（从 favicon.webp 生成）
  { source: faviconSource, output: 'favicon-16x16.png', size: 16, format: 'png' },
  { source: faviconSource, output: 'favicon-32x32.png', size: 32, format: 'png' },
  { source: faviconSource, output: 'favicon.ico', size: 32, format: 'png' }, // ICO 用 PNG 代替
  
  // 大图标系列（从 icon.webp 生成）
  { source: iconSource, output: 'apple-touch-icon.png', size: 180, format: 'png' },
  { source: iconSource, output: 'icon-192x192.png', size: 192, format: 'png' },
  { source: iconSource, output: 'icon-512x512.png', size: 512, format: 'png' },
];

// 生成图标函数
async function generateIcon(config) {
  try {
    const outputPath = join(publicDir, config.output);
    
    await sharp(config.source)
      .resize(config.size, config.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // 透明背景
      })
      .toFormat(config.format, {
        quality: 100,
        compressionLevel: 9
      })
      .toFile(outputPath);
    
    console.log(`  ✅ ${config.output} (${config.size}x${config.size})`);
    return true;
  } catch (error) {
    console.error(`  ❌ ${config.output} - 失败: ${error.message}`);
    return false;
  }
}

// 生成所有图标
async function generateAllIcons() {
  let successCount = 0;
  let failCount = 0;
  
  for (const config of iconConfigs) {
    const success = await generateIcon(config);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ 成功: ${successCount} 个图标`);
  if (failCount > 0) {
    console.log(`❌ 失败: ${failCount} 个图标`);
  }
  console.log('='.repeat(50) + '\n');
  
  if (failCount === 0) {
    console.log('🎉 所有图标生成完成！\n');
    console.log('📋 生成的图标列表：');
    console.log('  - favicon.ico (传统浏览器)');
    console.log('  - favicon-16x16.png (小图标)');
    console.log('  - favicon-32x32.png (标准图标)');
    console.log('  - apple-touch-icon.png (iOS 设备)');
    console.log('  - icon-192x192.png (PWA 小图标)');
    console.log('  - icon-512x512.png (PWA 大图标)\n');
    
    console.log('🚀 下一步：');
    console.log('  1. 运行 npm run build 构建项目');
    console.log('  2. 部署到生产环境');
    console.log('  3. 验证图标: npm run icons:check');
    console.log('  4. 等待导航站更新（通常 24-48 小时）\n');
    
    return true;
  } else {
    console.log('⚠️  部分图标生成失败，请检查错误信息\n');
    return false;
  }
}

// 执行生成
generateAllIcons()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ 生成过程出错:', error);
    process.exit(1);
  });

