import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'copy-static-assets',
      apply: 'build',
      closeBundle() {
        for (const pasta of ['img', 'favicon_io']) {
          const origem = resolve('assets', pasta);
          cpSync(origem, resolve('dist/assets', pasta), { recursive: true });
        }
      },
    },
  ],
});
