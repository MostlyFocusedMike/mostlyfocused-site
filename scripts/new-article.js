import fs from 'fs';
import path from 'path';
import { input } from '@inquirer/prompts';
import { fileURLToPath } from 'url';

const makeTitle = (str) => str.split(' ')
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(' ');

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the template file
let template = fs.readFileSync(path.join(__dirname, 'blank_article.html'), 'utf8');

const answers = {
  id: await input({ message: "What's the id?" }),
  title: await input({ message: "What's the title?" }),
  subtitle: await input({ message: "What's the subtitle?" }),
  description: await input({ message: "What's the description?" }),
  topics: await input({ message: "What are the topics (comma separate)" }),
};

const topicTags = answers.topics.trim()
  .split(',')
  .map(topic => /*html*/`<meta property="article:tag" content="${topic}" />`)
  .join('\n\t')

const id = answers.id.trim().replace(/\s/g, '_');

template = template.replace(/\[PAGE\]/g, id)
  .replace(/\[TITLE\]/g, makeTitle(answers.title.trim()))
  .replace(/\[SUBTITLE\]/g, answers.subtitle.trim())
  .replace(/\[DESCRIPTION\]/g, answers.description.trim())
  .replace(/\[TIME\]/g, new Date().toISOString())
  .replace(/\[TOPICS\]/g, topicTags);

// Create the output file
const outputPath = path.join(__dirname, '..', 'pages', 'articles', `${id}.html`);
fs.writeFileSync(outputPath, template);

// Create the images directory
const imagesPath = path.join(__dirname, '..', 'public', 'images', id);
fs.mkdirSync(imagesPath, { recursive: true });

console.log(`Article created successfully: ${outputPath}`);