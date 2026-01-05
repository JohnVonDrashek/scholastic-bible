import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bible.vondrashek.com',
  base: '/',
  outDir: '../output',
  build: {
    assets: 'assets',
    format: 'directory'
  },
  trailingSlash: 'always'
});
