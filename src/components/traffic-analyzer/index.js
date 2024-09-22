export default class TrafficAnalyzer extends HTMLElement {
  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);

    const referrer = urlParams.get('custom-refer') || document.referrer;

    const data = { referrer, route: window.location.pathname };

    const query = Object.fromEntries(urlParams.entries());
    if (Object.keys(query).length) data.query = query;

    if (window.location.hash) data.hash = window.location.hash;

    const opts = { method: 'POST', body: JSON.stringify(data) };
    const path = import.meta.env.DEV
      ? 'http://localhost:3000/traffic-analyzer'
      : 'https://traffic.mostlyfocused.com/traffic-analyzer';

    setTimeout(() => fetch(path, opts).catch(console.error), 3000);
  }
}
