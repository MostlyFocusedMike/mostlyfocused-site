const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

export default class TrafficAnalyzer extends HTMLElement {
  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const now = new Date();
    const timestamp = now.toUTCString();

    const data = { timestamp, route: window.location.pathname, };

    const referrer = urlParams.get('custom-refer') || document.referrer;
    if (referrer) data.referrer = referrer;

    const queryParams = Object.fromEntries(urlParams.entries());
    if (Object.keys(queryParams).length) data.queryParams = queryParams;

    if (window.location.hash) data.routeHash = window.location.hash;

    const opts = { method: 'POST', headers, body: JSON.stringify(data) };

    const path = import.meta.env.DEV
      ? 'http://localhost:3000/api/visits'
      : 'https://traffic.mostlyfocused.com/api/visits';

    setTimeout(() => fetch(path, opts).catch(console.error), 500);
  }
}
