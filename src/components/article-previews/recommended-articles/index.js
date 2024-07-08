import './styles.css';

export const RECOMMENDED_ARTICLES = 'recommended-articles';
export const ARTICLE_NAMES = 'article_names';

export default class RecommendedArticles extends HTMLElement {
  get article_names() { return this.getAttribute(ARTICLE_NAMES) }

  connectedCallback() {
    this.innerHTML = /*html*/`
      <section id="recommended-articles" aria-labelledby="recommended-heading">
        <h2 id="recommended-heading">Recommended Articles</h2>
        <div id="background">
          <article-card-list articles='${this.article_names}'></article-card-list>
          <a id="all-articles" class="basic-link" href="/pages/articles/index.html">See more articles</a>
        </div>
      </section>`;
  }
}
