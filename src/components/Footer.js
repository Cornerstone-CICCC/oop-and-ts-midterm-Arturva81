import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement('footer')
    footer.className = 'footer'
    footer.innerHTML = `
      <p>© 2026 Store. All rights reserved.</p>
    `
    return footer
  }
}