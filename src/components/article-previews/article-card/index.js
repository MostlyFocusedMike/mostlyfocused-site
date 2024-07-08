import { $m, $p } from "../../utils";
import './styles.css';

export const ARTICLE_CARD = 'article-card'
export const TOPIC_CLASS = 'topic-badge';

export default class ArticleCard extends HTMLElement {
  get article() { return $p(this.getAttribute('article')) }

  connectedCallback() {
    const { relativeUrl, title, image, description, topics } = this.article;

    const isInteractive = this.hasAttribute('is_interactive');
    const isSmall = this.closest('article-card-list').hasAttribute('has_small_cards');
    const url = new URL(image);
    const { pathname } = url;

    // TODO: reformat to use classList
    this.innerHTML = /*html*/`
      <div class="${ARTICLE_CARD} ${isSmall ? 'small-card' : ''}">
        <a href="${relativeUrl}">
          <p class="preview-title">${title}</p>
          <img class="preview-image" src="${pathname}" alt="" />
        </a>

        <p>${description}</p>
        <hr class="preview-hr" />
        <ul class="article-topics">
          ${$m(topics, (topic, idx) => /*html*/`
            ${isInteractive
              ? /*html*/`<li><button class="${TOPIC_CLASS}">${topic}</button></li>`
              : /*html*/`<li><p class="${TOPIC_CLASS}">${topic}${idx < topics.length - 1 ? ',' : ''}</p></li>`
            }
          `)}
        </ul>
      </div>
    `;
    this.handleEvents();
  }

  // move this to article card for easier debugging?
  handleEvents() {
    this.onclick = (e) => {
      if (!e.target.matches(`button.${TOPIC_CLASS}`)) return;

      document.querySelector('topic-choices').override = e.target.textContent;
    }
  }
}
