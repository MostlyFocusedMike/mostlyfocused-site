import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';

const siteUrl = 'https://mostlyfocused.com';

const getTopics = (document, articleFileName) => {
  const topics = [...document.querySelectorAll('meta[property="article:tag"]')]
    .map(({ content }) => {
      topicSet.add(content)
      return content
    })
    .filter(Boolean);
  if (topics.length < 3) console.log(`ERR! ${articleFileName} has too few topics!`);
  return topics;
}

const scanForMissingProps = (articleMetadata, fileName) => {
  Object.keys(articleMetadata).forEach(key => {
    if ([NaN, undefined].includes(articleMetadata[key])) console.log(`ERR! ${fileName} missing: ${key}`);
  });
}

const getDataFromFile = (articleFileName) => {
  const html = readFileSync(`${articlesPath}/${articleFileName}`, 'utf-8');
  const { document } = (new JSDOM(html)).window

  const articleMetadata = {
    id: articleFileName.replace('.html', ''),
    title: document.querySelector('meta[property="og:title"]')?.content,
    description: document.querySelector('meta[name="description"]')?.content,
    relativeUrl: document.querySelector('meta[property="og:url"]')?.content.replace(siteUrl, ''),
    prettyUrl: document.querySelector('meta[property="og:url"]')?.content.replace(siteUrl, '').replace('.html', ''),
    image: document.querySelector('meta[property="og:image"]')?.content,
    level: Number(document.querySelector('meta[property="level"]')?.content),
    publishedAt: document.querySelector('meta[property="article:published_time"]')?.content,
    modifiedAt: document.querySelector('meta[property="article:modified_time"]')?.content,
  };
  articleMetadata.topics = getTopics(document);

  scanForMissingProps(articleMetadata, articleFileName)

  articlesData.articles[articleMetadata.id] = articleMetadata;
}

const articlesPath = './pages/articles'
const articlesData = { articles: {}, allTopics: [] };
const topicSet = new Set();

readdirSync(articlesPath)
  .filter(fileName => !['index.html', 'collections.html'].includes(fileName))
  .forEach(getDataFromFile);

articlesData.allTopics = [...topicSet].sort()
articlesData.publishOrder = Object.values(articlesData.articles)
  .toSorted((a,b) => new Date(a.publishedAt) - new Date(b.publishedAt))
  .map(({ id }) => id);

writeFileSync('./src/json-data/articles.json', JSON.stringify(articlesData, null, 2));

console.log('articlesData:', articlesData);

// how to check if file is dir or not
// console.log(file, lstatSync(articlesPath + '/' + file).isDirectory());