import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        bg: '#E8F5E9',       // 淡绿色背景
        accent: '#E95656',   // 淡红色强调
        ink: '#0F172A',
        secondary: '#94A3B8', // 次级文本
      },
      borderRadius: {
        'xl2': '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;

