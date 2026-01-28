import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.isOpen = false
    
    this.props.cartContext.subscribe(() => {
      this.updateCart()
    })
  }

  toggleCart() {
    this.isOpen = !this.isOpen
    const modal = this.element.querySelector('.cart-modal')
    const overlay = this.element.querySelector('.cart-overlay')
    
    if (this.isOpen) {
      modal.classList.add('open')
      overlay.classList.add('open')
    } else {
      modal.classList.remove('open')
      overlay.classList.remove('open')
    }
  }

  updateCart() {
    if (!this.element) return
    
    const cartItems = this.props.cartContext.getCart()
    const itemsContainer = this.element.querySelector('.cart-items')
    const totalElement = this.element.querySelector('.cart-total')
    
    itemsContainer.innerHTML = ''
    
    if (cartItems.length === 0) {
      itemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>'
      totalElement.textContent = 'Total: $0.00'
    } else {
      cartItems.forEach(item => {
        const cartItem = new CartItem({
          item,
          onUpdateQuantity: (id, quantity) => {
            this.props.cartContext.updateQuantity(id, quantity)
          },
          onRemove: (id) => {
            this.props.cartContext.removeFromCart(id)
          }
        })
        cartItem.mount(itemsContainer)
      })
      
      const total = this.props.cartContext.getCartTotal()
      totalElement.textContent = `Total: $${total.toFixed(2)}`
    }
  }

  render() {
    const container = document.createElement('div')
    
    container.innerHTML = `
      <div class="cart-overlay"></div>
      <div class="cart-modal">
        <div class="cart-header">
          <h2>Cart</h2>
          <button class="close-cart">✕</button>
        </div>
        <div class="cart-items">
          <div class="empty-cart">Your cart is empty</div>
        </div>
        <div class="cart-total">Total: $0.00</div>
      </div>
    `

    const closeBtn = container.querySelector('.close-cart')
    const overlay = container.querySelector('.cart-overlay')
    
    closeBtn.addEventListener('click', () => this.toggleCart())
    overlay.addEventListener('click', () => this.toggleCart())

    return container
  }
}