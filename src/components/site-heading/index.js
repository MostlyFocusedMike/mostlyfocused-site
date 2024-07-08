import "./styles.css";

export const SITE_HEADING = 'site-heading';

export default class SiteLinks extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/`
    <header>
      <a id="logo" href="/">mostlyFOCUSED</a>
      <nav id="primary-nav">
        <ul>
          <li><a class="primary-link" href="/pages/articles/index.html">Articles</a></li>
        </ul>
      </nav>
    </header>
    `;
  }
}
