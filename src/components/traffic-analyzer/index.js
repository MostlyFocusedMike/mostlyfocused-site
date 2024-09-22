export default class TrafficAnalyzer extends HTMLElement {
  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const now = new Date();
    const timestamp = now.toUTCString();

    const data = { timestamp, route: window.location.pathname, };

    const referrer = urlParams.get('custom-refer') || document.referrer;
    if (referrer) data.referrer = referrer;

    const query = Object.fromEntries(urlParams.entries());
    if (Object.keys(query).length) data.query = query;

    if (window.location.hash) data.hash = window.location.hash;

    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };
    const timeout = import.meta.env.DEV ? 0 : 3000;
    const path = import.meta.env.DEV
      ? 'http://localhost:3000/traffic-analyzer'
      : 'https://traffic.mostlyfocused.com/traffic-analyzer';

    setTimeout(() => fetch(path, opts).catch(console.error), timeout);
  }
}
