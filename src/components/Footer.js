import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement('footer')
    footer.className = 'footer'
    footer.innerHTML = `
      <p>OOP Store &copy; 2026. All rights reserved.</p>
    `
    return footer
  }
}