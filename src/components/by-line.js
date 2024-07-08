export default class ByLine extends HTMLElement {
  connectedCallback() {
    const publishDate = new Date(document.querySelector('meta[property="article:published_time"]').content)
      .toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })
    this.innerHTML = /*html*/`<p id="by-line">By Mike Cronin, Published on ${publishDate}</p>`
  }
}
