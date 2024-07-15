import { resolve } from 'path'
import { defineConfig } from 'vite'
import articles from './src/json-data/articles.json'


const createPageEntryPoints = () => {
  const setEntryPoints = (entryPoints, articleName, idx) => {
    entryPoints['a' + idx + 1] = `/pages/articles/${articleName}.html`;
    return entryPoints;
  };

  return articles.publishOrder.reduce(setEntryPoints, {})
}

const opts = {
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        a0: resolve(__dirname, '/pages/articles/index.html'),
        ...createPageEntryPoints(),
      },
    },
  },
};

export default defineConfig(opts)