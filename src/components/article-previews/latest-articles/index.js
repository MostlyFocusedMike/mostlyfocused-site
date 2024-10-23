import { publishOrder } from '../../../json-data/articles.json';
import './styles.css';

export const LATESTS_ARTICLES = 'latest-articles';
export const ARTICLE_NAMES = 'article_names';

export default class LatestArticles extends HTMLElement {
  connectedCallback() {
    const currentArticle =  location.pathname.replace('/pages/articles/', '');
    const articleNames = publishOrder.slice(0, 4)
      .filter(name => name !== currentArticle).slice(0, 3).join(',');

    this.innerHTML = /*html*/`
      <section id="latest-articles" aria-labelledby="latest-heading">
        <h2 id="latest-heading">Latest Articles</h2>
        <div id="background">
          <article-card-list articles='${articleNames}'></article-card-list>
          <a id="all-articles" class="basic-link" href="/pages/articles/">See more articles</a>
        </div>
      </section>`;
  }
}
