import { $m, $p } from "../../utils";
import './styles.css';

export const ARTICLE_CARD = 'article-card'
export const TOPIC_CLASS = 'topic-badge';

export default class ArticleCard extends HTMLElement {
  get article() { return $p(this.getAttribute('article')) }

  connectedCallback() {
    const { relativeUrl, title, description, topics } = this.article;

    const isInteractive = this.hasAttribute('is_interactive');
    const imgUrl = `/images/${this.id}/preview.webp`;

    // TODO: reformat to use classList
    this.innerHTML = /*html*/`
      <div class="${ARTICLE_CARD}">
        <a href="${relativeUrl}">
          <p class="preview-title">${title}</p>
          <img class="preview-image" src="${imgUrl}" alt="" />
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
