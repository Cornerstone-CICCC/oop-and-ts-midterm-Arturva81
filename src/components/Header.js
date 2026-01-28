import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props)
    this.cartCount = 0
    
    this.props.cartContext.subscribe((cart) => {
      this.updateCartCount()
    })
  }

  updateCartCount() {
    this.cartCount = this.props.cartContext.getCartCount()
    const countElement = this.element?.querySelector('.cart-count')
    if (countElement) {
      countElement.textContent = this.cartCount
      countElement.style.display = this.cartCount > 0 ? 'flex' : 'none'
    }
  }

  render() {
    const header = document.createElement('header')
    header.className = 'header'
    header.innerHTML = `
      <h1>Store</h1>
      <div class="cart-icon">
        <i class="fa-solid fa-cart-shopping"></i>
        <span class="cart-count" style="display: none;">0</span>
      </div>
    `

    const cartIcon = header.querySelector('.cart-icon')
    cartIcon.addEventListener('click', () => {
      if (this.props.onCartClick) {
        this.props.onCartClick()
      }
    })

    return header
  }
}