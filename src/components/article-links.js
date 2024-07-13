import { $m } from "./utils";

export default class ArticleLinks extends HTMLElement {
  connectedCallback() {
    this.headings = [
      ...document.querySelector('article').querySelectorAll('h1, h2, h3, h4')
    ];
    this.setHeadingIds();
    this.render();
  }

  setHeadingIds() {
    this.headings.forEach(headingEl => {
      headingEl.classList.add('article-heading');
      headingEl.id = headingEl.textContent.trim()
        .toLocaleLowerCase()
        .replace(/[\?\!\,\.\"\']/g, '')
        .replace(/\s/g, '-');
    });
  }

  render() {
    this.innerHTML = /*html*/`
      <nav aria-labelledby="article-links-header" id="article-links">
        <h2 id="article-links-header">Jump To Section</h2>
        <ul>
          <li>
            <a aria-label="Top of Article" href="#${this.headings[0].id}">Top</a>
          </li>
          ${$m(this.headings.slice(1), ({textContent, id, tagName}) => /*html*/`
            <li class="${tagName}-link">
              <a aria-label="${textContent}" href="#${id}">${textContent.replace(/[\!\?]/g, '')}</a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}
