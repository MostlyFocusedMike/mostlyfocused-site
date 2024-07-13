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

    let prevScrollY = window.scrollY;
    const headerEl = document.querySelector('header');
    const handleSlidInAndOutHeader = () => {
      headerEl.style.top = prevScrollY > window.scrollY ? "0" : "-50px";
      prevScrollY = window.scrollY;
    }

    window.addEventListener('scroll', handleSlidInAndOutHeader);
  }
}
