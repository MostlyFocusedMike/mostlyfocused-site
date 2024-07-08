import { allTopics } from '../../../json-data/articles.json'
import { ARTICLE_CARDS } from '../article-card-list';
import { $m } from '../../utils';
import './styles.css';

export const TOPIC_CHOICES = 'topic-choices';

export default class TopicChoices extends HTMLElement {
  static observedAttributes = ['override']

  get override() { return this.getAttribute('override') }
  set override(topic) { this.setAttribute('override', topic) }

  connectedCallback() {
    this.articleCardList = document.querySelector(ARTICLE_CARDS);
    this.render();
    this.handleEvents();
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (property !== 'override') return;
    document.querySelectorAll('input[type=checkbox]').forEach(el => {
      el.checked = el.name === this.override;
    });
    this.articleCardList.topics = this.override;
  }

  handleEvents() {
    this.form.onchange = (e) => {
      const formData = new FormData(this.form)
      const formDataObj = Object.fromEntries(formData);

      this.articleCardList.topics = Object.keys(formDataObj).join(',');
    }

    this.form.onreset = () => this.articleCardList.topics = Object.values(allTopics).join(',');

    this.clearButton.onclick = (e) => {
      document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false)
      this.articleCardList.topics = '';
    };
  }

  render() {
    this.form = document.createElement('form');

    this.form.innerHTML = /*html*/`
      <form aria-labelledby="topic-header">
        <h2 id="topic-header">Topic Choices</h2>
        <div id="all-topics">
          ${$m(allTopics, (topic) => /*html*/`
            <input type="checkbox" id="${topic}" name="${topic}" checked/>
            <label for="${topic}">${topic}</label>
          `)}
        </div>
        <div id="multi-topic-buttons">
          <button class="multi-topic" type="reset">Select All</button>
          <button class="multi-topic" type="button" id="clear">Unselect All</button>
        </div>

      </form>
    `;
    this.append(this.form);

    this.clearButton = document.querySelector('#clear')
  }
}
