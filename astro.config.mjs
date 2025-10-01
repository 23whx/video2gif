import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // 站点 URL（用于生成 canonical URLs 和 sitemap）
  site: 'https://video2gif.com',
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    worker: {
      format: 'es',
    },
  },
});

