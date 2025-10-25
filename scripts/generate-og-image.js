#!/usr/bin/env node

/**
 * 生成 Open Graph 分享图片
 * 用于社交媒体和导航站的预览图
 */

import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

console.log('🖼️  Open Graph 图片生成器\n');

async function generateOGImage() {
  try {
    const iconPath = join(publicDir, 'icon.webp');
    const outputPath = join(publicDir, 'og-image.png');
    
    // 创建 1200x630 的 OG 图片（标准尺寸）
    // 使用品牌色 #E8F5E9 作为背景
    const width = 1200;
    const height = 630;
    const iconSize = 300;
    
    // 创建背景
    const background = await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 232, g: 245, b: 233, alpha: 1 } // #E8F5E9
      }
    })
    .png()
    .toBuffer();
    
    // 加载并调整图标大小
    const icon = await sharp(iconPath)
      .resize(iconSize, iconSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();
    
    // 合成图片（图标居中）
    await sharp(background)
      .composite([{
        input: icon,
        top: Math.floor((height - iconSize) / 2),
        left: Math.floor((width - iconSize) / 2)
      }])
      .toFile(outputPath);
    
    console.log('✅ Open Graph 图片生成成功！');
    console.log(`   输出: ${outputPath}`);
    console.log(`   尺寸: ${width}x${height}px\n`);
    
    console.log('📝 提示：');
    console.log('   这是一个基础版本的 OG 图片（仅包含图标）');
    console.log('   你可以使用 Figma、Canva 等工具创建更精美的版本\n');
    
    console.log('🎨 建议的设计元素：');
    console.log('   - 添加 "Video2GIF" 文字标题');
    console.log('   - 添加副标题："视频转 GIF 工具"');
    console.log('   - 使用品牌色：#E8F5E9 (背景), #E95656 (强调色)');
    console.log('   - 可以添加应用截图或功能预览\n');
    
    return true;
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    return false;
  }
}

generateOGImage()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ 发生错误:', error);
    process.exit(1);
  });

