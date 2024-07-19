import './styles.css';


const handleError = (e) => {
  const { name, validity, type, parentElement } = e.target;

  const tag = type.match(/checkbox|radio/) ? parentElement : e.target;
  tag.classList.toggle('error', !validity.valid);

  const errorSpanEl = document.querySelector(`#${name}-error`);
  if (!errorSpanEl) return;

  errorSpanEl.style.visibility = validity.valid ? 'hidden' : 'visible';
}

const handleSubmit = (e) => {
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

  handleJsonpResponse(formData);

  e.target.reset();
  e.target.EMAIL.disabled = true;
  e.target.querySelector('button').classList.add('disabled');
};

const handleJsonpResponse = (formData) => {
  const baseUrl = 'https://gmail.us14.list-manage.com/subscribe/post-json';
  // const baseUrl = '/test.js'

  const searchParams = new URLSearchParams(formData);
  const fullUrl = `${baseUrl}?${searchParams.toString()}`
  const jsonpCallbackName = searchParams.get('c');

  const script = document.createElement('script');
  script.src = fullUrl;
  document.body.appendChild(script);

  window[jsonpCallbackName]= ({ result, msg }) => {
    const resultsEl = document.querySelector('p#chimp-results');
    resultsEl.className = `jsonp-${result}`;
    resultsEl.textContent = msg

    script.remove();
    delete window[jsonpCallbackName];
  }
}

export default class ChimpForm extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = document.querySelector('#newsletter-form');

    for (const input of form.querySelectorAll('[name]')){
      input.addEventListener('input', handleError);
      input.addEventListener('invalid', handleError);
    }

    form.addEventListener('submit', handleSubmit);
  }


  // HTML does not require the \\ to escape, but remember, this is all a template string, which DOES
  render() {
    const isSideBar = this.hasAttribute('side_bar');
    this.innerHTML = /*html*/`
      <div id="newsletter-container" class="${isSideBar ? 'side-bar' : ''}" >
        <form id="newsletter-form" aria-labelledby="signup-heading">
          <h2 id="signup-heading" class="${isSideBar ? 'tiny' : ''}">
            Get The Monthly Newsletter
          </h2>
          <div aria-hidden="true" style="position: absolute; left: -5000px;">
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bots -->
            <input type="text" name="b_dc0ab9e42e4956a8c83d4579e_35a27f3003" tabindex="-1" value="">
          </div>
          <label for="EMAIL">Enter your email:</label>
          <div>
            <input id="EMAIL" type="email" name="EMAIL" pattern="^[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,4}$" required ><button>Join</button>
            <p id="EMAIL-error" role="alert">Please enter a valid email</p>
          </div>
          <p id="chimp-results"></p>
        </form>
      </div>
    `
  }
}
