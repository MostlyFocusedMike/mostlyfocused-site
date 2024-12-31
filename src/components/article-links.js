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
    const handleIds = headingEl => {
      headingEl.id = headingEl.textContent
        .trim().toLocaleLowerCase().replace(/[\?\!\,\.\"\']/g, '').replace(/\s/g, '-');
    };
    this.headings.forEach(handleIds);
  }

  render() {
    this.innerHTML = /*html*/`
      <nav aria-labelledby="article-links-header" id="article-links">
        <h2 id="article-links-header">Jump To Section</h2>
        <ul>
          <li>
            <a href="#${this.headings[0].id}">Back To Top</a>
          </li>
          ${$m(this.headings.slice(1), ({ textContent, id, tagName }) => /*html*/`
            <li class="${tagName}-link">
              <a aria-label="${textContent}" href="#${id}">${textContent.replace(/[\!\?]/g, '')}</a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}
