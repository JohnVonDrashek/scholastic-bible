import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://johnvondrashek.github.io',
  base: '/scholastic-bible/',
  outDir: '../output',
  build: {
    assets: 'assets'
  }
});
