import { join, extname, resolve } from 'path'
import { defineConfig } from 'vite'
import articles from './src/json-data/articles.json'
import fs from 'fs'

const prettyUrlHandler = (options) => (req, res, next) => {
  if (req.originalUrl === '/') return next();

  const maybeHtmlPath = join(options.rootDir, `${req.originalUrl}.html`);
  const htmlFileExists = fs.existsSync(maybeHtmlPath);

  if (!extname(req.originalUrl) && htmlFileExists) req.url += '.html';
  next();
};

const HtmlExtFallbackPlugin = (options) => ({
  name: 'html-ext-fallback',
  configureServer(server) {
    server.middlewares.use(prettyUrlHandler(options))
  },
})

const createPageEntryPoints = () => {
  const setEntryPoints = (entryPoints, articleName, idx) => {
    entryPoints[`a${idx + 1}`] = `/pages/articles/${articleName}.html`;
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
  plugins: [
    HtmlExtFallbackPlugin({ rootDir: __dirname })
  ]
};

export default defineConfig(opts)