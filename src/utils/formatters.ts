/**
 * 格式化字节数为人类可读的格式
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 格式化秒数为 MM:SS 格式
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 估算 GIF 大小（粗略估算）
 */
export function estimateGifSize(
  width: number,
  height: number,
  fps: number,
  duration: number,
  colors: number
): number {
  // 这是一个粗略的估算公式
  const pixelCount = width * height;
  const frames = fps * duration;
  const bytesPerFrame = (pixelCount * Math.log2(colors)) / 8;
  return Math.round(frames * bytesPerFrame * 0.7); // 0.7 是压缩系数估算
}

