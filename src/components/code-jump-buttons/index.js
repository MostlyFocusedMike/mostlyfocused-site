import './styles.css';

export default class CodeJumpButtons extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleJumpToElement);
  }

  handleJumpToElement = (e) => {
    if (!e.target.dataset.direction) return;
    const direction = Number(e.target.dataset.direction);

    const distanceToTopPixelOfCodeSnippets = [...document.querySelectorAll('my-code')]
      .map(snippet => snippet.getBoundingClientRect().top);
    if (direction === -1) distanceToTopPixelOfCodeSnippets.reverse();

    for (const px of distanceToTopPixelOfCodeSnippets) {
      const positiveOrNegativeOne = px / Math.abs(px);
      const isFirstNumToMatchDirection = positiveOrNegativeOne === direction;

      if (isFirstNumToMatchDirection && Math.abs(px) > 1) return window.scrollBy(0, px);
    }

    e.target.classList.add('wiggle');
    setTimeout(() => e.target.classList.remove('wiggle'), 300);
  }

  render() {
   this.innerHTML = /*html*/`
    <section id="code-jump-buttons" aria-labelledby="code-jump">
      <h2 id="code-jump">Jump to Code</h2>
      <div id="button-holder">
        <button data-direction="-1">&lt; Prev </button>
        <button data-direction="1"> Next &gt;</button>
      </div>
    </section>
    `;
  }
}
