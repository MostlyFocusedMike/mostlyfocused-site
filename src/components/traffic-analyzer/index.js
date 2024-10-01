const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

export default class TrafficAnalyzer extends HTMLElement {
  connectedCallback() {
    const timestamp = (new Date()).toISOString();

    const data = { timestamp, route: window.location.pathname, };

    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get('ref') || document.referrer;
    if (referrer) data.referrer = referrer;

    const opts = { method: 'POST', headers, body: JSON.stringify(data) };

    const path = import.meta.env.DEV
      ? 'http://localhost:3000/api/visits'
      : 'https://traffic.mostlyfocused.com/api/visits';

    setTimeout(() => fetch(path, opts).catch(console.error), 500);
  }
}
