import './styles.css';

export default class ChimpForm extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = this.querySelector('.newsletter-form');

    for (const input of form.querySelectorAll('[name]')){
      input.addEventListener('input', this.handleError);
      input.addEventListener('invalid', this.handleError);
    }

    form.addEventListener('submit', this.handleSubmit);
  }

  getId(id) {
    return `${id}${this.hasAttribute('side_bar') ? '-side' : ''}`;
  }

  handleError = (e) => {
    const { id, validity } = e.target;

    e.target.classList.toggle('error', !validity.valid);

    const errorSpanEl = document.getElementById(`${id}-error`);
    if (!errorSpanEl) return;

    errorSpanEl.style.visibility = validity.valid ? 'hidden' : 'visible';
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const timeNow = Date.now();
    const jsonpCallbackName = `jsonpCallback`;

    formData.append('id', '35a27f3003');
    formData.append('u', 'dc0ab9e42e4956a8c83d4579e');
    formData.append('f_id', '0035f9e0f0');
    formData.append('subscribe', 'Subscribe');
    formData.append('c', jsonpCallbackName);
    formData.append('_', timeNow);

    this.handleJsonpResponse(formData);

    e.target.reset();
    e.target.EMAIL.disabled = true;
    e.target.querySelector('button').classList.add('disabled');
  };


  handleJsonpResponse = (formData) => {
    const baseUrl = 'https://gmail.us14.list-manage.com/subscribe/post-json';
    // const baseUrl = '/jsonp-test.js'

    const searchParams = new URLSearchParams(formData);
    const fullUrl = `${baseUrl}?${searchParams.toString()}`
    console.log('fullUrl:', fullUrl);
    const jsonpCallbackName = searchParams.get('c');

    const script = document.createElement('script');
    script.src = fullUrl;
    document.body.appendChild(script);

    window[jsonpCallbackName]= ({ result, msg }) => {
      const resultsEl = document.getElementById(this.getId('chimp-results'));
      resultsEl.classList.add(`jsonp-${result}`);
      resultsEl.textContent = msg

      script.remove();
      delete window[jsonpCallbackName];
    }
  }

  // HTML does not require the \\ to escape, but remember, this is all a template string, which DOES
  render() {
    const isSideBar = this.hasAttribute('side_bar');
    const tinyClass = isSideBar ? 'tiny' : '';

    this.innerHTML = /*html*/`
      <div class="${isSideBar ? 'side-bar' : ''} newsletter-container" >
        <form class="newsletter-form" aria-label="Get the monthly newsletter ${isSideBar ? 'sidebar' : ''}">
          <h2 class="${tinyClass}">
            Get The Monthly Newsletter
          </h2>
          <div aria-hidden="true" style="position: absolute; left: -5000px;">
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bots -->
            <input type="text" name="b_dc0ab9e42e4956a8c83d4579e_35a27f3003" tabindex="-1" value="">
          </div>
          <label for="${this.getId('email')}">Enter your email:</label>
          <div>
            <input id="${this.getId('email')}" type="email" name="EMAIL" pattern="^[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,4}$" required ><button>Join</button>
            <p id="${this.getId('email')}-error" role="alert">Please enter a valid email</p>
          </div>
          <p id="${this.getId('chimp-results')}" class="chimp-results"></p>
        </form>
      </div>
    `;
  }
}
