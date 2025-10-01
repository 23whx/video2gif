/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 可以在这里定义环境变量类型
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

