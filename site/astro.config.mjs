import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vondrashek.com',
  base: '/scholastic-bible/',
  outDir: '../output',
  build: {
    assets: 'assets',
    format: 'directory'
  },
  trailingSlash: 'always'
});
