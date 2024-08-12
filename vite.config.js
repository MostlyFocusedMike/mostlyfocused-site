import { join, extname, resolve } from 'path'
import { defineConfig } from 'vite'
import articles from './src/json-data/articles.json'
import fs from 'fs'

const prettyUrlHandler = (options) => (req, res, next) => {
  if (req.originalUrl === '/') return next();

  // Handle  /page/article => /page/article.html
  const maybeHtmlPath = join(options.rootDir, `${req.originalUrl}.html`);
  const htmlFileExists = fs.existsSync(maybeHtmlPath);
  if (!extname(req.originalUrl) && htmlFileExists) {
    req.url += '.html';
    return next();
  }

  // handle /page/some_dir => /page/some_dir/ (the trailing slash gets added)
  const maybeIndexPath = join(options.rootDir, `${req.originalUrl}/index.html`)
  const indexFileExists = fs.existsSync(maybeIndexPath);
  if (!extname(req.originalUrl) && indexFileExists) req.url += '/'

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
        catCalculator: resolve(__dirname, '/projects/cat_breed_calculator/index.html'),
      },
    },
  },
  plugins: [
    HtmlExtFallbackPlugin({ rootDir: __dirname })
  ]
};

export default defineConfig(opts)