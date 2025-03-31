
// remember, in order for this to work, you need this style sheet in the head
/*
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="crossorigin="anonymous" referrerpolicy="no-referrer" media="none" onload="this.media='all'" />
*/

// and this script at the end of the file
/*
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" integrity="sha512-7Z9J3l1+EYfeaPKcGXu3MS/7T+w19WtKQY/n+xzmw4hZhJ9tyYmcUS+4QqAlzhicE5LAfMQSF3iFTK9bQdTxXg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
*/
import { escapeText } from '../utils.js';
import './styles.css';

const COPY_CODE = 'Copy Code';
const COPIED = 'Copied!';

const copyToClipboard = (text) => {
  if (!navigator.clipboard) return alert('Clipboard API not supported');
  navigator.clipboard.writeText(text)
    .catch(() => alert('Failed to copy text!'));
}

export default class CodeSnippet extends HTMLElement {
  connectedCallback() {
    const code = this.childNodes[0].textContent;
    const output = this.querySelector('pre')?.innerText;
    const file = this.getAttribute('file');
    const lang = this.getAttribute('snip_lang') || 'jsx';
    this.innerHTML = /*html*/`
      <div class="code-jump-point code-container">
        <div class="code-meta-shadow">
          <div class="code-meta">
          ${file ? `<p class='filename'>${file}</p>` : ''}
          <button class="code-copy">${COPY_CODE}</button>
        </div>
        </div>
        <pre><code class="language-${lang}">${escapeText(code.trim())}</code></pre>
      </div>
      ${output ? /*html*/`<pre class="code-output">OUTPUT:\n${output}</pre>` : ''}
    `;

    this.querySelector('button').onclick = this.handleCopy(code);
  }

  handleCopy = (code) => ({ target }) => {
    copyToClipboard(code.trim());
    target.textContent = COPIED;
    setTimeout(() => target.textContent = COPY_CODE, 1000);
  }
}

