export default class TrafficAnalyzer extends HTMLElement {
  connectedCallback() {
    fetch('https://traffic.mostlyfocused.com/traffic-analyzer')
      .then(r => r.text())
      .then(console.log)
      .catch(console.error)
  }
}
