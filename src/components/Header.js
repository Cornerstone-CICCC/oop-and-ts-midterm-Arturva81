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
      <h1>WorstBuy</h1>
      <div class="header-icons">
        <div class="home-icon">
          <i class="fa-solid fa-house"></i>
        </div>
        <div class="cart-icon">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="cart-count" style="display: none;">0</span>
        </div>
      </div>
    `

    const homeIcon = header.querySelector('.home-icon')
    const cartIcon = header.querySelector('.cart-icon')
    
    homeIcon.addEventListener('click', () => {
      if (this.props.onHomeClick) {
        this.props.onHomeClick()
      }
    })
    
    cartIcon.addEventListener('click', () => {
      if (this.props.onCartClick) {
        this.props.onCartClick()
      }
    })

    return header
  }
}