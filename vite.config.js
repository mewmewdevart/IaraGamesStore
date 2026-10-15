import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRoot = process.cwd();

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'copy-static-assets',
      apply: 'build',
      closeBundle() {
        cpSync(
          resolve(projectRoot, 'assets'),
          resolve(projectRoot, 'dist', 'assets'),
          { recursive: true },
        );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, 'index.html'),
        games: resolve(projectRoot, 'games.html'),
        login: resolve(projectRoot, 'login.html'),
        gameDetails: resolve(projectRoot, 'game-details.html'),
      },
    },
  },
});
