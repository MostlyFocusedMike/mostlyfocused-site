import { articles, allTopics } from '../../../json-data/articles.json'
import { TOPIC_CLASS } from '../article-card';
import { $m, $s } from '../../utils';
import './styles.css';

export const ARTICLE_CARDS = 'article-card-list';
export const TOPICS = 'topics';

export default class ArticleCardList extends HTMLElement {
  static observedAttributes = [TOPICS]

  get isInteractive() { return this.hasAttribute('is_interactive') }
  get topics() { return this.getAttribute(TOPICS) ?? allTopics.join(',') }
  set topics(newTopics) { this.setAttribute(TOPICS, newTopics) }
  get articles() { return this.getAttribute('articles') ?? Object.keys(articles).join(',')}

  connectedCallback() {
    this.render(this.filterArticles);
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;

    if (property === TOPICS) this.filterArticles();
  }

  filterArticles = () => {
    const topicSet = new Set(this.topics.split(','));
    const articleSet = new Set(this.articles.split(','));
    const articleCards = this.querySelectorAll("article-card")

    articleCards.forEach(articleCard => {
      const hasArticle = articleSet.has(articleCard.id);
      const hasTopic = [...articleCard.getElementsByClassName(TOPIC_CLASS)]
        .some(topic => topicSet.has(topic.textContent.replace(',', '')));

      articleCard.parentElement.style.display = hasTopic && hasArticle? 'block' : 'none';
  })
}

  render(afterBrowserRendersWebComponentsCallback) {
    // TODO add published at date and allow for sorting by date or listed articles
    const sortedArticles = Object.values(articles);
    this.innerHTML = /*html*/`<ul class="flex-list">
      ${$m(sortedArticles, (article) => /*html*/`<li>
        <article-card
          id='${article.id}'
          article='${$s(article)}'
          ${this.isInteractive ? 'is_interactive' : ''}
        ></article-card>
      </li>`)}
    </ul>`;

    requestAnimationFrame(afterBrowserRendersWebComponentsCallback);
  }
}
